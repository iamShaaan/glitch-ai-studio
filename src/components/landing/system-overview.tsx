"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UserSquare2, Sparkles, Network, CheckCircle2 } from "lucide-react";

const phases = [
  {
    label: "PHASE 01",
    title: "We Build Your Avatar",
    description:
      "We train a hyper-realistic AI version of you using your video, voice, and photos. Different looks, outfits, and angles. Your real voice. Ready to speak.",
    outcome: "Your avatar is ready",
    icon: UserSquare2,
    accent: "#26f7b2",
    hover:
      "hover:border-[#26f7b2]/50 hover:bg-[#26f7b2]/[0.05] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.45)]",
  },
  {
    label: "PHASE 02",
    title: "We Build Your Content Machine",
    description:
      "We train your brand style into a custom AI editing system. You submit a script, the system generates and edits a fully branded video automatically.",
    outcome: "30 days of content in 24 hours",
    icon: Sparkles,
    accent: "#26f7b2",
    hover:
      "hover:border-[#26f7b2]/50 hover:bg-[#26f7b2]/[0.05] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.5)]",
  },
  {
    label: "PHASE 03",
    title: "We Connect Everything",
    description:
      "Optional add-ons available after Phases 1 and 2. Auto-publish to all platforms, lead automation through DM triggers, and a website avatar agent that talks to visitors.",
    outcome: "Fully automated brand presence",
    icon: Network,
    accent: "#009d9a",
    hover:
      "hover:border-[#009d9a]/50 hover:bg-[#009d9a]/[0.06] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(0,157,154,0.5)]",
  },
];

export function SystemOverview() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="system-overview"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0b2430_0%,#060d11_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#26f7b2]/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#26f7b2]" />
            <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">
              The System
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            How The System Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
            Three phases. One outcome. Your business posts daily without you ever picking up a camera.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {phases.map((phase, index) => {
            const cardClasses = `group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all duration-300 ease-out ${phase.hover} overflow-hidden`;
            const content = (
              <>
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, transparent, ${phase.accent}, transparent)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{
                    background: `radial-gradient(ellipse at center, ${phase.accent}33, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300"
                    style={{
                      background: `${phase.accent}1a`,
                      boxShadow: `0 0 0 0 ${phase.accent}00`,
                    }}
                  >
                    <phase.icon
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: phase.accent }}
                    />
                  </div>

                  <span
                    className="text-[11px] font-bold tracking-[0.2em] mb-3"
                    style={{ color: phase.accent, opacity: 0.8 }}
                  >
                    {phase.label}
                  </span>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed mb-5 flex-1">
                    {phase.description}
                  </p>

                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border self-start"
                    style={{
                      borderColor: `${phase.accent}33`,
                      background: `${phase.accent}10`,
                    }}
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5"
                      style={{ color: phase.accent }}
                    />
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: phase.accent }}
                    >
                      {phase.outcome}
                    </span>
                  </div>
                </div>
              </>
            );

            return isMobile ? (
              <div key={index} className={cardClasses}>
                {content}
              </div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
                className={cardClasses}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
