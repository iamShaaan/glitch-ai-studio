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
                            Don't just take our word for it. See why <span className="text-white font-semibold">50+ brands</span> trust us to build their digital legacy.
                            Explore our portfolio of high-performing AI implementations.
                        </p>

                        <div className="flex flex-col items-center gap-6 mt-4">
                            <a
                                href="https://www.fiverr.com/soumitrohalder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-emerald-600 text-white font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    VIEW PORTFOLIO & REVIEWS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>

                            <div className="flex items-center gap-3 text-sm font-medium animate-fade-in-up">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-slate-400">
                                            <span className="text-amber-400">★</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-slate-400">
                                    <span className="text-white font-bold">5.0/5.0 Rating</span> on Fiverr
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
