"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ConsultationModal } from "./consultation-modal";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { GlitchText } from "@/components/ui/glitch-text";

export function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Listen for custom event to open consultation modal from other components
    useState(() => {
        if (typeof window !== 'undefined') {
            const handleOpen = () => setIsModalOpen(true);
            window.addEventListener('open-consultation', handleOpen);
            return () => window.removeEventListener('open-consultation', handleOpen);
        }
    });

    return (
        <>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">

                {/* Background - Elegant Gradient + Particles */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />
                <ParticleNetwork
                    className="opacity-30"
                    particleColor="rgba(52, 211, 153, 0.3)" // Emerald-400
                    lineColor="rgba(52, 211, 153, 0.05)"
                    particleCount={50}
                    interactionRadius={200}
                    speed={0.3}
                />

                {/* Subtle spotlight effect - Static & High-end */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl mx-auto space-y-10"
                    >
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
                                Scale Your <span className="text-emerald-400">Presence</span> <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-cyan-200">
                                    Without Saying a Word.
                                </span>
                            </h1>

                            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 leading-relaxed font-light text-balance">
                                We help world-class leaders and brands build hyper-realistic <strong className="text-white font-semibold">AI Clones</strong>.
                                Automate your scale, immortalize your expertise, and own your digital future.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                        >
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-10 py-5 bg-emerald-500 text-slate-950 text-xl font-bold rounded-full hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 transform hover:scale-105 active:scale-95"
                            >
                                Book a Strategy Consultation <ArrowRight className="w-6 h-6" />
                            </button>

                            <Link
                                href="/services"
                                className="px-10 py-5 bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-white text-lg font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 group"
                            >
                                Explorer Services
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
