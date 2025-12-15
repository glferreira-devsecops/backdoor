"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FootCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block mix-blend-difference"
            animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="h-8 w-8 rounded-full border-2 border-[var(--accent-pink)] bg-white/10 backdrop-blur-sm" />
        </motion.div>
    );
};
