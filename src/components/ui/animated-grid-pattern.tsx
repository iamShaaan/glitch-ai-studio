"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedGridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: any;
    numSquares?: number;
    className?: string;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
}

export function AnimatedGridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 50,
    className,
    maxOpacity = 0.5,
    duration = 4,
    repeatDelay = 0.5,
    ...props
}: AnimatedGridPatternProps) {
    const id = useRef(`pattern-${Math.random().toString(36).substr(2, 9)}`).current;

    // Generate random squares for the "glitch" effect
    const squares = useRef<{ id: number; pos: [number, number] }[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const generateSquares = () => {
                const newSquares = [];
                for (let i = 0; i < numSquares; i++) {
                    newSquares.push({
                        id: i,
                        pos: [
                            Math.floor(Math.random() * 20), // x grid pos
                            Math.floor(Math.random() * 20), // y grid pos
                        ] as [number, number],
                    });
                }
                squares.current = newSquares;
            };
            generateSquares();
        }
    }, [numSquares]);


    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
            <svg x={x} y={y} className="overflow-visible">
                {squares.current.map(({ pos: [x, y], id }, index) => (
                    <motion.rect
                        initial={{ opacity: 0 }}
                        animate={{ opacity: maxOpacity }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            delay: index * 0.1,
                            repeatType: "reverse",
                        }}
                        onAnimationComplete={() => {
                            // Reroll position on complete for randomness
                            // In a real implementation we'd need state, but for pure visual noise
                            // fixed positions fading in/out is often enough.
                        }}
                        key={`${x}-${y}-${index}`}
                        width={width - 1}
                        height={height - 1}
                        x={x * width + 1}
                        y={y * height + 1}
                        fill="currentColor"
                        strokeWidth="0"
                    />
                ))}
            </svg>
        </svg>
    );
}
