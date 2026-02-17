"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";
import { useState } from "react";
import { ConsultationModal } from "./consultation-modal";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
                {/* Dynamic Background - Subtler */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <AnimatedGridPattern
                        numSquares={20}
                        maxOpacity={0.05}
                        duration={4}
                        repeatDelay={1}
                        className={cn(
                            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                        )}
                    />
                </div>

                {/* Radial Gradient Overlay for depth */}
                <div className="absolute inset-0 z-0 bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-medium mb-4 backdrop-blur-sm tracking-widest"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            SYSTEM V2.0 // ONLINE
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
                            <span className="block mb-2 text-slate-300">
                                SCALE YOUR
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[size:200%] animate-gradient-x pb-2">
                                <GlitchText text="AUTHORITY" />
                            </span>
                        </h1>

                        <p className="max-w-xl mx-auto text-lg text-slate-400 leading-relaxed font-light tracking-wide">
                            Stop trading time for influence. We build hyper-realistic <span className="text-emerald-400 font-semibold">AI Clones</span> that automate your interactions and immortalize your legacy.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group relative px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-widest overflow-hidden transition-all clip-path-polygon"
                                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    INITIALIZE CLONE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <Link
                                href="/services"
                                className="px-8 py-3 text-slate-400 hover:text-white text-sm tracking-widest transition-colors hover:underline underline-offset-4"
                            >
                                VIEW PROTOCOLS
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
