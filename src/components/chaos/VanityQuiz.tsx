"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Skull, X } from "lucide-react";
import { useState } from "react";

const QUESTIONS = [
    {
        q: "Qual sua relação com pés?",
        a: [
            { text: "Tenho memória fotográfica para joanetes.", score: "joao" },
            { text: "Uso para andar, apenas.", score: "normal" },
            { text: "Meus pés são garras góticas.", score: "gargula" }
        ]
    },
    {
        q: "Como você lida com prazos?",
        a: [
            { text: "Durmo e culpo a filha.", score: "greg" },
            { text: "Entrego, mas odeio.", score: "estagiario" },
            { text: "Grito e monetizo o pânico.", score: "porchat" }
        ]
    },
    {
        q: "O que você faria se fosse 'imbeijável'?",
        a: [
            { text: "Terapia por 30 anos.", score: "joao" },
            { text: "Escreveria uma coluna na Folha.", score: "greg" },
            { text: "Viajaria para a Islândia.", score: "porchat" }
        ]
    }
];

export function VanityQuiz() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = () => {
        if (step < QUESTIONS.length - 1) {
            setStep(s => s + 1);
        } else {
            // Random chaotic result because logic is overrated
            const results = [
                "VOCÊ É: O ESTAGIÁRIO (Ninguém liga).",
                "VOCÊ É: JOÃO VICENTE (Vá para a terapia).",
                "VOCÊ É: GREGÓRIO (Vá dormir).",
                "VOCÊ É: PORCHAT (Vá viajar)."
            ];
            setResult(results[Math.floor(Math.random() * results.length)]);
        }
    };

    const reset = () => {
        setIsOpen(false);
        setStep(0);
        setResult(null);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-28 left-4 bg-black text-white px-4 py-2 font-bold border-2 border-white hover:bg-white hover:text-black transition-colors z-[50] shadow-[4px_4px_0px_#ff0000] text-xs md:text-sm"
            >
                ⚠️ QUIZ DA VAIDADE
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="bg-white border-8 border-red-600 p-8 max-w-lg w-full relative shadow-[20px_20px_0px_#000]"
                        >
                            <button onClick={reset} className="absolute top-4 right-4 hover:bg-red-600 hover:text-white border-2 border-black p-1 transition-colors">
                                <X size={24} />
                            </button>

                            {!result ? (
                                <>
                                    <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">
                                        PERGUNTA #{step + 1}
                                    </h2>
                                    <p className="text-2xl font-bold mb-8 font-mono">{QUESTIONS[step].q}</p>
                                    <div className="space-y-4">
                                        {QUESTIONS[step].a.map((ans, i) => (
                                            <button
                                                key={i}
                                                onClick={handleAnswer}
                                                className="w-full text-left border-4 border-black p-4 font-bold hover:bg-yellow-400 hover:translate-x-2 transition-transform uppercase text-sm md:text-base"
                                            >
                                                {ans.text}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <Skull className="h-20 w-20 mx-auto mb-4 animate-bounce" />
                                    <h2 className="text-4xl font-black uppercase mb-4 text-red-600">RESULTADO FINAL</h2>
                                    <p className="text-2xl font-bold bg-black text-white p-4 inline-block transform rotate-2">
                                        {result}
                                    </p>
                                    <p className="mt-8 font-mono text-sm text-gray-500">
                                        Sugestão: Compre um software da RET Tecnologia para organizar sua vida.
                                    </p>
                                    <button onClick={reset} className="mt-8 border-4 border-black px-8 py-2 font-black uppercase hover:bg-black hover:text-white transition-colors">
                                        ACEITAR O DESTINO
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
