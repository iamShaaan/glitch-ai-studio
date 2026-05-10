"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Sparkles, ArrowRight, Info, X } from "lucide-react";

const CAL_LINK = "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

const phaseCards = [
  {
    phase: "PHASE 01",
    title: "Avatar Training",
    price: "$250",
    priceSub: "One-time",
    includes: [
      "Trained AI avatar with multiple looks",
      "Cloned voice in your tone",
      "Different outfits, angles, presentation styles",
      "Full ownership of your avatar",
    ],
    cta: "Book a Call to Start",
    highlighted: false,
  },
  {
    phase: "PHASE 02",
    title: "Full System Setup",
    price: "$1,000",
    priceSub: "One-time",
    includes: [
      "Brand-trained AI editing system",
      "Custom motion and visual design",
      "Form-based video generation workflow",
      "Direct delivery to email or Google Drive",
      "Custom GPT for script writing (optional)",
    ],
    cta: "Book a Call to Start",
    highlighted: true,
  },
];

const chips = [
  { label: "Per Video", value: "$15" },
  { label: "Automation Runtime", value: "$50/month" },
  { label: "Social Media Automation", value: "$200/month" },
];

const compareRows = [
  {
    title: "Manual Filming + Editing",
    accent: "negative" as const,
    items: [
      { label: "Time", value: "2+ hours per day" },
      { label: "Cost", value: "$2,500+/month in editor fees" },
      { label: "Risk", value: "Human errors, inconsistency, sick days" },
    ],
  },
  {
    title: "Glitch AI System",
    accent: "positive" as const,
    items: [
      { label: "Time", value: "Submit a script. That's it." },
      { label: "Cost", value: "Under $1,500 setup. $15 per video." },
      { label: "Risk", value: "Zero. The system never stops." },
    ],
  },
];

export function Pricing() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openCal = () => {
    window.open(CAL_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="pricing" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#26f7b2]/[0.03] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-[#009d9a]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#26f7b2]/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#26f7b2]" />
            <span className="text-xs font-medium tracking-widest text-[#d3edea] uppercase">
              Pricing
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
            No hidden fees. No retainers. No surprises. This is exactly what it costs.
          </p>
        </div>

        {/* Phase pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
          {phaseCards.map((card, index) => {
            const cardClasses = card.highlighted
              ? "group relative rounded-3xl border border-[#26f7b2]/40 bg-gradient-to-br from-[#26f7b2]/[0.06] to-transparent p-6 md:p-8 overflow-hidden shadow-[0_0_60px_rgba(38,247,178,0.12)] transition-all duration-300 ease-out hover:border-[#26f7b2]/70 hover:-translate-y-1 hover:shadow-[0_20px_80px_-15px_rgba(38,247,178,0.55)]"
              : "group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 overflow-hidden transition-all duration-300 ease-out hover:border-[#26f7b2]/45 hover:bg-[#26f7b2]/[0.04] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.4)]";

            const content = (
              <>
                {card.highlighted && (
                  <>
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#26f7b2]/60 to-transparent" />
                    <div className="absolute top-5 right-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#26f7b2]/40 bg-[#26f7b2]/15 text-[10px] font-bold tracking-widest text-[#26f7b2] uppercase">
                        Recommended
                      </span>
                    </div>
                  </>
                )}
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#26f7b2]/80 mb-3 inline-block">
                  {card.phase}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                  {card.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-5 md:mb-6">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    {card.price}
                  </span>
                  <span className="text-xs md:text-sm font-medium text-slate-400">
                    {card.priceSub}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {card.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#26f7b2]/15 border border-[#26f7b2]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#26f7b2]" />
                      </div>
                      <span className="text-slate-300 text-[13px] md:text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openCal}
                  className={
                    card.highlighted
                      ? "inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#26f7b2] text-[#09333f] text-sm font-bold rounded-full hover:bg-[#26f7b2]/90 transition-all glow-emerald cursor-pointer"
                      : "inline-flex items-center justify-center gap-2 w-full px-5 py-3 border border-white/15 bg-white/[0.04] text-white text-sm font-semibold rounded-full hover:bg-white/[0.07] hover:border-white/25 transition-all cursor-pointer"
                  }
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
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
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
                className={cardClasses}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* Bundle banner */}
        <div className="text-center mb-3 md:mb-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-[#26f7b2]/30 bg-[#26f7b2]/[0.06] glow-emerald">
            <Sparkles className="w-3.5 h-3.5 text-[#26f7b2]" />
            <span className="text-xs md:text-sm font-bold text-white tracking-tight">
              Both Phases Together: <span className="text-[#26f7b2]">Under $1,500 Total</span>
            </span>
          </div>
        </div>

        {/* All-in including tools line */}
        <div className="text-center mb-7 md:mb-9">
          <p className="text-xs md:text-sm text-slate-400">
            Tool subscriptions included, your full launch still lands around <span className="text-white font-semibold">$1,500 total</span>.
          </p>
        </div>

        {/* Per-video chips */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-14">
          {chips.map((chip, i) => (
            <div
              key={i}
              className="glass rounded-full px-4 py-2.5 border border-white/[0.08] flex items-center gap-2"
            >
              <span className="text-[11px] md:text-xs font-medium text-slate-400 uppercase tracking-wider">
                {chip.label}:
              </span>
              <span className="text-sm font-bold text-white">{chip.value}</span>
            </div>
          ))}
        </div>

        {/* Tool subscription disclosure */}
        <div className="glass rounded-2xl p-5 md:p-6 border border-white/[0.06] mb-10 md:mb-14">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-white mb-1.5 tracking-tight">
                Note On Tool Costs
              </h4>
              <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed">
                Our pricing covers our work. The two AI tools we use must be subscribed under your account, since the avatar is trained on your credentials for full ownership and copyright protection. Tool costs vary but are typically under $100/month combined.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison block */}
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-3xl font-black tracking-tight text-white mb-2.5">
            Compare The Alternative
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6">
          {compareRows.map((row, index) => {
            const isPositive = row.accent === "positive";
            const cardClasses = isPositive
              ? "group relative rounded-2xl border border-[#26f7b2]/30 bg-gradient-to-br from-[#26f7b2]/[0.05] to-transparent p-5 md:p-6 overflow-hidden transition-all duration-300 ease-out hover:border-[#26f7b2]/65 hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.55)]"
              : "group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6 overflow-hidden transition-all duration-300 ease-out hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_15px_50px_-15px_rgba(255,255,255,0.18)]";

            const content = (
              <>
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isPositive
                        ? "bg-[#26f7b2]/15 border border-[#26f7b2]/30"
                        : "bg-white/[0.04] border border-white/[0.08]"
                    }`}
                  >
                    {isPositive ? (
                      <Check className="w-4 h-4 text-[#26f7b2]" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
                    {row.title}
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {row.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 pb-2.5 border-b border-white/[0.04] last:border-0 last:pb-0"
                    >
                      <span
                        className={`text-[10px] font-bold tracking-[0.15em] uppercase shrink-0 sm:w-16 ${
                          isPositive ? "text-[#26f7b2]/80" : "text-slate-500"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-[13px] md:text-sm text-slate-200 leading-relaxed">
                        {item.value}
                      </span>
                    </div>
                  ))}
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
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
                className={cardClasses}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          Over 3 to 4 months of manual work, you would spend more than double our entire setup.
        </p>

        {/* Legal footnote */}
        <p className="mt-10 md:mt-14 text-center text-[11px] md:text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
          All engagements are subject to our{" "}
          <Link
            href="/terms"
            className="text-[#26f7b2] underline hover:text-[#26f7b2]/80 transition-colors"
          >
            Terms and Conditions
          </Link>
          . Final invoice may vary depending on payment platform fees.
        </p>
      </div>
    </section>
  );
}
