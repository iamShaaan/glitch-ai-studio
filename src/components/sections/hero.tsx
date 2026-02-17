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
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950">
                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <AnimatedGridPattern
                        numSquares={30}
                        maxOpacity={0.1}
                        duration={3}
                        repeatDelay={1}
                        className={cn(
                            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                        )}
                    />
                </div>

                {/* Radial Gradient Overlay for depth */}
                <div className="absolute inset-0 z-0 bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />


                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            SYSTEM ONLINE v2.0
                        </motion.div>

                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none">
                            <span className="block mb-2 group relative">
                                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></span>
                                <GlitchText text="IMMORTALIZE" className="relative z-10" />
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-emerald-200 to-slate-200 bg-[size:200%] animate-gradient-x">
                                YOUR IDENTITY
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light tracking-wide">
                            We build hyper-realistic <span className="text-emerald-400 font-semibold">Digital Twins</span> that scale your presence,
                            automate your interactions, and future-proof your legacy.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                            <Link
                                href="/services"
                                className="group relative px-8 py-4 bg-emerald-600/90 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-emerald-500 clip-path-polygon"
                                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="relative z-10 flex items-center gap-3 tracking-widest text-sm">
                                    INITIATE PROTOCOL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-4 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-500/50 bg-slate-900/50 backdrop-blur-sm transition-all tracking-widest text-sm relative group overflow-hidden"
                            >
                                <span className="absolute inset-0 w-full h-full bg-emerald-500/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                <span className="relative z-10">BOOK CONSULTATION</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
