"use client";

import { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { ConsultationModal } from "./consultation-modal";

export function CTASection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <section className="py-32 bg-slate-950 relative overflow-hidden flex items-center justify-center min-h-[50vh]">

                <div className="absolute inset-0 z-0">
                    <AnimatedGridPattern
                        numSquares={15}
                        maxOpacity={0.05}
                        duration={4}
                        repeatDelay={1}
                        className={cn(
                            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                        )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 mb-6 animate-pulse text-xs tracking-widest">
                            <Zap className="w-3 h-3 fill-emerald-500" />
                            <span>LIMITED CAPACITY</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter leading-tight">
                            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[size:200%] animate-gradient-x">TRANSCEND?</span>
                        </h2>

                        <p className="max-w-xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed font-light">
                            The queue for digital immortality is growing. <br className="hidden md:block" />
                            Secure your legacy before the network reaches capacity.
                        </p>

                        <div className="flex flex-col items-center gap-4 mt-8">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-slate-950 font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(16,185,129,0.4)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    BOOK CONSULTATION <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-emerald-400/0 group-hover:bg-emerald-400/20 transition-colors" />
                            </button>

                            <a
                                href="https://www.fiverr.com/soumitrohalder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium mt-4"
                            >
                                <span className="flex items-center gap-1 text-amber-400">
                                    <span className="fill-amber-400">★★★★★</span>
                                    <span className="text-slate-300 group-hover:text-white transition-colors">50+ 5-Star Reviews</span>
                                </span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                <span>Top Rated on Fiverr</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
