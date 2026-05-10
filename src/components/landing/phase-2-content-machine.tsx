"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FileText,
  Cpu,
  Mail,
  CheckCircle2,
  Palette,
  Clock,
  DollarSign,
} from "lucide-react";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";

const workflow = [
  {
    step: "01",
    icon: FileText,
    title: "You Submit a Script",
    body: "Fill out a simple form with your script. Submit. Walk away. Run it as many times as you want.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Automation Runs",
    body: "Each video takes around 10 minutes to generate. You can queue multiple runs. The system never sleeps.",
  },
  {
    step: "03",
    icon: Mail,
    title: "Video Delivered",
    body: "Receive your finished video via email, Google Drive, or directly to your video editor. You only work on the script.",
  },
];

interface ComparisonCard {
  label: string;
  videoId: string;
  videoTitle: string;
  caption: string;
  cost: string;
  time: string;
  accent: "neutral" | "warning" | "success";
}

const comparisons: ComparisonCard[] = [
  {
    label: "01 — RAW AI OUTPUT",
    videoId: "aXbgpnhTfgg",
    videoTitle: "Raw AI output",
    caption: "What the automation generates before any editing.",
    cost: "Included",
    time: "10 min",
    accent: "neutral",
  },
  {
    label: "02 — HUMAN EDITOR",
    videoId: "KnoybkyEQ2U",
    videoTitle: "Human editor",
    caption: "The same content edited by a human video editor.",
    cost: "$35 per video",
    time: "3 hours",
    accent: "warning",
  },
  {
    label: "03 — GLITCH AI SYSTEM",
    videoId: "v5JXYqrnvH0",
    videoTitle: "Glitch AI system",
    caption: "The same content edited by our automated brand system.",
    cost: "$15 per video",
    time: "10 min",
    accent: "success",
  },
];

const accentMap = {
  neutral: {
    border: "border-white/[0.08]",
    label: "text-slate-300",
    chipBorder: "border-white/10",
    chipBg: "bg-white/[0.03]",
    chipText: "text-slate-300",
    glow: "",
    hover:
      "hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(255,255,255,0.15)]",
  },
  warning: {
    border: "border-[#fcd34d]/25",
    label: "text-[#fcd34d]",
    chipBorder: "border-[#fcd34d]/25",
    chipBg: "bg-[#fcd34d]/[0.06]",
    chipText: "text-[#fcd34d]",
    glow: "shadow-[0_0_40px_rgba(252,211,77,0.08)]",
    hover:
      "hover:border-[#fcd34d]/55 hover:bg-[#fcd34d]/[0.05] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(252,211,77,0.45)]",
  },
  success: {
    border: "border-[#26f7b2]/35",
    label: "text-[#26f7b2]",
    chipBorder: "border-[#26f7b2]/30",
    chipBg: "bg-[#26f7b2]/[0.08]",
    chipText: "text-[#26f7b2]",
    glow: "shadow-[0_0_50px_rgba(38,247,178,0.12)]",
    hover:
      "hover:border-[#26f7b2]/65 hover:bg-[#26f7b2]/[0.07] hover:-translate-y-1 hover:shadow-[0_15px_70px_-15px_rgba(38,247,178,0.6)]",
  },
};

export function Phase2ContentMachine() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="phase-2" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0b2430_0%,#060d11_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#26f7b2]/[0.03] blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#26f7b2]/15 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#26f7b2]">
              PHASE 02
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Your Content Machine
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed px-4">
            Once your avatar is trained, we build the automated system around it. You submit a script. The system delivers a finished branded video to your inbox or Google Drive.
          </p>
        </div>

        {/* Workflow row */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
          {workflow.map((item, index) => {
            const cardClasses =
              "group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all duration-300 ease-out hover:border-[#26f7b2]/50 hover:bg-[#26f7b2]/[0.05] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.45)] overflow-hidden";
            const content = (
              <>
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#26f7b2] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(38,247,178,0.2),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#26f7b2]/80 group-hover:text-[#26f7b2] transition-colors duration-300">
                      STEP {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#26f7b2]/10 border border-[#26f7b2]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#26f7b2]/25 group-hover:border-[#26f7b2]/50 group-hover:shadow-[0_0_25px_rgba(38,247,178,0.4)] transition-all duration-300">
                      <item.icon className="w-5 h-5 text-[#26f7b2]" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed">
                    {item.body}
                  </p>
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

        {/* Objection: I still need an editor? */}
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-xl md:text-3xl font-black tracking-tight text-[#f87171] mb-2.5">
            Wait, I still need an editor for this?
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            No. You don&apos;t. We thought of that. We built an AI editing system that learns your brand.
          </p>
        </div>

        {/* Brand training expanded card */}
        {(() => {
          const cardClasses =
            "relative glass rounded-3xl p-5 md:p-8 border border-[#26f7b2]/15 bg-gradient-to-br from-[#26f7b2]/[0.04] to-transparent mb-10 md:mb-16 overflow-hidden";
          const cardBody = (
            <>
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#26f7b2]/40 to-transparent" />
              <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                <div className="w-12 h-12 rounded-2xl bg-[#26f7b2]/10 border border-[#26f7b2]/25 flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-[#26f7b2]" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
                    We Train Your Brand Style
                  </h4>
                  <p className="text-slate-300 text-[13px] md:text-sm leading-relaxed">
                    We feed our system your existing brand assets: previous scripts, voiceover scripts, brand colors, animation style, custom icons, and brand guidelines. Then we build a custom AI editing system around your brand. It handles color contrast, motion design, sound effects, and visual consistency automatically. Every video looks like your brand. Every time. We can even change motion philosophy each month so your content stays fresh without you doing the work.
                  </p>
                </div>
              </div>
            </>
          );

          return isMobile ? (
            <div className={cardClasses}>{cardBody}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cardClasses}
            >
              {cardBody}
            </motion.div>
          );
        })()}

        {/* See The Difference */}
        <div className="text-center mb-10 md:mb-14">
          <h3 className="text-xl md:text-3xl font-black tracking-tight text-white mb-2.5">
            See The Difference
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            The same content, three different ways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
          {comparisons.map((c, index) => {
            const accent = accentMap[c.accent];
            const cardClasses = `group relative rounded-3xl border ${accent.border} bg-white/[0.02] p-4 md:p-5 ${accent.glow} ${accent.hover} transition-all duration-300 ease-out`;
            const content = (
              <>
                <div className="mb-4">
                  <span
                    className={`text-[10px] md:text-xs font-bold tracking-[0.2em] ${accent.label}`}
                  >
                    {c.label}
                  </span>
                </div>
                <YouTubeEmbed
                  videoId={c.videoId}
                  title={c.videoTitle}
                  className="mb-4"
                />
                <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed mb-4">
                  {c.caption}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${accent.chipBorder} ${accent.chipBg}`}
                  >
                    <DollarSign className={`w-3.5 h-3.5 ${accent.chipText}`} />
                    <span className={`text-[11px] font-semibold ${accent.chipText}`}>
                      {c.cost}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${accent.chipBorder} ${accent.chipBg}`}
                  >
                    <Clock className={`w-3.5 h-3.5 ${accent.chipText}`} />
                    <span className={`text-[11px] font-semibold ${accent.chipText}`}>
                      {c.time}
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

        {/* Phase 2 result */}
        {(() => {
          const resultClasses =
            "relative glass rounded-3xl p-5 md:p-8 border border-[#26f7b2]/20 bg-gradient-to-br from-[#26f7b2]/[0.05] to-transparent text-center overflow-hidden";
          const resultBody = (
            <>
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#26f7b2]/40 to-transparent" />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#26f7b2]/30 bg-[#26f7b2]/10 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#26f7b2]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#26f7b2]">
                  PHASE 02 RESULT
                </span>
              </div>
              <h3 className="text-xl md:text-3xl font-black tracking-tight text-white mb-2.5">
                Your Brand Visual Style And Automation Are Ready
              </h3>
              <p className="text-slate-300 text-[13px] md:text-sm leading-relaxed max-w-2xl mx-auto">
                You now have a system that delivers 30 days of fully branded content in 24 hours. Just provide scripts. We can even train a custom GPT to write those for you.
              </p>
            </>
          );

          return isMobile ? (
            <div className={resultClasses}>{resultBody}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={resultClasses}
            >
              {resultBody}
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
