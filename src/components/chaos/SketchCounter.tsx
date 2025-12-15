"use client";

import { motion } from "framer-motion";
import { Hash } from "lucide-react";
import { useEffect, useState } from "react";

const STATS = [
    { label: "GRITOS DO PORCHAT", value: 4892 },
    { label: "GREGÓRIOS DORMIDAS", value: 127 },
    { label: "PROCESSOS ATIVOS", value: 42 },
    { label: "PÉS ELOGIADOS", value: 891 },
    { label: "ATRASOS DO ESTAGIÁRIO", value: 9999 }
];

export function SketchCounter() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % STATS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-24 right-4 z-40 hidden lg:block">
            <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-black text-[#00ff00] border-2 border-[#00ff00] p-4 font-mono shadow-[4px_4px_0px_#00ff00]"
            >
                <div className="flex items-center gap-2 mb-2 border-b border-[#00ff00] pb-1">
                    <Hash size={16} />
                    <span className="text-xs font-bold uppercase">ESTATÍSTICAS INÚTEIS</span>
                </div>
                <div className="text-3xl font-black" suppressHydrationWarning>{STATS[index].value.toLocaleString('pt-BR')}</div>
                <div className="text-xs font-bold">{STATS[index].label}</div>
            </motion.div>
        </div>
    );
}
