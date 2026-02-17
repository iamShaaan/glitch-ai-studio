"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Crown } from "lucide-react";

const trustItems = [
    { icon: Globe, label: "Global Reach" },
    { icon: Lock, label: "Secure Data" },
    { icon: Crown, label: "Founder-Led Studio" },
];

export function TrustBar() {
    return (
        <section className="py-10 bg-slate-950 border-b border-slate-900 relative z-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-8 md:gap-24 items-center">
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                            className="flex items-center gap-3 text-slate-400 font-medium text-sm md:text-base tracking-wide"
                        >
                            <item.icon className="w-5 h-5 text-emerald-500/80" />
                            <span className="opacity-80 uppercase tracking-widest">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
