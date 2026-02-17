"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ConsultationModal } from "./consultation-modal";
import { ParticleNetwork } from "@/components/ui/particle-network";

export function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">

                {/* Background - Elegant Gradient + Particles */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />
                <ParticleNetwork
                    className="opacity-40"
                    particleColor="rgba(52, 211, 153, 0.4)" // Emerald-400
                    lineColor="rgba(52, 211, 153, 0.1)"
                    particleCount={60}
                    interactionRadius={200}
                    speed={0.4}
                />

                {/* Subtle spotlight effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl mx-auto space-y-8"
                    >

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
                            Scale Your Presence <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-cyan-200">
                                Without Saying a Word.
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                            We build hyper-realistic <strong className="text-slate-200 font-semibold">AI Clones</strong> of you and your brand.
                            Automate your social media, immortalize your expertise, and engage your audience 24/7.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8"
                        >
                            <Link
                                href="/services"
                                className="px-8 py-4 bg-white text-slate-950 text-lg font-semibold rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2"
                            >
                                Initialize Your AI Clone <ArrowRight className="w-5 h-5" />
                            </Link>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-4 text-slate-300 hover:text-white text-lg font-medium transition-colors hover:underline underline-offset-4"
                            >
                                Book a Consultation
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
