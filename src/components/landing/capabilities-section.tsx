"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

interface ServiceItem {
  index: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeSub: string;
}

const services: ServiceItem[] = [
  {
    index: "01",
    title: "AI AVATAR CREATION & VOICE CLONING",
    subtitle:
      "Hyper-realistic digital twins with micro-expressions, multi-outfit styling, and zero-latency natural voice modeling.",
    badge: "$200 One-Time",
    badgeSub: "Full IP ownership • Camera-free",
  },
  {
    index: "02",
    title: "AUTONOMOUS AI VIDEO AGENT ENGINE",
    subtitle:
      "A custom self-service video generation agent trained to direct your avatar. Produce unlimited reels on autopilot.",
    badge: "$1,000 Setup",
    badgeSub: "Self-serve engine • Infinite reels",
  },
  {
    index: "03",
    title: "PERFORMANCE AI ADS & VIRAL UGC",
    subtitle:
      "High-converting video ads for Meta, TikTok, and YouTube Shorts. Dynamic hook batching and rapid creative testing.",
    badge: "$15 / Hour",
    badgeSub: "High ROAS • Zero retainers",
  },
  {
    index: "04",
    title: "SYNTHETIC LOOKBOOKS & VIDEO STRATEGY",
    subtitle:
      "Editorial 8K product cinematography and omnichannel video strategies without physical sets, crews, or filming delays.",
    badge: "Omnichannel",
    badgeSub: "8K neural renders • Multi-format",
  },
];

export function CapabilitiesSection() {
  const [activeService, setActiveService] = useState(1); // Default active on 02

  return (
    <section id="services" className="w-full py-16 md:py-24 bg-[#0a0a0c] border-b border-[#262933]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col">
        {/* Middle-Aligned Section Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2.5 mb-10">
          <span className="font-mono-tech text-[10px] uppercase text-[#c3f400] tracking-widest font-bold">
            CAPABILITIES ARCHITECTURE
          </span>
          <h2 className="font-anton text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.035em] text-white whitespace-nowrap">
            ALL SERVICES END-TO-END
          </h2>
          <p className="font-space text-[11px] sm:text-xs text-[#8e92a4] max-w-xl mx-auto leading-relaxed">
            Executed directly by Soumitro Halder Shan — solopreneur. No junior team handoffs, no latency.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-4">
          {services.map((item, i) => {
            const isActive = activeService === i;

            if (isActive) {
              return (
                <div
                  key={item.index}
                  onClick={() => setActiveService(i)}
                  className="p-6 md:p-8 rounded-2xl bg-[#c3f400] text-[#161e00] transition-all duration-300 shadow-[0_0_40px_rgba(195,244,0,0.3)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <span className="font-mono-tech text-xs font-bold text-[#161e00]/70">
                      {item.index}
                    </span>
                    <span className="font-anton text-lg sm:text-xl md:text-2xl uppercase font-black tracking-[0.035em] text-[#161e00]">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 bg-[#161e00]/10 p-2 px-3.5 rounded-xl backdrop-blur-sm self-start lg:self-auto">
                    <div className="flex flex-col">
                      <span className="font-anton text-sm uppercase text-[#161e00] leading-tight tracking-[0.035em]">
                        {item.badge}
                      </span>
                      <span className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[#161e00]/80">
                        {item.badgeSub}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#161e00] text-[#c3f400] flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.index}
                onClick={() => setActiveService(i)}
                className="group p-5 md:p-6 rounded-2xl bg-[#131315] hover:bg-[#1c1b1d] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#262933] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono-tech text-xs tracking-wider text-[#a1a1aa]">
                    {item.index}
                  </span>
                  <span className="font-anton text-lg sm:text-xl uppercase text-white group-hover:text-[#c3f400] transition-colors tracking-[0.035em]">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="font-space text-xs text-[#a1a1aa] font-normal leading-relaxed tracking-wide max-w-sm hidden xl:inline">
                    {item.subtitle}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center text-white group-hover:bg-[#c3f400] group-hover:text-[#161e00] group-hover:border-[#c3f400] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
