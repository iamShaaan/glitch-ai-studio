"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function CTASection() {
    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden flex items-center justify-center min-h-[60vh]">

            <div className="absolute inset-0 z-0">
                <AnimatedGridPattern
                    numSquares={20}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold mb-8 animate-pulse">
                        <Zap className="w-4 h-4 fill-emerald-500" />
                        <span>LIMITED CAPACITY PROTOCOL</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-tight">
                        READY TO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[size:200%] animate-gradient-x">
                            TRANSCEND?
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
                        The queue for digital immortality is growing. <br className="hidden md:block" />
                        Secure your legacy before the network reaches capacity.
                    </p>

                    <Link
                        href="/apply"
                        className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-slate-950 font-black text-xl rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(16,185,129,0.5)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            INITIATE UPLOAD <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-emerald-400/0 group-hover:bg-emerald-400/20 transition-colors" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
