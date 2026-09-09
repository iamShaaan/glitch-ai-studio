"use client";

import { Check, Sparkles, ArrowUpRight, ShieldCheck } from "lucide-react";
import { ContraLogo, UpworkLogo, FiverrLogo } from "@/components/ui/work-with-me-modal";

const pricingTiers = [
  {
    phase: "AVATAR CREATION",
    title: "AI Avatar Training",
    price: "$200",
    priceSub: "One-time setup",
    badge: "Digital Twin",
    badgeColor: "text-[#a1a1aa] bg-white/[0.04] border-white/[0.08]",
    description: "Hyper-realistic digital clone tuned to your natural voice, cadence, and presence.",
    features: [
      "Custom facial capture & natural micro-expressions",
      "Cloned voice matched to your pitch, tone & cadence",
      "Multi-outfit, multi-angle styling for any aspect ratio",
      "Zero camera filming, studio sets, or gear required",
      "100% full commercial IP rights to your avatar model",
    ],
    highlighted: false,
  },
  {
    phase: "AUTONOMOUS AGENT",
    title: "AI Video Agent Setup",
    price: "$1,000",
    priceSub: "One-time setup",
    badge: "Recommended",
    badgeColor: "text-[#161e00] bg-[#c3f400]",
    description: "Self-service autonomous video engine trained to direct and produce videos on autopilot.",
    features: [
      "Custom video agent trained to direct your avatar",
      "Self-service engine: generate ongoing videos by yourself",
      "Script-to-video autonomous pipeline with scene direction",
      "Automated motion graphics, branded captions & hooks",
      "Continuous lifetime generation with zero manual editing",
    ],
    highlighted: true,
  },
  {
    phase: "PERFORMANCE CREATIVE",
    title: "AI Ads & UGC Production",
    price: "$15",
    priceSub: "Per hour",
    badge: "High ROAS",
    badgeColor: "text-[#c3f400] bg-[#c3f400]/10 border-[#c3f400]/30",
    description: "Done-for-you performance ad campaigns engineered for high conversion and scale.",
    features: [
      "High-converting video ads for Meta, TikTok & YouTube",
      "Viral UGC frameworks, dynamic hooks & product angles",
      "Rapid sprint turnaround (24–48h) for fast ad testing",
      "Done-for-you production with zero agency retainers",
      "Direct collaboration with Soumitro Halder Shan",
    ],
    highlighted: false,
  },
];

const platforms = [
  {
    id: "contra",
    name: "Contra",
    shortBadge: "0% Commission",
    url: "https://contra.com/soumitrohaldershan",
    renderLogo: () => <ContraLogo className="w-4 h-4 shrink-0" />,
    dockStyle:
      "bg-white/[0.03] hover:bg-[#FF5C35]/15 border border-white/[0.06] hover:border-[#FF5C35]/40 text-[#e5e1e4] hover:text-[#FF5C35]",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    shortBadge: "Level 2 • 5.0 ★",
    url: "https://www.fiverr.com/s/bk9QK5Y",
    renderLogo: () => <FiverrLogo className="w-4 h-4 shrink-0" />,
    dockStyle:
      "bg-white/[0.03] hover:bg-[#1DBF73]/15 border border-white/[0.06] hover:border-[#1DBF73]/40 text-[#e5e1e4] hover:text-[#1DBF73]",
  },
  {
    id: "upwork",
    name: "Upwork",
    shortBadge: "Top Rated • 100%",
    url: "https://www.upwork.com/freelancers/~0167ccf23b8c42a887?mp_source=share",
    renderLogo: () => <UpworkLogo className="w-4 h-4 shrink-0" />,
    dockStyle:
      "bg-white/[0.03] hover:bg-[#14A800]/15 border border-white/[0.06] hover:border-[#14A800]/40 text-[#e5e1e4] hover:text-[#14A800]",
  },
];

const specChips = [
  { label: "Voice Tuning", value: "Custom Cloned" },
  { label: "Ad Turnaround", value: "24–48 Hours" },
  { label: "Commercial IP", value: "100% Client Owned" },
];

const comparisonSpecs = [
  {
    category: "Campaign Turnaround",
    legacy: "3–4 weeks per filming cycle",
    studio: "Instant self-serve or 24h rapid ad sprints",
  },
  {
    category: "Cost Structure",
    legacy: "$3,500 – $6,000+/mo in retainers & set fees",
    studio: "$200 avatar • $1,000 AI agent • $15/hr ads",
  },
  {
    category: "Production Friction",
    legacy: "Actor casting, camera crew scheduling & reshoots",
    studio: "Zero filming burnout with infinite iterations on demand",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-16 md:py-24 bg-[#0a0a0c] border-b border-[#262933] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Apple-Style Section Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-3">
            <Sparkles className="w-3 h-3 text-[#c3f400]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#c3f400] font-bold">
              TRANSPARENT INVESTMENT
            </span>
          </div>
          <h2 className="font-anton text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.035em] text-white mb-3 whitespace-nowrap">
            TRANSPARENT PRICING
          </h2>
          <p className="font-space text-xs md:text-sm text-[#8e92a4] max-w-xl mx-auto leading-relaxed">
            Direct pricing with zero bloated retainers. Choose self-service autonomous video creation or done-for-you ad sprints.
          </p>
        </div>

        {/* Thin, Unified Apple-Style 3-Tier Grid */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            {pricingTiers.map((tier, index) => {
              const isRec = tier.highlighted;

              return (
                <div
                  key={index}
                  className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors relative ${
                    isRec ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Recommended Accent Glow Line */}
                  {isRec && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c3f400] to-transparent" />
                  )}

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono-tech text-[10px] font-bold text-[#c3f400] tracking-widest uppercase">
                        {tier.phase}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono-tech text-[9px] uppercase font-bold tracking-wider border ${tier.badgeColor}`}
                      >
                        {tier.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-anton text-xl sm:text-2xl uppercase text-white tracking-[0.035em] mb-2">
                      {tier.title}
                    </h3>

                    {/* Description */}
                    <p className="font-space text-xs text-[#8e92a4] mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    {/* Price Display */}
                    <div className="pb-6 mb-6 border-b border-white/[0.06] flex items-baseline gap-2.5">
                      <span className="font-anton text-4xl sm:text-5xl text-white tracking-[0.035em]">
                        {tier.price}
                      </span>
                      <span className="font-mono-tech text-[11px] text-[#71717a] uppercase tracking-wider">
                        {tier.priceSub}
                      </span>
                    </div>

                    {/* Features List with Hairline Spacing */}
                    <ul className="space-y-3">
                      {tier.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#c3f400] shrink-0 mt-0.5" />
                          <span className="font-space text-xs sm:text-[13px] text-[#d4d4d8] font-normal leading-relaxed tracking-wide">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Apple-Style Minimalist Platform Selection Dock */}
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <div className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase text-[#8e92a4] tracking-widest font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c3f400]" />
            <span>SELECT PLATFORM TO HIRE OR ORDER DIRECTLY</span>
          </div>

          {/* Floating Glass Pill Dock */}
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {platforms.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer group ${p.dockStyle}`}
              >
                {p.renderLogo()}
                <span>{p.name}</span>
                <span className="text-[10px] font-normal opacity-60 hidden min-[480px]:inline">
                  {p.shortBadge}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Apple-Style Refined Differentiation Footnote */}
          <p className="font-space text-[11px] sm:text-xs text-[#71717a] max-w-2xl mx-auto leading-relaxed px-4">
            * Rate &amp; scope differentiation: Service rates and contract packages on Contra, Fiverr, and Upwork reflect platform service fees, milestone escrow security, and custom project terms. Not all specialized services and custom tiers are listed on this landing page. Choose your platform above to review available offers or initiate a custom contract.
          </p>
        </div>

        {/* Sleek Spec Chips Strip */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-10 py-3.5 px-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-14 text-center max-w-4xl mx-auto">
          {specChips.map((chip, i) => (
            <div key={i} className="inline-flex items-center gap-2 text-xs">
              <span className="font-space text-[#71717a]">{chip.label}:</span>
              <span className="font-mono-tech font-bold text-white tracking-wide">{chip.value}</span>
            </div>
          ))}
        </div>

        {/* Apple-Style Comparative Spec Table (Clean Hairlines, Zero Box-in-Box) */}
        <div className="w-full max-w-4xl mx-auto">
          <h4 className="font-anton text-base sm:text-lg uppercase text-white mb-6 text-center tracking-[0.035em] whitespace-nowrap">
            TRADITIONAL AGENCIES VS. GLITCH AI STUDIO
          </h4>

          <div className="w-full border-t border-white/[0.08] divide-y divide-white/[0.06]">
            {comparisonSpecs.map((spec, i) => (
              <div
                key={i}
                className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-3 font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8e92a4]">
                  {spec.category}
                </div>
                <div className="sm:col-span-4 font-space text-xs sm:text-[13px] text-[#71717a] line-through decoration-rose-500/40">
                  {spec.legacy}
                </div>
                <div className="sm:col-span-5 font-space text-xs sm:text-[13px] text-white font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] shrink-0" />
                  <span>{spec.studio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
