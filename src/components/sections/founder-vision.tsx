"use client";

import { motion } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchWrapper } from "@/components/ui/glitch-wrapper";
import { ArrowRight, Database, Server, GitBranch } from "lucide-react";
import Link from "next/link";

export function FounderVisionSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* LEFT COLUMN: Image & Visuals */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                        className="relative"
                    >
                        <GlitchWrapper>
                            <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-emerald-500/20 bg-slate-900 group">
                                {/* Placeholder for Headshot - Replace src with actual image */}
                                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600">
                                    <span className="text-lg">Founder Image Placeholder</span>
                                </div>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                {/* Animated Glitch Overlay */}
                                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono mb-2">
                                        SYSTEM_ARCHITECT
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Shan</h3>
                                    <p className="text-slate-400 text-sm">Full-Stack AI Engineer</p>
                                </div>
                            </div>
                        </GlitchWrapper>

                        {/* Decorative Elements */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* RIGHT COLUMN: Content */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                        className="space-y-10"
                    >
                        {/* 1. Visionary Section */}
                        <div className="space-y-6">
                            <motion.h4 variants={itemVariants} className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">
                                The Visionary
                            </motion.h4>
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-tight">
                                <GlitchText text="The Architect Behind the Glitch." />
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-lg text-slate-300 leading-relaxed">
                                I am a professional full-stack web developer and AI automation expert dedicated to redefining digital presence. My mission with Glitch AI Studio is to give founders and visionaries their most valuable asset back: <span className="text-emerald-400 font-semibold">Time</span>.
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-lg text-slate-300 leading-relaxed">
                                By building high-fidelity AI Twins and bespoke automation ecosystems, I help you scale your influence without sacrificing your humanity.
                            </motion.p>
                        </div>

                        {/* 2. Why I Built This */}
                        <div className="pl-6 border-l-2 border-emerald-500/30 space-y-4">
                            <motion.h3 variants={itemVariants} className="text-xl font-bold text-white">
                                Why I Built This
                            </motion.h3>
                            <motion.p variants={itemVariants} className="text-slate-400 leading-relaxed">
                                I provide end-to-end AI automation services designed for those who lead. Having worked with diverse clients—from legal and immigration firms like Belgravia Advisory to emerging tech startups—I saw a recurring bottleneck: the founder is the best spokesperson but has the least time to film. <span className="text-white">Glitch AI Studio is the solution to that paradox.</span>
                            </motion.p>
                        </div>

                        {/* 3. Professional Pedigree */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                                Technical Infrastructure
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                                    <div className="p-2 bg-black rounded">
                                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black font-bold text-[10px]">N</div>
                                    </div>
                                    <span className="text-slate-300 font-medium">Next.js 14</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                                    <div className="p-2 bg-black rounded text-yellow-500">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-300 font-medium">Google Firebase</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                                    <div className="p-2 bg-black rounded text-white">
                                        <GitBranch className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-300 font-medium">GitHub CI/CD</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                                    <div className="p-2 bg-black rounded text-white">
                                        <Server className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-300 font-medium">Vercel Edge</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                We aren&apos;t just a content agency; we are a technical studio building secure, scalable digital assets.
                            </p>
                        </motion.div>

                        {/* 4. Personal Connect */}
                        <motion.div variants={itemVariants} className="pt-8 border-t border-slate-800/50">
                            <h3 className="text-2xl font-bold mb-6">Let’s Build Your Digital Future.</h3>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded transition-colors group">
                                Connect with Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-8 font-handwriting text-3xl text-emerald-500/80 -rotate-2">
                                Shan
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
