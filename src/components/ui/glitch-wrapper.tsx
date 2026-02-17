"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function GlitchWrapper({ children, className, delay = 0 }: GlitchWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{
                duration: 0.4,
                delay,
                ease: "circOut"
            }}
            className={cn("relative z-10", className)}
        >
            {children}
        </motion.div>
    );
}
