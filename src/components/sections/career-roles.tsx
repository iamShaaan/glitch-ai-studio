"use client";

import { GlitchText } from "@/components/ui/glitch-text";
import { Video, Palette, Share2, Bot, Globe } from "lucide-react";

const ROLES = [
    {
        title: "AI Video Architect",
        icon: Video,
        description: "Expert in traditional editing (Premiere/DaVinci) intensified by AI tools like HeyGen, Runway, and Pika. You don't just edit; you generate.",
        tags: ["Runway", "HeyGen", "Premiere Pro"]
    },
    {
        title: "Generative Graphic Designer",
        icon: Palette,
        description: "Control the latent space. Specialized in Midjourney, DALL-E 3, and Photoshop Generative Fill to create stunning visual identities.",
        tags: ["Midjourney", "DALL-E 3", "Photoshop"]
    },
    {
        title: "AI Social Media Strategist",
        icon: Share2,
        description: "Data-driven growth hacking. You use AI to automate community management, analyze trends, and distribute content at scale.",
        tags: ["Analytics", "Automation", "Content Strategy"]
    },
    {
        title: "AI Automation Engineer",
        icon: Bot,
        description: "The architect of efficiency. Skilled in Make.com, Zapier, and Python to build the internal neural network of our studio.",
        tags: ["Make.com", "Python", "Zapier"]
    }
];

export function CareerRoles() {
    return (
        <section id="open-roles" className="py-24 bg-slate-950">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-3 py-1 border border-indigo-500/30 rounded-full bg-indigo-500/10">
                        <span className="text-indigo-400 text-xs font-mono flex items-center gap-2">
                            <Globe className="w-3 h-3" /> GLOBAL / REMOTE
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Open <GlitchText text="Protocol" /> Roles
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Requirement: <span className="text-emerald-400 font-bold">AI-NATIVE</span>.
                        We don't care about years of experience. We care about your ability to leverage AI to 10x your output.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ROLES.map((role, index) => (
                        <div key={index} className="group relative bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <div className="flex items-start justify-between mb-6">
                                <div className="bg-slate-800 p-3 rounded-xl group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                                    <role.icon className="w-8 h-8" />
                                </div>
                                <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded">
                                    REMOTE
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                {role.title}
                            </h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {role.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {role.tags.map((tag, i) => (
                                    <span key={i} className="text-xs font-medium text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
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
