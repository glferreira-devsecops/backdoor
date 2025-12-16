"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shuffle, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

const TOPICS = [
    // DILEMAS MODERNOS
    "A morte da TV Aberta",
    "Gente que anda devagar na calçada",
    "A ética de comer uva no mercado",
    "Influenciadores de LinkedIn",
    "O cheiro de hospital",
    "Medo de aranha vs. Medo de boleto",
    "Fofoca de gente morta (Chico Xavier)",
    "A volta da pochete: Estilo ou Desistência?",
    "Chuca: Tabu ou Higiene Básica?",
    "Podcast de True Crime para dormir",
    "A gourmetização do pão na chapa",
    "Traumas de infância com palhaços de festa",
    "A solidão do goleiro de society",
    "Reforma ortográfica: Pra quê 'ideia' sem acento?",
    "O conceito de 'Cringe' para quem tem 30+",
    "Famosos que parecem que cheiram a queijo",
    "Brigadeiro de whey: Crime Gastronômico",
    "Coach quântico que reprograma DNA",
    "A obsessão branca por Pêra-Uva",
    "Será que o Porchat grita por dentro?",
    "Por que todo calvo usa boné da New Era?",
    "O mistério da meia que some na máquina",
    "Adulto usando Crocs em reunião de board",
    "Namoro vs. CLT: Qual humilha mais?",
    "A vida sexual triste dos pandas",
    "Barulho de moto: compensação fálica?",
    "A ditadura do 'Good Vibes Only'",
    "Veganos que comem bacon escondido no hotel",
    "Áudio de 5 minutos no WhatsApp: Pode matar?",
    "Pessoas que aplaudem o pôr do sol no Arpoador",
    "Aprender mandarim por pressão do pai rico",
    "Crossfit: Seita, Esporte ou Lesão?",
    "Onde os pombos morrem? (Teoria da Conspiração)",
    "Medo irracional de ventilador de teto cair",
    "Quem inventou a reunião que poderia ser e-mail?",
    "A farsa do 'trabalhe enquanto eles dormem'",
    "Nudes não solicitados: Crime ou Castigo?",
    "O submundo dos grupos de condomínio",
    "Sapatênis: O calçado da derrota masculina",
    "Cerveja artesanal com gosto de sabão e ipa",
    "Astrologia para cachorros (Meu pug é de leão)",
    "O primo rico que vende Hinode",
    "Férias com a família: Lazer ou Penitência?",
    "A gourmetização do podre (Vinho Natural)",
    "Séries que ninguém viu mas todo mundo finge que viu",
    "O trauma do EAD e a câmera fechada",
    "Pessoas que falam 'gratiluz' não ironicamente",
    "O preço do azeite: O novo Bitcoin",
    "Fila de banco como experiência antropológica",
    "A vida secreta dos motoristas de Uber",

    // PORTA DOS FUNDOS SPECIFIC
    "O Joanete do João Vicente: Patrimônio Histórico?",
    "Gregório dormindo em velório de parente distante",
    "A risada da Evelyn Castro como arma sônica",
    "Porchat comprando países pequenos no débito",
    "O Estagiário que virou CEO por engano",
    "Rafael Portugal: Humano ou Muppet?",
    "Fazer 'publi' de jogo do tigrinho é ético?",
    "O Fantasma do Natal Passado (que votou errado)",
    "Peçanha e a brutalidade policial recreativa",
    "Dona Helena e a sexualidade na terceira idade",
    "Jesus voltândo e sendo cancelado no Twitter",
    "Moises abrindo o Mar Vermelho pra passar jet ski",
    "Deus é brasileiro e está de ressaca",
    "O Diabo pedindo demissão por burnout"
];

export function TopicGenerator() {
    const [topic, setTopic] = useState("CLIQUE PARA GERAR UM TEMA");
    const [isSpinning, setIsSpinning] = useState(false);

    const generateTopic = () => {
        setIsSpinning(true);
        let count = 0;
        const interval = setInterval(() => {
            // Simple random shuffle for visual effect
            setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
            count++;
            if (count > 25) {
                clearInterval(interval);
                setIsSpinning(false);
                // Final selection: Ensure it's not the same as before (simple check)
                let newTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
                while (newTopic === topic) {
                    newTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
                }
                setTopic(newTopic);
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
                        className="bg-[#00ff00] text-black font-black text-lg md:text-2xl px-8 py-4 md:px-16 md:py-6 uppercase border-4 border-black hover:bg-white hover:text-red-600 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 md:gap-4 mx-auto shadow-[4px_4px_0px_black] md:shadow-[8px_8px_0px_black] min-h-[56px]"
                    >
                        <Shuffle className={`w-6 h-6 md:w-8 md:h-8 ${isSpinning ? "animate-spin" : ""}`} />
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
