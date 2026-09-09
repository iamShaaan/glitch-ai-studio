"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { ContraLogo, FiverrLogo, UpworkLogo } from "@/components/ui/work-with-me-modal";

const FOUNDER_PHOTO = "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/PP%20(2).png";

const clientCollaborations = [
  {
    name: "The Move Miami",
    role: "Podcast Studio",
    url: "https://themovemiami.com/",
  },
  {
    name: "Walter Bond",
    role: "Top Keynote Speaker",
    url: "https://walterbond.com/",
  },
  {
    name: "Shark Mindset",
    role: "Coaching Program",
    url: "https://sharkmindset.com/",
  },
  {
    name: "Emra AI",
    role: "Mental Health App",
    url: "https://www.emraai.com/",
  },
  {
    name: "Belgravia Advisory",
    role: "Law Firm in Malta",
    url: "https://belgraviaadvisory.com/",
  },
  {
    name: "Peak Performance Huddle",
    role: "Sales E-Learning",
    url: "https://peakperformershuddle.com/",
  },
  {
    name: "Skintervention",
    role: "Skincare Products",
    url: "https://www.drzoe.skin/",
  },
  {
    name: "Omluxe Lifestyle",
    role: "Luxury & Lifestyle",
    url: "https://omluxe.com/",
  },
  {
    name: "Roofpax",
    role: "Automotive & Gear",
    url: "https://roofpax.com/",
  },
  {
    name: "2H Web Solutions",
    role: "Search & Growth",
    url: "https://2hwebsolutions.at/",
  },
  {
    name: "OKC Roofers",
    role: "Commercial Services",
    url: "https://okcroofers.com/",
  },
];

const freelanceProfiles = [
  {
    name: "Contra",
    url: "https://contra.com/soumitrohaldershan",
    logo: () => <ContraLogo className="w-3.5 h-3.5 shrink-0" />,
    style: "hover:border-[#FF5C35]/50 hover:text-[#FF5C35]",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/s/bk9QK5Y",
    logo: () => <FiverrLogo className="w-3.5 h-3.5 shrink-0" />,
    style: "hover:border-[#1DBF73]/50 hover:text-[#1DBF73]",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~0167ccf23b8c42a887?mp_source=share",
    logo: () => <UpworkLogo className="w-3.5 h-3.5 shrink-0" />,
    style: "hover:border-[#14A800]/50 hover:text-[#14A800]",
  },
];

const socialHandles = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/mindfreack007/",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/iam_shaaan_/",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/iam_shaaan_",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function FounderSection() {
  return (
    <section
      id="founder"
      className="w-full py-16 md:py-24 bg-white dark:bg-[#0a0a0c] border-b border-zinc-200 dark:border-[#262933] relative overflow-hidden scroll-mt-20 md:scroll-mt-24 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Middle-Aligned Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 dark:bg-white/[0.03] dark:border-white/[0.08] mb-3">
            <Sparkles className="w-3 h-3 text-emerald-600 dark:text-[#c3f400]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-emerald-700 dark:text-[#c3f400] font-bold">
              SOLOPRENEUR &amp; LEAD ARCHITECT
            </span>
          </div>
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.035em] text-zinc-900 dark:text-white mb-3 whitespace-nowrap">
            MAN BEHIND GLITCH AI STUDIO
          </h2>
          <p className="font-space text-xs md:text-sm text-zinc-600 dark:text-[#8e92a4] max-w-xl mx-auto leading-relaxed">
            One creative engineer. Zero agency middlemen. Direct executive collaboration from concept to final cut.
          </p>
        </div>

        {/* Apple-Style Minimalist Founder Profile Card */}
        <div className="rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-sm dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Round Profile Picture & Quick Actions */}
            <div className="lg:col-span-4 flex flex-col items-center text-center gap-5">
              {/* Round Profile Frame */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full p-1.5 border-2 border-emerald-500/40 dark:border-[#c3f400]/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] dark:shadow-[0_0_40px_rgba(195,244,0,0.18)] group">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-200 dark:bg-[#18181b]">
                  <Image
                    src={FOUNDER_PHOTO}
                    alt="Soumitro Halder Shan"
                    fill
                    unoptimized
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Active Indicator Pill */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-[#131315] border border-emerald-500/50 dark:border-[#c3f400]/50 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-[#c3f400] animate-pulse" />
                  <span className="font-mono-tech text-[9px] uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
                    Available for Sprints
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="flex flex-col gap-1 pt-2">
                <h3 className="font-anton text-2xl sm:text-3xl uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                  Soumitro Halder Shan
                </h3>
                <span className="font-mono-tech text-[11px] text-emerald-700 dark:text-[#c3f400] uppercase tracking-wider font-semibold">
                  Founder &amp; AI Video Architect
                </span>
              </div>

              {/* Freelance Profile Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {freelanceProfiles.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] font-mono-tech text-[10px] font-bold uppercase tracking-wider text-zinc-800 dark:text-[#e5e1e4] hover:bg-zinc-100 dark:hover:bg-white/[0.08] transition-all cursor-pointer shadow-xs ${p.style}`}
                  >
                    {p.logo()}
                    <span>{p.name}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                  </a>
                ))}
              </div>

              {/* Social Media Handle Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {socialHandles.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-8 h-8 rounded-full bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-600 dark:text-[#a1a1aa] hover:text-emerald-700 dark:hover:text-[#c3f400] hover:border-emerald-500/40 dark:hover:border-[#c3f400]/40 transition-all cursor-pointer shadow-xs"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Founder Narrative & Experience */}
            <div className="lg:col-span-8 flex flex-col gap-6 text-left">
              <div className="space-y-4 font-space text-xs sm:text-[13px] text-zinc-600 dark:text-[#a1a1aa] leading-relaxed font-normal">
                <p>
                  I am <strong className="text-zinc-900 dark:text-white font-medium">Soumitro Halder Shan</strong>, the solopreneur and technical creator behind Glitch AI Studio. I specialize in the intersection of autonomous generative AI pipelines and performance video production — engineering hyper-realistic digital avatars, training self-service script-to-video engines, and directing high-ROAS video advertising.
                </p>
                <p>
                  Over the past few years, I have architected custom content infrastructure for creators, high-growth startups, and established commercial leaders worldwide. My collaborations span top keynote speaker <strong className="text-zinc-900 dark:text-white font-medium">Walter Bond</strong>, the <strong className="text-zinc-900 dark:text-white font-medium">Shark Mindset</strong> coaching program, mental health app <strong className="text-zinc-900 dark:text-white font-medium">Emra AI</strong>, Malta law firm <strong className="text-zinc-900 dark:text-white font-medium">Belgravia Advisory</strong>, sales e-learning platform <strong className="text-zinc-900 dark:text-white font-medium">Peak Performance Huddle</strong>, premier podcast studio <strong className="text-zinc-900 dark:text-white font-medium">The Move Miami</strong>, skincare brand <strong className="text-zinc-900 dark:text-white font-medium">Skintervention</strong>, luxury lifestyle label <strong className="text-zinc-900 dark:text-white font-medium">Omluxe</strong>, automotive outfitter <strong className="text-zinc-900 dark:text-white font-medium">Roofpax</strong>, digital agency <strong className="text-zinc-900 dark:text-white font-medium">2H Web Solutions</strong>, and commercial contractor <strong className="text-zinc-900 dark:text-white font-medium">OKC Roofers</strong>.
                </p>
                <p>
                  I operate as a true solopreneur. When you hire Glitch AI Studio, there are no handoffs to junior contractors, account managers, or bloated agency overhead. Every model is personally tuned, every prompt engineered, and every cut approved by me to guarantee uncompromised quality.
                </p>
              </div>

              {/* Work Experience & Client Collaborations Strip */}
              <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.06] flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c3f400]" />
                  <span className="font-mono-tech text-[10px] uppercase text-emerald-700 dark:text-[#c3f400] tracking-widest font-bold">
                    PROVEN WORK EXPERIENCE &amp; CLIENT DELIVERABLES
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {clientCollaborations.map((collab, i) => (
                    <a
                      key={i}
                      href={collab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] flex items-center justify-between gap-2 hover:border-emerald-500/40 dark:hover:border-[#c3f400]/40 hover:bg-emerald-50/50 dark:hover:bg-white/[0.04] hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_0_15px_rgba(195,244,0,0.1)] transition-all group cursor-pointer shadow-xs"
                    >
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="font-anton text-xs uppercase text-zinc-900 dark:text-white tracking-[0.03em] truncate group-hover:text-emerald-700 dark:group-hover:text-[#c3f400] transition-colors">
                          {collab.name}
                        </span>
                        <span className="font-mono-tech text-[9px] uppercase tracking-wider text-zinc-500 dark:text-[#8e92a4] truncate">
                          {collab.role}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-[#71717a] group-hover:text-emerald-700 dark:group-hover:text-[#c3f400] transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
