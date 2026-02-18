"use client";

import { Video, Palette, Share2, Bot, Globe, CheckCircle2 } from "lucide-react";

const ROLES = [
    {
        title: "AI Video Architect",
        icon: Video,
        description: "Expert in any video editing tools. Specialist in short-form content, hooks, and high-conversion CTAs. Advanced experience in AI image, video, and audio generation (Runway, Pika, ElevenLabs).",
        tags: ["Runway", "ElevenLabs", "Short Form", "Hooks"]
    },
    {
        title: "Generative Graphic Designer",
        icon: Palette,
        description: "Must be a CANVA power user. Expert in image generation (Midjourney/DALL-E 3), image prompting, and core design theory for mass-market assets.",
        tags: ["Canva", "Midjourney", "DALL-E 3", "Design Theory"]
    },
    {
        title: "AI Social Media Strategist",
        icon: Share2,
        description: "Master of AI content automation (Gemini, GPT, Grok). Expertise in ManyChat or equivalent tools. Always ahead of algorithm updates. Capable of landing page & carousel design.",
        tags: ["Gemini", "ManyChat", "Automation", "Carousels"]
    },
    {
        title: "AI Automation Engineer",
        icon: Bot,
        description: "Expert in n8n and Google AI Studio. Solid knowledge of Firebase, Google Cloud Console, and modern IDEs (Antigravity/Cursor). Ability to build functional landing pages.",
        tags: ["n8n", "Firebase", "Google AI Studio", "Cursor"]
    }
];

export function CareerRoles() {
    return (
        <section id="open-roles" className="py-24 bg-slate-950">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-3 py-1 border border-emerald-500/30 rounded-full bg-emerald-500/10">
                        <span className="text-emerald-400 text-xs font-mono flex items-center gap-2">
                            <Globe className="w-3 h-3" /> GLOBAL / REMOTE
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Open <span className="text-emerald-400">Position</span> Roles
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Requirement: <span className="text-white font-bold">AI-NATIVE</span>.
                        We don't care about years of experience. We care about your ability to leverage AI to 10x your output.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {ROLES.map((role, index) => (
                        <div key={index} className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                            <div className="flex items-start justify-between mb-8">
                                <div className="bg-slate-800/80 p-4 rounded-xl group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all duration-500">
                                    <role.icon className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> REMOTE-FIRST
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                                {role.title}
                            </h3>
                            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                                {role.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                                {role.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] font-semibold text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 group-hover:border-emerald-500/10 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

