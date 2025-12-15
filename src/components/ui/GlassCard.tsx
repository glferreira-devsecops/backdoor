"use client";

import clsx from "clsx";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    className?: string;
    variant?: "pink" | "green" | "default";
}

export const GlassCard = ({ className, variant = "default", children, ...props }: GlassCardProps) => {
    const variants = {
        default: "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]",
        pink: "border-[rgba(255,42,109,0.3)] bg-[rgba(255,42,109,0.05)]",
        green: "border-[rgba(5,217,232,0.3)] bg-[rgba(5,217,232,0.05)]",
    };

    return (
        <motion.div
            className={clsx(
                "rounded-2xl border backdrop-blur-xl p-6 shadow-xl",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
