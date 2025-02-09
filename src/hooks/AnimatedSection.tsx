"use client";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
    children?: React.ReactNode;
}
export default function AnimatedSection({ children }: AnimatedSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }} // Départ en bas avec opacité 0
            whileInView={{ opacity: 3, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }} // Animation fluide
            viewport={{ once: false }}
        >
            {children}
        </motion.section>
    );
}
