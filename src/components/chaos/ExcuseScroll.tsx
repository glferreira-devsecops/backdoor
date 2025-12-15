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
    "O ESTAGIÁRIO ME SABOTOU",
    "MEU PSICÓLOGO ATRASOU",
    "FUI CANCELADO NO TWITTER",
    "ESTAVA LENDO OS COMENTÁRIOS",
    "A MÁQUINA DE CAFÉ EXPLODIU"
];

export function ExcuseScroll() {
    return (
        <div className="fixed left-0 top-0 h-screen w-16 bg-black text-white hidden md:flex flex-col overflow-hidden border-r-4 border-red-600 z-40 select-none">
            <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="w-full flex flex-col items-center"
            >
                {/* Render content TWICE for seamless loop */}
                {[...EXCUSES, ...EXCUSES].map((excuse, i) => (
                    <div key={i} className="py-6 writing-vertical-lr text-xs font-black font-mono rotate-180 uppercase tracking-widest hover:text-[#00ff00] cursor-help transition-colors whitespace-nowrap drop-shadow-[2px_2px_0px_rgba(255,0,0,0.5)]">
                        {excuse} <span className="text-red-500 mx-2">●</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
