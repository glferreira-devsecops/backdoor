"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Skull, X } from "lucide-react";
import { useState } from "react";

const QUESTIONS = [
    {
        q: "Qual é a sua relação com o conceito de 'Repouso'?",
        a: [
            { text: "Durmo 14h por dia e protesto dormindo.", score: "greg" },
            { text: "Repouso é para quem não tem milhas para gastar.", score: "porchat" },
            { text: "Fico olhando no espelho até cansar de ser lindo.", score: "joao" }
        ]
    },
    {
        q: "Se o mundo acabasse hoje, o que você faria?",
        a: [
            { text: "Postaria uma foto sem camisa com legenda poética.", score: "joao" },
            { text: "Estaria na Islândia fingindo que não é comigo.", score: "porchat" },
            { text: "Escreveria uma crônica culpando o neoliberalismo.", score: "greg" }
        ]
    },
    {
        q: "Qual sua maior habilidade inútil?",
        a: [
            { text: "Decorar o PIB de países que não existem.", score: "porchat" },
            { text: "Ter opinião sobre tudo sem ler nada (brincadeira... ou não).", score: "greg" },
            { text: "Harmonizar vinhos com whey protein.", score: "joao" }
        ]
    },
    {
        q: "Como você lida com críticas na internet?",
        a: [
            { text: "Block é vida, block é amor.", score: "tabet" },
            { text: "Faço um vídeo gritando com uma atendente imaginária.", score: "evelyn" },
            { text: "Choro no banho, mas em mansão.", score: "porchat" }
        ]
    },
    {
        q: "Para você, o que é um 'look casual'?",
        a: [
            { text: "Terno de linho e mocassim sem meia (no inverno).", score: "joao" },
            { text: "Camiseta de banda que eu não ouço e cabelo bagunçado.", score: "greg" },
            { text: "Roupa de safari, caso precise fugir do país.", score: "porchat" }
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
                "RESULTADO: VOCÊ É O JOÃO VICENTE! 💅\n(Diagnóstico: Excesso de auto-estima e fotos sem camisa. Procure um espelho.)",
                "RESULTADO: VOCÊ É O GREGÓRIO! 😴\n(Diagnóstico: Narcolepsia militante. Você dormiu durante esse quiz.)",
                "RESULTADO: VOCÊ É O FABIO PORCHAT! ✈️\n(Diagnóstico: Workaholic terminal. Você está lendo isso em um aeroporto?)",
                "RESULTADO: VOCÊ É O TABET! 🤨\n(Diagnóstico: Ceticismo crônico. Você odiou esse quiz e vai reclamar.)",
                "RESULTADO: VOCÊ É O ESTAGIÁRIO! ☠️\n(Diagnóstico: Indigente. Ninguém se importa com seu resultado.)"
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
                className="fixed bottom-36 left-4 bg-black text-white px-4 py-2 font-bold border-2 border-white hover:bg-white hover:text-black transition-colors z-[50] shadow-[4px_4px_0px_#ff0000] text-xs md:text-sm"
                style={{ touchAction: 'manipulation' }}
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
                            className="bg-white border-4 md:border-8 border-red-600 p-4 md:p-8 max-w-lg w-full relative shadow-[10px_10px_0px_#000] md:shadow-[20px_20px_0px_#000] max-h-[90vh] overflow-y-auto touch-pan-y"
                        >
                            {/* MOBILE-FRIENDLY CLOSE BUTTON */}
                            <button
                                onClick={reset}
                                className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 flex items-center justify-center hover:bg-red-600 hover:text-white border-2 border-black transition-colors bg-white active:scale-95"
                                aria-label="Fechar quiz"
                            >
                                <X size={28} />
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
