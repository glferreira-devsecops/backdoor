"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, ExternalLink, X } from "lucide-react";
import { useState } from "react";

export function HireCastModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-4 md:bottom-4 md:right-8 bg-[#00ff00] text-black px-6 py-3 font-black border-4 border-black transition-all z-[95] shadow-[6px_6px_0px_#000] uppercase hover:-translate-y-1 hover:translate-x-1 hover:shadow-[10px_10px_0px_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_#000] group flex items-center gap-3"
                style={{ touchAction: 'manipulation' }}
            >
                <DollarSign className="w-5 h-5 group-hover:animate-spin" />
                <span>Contratar Elenco</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, rotate: -5 }}
                            animate={{ scale: 1, rotate: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-yellow-300 border-4 md:border-8 border-black p-4 md:p-8 max-w-lg w-full relative shadow-[10px_10px_0px_#fff] md:shadow-[20px_20px_0px_#fff] max-h-[90vh] overflow-y-auto touch-pan-y"
                        >
                            {/* MOBILE-FRIENDLY CLOSE BUTTON (44x44 min tap target) */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white border-2 border-black transition-colors bg-white active:scale-95"
                                aria-label="Fechar modal"
                            >
                                <X size={28} />
                            </button>

                            <div className="flex justify-center mb-6">
                                <DollarSign size={64} className="text-green-600 animate-bounce" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black uppercase mb-4 text-center leading-none">
                                O Cachê Deles é <span className="text-red-600 line-through">Caro</span> IMPOSSÍVEL.
                            </h2>

                            <p className="text-xl font-bold font-mono text-center mb-8">
                                Mas a consultoria da <span className="bg-black text-white px-2">RET Tecnologia</span> cabe no seu bolso.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white border-4 border-black p-4 text-sm font-bold opacity-50 grayscale">
                                    ❌ JOÃO VICENTE: R$ 500.000 + Massagem no Pé
                                </div>
                                <div className="bg-white border-4 border-black p-4 text-sm font-bold opacity-50 grayscale">
                                    ❌ GREGÓRIO: R$ 300.000 + Adicional de Insalubridade
                                </div>
                                <a
                                    href="https://www.rettecnologia.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#00ff00] border-4 border-black p-4 text-lg font-black transform scale-105 shadow-[8px_8px_0px_#000] cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-between gap-4 group hover:bg-black hover:text-[#00ff00] text-black"
                                >
                                    <span>✅ RET TECNOLOGIA</span>
                                    <ExternalLink className="group-hover:rotate-45 transition-transform" />
                                </a>
                            </div>

                            <p className="mt-8 text-xs font-mono text-center opacity-75">
                                *Este é um anúncio de guerrilha. Diga oi para o Porchat.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
