"use client";

import { useEffect } from "react";

const ROASTS = [
    "%c PARE DE OLHAR O CONSOLE ",
    "%c Seu histórico do navegador é mais sujo que esse código.",
    "%c Você inspeciona elemento ou só copia da Vercel?",
    "%c O estagiário programou isso melhor que você.",
    "%c Procurando erros? Já olhou no espelho?",
    "%c Se você ler isso, deve me um PIX.",
    "%c undefined is not a function (mentira, é só pra te assustar).",
    "%c Acha que vai achar a senha do cartão do Porchat aqui?",
    "%c Seu 'commit fix' não engana ninguém.",
    "%c Vai codar ou ficar olhando div alheia?",
    "%c Cuidado: Esse site roda no servidor da Xuxa.",
    "%c 404: Sua competência not found.",
    "%c Eu vejo você. O Zuckerberg também.",
    "%c CSS é fácil, difícil é aguentar sua gerência.",
    "%c Saia do console e vá tocar grama."
];

const STYLES = [
    "background: red; color: white; font-size: 24px; font-weight: bold; padding: 10px; border: 4px solid black;",
    "color: #00ff00; font-family: monospace; font-size: 14px;",
    "color: yellow; font-family: comic sans ms; font-size: 16px; background: black; padding: 4px;",
    "color: hotpink; font-weight: bold; font-size: 18px; text-decoration: underline;",
    "background: black; color: white; border: 2px dashed red; padding: 5px;"
];

export function ConsoleRoast() {
    useEffect(() => {
        // Clear previous junk if any (optional, but aggressive)
        // console.clear();

        // Log the main warning
        console.log(ROASTS[0], STYLES[0]);

        // Log random insults with random delays
        ROASTS.slice(1).forEach((roast, i) => {
            setTimeout(() => {
                const style = STYLES[Math.floor(Math.random() * STYLES.length)];
                console.log(roast, style);
            }, 1000 + (i * 500)); // Staggered release of chaos
        });

        // The ultimate passive-aggressive warning
        window.addEventListener('resize', () => {
            if (window.outerWidth - window.innerWidth > 160) {
                console.log("%c FECHA ESSE DEVTOOLS, CURIOSO!", "background: yellow; color: black; font-size: 30px;");
            }
        });

    }, []);

    return null; // This component renders nothing visible
}
