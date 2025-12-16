"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";

export function NihilistCookies() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay appearance to annoy the user slightly
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = (action: string) => {
        console.log(`User clicked '${action}'. Spoiler: Não importa.`);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    className="fixed bottom-0 left-0 w-full z-[99999] p-4 flex justify-center pointer-events-none"
                >
                    <div className="bg-[#C0C0C0] border-t-4 border-l-4 border-t-white border-l-white border-r-4 border-b-4 border-r-black border-b-black text-black p-1 max-w-2xl w-full shadow-[10px_10px_0px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="bg-blue-800 text-white p-2 font-bold flex flex-col items-center justify-center min-w-[80px]">
                            <Cookie className="animate-spin-slow mb-1" />
                            <span className="text-[10px] uppercase">Cookies.exe</span>
                        </div>

                        <div className="flex-1 text-xs md:text-sm font-mono leading-tight">
                            <p className="font-bold mb-2 uppercase">POLÍTICA DE PRIVACIDADE NIILISTA:</p>
                            <p>
                                Nós usamos cookies? Talvez. Eles rastreiam? Provavelmente.
                                A gente se importa com seus dados? <span className="text-red-600 font-bold bg-black px-1">NÃO IMPORTA.</span>
                                Ao clicar em qualquer botão, você concorda que o universo é indiferente à sua navegação.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <button
                                onClick={() => handleAction("Aceitar")}
                                className="bg-[#C0C0C0] border-t-2 border-l-2 border-t-white border-l-white border-r-2 border-b-2 border-r-black border-b-black px-4 py-1 active:border-t-black active:border-l-black active:border-r-white active:border-b-white hover:bg-gray-300 transition-colors text-xs font-bold uppercase"
                            >
                                Aceitar (Não muda nada)
                            </button>
                            <button
                                onClick={() => handleAction("Recusar")}
                                className="bg-[#C0C0C0] border-t-2 border-l-2 border-t-white border-l-white border-r-2 border-b-2 border-r-black border-b-black px-4 py-1 active:border-t-black active:border-l-black active:border-r-white active:border-b-white hover:bg-gray-300 transition-colors text-xs font-bold uppercase"
                            >
                                Recusar (Somos teimosos)
                            </button>
                        </div>

                        {/* MOBILE-FRIENDLY CLOSE BUTTON */}
                        <button
                            onClick={() => handleAction("Fechar")}
                            className="absolute -top-2 -right-2 md:top-1 md:right-1 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center bg-red-600 text-white border-2 border-black hover:bg-red-700 active:scale-95"
                            aria-label="Fechar aviso de cookies"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
