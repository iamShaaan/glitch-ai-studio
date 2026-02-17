"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >


                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-white">
                        <span className="block glitch-subtle" data-text="IMMORTALIZE">IMMORTALIZE</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            YOUR <GlitchText text="IDENTITY" />
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        We build hyper-realistic Digital Twins that scale your presence,
                        automate your interactions, and future-proof your legacy.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/apply"
                            className="group relative px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg overflow-hidden transition-all hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                START THE PROTOCOL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            href="/portal"
                            className="px-8 py-4 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-all"
                        >
                            CLIENT ACCESS
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
