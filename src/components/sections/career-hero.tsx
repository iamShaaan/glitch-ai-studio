"use client";

import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchWrapper } from "@/components/ui/glitch-wrapper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CareerHero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                <GlitchWrapper>
                    <div className="inline-block mb-4 px-3 py-1 border border-emerald-500/30 rounded-full bg-emerald-500/10 backdrop-blur-sm">
                        <span className="text-emerald-400 text-xs font-mono tracking-wider">JOIN THE VANGUARD</span>
                    </div>
                </GlitchWrapper>

                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6 tracking-tight">
                    Build the Future<br />
                    of <GlitchText text="Identity" className="glitch-subtle" />
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Glitch AI Studio is looking for visionaries to join our global, remote-first team.
                    We don’t just hire professionals; we build <span className="text-white font-medium">AI Pioneers</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="#open-roles"
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                        VIEW OPEN ROLES
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
