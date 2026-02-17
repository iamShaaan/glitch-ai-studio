import { HeroSection } from "@/components/sections/hero";
import { GlitchText } from "@/components/ui/glitch-text";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    <GlitchText text="ESTABLISH CONNECTION" />
                </h1>
                <p className="text-slate-400 text-lg mb-12">
                    Our neural network is currently receiving high traffic.
                    <br />Please use the Career portal for recruitment inquiries.
                </p>

                <div className="p-8 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-emerald-400 text-xl font-mono">
                        comm_link: offline
                    </p>
                    <p className="text-slate-500 mt-2">
                        Please email: protocol@glitch.ai
                    </p>
                </div>
            </div>
        </div>
    );
}
