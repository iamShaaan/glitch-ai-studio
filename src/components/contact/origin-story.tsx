"use client";

import { GlitchText } from "@/components/ui/glitch-text";
import { Terminal, Code2, Cpu, Database, Layers } from "lucide-react";
import { CopyButton } from "./copy-button";

export function OriginStory() {
    return (
        <div className="h-full flex flex-col justify-center max-w-xl">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        FROM <span className="text-emerald-500">CODE</span> TO <span className="text-indigo-500">CREATION.</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-emerald-500/30 pl-6">
                        Glitch AI Studio didn't start as a content agency; it started as a technical solution to a human problem.
                        As a professional full-stack developer, I saw the friction founders faced when trying to scale their digital presence.
                    </p>
                </div>

                {/* Narrative */}
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm">
                    <p className="text-slate-300 leading-relaxed mb-4">
                        I combined my background in web architecture with my passion for AI automation to build a studio that handles the
                        <span className="text-white font-semibold"> 'Glitch'</span> in content production, allowing visionaries to stay in their zone of genius.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        <SkillBadge icon={Code2} label="Full-Stack Dev" />
                        <SkillBadge icon={Cpu} label="AI Automation" />
                        <SkillBadge icon={Database} label="System Arch" />
                    </div>
                </div>

                {/* Dual Expertise */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors">
                            <Layers className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-white font-bold mb-1">AI Content Specialist</h3>
                        <p className="text-slate-500 text-sm">Master of high-fidelity digital twins and visual storytelling.</p>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors">
                            <Terminal className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="text-white font-bold mb-1">Automation Architect</h3>
                        <p className="text-slate-500 text-sm">Building the backend systems that make content production effortless.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SkillBadge({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <span className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-mono border border-slate-700">
            <Icon className="w-3 h-3 text-emerald-500" />
            {label}
        </span>
    );
}
