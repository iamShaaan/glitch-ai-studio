"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Globe, Layers, Mic, Search, Zap } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Discovery Protocol",
        description: "Deep-dive analysis of your personal brand, voice, and strategic objectives.",
        icon: Search,
    },
    {
        id: 2,
        title: "Neural Blueprint",
        description: "Architecting the AI model tailored to your specific communication style.",
        icon: Layers,
    },
    {
        id: 3,
        title: "Biometric Synthesis",
        description: "High-fidelity voice cloning and visual avatar generation.",
        icon: Mic,
    },
    {
        id: 4,
        title: "Knowledge Transfer",
        description: "Ingesting your content, beliefs, and expertise into the model's memory.",
        icon: Cpu,
    },
    {
        id: 5,
        title: "System Integration",
        description: "Deploying your Digital Twin across selected platforms and CRMs.",
        icon: Zap,
    },
    {
        id: 6,
        title: "Alpha Testing",
        description: "Rigorous testing of responses, tone, and autonomous capabilities.",
        icon: CheckCircle2,
    },
    {
        id: 7,
        title: "Global Scale",
        description: "Your digital self operates 24/7, engaging audiences worldwide.",
        icon: Globe,
    },
];

export function ProcessSection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">THE <span className="text-emerald-500">PROTOCOL</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Our proprietary 7-step methodology to digitize your consciousness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 text-emerald-500 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all">
                                <step.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                <span className="text-emerald-500 mr-2">0{step.id}.</span>
                                {step.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
