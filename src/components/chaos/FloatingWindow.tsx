"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Bug, Minus, Square, X } from "lucide-react";

interface FloatingWindowProps {
    id: number;
    title: string;
    text: string;
    x: number;
    y: number;
    rotation: number;
    visible: boolean;
    onClose: (id: number) => void;
}

export function FloatingWindow({ id, title, text, x, y, rotation, visible, onClose }: FloatingWindowProps) {
    if (!visible) return null;

    return (
        <motion.div
            drag
            dragMomentum={true}
            dragElastic={0.2}
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }}
            whileHover={{ scale: 1.02 }}
            initial={{ x, y, scale: 0, opacity: 0 }}
            animate={{ x: x, y: y, scale: 1, opacity: 1, rotate: rotation }}
            exit={{ scale: 0, opacity: 0, rotate: -20 }}
            className={`
                relative md:absolute
                w-72 md:w-80
                bg-[#e0e0e0] border-t-2 border-l-2 border-white
                shadow-[4px_4px_0px_#000] border-r-4 border-b-4 border-r-gray-800 border-b-gray-800
                cursor-grab active:cursor-grabbing
                flex flex-col
                group
            `}
        >
            {/* Retro Windows 95 Header */}
            <div className={`
                bg-[#000080] text-white px-2 py-1
                flex justify-between items-center select-none
                bg-gradient-to-r from-[#000080] to-[#1084d0]
            `}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                    <Bug size={14} className="animate-pulse text-yellow-400" />
                    {title}
                </div>
                <div className="flex gap-1">
                    <button className="bg-[#c0c0c0] w-5 h-5 flex items-center justify-center border-t border-l border-white border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                        <Minus size={10} className="text-black" />
                    </button>
                    <button className="bg-[#c0c0c0] w-5 h-5 flex items-center justify-center border-t border-l border-white border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                        <Square size={8} className="text-black" />
                    </button>
                    {/* CLOSE BUTTON - LARGER FOR MOBILE */}
                    <button
                        onClick={() => onClose(id)}
                        className="bg-[#c0c0c0] w-8 h-8 md:w-5 md:h-5 flex items-center justify-center border-t border-l border-white border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-red-600 group-btn"
                    >
                        <X size={12} className="text-black group-btn-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 text-black font-mono text-sm leading-relaxed relative bg-[#c0c0c0]">
                {/* Scanlines Overlay if Hovered */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 background-size-[100%_2px,3px_100%]"></div>

                <div className="flex gap-4 items-start">
                    <AlertTriangle size={32} className="text-yellow-600 shrink-0" />
                    <div>
                        {text}
                        <button
                            onClick={() => onClose(id)}
                            className="mt-4 w-full border-t border-l border-white border-b-2 border-r-2 border-b-black border-r-black px-4 py-1 text-xs font-bold active:border-t-black active:border-l-black active:bg-gray-400"
                        >
                            OK (IGNORAR)
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
