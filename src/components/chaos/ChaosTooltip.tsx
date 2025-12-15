"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface ChaosTooltipProps {
    children: ReactNode;
    content: string;
    side?: "top" | "right" | "bottom" | "left";
    variant?: "info" | "warning" | "danger";
}

const VARIANTS = {
    info: "bg-black text-white border-white shadow-[4px_4px_0px_#00ff00]",
    warning: "bg-yellow-400 text-black border-black shadow-[4px_4px_0px_black]",
    danger: "bg-red-600 text-white border-black shadow-[4px_4px_0px_white]",
};

export function ChaosTooltip({ children, content, side = "top", variant = "info" }: ChaosTooltipProps) {
    const [open, setOpen] = useState(false);

    return (
        <TooltipPrimitive.Provider delayDuration={200}>
            <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
                <TooltipPrimitive.Trigger asChild>
                    <div className="inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                        {children}
                    </div>
                </TooltipPrimitive.Trigger>
                <AnimatePresence>
                    {open && (
                        <TooltipPrimitive.Portal forceMount>
                            <TooltipPrimitive.Content side={side} sideOffset={5} asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={clsx(
                                        "z-50 px-3 py-2 text-xs font-bold font-mono uppercase tracking-widest border-2 max-w-[200px] text-center",
                                        VARIANTS[variant]
                                    )}
                                >
                                    {content}
                                    <TooltipPrimitive.Arrow className={clsx("fill-current", variant === 'info' ? 'text-black' : variant === 'warning' ? 'text-yellow-400' : 'text-red-600')} />
                                </motion.div>
                            </TooltipPrimitive.Content>
                        </TooltipPrimitive.Portal>
                    )}
                </AnimatePresence>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
