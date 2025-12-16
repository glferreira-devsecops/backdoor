"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mic, X } from "lucide-react";
import { useEffect, useState } from "react";

export function PorchatListener() {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Show fake toast after 5 seconds (no mic permission needed)
        const timer = setTimeout(() => setShowToast(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-hide after 8 seconds
    useEffect(() => {
        if (showToast) {
            const hideTimer = setTimeout(() => setShowToast(false), 8000);
            return () => clearTimeout(hideTimer);
        }
    }, [showToast]);

    return (
        <AnimatePresence>
            {showToast && (
                <motion.div
                    initial={{ y: -100, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -100, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="fixed top-16 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-md"
                >
                    <div className="bg-black border-4 border-[#00ff00] text-[#00ff00] p-4 flex items-start gap-4 shadow-[6px_6px_0px_#00ff00] relative">
                        {/* CLOSE BUTTON - MOBILE FRIENDLY */}
                        <button
                            onClick={() => setShowToast(false)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-[#00ff00] hover:text-black border border-[#00ff00] transition-colors active:scale-95"
                            aria-label="Fechar notificação"
                        >
                            <X size={16} />
                        </button>

                        <div className="p-2 rounded-full bg-red-600 animate-pulse shrink-0">
                            <Mic className="text-white w-5 h-5" />
                        </div>
                        <div className="pr-8">
                            <h4 className="font-black uppercase text-sm md:text-base mb-1">
                                🎙️ GRAVAÇÃO INICIADA
                            </h4>
                            <p className="font-mono text-xs md:text-sm text-white leading-snug">
                                O Porchat está ouvindo suas desculpas. Tudo será usado no tribunal.
                            </p>
                            <p className="font-mono text-[10px] text-gray-500 mt-2 italic">
                                (Mentira. Não temos acesso ao seu microfone.)
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

