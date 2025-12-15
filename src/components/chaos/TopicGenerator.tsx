"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shuffle, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

const TOPICS = [
    "A morte da TV Aberta", "Gente que anda devagar na calçada", "A ética de comer uva no mercado",
    "Influenciadores de LinkedIn", "O cheiro de hospital", "Medo de aranha vs. Medo de boleto",
    "Fofoca de gente morta", "A volta da pochete", "Chuca: Tabu ou Higiene?", "Podcast de True Crime",
    "A gourmetização do pão na chapa", "Traumas de infância com palhaços", "A solidão do goleiro",
    "Reforma ortográfica: Pra quê?", "O conceito de 'Cringe'", "Famosos que parecem que cheiram mal",
    "Brigadeiro de whey", "Coach quântico", "A obsessão por Pêra-Uva", "Será que o Porchat grita por dentro?",
    "Por que todo calvo usa boné?", "O mistério da meia que some na máquina", "Adulto usando Crocs em público",
    "Namoro vs. CLT: Qual humilha mais?", "A vida sexual dos pandas", "Barulho de moto: compensação de algo?",
    "A ditadura do 'Positividade Tóxica'", "Veganos que comem bacon escondido", "Áudio de 5 minutos no WhatsApp",
    "Pessoas que aplaudem o pôr do sol", "Aprender mandarim por pressão social", "Crossfit: Seita ou Esporte?",
    "Onde os pombos morrem?", "Medo irracional de ventilador de teto cair", "Quem inventou a reunião que poderia ser e-mail?",
    "A farsa do 'trabalhe enquanto eles dormem'", "Nudes não solicitados: Crime ou Castigo?", "O submundo dos grupos de condomínio",
    "Sapatênis: O calçado da derrota", "Cerveja artesanal com gosto de sabão", "Astrologia para cachorros",
    "O primo rico que vende Hinode", "Férias com a família: Lazer ou Penitência?", "A gourmetização do podre",
    "Séries que ninguém viu mas todo mundo finge que viu", "O trauma do EAD", "Pessoas que falam 'gratiluz'",
    "O preço do azeite", "Fila de banco como experiência antropológica", "A vida secreta dos motoristas de Uber"
];

export function TopicGenerator() {
    const [topic, setTopic] = useState("CLIQUE PARA GERAR UM TEMA");
    const [isSpinning, setIsSpinning] = useState(false);

    const generateTopic = () => {
        setIsSpinning(true);
        let count = 0;
        const interval = setInterval(() => {
            setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
            count++;
            if (count > 25) {
                clearInterval(interval);
                setIsSpinning(false);
            }
        }, 40);
    };

    return (
        <section className="bg-black text-[#00ff00] py-20 border-y-8 border-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

            <div className="container px-4 text-center relative z-10">
                <div className="inline-block bg-[#00ff00] text-black px-4 py-1 font-black uppercase mb-8 rotate-[-2deg] shadow-[4px_4px_0px_white]">
                    Utilidade Pública
                </div>

                <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter flex justify-center items-center gap-4">
                    <Zap className="animate-pulse text-yellow-500" /> GERADOR DE PAUTA <Zap className="animate-pulse text-yellow-500" />
                </h2>
                <p className="font-mono text-gray-400 mb-12 max-w-xl mx-auto">
                    Para quando o Gregório esquecer o tema (sempre) ou o João Vicente precisar fingir que estudou o assunto.
                </p>

                <div className="max-w-4xl mx-auto bg-[#222] border-8 border-double border-[#00ff00] p-8 md:p-12 shadow-[12px_12px_0px_#fff] relative group transition-transform hover:scale-[1.01]">
                    {/* Machine UI details */}
                    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 animate-pulse delay-75"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-yellow-500 animate-ping"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-yellow-500 animate-ping delay-75"></div>

                    <motion.div
                        key={topic}
                        initial={{ scale: 0.9, opacity: 0.5, filter: "blur(4px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        className="text-2xl md:text-5xl font-black uppercase mb-8 min-h-[1.5em] flex items-center justify-center text-center leading-tight glitch-text border-b-2 border-gray-700 pb-4"
                    >
                        {topic}
                    </motion.div>

                    <button
                        onClick={generateTopic}
                        disabled={isSpinning}
                        className="bg-[#00ff00] text-black font-black text-2xl px-16 py-6 uppercase border-4 border-black hover:bg-white hover:text-red-600 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4 mx-auto shadow-[8px_8px_0px_black]"
                    >
                        <Shuffle className={`w-8 h-8 ${isSpinning ? "animate-spin" : ""}`} />
                        {isSpinning ? "RODANDO..." : "GIRE A ROLETA"}
                    </button>

                    <div className="mt-8 flex justify-center gap-4 text-xs font-mono opacity-50 uppercase tracking-widest">
                        <span className="flex items-center gap-2 text-yellow-500"><Sparkles size={14} /> 100% Aleatório</span>
                        <span className="flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Risco de Cancelamento: ALTO</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
