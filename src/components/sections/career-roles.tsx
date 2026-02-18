"use client";

import { GlitchText } from "@/components/ui/glitch-text";
import { Video, Palette, Share2, Bot, Globe } from "lucide-react";

const ROLES = [
    {
        title: "AI Video Architect",
        icon: Video,
        description: "Expert in any video editing tools. Good with short form content, hooks, and CTA. Experienced in AI image, video, and audio generation. Skilled in captioning, following brand colors/fonts, and maintaining brand consistency.",
        tags: ["Video Editing", "Short Form", "AI Generation", "Brand Strategy"]
    },
    {
        title: "Generative Graphic Designer",
        icon: Palette,
        description: "Must know CANVA. Expert in image generation with any tool, image prompting, and design theory.",
        tags: ["Canva", "Image Generation", "Design Theory", "Prompting"]
    },
    {
        title: "AI Social Media Strategist",
        icon: Share2,
        description: "Skilled in AI tools for content (Gemini, GPT, Grok). Expertise in task automation, ManyChat or similar tools. Up-to-date with algorithm updates. Able to design landing pages and product carousels.",
        tags: ["Content AI", "Automation", "ManyChat", "Landing Pages"]
    },
    {
        title: "AI Automation Engineer",
        icon: Bot,
        description: "Expert in n8n. Proficient with Gemini and Google AI Studio. Knowledge of Firebase, Cloud Console, and IDE platforms like Antigravity or Cursor. Capable of creating at least basic landing pages.",
        tags: ["n8n", "Google AI Studio", "Firebase", "Cloud Console"]
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
