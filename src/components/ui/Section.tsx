"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

export const Section = ({ children, className, delay = 0, id }: SectionProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={clsx("relative w-full py-24", className)}
        >
            {children}
        </motion.section>
    );
};
