"use client";

import { motion } from "framer-motion";
import { Hash } from "lucide-react";
import { useEffect, useState } from "react";

const STATS = [
    { label: "PROCESSOS ATIVOS", value: 42 },
    { label: "ADVOGADOS ACIONADOS", value: 13 },
    { label: "ROTEIROS SOBRE JESUS VETADOS", value: 666 },
    { label: "GRITOS DO PORCHAT (HOJE)", value: 4892 },
    { label: "HORAS DE SONO DO GREG", value: 14720 },
    { label: "ESPELHOS QUEBRADOS PELO JOÃO", value: 7 },
    { label: "TENTATIVAS DE CANCELAMENTO", value: 891 },
    { label: "E-MAILS DO JURÍDICO", value: 10928 },
    { label: "PIADAS COM ANÕES", value: 4 },
    { label: "CUPONS 'CHARME' VENCIDOS", value: 55000 },
    { label: "TERAPIAS AGENDADAS", value: 19 },
    { label: "MILHAS DO FABIO", value: 9999999 }
];

export function SketchCounter() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Chaotic interval: random updates between 500ms and 2500ms
        const update = () => {
            setIndex(Math.floor(Math.random() * STATS.length));
            const nextDelay = Math.random() * 2000 + 500;
            setTimeout(update, nextDelay);
        };
        const timer = setTimeout(update, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-24 right-4 z-40 hidden lg:block">
            <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black text-[#00ff00] border-2 border-[#00ff00] p-4 font-mono shadow-[4px_4px_0px_#00ff00] min-w-[200px]"
            >
                <div className="flex items-center gap-2 mb-2 border-b border-[#00ff00] pb-1">
                    <Hash size={16} />
                    <span className="text-xs font-bold uppercase">DADOS INÚTEIS.SYS</span>
                </div>
                <div className="text-3xl font-black tabular-nums tracking-tighter" suppressHydrationWarning>
                    {STATS[index].value.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest leading-tight">
                    {STATS[index].label}
                </div>
            </motion.div>
        </div>
    );
}
