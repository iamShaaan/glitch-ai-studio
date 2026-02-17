"use client";

import { GlitchWrapper } from "@/components/ui/glitch-wrapper";
import { GlitchText } from "@/components/ui/glitch-text";
import { motion } from "framer-motion";

export function ClientVault() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
            <GlitchWrapper className="max-w-4xl w-full text-center">
                <div className="mb-2 text-emerald-500 font-mono text-sm tracking-widest animate-pulse">
          /// SECURE CONNECTION ESTABLISHED
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                    <GlitchText text="CLIENT VAULT" />
                </h1>

                <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
                    Biometric Identity Verified. Welcome to your digital twin command center.
                    <br />Access restricted to authorized personnel only.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left w-full">
                    <VaultCard
                        title="Digital Persona"
                        status="ACTIVE"
                        description="Manage voice models, visuals, and behavior patterns."
                        statusColor="text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                    />
                    <VaultCard
                        title="Asset Library"
                        status="SYNCED"
                        description="Access generated content, raw files, and training data."
                        statusColor="text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                    />
                </div>
            </GlitchWrapper>
        </div>
    );
}

function VaultCard({ title, status, description, statusColor }: { title: string, status: string, description: string, statusColor: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl backdrop-blur-md hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all cursor-pointer group shadow-lg"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors tracking-tight">{title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-mono border ${statusColor}`}>{status}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
}
