"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export function PorchatListener() {
    const [listening, setListening] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const askForPermission = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setListening(true);
                setShowToast(true);
                // Auto hide toast after 5s
                setTimeout(() => setShowToast(false), 5000);
            } catch {
                setPermissionDenied(true);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 5000);
            }
        };

        // Randomly ask for permission after 5 seconds
        const timer = setTimeout(() => {
            askForPermission();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {showToast && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-black border-2 border-[#00ff00] text-[#00ff00] p-4 flex items-center gap-4 shadow-[4px_4px_0px_#00ff00] max-w-sm w-[90%]"
                >
                    <div className={`p-2 rounded-full ${listening ? 'bg-red-600 animate-pulse' : 'bg-gray-800'}`}>
                        <Mic className="text-white" />
                    </div>
                    <div>
                        <h4 className="font-black uppercase text-sm">
                            {listening ? "GRAVAÇÃO INICIADA" : (permissionDenied ? "ACESSO NEGADO" : "ALERTA")}
                        </h4>
                        <p className="font-mono text-xs text-white">
                            {listening
                                ? "O Porchat está ouvindo suas desculpas. Tudo será usado no tribunal."
                                : "Você recusou? O Porchat sabe onde você mora. (Mentira, ele não sabe de nada)."}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
