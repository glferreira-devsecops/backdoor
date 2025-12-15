"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

// Custom Cursor Component - Optimized for Performance
export function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cursorScale = useMotionValue(1);
    const cursorRotate = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('.cursor-help') ||
                target.closest('.cursor-pointer') ||
                target.closest('.cursor-grab')
            ) {
                cursorScale.set(2.5);
                cursorRotate.set(45);
            } else {
                cursorScale.set(1);
                cursorRotate.set(0);
            }
        };

        window.addEventListener("mousemove", updateMouse);
        window.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", updateMouse);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY, cursorScale, cursorRotate]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
            style={{
                x: cursorX,
                y: cursorY,
                scale: cursorScale,
                rotate: cursorRotate
            }}
        >
            <motion.div className="relative">
                <div className="w-4 h-4 bg-[#00ff00] rounded-full border-2 border-black" />

                {/* LABUBU EARS (Decoration) */}
                <div className="absolute -top-3 -left-1 w-2 h-4 bg-[#00ff00] rotate-[-15deg] border border-black rounded-t-full" />
                <div className="absolute -top-3 -right-1 w-2 h-4 bg-[#00ff00] rotate-[15deg] border border-black rounded-t-full" />
            </motion.div>
        </motion.div>
    );
}
