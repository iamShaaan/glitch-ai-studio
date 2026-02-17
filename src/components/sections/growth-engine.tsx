"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Globe,
    Wallet,
    Languages,
    BrainCircuit,
    Star,
    Repeat,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const benefits = [
    {
        title: "Infinite Scalability",
        description: "Your AI Avatar can film 1,000 videos in the time it takes you to film one. Scale your content without scaling your effort.",
        icon: Zap,
        color: "text-amber-400",
        bg: "group-hover:bg-amber-400/10",
        border: "group-hover:border-amber-400/50"
    },
    {
        title: "24/7 Global Presence",
        description: "Break time zones. Your AI Influencer engages with audiences in London, New York, and Tokyo simultaneously, while you sleep.",
        icon: Globe,
        color: "text-blue-400",
        bg: "group-hover:bg-blue-400/10",
        border: "group-hover:border-blue-400/50"
    },
    {
        title: "Eliminate Production Costs",
        description: "No more expensive camera gear, lighting setups, or studio rentals. Your digital studio is always open and perfectly lit.",
        icon: Wallet,
        color: "text-emerald-400",
        bg: "group-hover:bg-emerald-400/10",
        border: "group-hover:border-emerald-400/50"
    },
    {
        title: "Multilingual Authority",
        description: "Reach a global market instantly. Your AI Clone can speak over 29 languages with perfect fluency and your natural tone.",
        icon: Languages,
        color: "text-pink-400",
        bg: "group-hover:bg-pink-400/10",
        border: "group-hover:border-pink-400/50"
    },
    {
        title: "Immortalize Your Expertise",
        description: "Capture your knowledge and likeness forever. Build a digital legacy that continues to educate and inspire for generations.",
        icon: BrainCircuit,
        color: "text-purple-400",
        bg: "group-hover:bg-purple-400/10",
        border: "group-hover:border-purple-400/50"
    },
    {
        title: "Consistent Brand Quality",
        description: "Human energy fluctuates; AI doesn't. Your Avatar delivers a perfect, high-energy performance every single time.",
        icon: Star,
        color: "text-yellow-400",
        bg: "group-hover:bg-yellow-400/10",
        border: "group-hover:border-yellow-400/50"
    },
    {
        title: "Instant Content Pivot",
        description: "Need to change your script or offer? Don't re-shoot. Simply update the text and generate a new high-quality video in minutes.",
        icon: Repeat,
        color: "text-cyan-400",
        bg: "group-hover:bg-cyan-400/10",
        border: "group-hover:border-cyan-400/50"
    },
    {
        title: "Ownership & Control",
        description: "Unlike human influencers, you own your AI character's IP entirely. No contracts, no scandals, no unpredictable departures.",
        icon: ShieldCheck,
        color: "text-red-400",
        bg: "group-hover:bg-red-400/10",
        border: "group-hover:border-red-400/50"
    },
];

export function GrowthEngineSection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                            The <span className="text-emerald-400">Growth Engine</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Strategies to immortalize your legacy and scale your authority.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className={cn(
                                "group relative p-6 bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                                item.border
                            )}
                        >
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-slate-900/50 pointer-events-none")} />

                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 bg-slate-800/50", item.bg)}>
                                <item.icon className={cn("w-6 h-6", item.color)} />
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-50 transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                >
                    <Link
                        href="/services"
                        className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 group"
                    >
                        Start Your Transformation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
