"use client";

import { ArrowRight, CheckCircle } from "lucide-react";

const CAL_LINK =
  "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-36 bg-white dark:bg-[#0a0a0c] overflow-hidden flex flex-col items-center justify-center text-center border-b border-zinc-200 dark:border-[#262933] transition-colors"
    >
      {/* Faint Monolithic Studio Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] dark:opacity-[0.03]">
        <span className="font-anton text-[160px] sm:text-[240px] md:text-[320px] uppercase text-zinc-900 dark:text-white tracking-[0.035em] leading-none whitespace-nowrap">
          GLITCH STUDIO
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-center gap-6">
        {/* Top Active Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-600 text-white dark:bg-[#c3f400] dark:text-[#161e00] font-mono-tech text-[10px] uppercase tracking-wider font-bold shadow-md dark:shadow-[0_0_20px_rgba(195,244,0,0.3)]">
          <span>⚡ READY TO SCALE YOUR CONTENT STRATEGY?</span>
        </div>

        {/* Monolithic Title */}
        <h2 className="font-anton text-lg min-[380px]:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.035em] text-zinc-900 dark:text-white leading-none whitespace-nowrap">
          LEVERAGE YOUR CONTENT STRATEGY WITH AI
        </h2>

        {/* Subtitle */}
        <p className="font-space text-xs md:text-sm text-zinc-600 dark:text-[#a1a1aa] font-normal max-w-xl leading-relaxed tracking-wide">
          From custom avatars and autonomous video agents to high-converting AI ads and viral UGC. Work 100% directly with Soumitro Halder Shan — solopreneur. Scale your brand without camera crews, middlemen, or bloated agency fees.
        </p>

        {/* Giant Call to Action Trigger */}
        <div className="pt-3">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#c3f400] dark:hover:bg-[#d4ff1a] dark:text-[#161e00] font-anton text-base sm:text-lg uppercase tracking-[0.035em] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg dark:shadow-[0_0_40px_rgba(195,244,0,0.4)]"
          >
            <span>Book 15-Min Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-6 font-mono-tech text-[10px] tracking-wider text-zinc-600 dark:text-[#a1a1aa]">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-[#c3f400]" />
            100% Commercial IP Rights
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-[#c3f400]" />
            7-Day Fast Track Delivery
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-[#c3f400]" />
            No Long-Term Contracts
          </span>
        </div>
      </div>
    </section>
  );
}
