"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

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
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            initial={{ x, y, scale: 0 }}
            animate={{ scale: 1, rotate: rotation }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative md:absolute bg-white border-4 border-black p-0 shadow-[8px_8px_0px_#000] cursor-grab active:cursor-grabbing w-72 md:w-64 Pointer-events-auto"
        >
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 flex justify-between items-center handle">
                <span>{title}</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <X size={12} className="cursor-pointer hover:text-black" onClick={() => onClose(id)} />
                </div>
            </div>
            <div className="p-4 font-bold text-center">
                {text}
            </div>
        </motion.div>
    );
}
