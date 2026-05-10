"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";

const cases = [
  {
    role: "AI Creator & Founder",
    name: "Shan (Founder, Glitch AI Studio)",
    location: "Bangladesh",
    videoId: "FCN6QAJWlIU",
    outcome:
      "Built his personal brand from zero using the same system he sells. Posts daily without filming.",
  },
  {
    role: "Lawyer",
    name: "Karl Cordina",
    location: "Malta",
    videoId: "A4nzbanvmY4",
    outcome:
      "Owns a boutique legal firm. Replies to messages once a week. Posts content every single day.",
  },
  {
    role: "AI Influencer",
    name: "Tyfany (Belgravia Advisory)",
    location: "Malta and India",
    videoId: "5oW9WtKKYc4",
    outcome:
      "Shareholding company with no human spokesperson. Created an AI influencer to represent the brand.",
  },
  {
    role: "Life Insurance Broker",
    name: "Kristina Alex Grakov",
    location: "United States of America",
    videoId: "X7laoXeOnxc",
    outcome:
      "Educates clients and generates leads through her AI avatar instead of producing manual videos.",
  },
];

export function RealResults() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="case-studies"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0b2430_0%,#060d11_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#26f7b2]/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-6">
            <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">
              Case Studies
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Real Businesses Using The System
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
            These are not actors. These are real clients running real businesses with this exact system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {cases.map((c, index) => {
            const cardClasses =
              "group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5 hover:border-[#26f7b2]/55 hover:bg-[#26f7b2]/[0.05] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.5)] transition-all duration-300 ease-out overflow-hidden";
            const content = (
              <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-4 md:gap-5 items-start">
                <div className="w-full sm:w-[240px] transition-transform duration-500 group-hover:scale-[1.04] origin-top-left">
                  <YouTubeEmbed
                    videoId={c.videoId}
                    title={`${c.name} case study`}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#26f7b2] mb-1.5">
                    {c.role.toUpperCase()}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-tight tracking-tight">
                    {c.name}
                  </h3>
                  {c.location && (
                    <div className="flex items-center gap-1.5 mb-2.5 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[11px]">{c.location}</span>
                    </div>
                  )}
                  <p className="text-slate-300 text-[13px] leading-relaxed">
                    {c.outcome}
                  </p>
                </div>
              </div>
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
                transition={{ delay: (index % 2) * 0.12, duration: 0.6, ease: "easeOut" }}
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
