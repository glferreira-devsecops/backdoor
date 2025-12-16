"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, Fingerprint, Siren, Skull, X } from "lucide-react";
import Image from "next/image";

interface BioStats {
    [key: string]: string | number | undefined;
}

interface Profile {
    id: string;
    name: string;
    role: string;
    image: string;
    chaosLevel: number;
    desc: string;
    traits: string[];
    diagnosis?: string;
    stats?: BioStats;
    cancelPercentage?: number;
}

interface BioModalProps {
    profile: Profile | null;
    onClose: () => void;
}

export function BioModal({ profile, onClose }: BioModalProps) {
    if (!profile) return null;

    return (
        <AnimatePresence>
            {profile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#f0f0f0] w-full max-w-4xl border-4 border-black shadow-[16px_16px_0px_#000] relative flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
                    >
                        {/* LEFT COLUMN: IMAGE & ID */}
                        <div className="w-full md:w-1/3 bg-black border-r-4 border-black p-6 flex flex-col items-center text-white relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

                            <div className="relative w-48 h-60 mb-6 border-4 border-white rotate-2 shadow-[8px_8px_0px_#ff0000]">
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                {/* MUGSHOT OVERLAY */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black px-2 text-xs font-mono border border-white whitespace-nowrap">
                                    ID: {profile.id.toUpperCase()}_007
                                </div>
                            </div>

                            <h2 className="text-3xl font-black uppercase text-center leading-none mb-2">{profile.name}</h2>
                            <span className="bg-red-600 text-white px-2 py-1 font-bold text-xs uppercase mb-6 rotate-[-2deg]">
                                {profile.role}
                            </span>

                            {/* CHAOS METER */}
                            <div className="w-full mt-auto">
                                <div className="flex justify-between text-xs font-mono uppercase mb-1">
                                    <span>Nível de Caos</span>
                                    <span className="text-red-500">{profile.chaosLevel}/10</span>
                                </div>
                                <div className="w-full h-4 bg-gray-800 border-2 border-white relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(profile.chaosLevel / 12) * 100}%` }}
                                        transition={{ delay: 0.3, duration: 1 }}
                                        className="h-full bg-gradient-to-r from-yellow-400 to-red-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: DOSSIER CONTENT */}
                        <div className="w-full md:w-2/3 p-4 md:p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] touch-pan-y">
                            {/* MOBILE-FRIENDLY CLOSE BUTTON (44x44 min tap target) */}
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white border-2 border-black transition-colors z-50 bg-white active:scale-95"
                                aria-label="Fechar modal"
                            >
                                <X size={28} />
                            </button>

                            {/* HEADER TAGS - TOUCH FRIENDLY */}
                            <div className="flex flex-wrap gap-2 mb-6 mt-8 md:mt-0">
                                {profile.traits.map((trait, i) => (
                                    <span key={i} className="bg-white border-2 border-black px-3 py-2 font-bold text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 active:scale-95 transition-transform">
                                        <Award size={12} className="text-yellow-600" />
                                        {trait}
                                    </span>
                                ))}
                            </div>

                            {/* DIAGNOSTIC ALERT */}
                            {profile.diagnosis && (
                                <div className="bg-red-100 border-l-8 border-red-600 p-4 mb-6 shadow-sm">
                                    <div className="flex items-center gap-2 text-red-700 font-black uppercase text-sm mb-1">
                                        <Siren size={18} className="animate-bounce" />
                                        Diagnóstico Clínico
                                    </div>
                                    <p className="font-serif italic leading-tight text-gray-800">
                                        &quot;{profile.diagnosis}&quot;
                                    </p>
                                </div>
                            )}

                            {/* BIO TEXT */}
                            <div className="mb-8">
                                <h3 className="font-black uppercase text-xl mb-2 flex items-center gap-2">
                                    <Fingerprint size={20} />
                                    Perfil Psicológico
                                </h3>
                                <p className="font-mono text-sm leading-relaxed text-gray-700 text-justify">
                                    {profile.desc}
                                </p>
                            </div>

                            {/* STATS GRID - MOBILE OPTIMIZED */}
                            {profile.stats && (
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 mb-6">
                                    {Object.entries(profile.stats).map(([key, value]) => (
                                        <div key={key} className="bg-white border-2 border-black p-3 text-center shadow-[4px_4px_0px_#ccc]">
                                            <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">{key}</div>
                                            <div className="text-xl font-black">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CANCELOMETER */}
                            <div className="mt-8 border-t-2 border-dashed border-gray-400 pt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-black uppercase text-sm flex items-center gap-2">
                                        <Skull size={18} /> risco de cancelamento
                                    </span>
                                    <span className="font-mono font-bold text-xl">{profile.cancelPercentage}%</span>
                                </div>
                                <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden border-2 border-black">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${profile.cancelPercentage}%` }}
                                        transition={{ delay: 0.5, duration: 1.5, type: 'spring' }}
                                        className={`h-full ${(profile.cancelPercentage || 0) > 80 ? 'bg-red-600' :
                                            (profile.cancelPercentage || 0) > 50 ? 'bg-yellow-400' : 'bg-green-500'
                                            } relative`}
                                    >
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
                                    </motion.div>
                                </div>
                                <p className="text-[10px] uppercase text-gray-500 mt-2 text-right">
                                    * Baseado em tweets de 2018-2024
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
