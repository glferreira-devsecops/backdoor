"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { AlertOctagon, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const STATS = [
    // Fatos Reais (Awwwards Approved)
    { label: "INSCRITOS (TOTAIS)", value: 18200000, real: true },
    { label: "EMMY INTERNACIONAL", value: 1, real: true },
    { label: "VÍDEOS PUBLICADOS", value: 1950, real: true },
    { label: "PROD. DESDE", value: 2012, real: true },

    // Caos (Porta Lore)
    { label: "PROCESSOS ATIVOS (ESTIMADO)", value: 42, real: false },
    { label: "ROTEIROS VETADOS PELO DEPTO JURÍDICO", value: 666, real: false },
    { label: "MILHAS DO PORCHAT", value: 9999999, real: false },
    { label: "E-MAILS DA GLOBO NÃO LIDOS", value: 10928, real: false },
];

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString('pt-BR'));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
}

export function SketchCounter() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const update = () => {
            setIndex(Math.floor(Math.random() * STATS.length));
            const nextDelay = Math.random() * 3000 + 2000; // Slower, more deliberate reading time
            setTimeout(update, nextDelay);
        };
        const timer = setTimeout(update, 1000);
        return () => clearTimeout(timer);
    }, []);

    const isReal = STATS[index].real;

    return (
        <div className="fixed top-24 right-4 z-40 hidden lg:block perspective-1000">
            <motion.div
                key={index}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`border-4 p-6 font-mono shadow-[8px_8px_0px_black] min-w-[240px] backdrop-blur-sm ${isReal
                    ? "bg-white text-black border-black"
                    : "bg-black text-[#00ff00] border-[#00ff00]"
                    }`}
            >
                <div className={`flex items-center gap-2 mb-3 border-b-2 pb-2 ${isReal ? "border-black" : "border-[#00ff00]"}`}>
                    {isReal ? <CheckCircle2 size={18} /> : <AlertOctagon size={18} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        {isReal ? "DADO VERIFICADO" : "ESTATÍSTICA CAÓTICA"}
                    </span>
                </div>

                <div className="text-4xl font-black tabular-nums tracking-tighter mb-1">
                    <AnimatedNumber value={STATS[index].value} />
                </div>

                <div className="text-xs font-bold uppercase tracking-widest leading-tight opacity-80">
                    {STATS[index].label}
                </div>
            </motion.div>
        </div>
    );
}
