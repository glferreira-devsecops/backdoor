"use client";

import { motion } from "framer-motion";

const EXCUSES = [
    "DORMI COM A MARIETA",
    "ESQUECI A SENHA DO UBER",
    "TIVE UMA IDEIA GENIAL E ESQUECI DE VIR",
    "CONJUNTIVITE FANTASMA",
    "A PORTA DE CASA QUEBROU",
    "FIQUEI PRESO NO ELEVADOR (MENTIRA)",
    "ESTAVA OUVINDO ATRÁS DA PORTA",
    "PERDI O HORÁRIO DO SONO",
    "O ESTAGIÁRIO ME SABOTOU"
];

export function ExcuseScroll() {
    return (
        <div className="fixed left-0 top-0 h-screen w-12 bg-black text-white hidden md:flex flex-col justify-center overflow-hidden border-r-4 border-red-600 z-40">
            <motion.div
                animate={{ y: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="whitespace-nowrap writing-vertical-lr text-xs font-mono font-bold py-4 space-y-8"
                style={{ writingMode: 'vertical-rl' }}
            >
                {[...EXCUSES, ...EXCUSES, ...EXCUSES].map((excuse, i) => (
                    <span key={i} className="py-8 rotate-180 uppercase tracking-widest opacity-70 hover:opacity-100 hover:text-red-500 cursor-help transition-colors">
                        {excuse} <span className="text-red-500">●</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
