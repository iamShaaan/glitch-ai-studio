"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Globe, Layers, Mic, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: "01",
        title: "Discovery Protocol",
        description: "Deep-dive analysis of your personal brand, voice, and strategic objectives.",
        icon: Search,
        color: "text-blue-400",
        border: "group-hover:border-blue-500/50",
        bg: "group-hover:bg-blue-500/10"
    },
    {
        id: "02",
        title: "Neural Blueprint",
        description: "Architecting the AI model tailored to your specific communication style.",
        icon: Layers,
        color: "text-indigo-400",
        border: "group-hover:border-indigo-500/50",
        bg: "group-hover:bg-indigo-500/10"
    },
    {
        id: "03",
        title: "Biometric Synthesis",
        description: "High-fidelity voice cloning and visual avatar generation.",
        icon: Mic,
        color: "text-purple-400",
        border: "group-hover:border-purple-500/50",
        bg: "group-hover:bg-purple-500/10"
    },
    {
        id: "04",
        title: "Knowledge Transfer",
        description: "Ingesting your content, beliefs, and expertise into the model's memory.",
        icon: Cpu,
        color: "text-pink-400",
        border: "group-hover:border-pink-500/50",
        bg: "group-hover:bg-pink-500/10"
    },
    {
        id: "05",
        title: "System Integration",
        description: "Deploying your Digital Twin across selected platforms and CRMs.",
        icon: Zap,
        color: "text-emerald-400",
        border: "group-hover:border-emerald-500/50",
        bg: "group-hover:bg-emerald-500/10"
    },
    {
        id: "06",
        title: "Alpha Testing",
        description: "Rigorous testing of responses, tone, and autonomous capabilities.",
        icon: CheckCircle2,
        color: "text-teal-400",
        border: "group-hover:border-teal-500/50",
        bg: "group-hover:bg-teal-500/10"
    },
    {
        id: "07",
        title: "Global Scale",
        description: "Your digital self operates 24/7, engaging audiences worldwide.",
        icon: Globe,
        color: "text-cyan-400",
        border: "group-hover:border-cyan-500/50",
        bg: "group-hover:bg-cyan-500/10"
    },
];

export function ProcessSection() {
    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Circuit Patterns Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PROTOCOL</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Our proprietary 7-step methodology to digitize your consciousness.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative group bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                                step.border,
                                index === steps.length - 1 ? "md:col-span-2 lg:col-span-3 xl:col-span-1" : "" // Make last item span on smaller screens if needed to balance
                            )}
                        >
                            {/* Hover Gradient Background */}
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-slate-900/50 pointer-events-none")} />

                            {/* Decorative Corner Lines */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-700/30 group-hover:border-white/20 transition-colors rounded-tl-xl" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-700/30 group-hover:border-white/20 transition-colors rounded-br-xl" />


                            <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-lg", step.bg, "bg-slate-800")}>
                                <step.icon className={cn("w-7 h-7", step.color)} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                                <span className={cn("text-sm font-mono opacity-50", step.color)}>{step.id} //</span>
                                {step.title}
                            </h3>

                            <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
