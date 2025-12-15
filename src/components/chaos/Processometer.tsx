"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Processometer() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // Delay setting initial value to avoid synchronous state update warning
        setTimeout(() => setCount(13429), 0);

        const interval = setInterval(() => {
            setCount(c => (c || 0) + Math.floor(Math.random() * 5));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (count === null) return null;

    return (
        <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="fixed bottom-4 left-4 bg-red-600 text-white border-4 border-black p-2 z-[90] font-mono text-xs md:text-sm shadow-[4px_4px_0px_black]"
        >
            <div className="font-black uppercase mb-1">Processômetro</div>
            <div className="text-2xl font-bold font-mono">R$ {count.toLocaleString('pt-BR')},00</div>
            <div className="text-[10px] uppercase opacity-75">Em indenizações potenciais</div>
        </motion.div>
    );
}
