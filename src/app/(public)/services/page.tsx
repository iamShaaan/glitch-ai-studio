"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock, Video, Cpu, Share2, TrendingUp, Code, User, Bot } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

const FiverrIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
    </svg>
);

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

                {/* Protocol Info Section */}
                <div className="max-w-4xl mx-auto mb-20 p-8 border border-emerald-500/30 bg-slate-900/80 rounded-2xl relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-50" />

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Lock className="w-6 h-6 text-emerald-400" />
                        PROTOCOL WORKFLOW & OWNERSHIP
                    </h3>

                    <div className="space-y-6 text-slate-300 leading-relaxed">
                        <p>
                            Before we proceed with the pricing, it is critical to clarify the workflow and requirements for AI Avatar creation. The process is divided into 2 distinct phases.
                        </p>

                        <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800">
                            <h4 className="text-emerald-400 font-semibold mb-3 uppercase tracking-wider text-sm">Phase 1: The Foundation</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 mt-1">▹</span> Create a character
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 mt-1">▹</span> Design & train the voice
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 mt-1">▹</span> Design & train a video avatar
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 mt-1">▹</span> Train a stylized avatar for visual storytelling (Optional)
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-2">Consistency & Intellectual Property</h4>
                            <p className="mb-4 text-sm md:text-base">
                                This phase is paramount for consistency and copyright. The avatar will be under control & copyrighted with the registered AI tools.
                            </p>
                            <ul className="space-y-2 text-sm md:text-base pl-4 border-l-2 border-slate-700">
                                <li className="mb-2">
                                    <strong className="text-white">Our Tools:</strong> If trained on our AI tools (HeyGen, ElevenLabs, etc.), it remains a proprietary asset managed by us to promote your brand.
                                </li>
                                <li>
                                    <strong className="text-white">Your Tools:</strong> If you possess your own AI tool licenses and share credentials, we can train the Avatar directly on your ecosystem, granting you full control. We can guide you through this workflow via a Google Meet call.
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                            <div>
                                <h4 className="text-white font-bold">Phase 1 Investment</h4>
                                <p className="text-sm text-slate-400">Avatar Training + 30sec Introduction Video</p>
                            </div>
                            <div className="text-3xl font-bold text-emerald-400">$200</div>
                        </div>
                        <p className="text-xs text-slate-500 text-center md:text-right mt-2">
                            This creates a digital asset you own—an enduring investment in AI.
                        </p>
                    </div>
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
                                href="https://www.fiverr.com/soumitrohalder"
                                target="_blank"
                                className="inline-flex items-center justify-center w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                            >
                                Work with us on Fiverr <FiverrIcon className="w-16 h-8 ml-2 -mt-1" />
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
                                href="https://www.fiverr.com/soumitrohalder"
                                target="_blank"
                                className="inline-flex items-center justify-center w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            >
                                Work with us on Fiverr <FiverrIcon className="w-16 h-8 ml-2 -mt-1" />
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
