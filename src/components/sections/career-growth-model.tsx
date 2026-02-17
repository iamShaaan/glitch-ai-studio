"use client";

import { GlitchText } from "@/components/ui/glitch-text";
import { Zap, ShieldCheck, Award } from "lucide-react";

const STEPS = [
    {
        title: "The 3-Month Sprint",
        description: "A rigorous paid internship where you receive industry-leading AI training and direct mentorship from our core team. Prove your worth.",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20"
    },
    {
        title: "The 2-Year Tenure",
        description: "Upon successful completion, you enter a guaranteed 2-year contract. We invest in your skills; you invest your talent in our vision.",
        icon: ShieldCheck,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20"
    },
    {
        title: "AI Pioneer Status",
        description: "Graduate as a fully-fledged AI-Native professional, capable of leveraging tools to 10x output and lead future projects.",
        icon: Award,
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        border: "border-indigo-400/20"
    }
];

export function CareerGrowthModel() {
    return (
        <section className="py-24 bg-slate-950 border-t border-slate-900">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
                        The <GlitchText text="3+2 Accelerator" /> Program
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        We define a new standard for professional development. Our model is designed to transform
                        promising talent into elite industry leaders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -z-10" />

                    {STEPS.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className={`
                                h-full p-8 rounded-2xl border backdrop-blur-sm bg-slate-900/50 
                                hover:bg-slate-900 transition-all hover:-translate-y-1
                                ${step.border}
                            `}>
                                <div className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center mb-6 
                                    ${step.bg} ${step.color}
                                `}>
                                    <step.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
