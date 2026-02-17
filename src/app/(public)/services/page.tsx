"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock, Video, Cpu, Share2, TrendingUp, Code, User, Bot } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
                        <GlitchText text="SERVICE_PROTOCOL" />
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Select your entry point. Unlock the ecosystem.
                    </p>
                </div>

                {/* Entry Points */}
                <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
                    {/* Service A: AI Twin */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="group relative bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <User className="w-32 h-32 text-emerald-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <User className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">AI Twin Creation</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                A 1:1 digital clone of real humans. We capture your voice, mannerisms, and likeness to create a high-fidelity digital replica that can scale your presence infinitely.
                            </p>
                            <ul className="space-y-3 mb-8 text-slate-300">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    Photorealistic visual likeness
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    Voice cloning & synthesis
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    Interactive capabilities
                                </li>
                            </ul>
                            <Link
                                href="https://www.fiverr.com/s/WEWZkdB"
                                target="_blank"
                                className="inline-flex items-center justify-center w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                            >
                                Work with us on Fiverr <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Service B: AI Character */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group relative bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Bot className="w-32 h-32 text-cyan-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="bg-cyan-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Bot className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">AI Character Creation</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Bespoke AI influencers and mascots designed from scratch. Perfect for brands needing a controllable, on-brand digital representative that captures imagination.
                            </p>
                            <ul className="space-y-3 mb-8 text-slate-300">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                    Custom styling & aesthetics
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                    Brand-aligned personality
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                    Multi-platform ready
                                </li>
                            </ul>
                            <Link
                                href="https://www.fiverr.com/s/WEWZkdB"
                                target="_blank"
                                className="inline-flex items-center justify-center w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            >
                                Work with us on Fiverr <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Exclusive Services */}
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Lock className="w-6 h-6 text-slate-500" />
                        <h2 className="text-2xl font-bold text-slate-500">Advanced Studio Ecosystem</h2>
                        <div className="h-px bg-slate-800 flex-1" />
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-4"
                    >
                        {[
                            { icon: Video, title: "AI Content Production", desc: "Short-form & Social" },
                            { icon: Cpu, title: "Automation Systems", desc: "AI-Driven Workflows" },
                            { icon: Share2, title: "Social Media Mgmt", desc: "Strategy & Growth" },
                            { icon: TrendingUp, title: "Performance Marketing", desc: "Ads & SEO" },
                            { icon: Code, title: "Custom AI Development", desc: "Apps & Solutions" },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-500 group"
                            >
                                <div className="bg-slate-800/50 p-3 rounded-lg mb-4 group-hover:bg-slate-800 transition-colors">
                                    <service.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-semibold text-slate-300 mb-1 group-hover:text-white transition-colors">{service.title}</h3>
                                <p className="text-sm text-slate-500">{service.desc}</p>
                            </motion.div>
                        ))}

                        {/* Consultation Card */}
                        <motion.div
                            variants={item}
                            className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center"
                        >
                            <p className="text-sm text-slate-400 mb-3">Unlock full access</p>
                            <Link href="/contact" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded transition-colors flex items-center gap-2">
                                <Lock className="w-3 h-3" />
                                Existing Clients Only
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
