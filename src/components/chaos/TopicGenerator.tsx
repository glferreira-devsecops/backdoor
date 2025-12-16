"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shuffle, Sparkles, Zap } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const TOPICS = [
    // DILEMAS MODERNOS ABSURDOS
    "Gente que anda devagar na calçada merece pena de morte?",
    "A ética de comer uva no mercado: Furto ou Degustação?",
    "Influenciadores de LinkedIn: Psicopatas ou Só Carentes?",
    "O cheiro de hospital é o perfume do capitalismo?",
    "Medo de aranha vs. Medo de boleto: Qual te paralisa?",
    "A volta da pochete: Estilo, Desistência ou Meia-Idade?",
    "Chuca: Tabu, Higiene Básica ou Filosofia de Vida?",
    "Podcast de True Crime para dormir: Saudável ou Psicopatia?",
    "Brigadeiro de whey: Crime Gastronômico ou Evolução?",
    "Coach quântico que reprograma DNA: Golpe ou Ciência?",
    "Por que todo calvo usa boné da New Era? Conspiração?",
    "O mistério da meia que some na máquina: Portal dimensional?",
    "Adulto usando Crocs em reunião de board: Coragem ou Demissão?",
    "Namoro vs. CLT: Qual exige mais humilhação?",
    "A vida sexual triste dos pandas: Depressão ou Preguiça?",
    "Barulho de moto alta: compensação fálica ou surdez?",
    "A ditadura do 'Good Vibes Only': Tóxico ou Necessário?",
    "Veganos que comem bacon escondido no hotel: Fracos ou Espertos?",
    "Áudio de 5 minutos no WhatsApp: Permitir ou Bloquear?",
    "Pessoas que aplaudem o pôr do sol: Cult ou Annoying?",
    "Crossfit: Seita, Esporte ou Mutilação Voluntária?",
    "Onde os pombos morrem? Teoria da Conspiração Urbana",
    "Medo irracional de ventilador de teto cair: Trauma ou Física?",
    "Reunião que poderia ser e-mail: Quem inventou isso?",
    "A farsa do 'trabalhe enquanto eles dormem'",
    "Nudes não solicitados: Crime, Castigo ou Estupidez?",
    "O submundo violento dos grupos de condomínio",
    "Sapatênis: O calçado oficial da derrota masculina",
    "Cerveja artesanal com gosto de sabão: Frescura ou Padrão?",
    "Astrologia para cachorros: Meu pug é de leão e latiu do nada",
    "O primo rico que vende Hinode: Amor ou Golpe Familiar?",
    "Férias com a família: Lazer, Penitência ou Trauma?",
    "O preço do azeite: O novo Bitcoin brasileiro",
    "Fila de banco às 10h da manhã: Experiência antropológica",
    "Motorista de Uber que conversa demais: Extrovertido ou Psicopata?",
    "Por que todo dentista pergunta coisas com a mão na sua boca?",
    "A obsessão nacional por Pêra-Uva-Maçã",
    "Gente que responde 'kkk' com um 'k' só: Ameaça velada?",
    "Café sem açúcar: Amadurecimento ou Sofrimento?",
    "Açaí com banana: Top 1 ou Preguiça culinária?",
    "Piada de tiozão no churrasco: Tradição ou Tortura?",
    "Reply All no e-mail corporativo: Deveria ser crime?",
    "Gente que fala 'não sou de beber' e bebe: Mitômano?",

    // PORTA DOS FUNDOS ESPECÍFICOS
    "O Joanete do João Vicente: Patrimônio Histórico Nacional?",
    "Gregório dormindo em velório: Falta de educação ou Narcolepsia?",
    "A risada da Evelyn Castro poderia quebrar vidros?",
    "Porchat comprando países pequenos no débito: Possível?",
    "O Estagiário que virou CEO por engano: Meritocracia?",
    "Rafael Portugal: Humano, Muppet ou Entidade?",
    "Publi de jogo do tigrinho: Ético ou Aposentadoria garantida?",
    "O Fantasma do Natal Passado que votou errado: Arrependimento?",
    "Peçanha e a brutalidade policial como comédia: Permitido?",
    "Dona Helena e a sexualidade na terceira idade: Tabu?",
    "Jesus voltando e sendo cancelado no Twitter: Timeline provável?",
    "Moisés abrindo o Mar Vermelho pra passar jet ski: Estilo?",
    "Deus é brasileiro e está de ressaca desde 2018",
    "O Diabo pedindo demissão por burnout: Justo?",
    "Pé de Porchat nota zero: João Vicente foi cruel?",
    "O grito do Porchat quebra equipamentos? Análise técnica",
    "Gregório atrasando 90min: Gera conteúdo ou é só preguiça?",
    "O cachorro Luís deveria ser CEO do Porta dos Fundos?",
    "DM de João Vicente: poesia erótica ou crime de constrangimento?",
    "Paula (da festa) superou o trauma do beijo forçado?",
    "Fani batendo a cabeça de Gregório no chapisco: Amor ou Violência?",
    "O salário do Estagiário é R$0,00: Exploração ou Experiência?",
    "Por que o Porchat não sabe o que é o Não Importa?",
    "Conjuntivite do Gregório: Real ou Desculpa Padrão?"
];

// Fisher-Yates shuffle for fair random distribution
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function TopicGenerator() {
    const [topic, setTopic] = useState("CLIQUE PARA GERAR UM TEMA");
    const [isSpinning, setIsSpinning] = useState(false);
    const shuffledTopicsRef = useRef<string[]>([]);
    const currentIndexRef = useRef(0);

    const getNextTopic = useCallback(() => {
        // If we've used all topics or haven't started, reshuffle
        if (currentIndexRef.current >= shuffledTopicsRef.current.length || shuffledTopicsRef.current.length === 0) {
            shuffledTopicsRef.current = shuffleArray(TOPICS);
            currentIndexRef.current = 0;
        }
        const nextTopic = shuffledTopicsRef.current[currentIndexRef.current];
        currentIndexRef.current++;
        return nextTopic;
    }, []);

    const generateTopic = () => {
        setIsSpinning(true);
        let count = 0;
        const interval = setInterval(() => {
            // Visual shuffle effect
            setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
            count++;
            if (count > 20) {
                clearInterval(interval);
                setIsSpinning(false);
                // Use Fisher-Yates shuffled topic (guaranteed non-repeat until all shown)
                setTopic(getNextTopic());
            }
        }, 50);
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
