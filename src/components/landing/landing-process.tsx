"use client";

import { motion } from "framer-motion";
import { Search, Palette, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & AI Audit",
    description:
      "We analyze your brand, operational bottlenecks, and identify the highest-ROI opportunities for AI avatars or workflow automation.",
    icon: Search,
    color: "text-[#26f7b2]",
    borderColor: "border-[#26f7b2]/30",
    glowColor: "bg-[#26f7b2]/10",
    lineColor: "from-[#26f7b2]",
  },
  {
    number: "02",
    title: "Strategy & Blueprint",
    description:
      "We architect the exact technical blueprint—whether it's a custom AI character design, an automation workflow, or a custom app architecture.",
    icon: Palette,
    color: "text-[#009d9a]",
    borderColor: "border-[#009d9a]/30",
    glowColor: "bg-[#009d9a]/10",
    lineColor: "from-[#009d9a]",
  },
  {
    number: "03",
    title: "Build & Train",
    description:
      "Our engineers bring the vision to life: training realistic AI voice/video models, writing custom app code, and configuring seamless API integrations.",
    icon: Rocket,
    color: "text-[#26f7b2]",
    borderColor: "border-[#26f7b2]/30",
    glowColor: "bg-[#26f7b2]/10",
    lineColor: "from-[#26f7b2]",
  },
  {
    number: "04",
    title: "Launch & Optimization",
    description:
      "We deploy the final AI systems into your business. We then monitor, optimize, and help you scale your new capabilities for maximum growth.",
    icon: BarChart3,
    color: "text-[#009d9a]",
    borderColor: "border-[#009d9a]/30",
    glowColor: "bg-[#009d9a]/10",
    lineColor: "from-[#009d9a]",
  },
];

import { useState, useEffect } from "react";

export function LandingProcess() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section id="process" className="relative py-16 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Decorative glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#26f7b2]/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#009d9a]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Section Header */}
        {isMobile ? (
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              How We{" "}
              <span className="text-[#009d9a]">Work</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-[13px] md:text-lg leading-relaxed px-2">
              A proven 4-step deployment process — designed for speed, precision, and business scale.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              How We{" "}
              <span className="text-[#009d9a]">Work</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              A proven 4-step deployment process — designed for speed, precision, and business scale.
            </p>
          </motion.div>
        )}

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (Now universal) */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#26f7b2]/30 via-[#009d9a]/20 to-[#d3edea]/10" />

          <div className="space-y-8 md:space-y-0 relative z-10">
            {steps.map((step, index) => {
              const cardClasses = `relative flex items-center justify-center gap-0 w-full ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`;
              const content = (
                <div className="contents">
                  {/* Content card */}
                  <div
                    className={`w-[45%] flex-shrink-0 ${
                      index % 2 === 0 ? "pr-4 sm:pr-12 text-right" : "pl-4 sm:pl-12 text-left"
                    }`}
                  >
                    <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 group hover:bg-white/[0.04] transition-all duration-500 bg-white/[0.01]">
                      <div
                        className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${
                          index % 2 === 0 ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span className={`text-[9px] sm:text-xs font-bold tracking-widest ${step.color} opacity-60`}>
                          STEP {step.number}
                        </span>
                      </div>
                      <h3 className="text-[15px] sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-[11px] sm:text-sm md:text-base leading-snug sm:leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div
                        className={`w-8 h-8 sm:w-14 sm:h-14 rounded-full sm:rounded-2xl ${step.glowColor} border ${step.borderColor} flex items-center justify-center backdrop-blur-sm shadow-xl`}
                      >
                        <step.icon className={`w-3.5 h-3.5 sm:w-6 sm:h-6 ${step.color}`} />
                      </div>
                      {/* Pulse ring */}
                      <div
                        className={`absolute inset-0 rounded-full sm:rounded-2xl ${step.borderColor} border animate-pulse-ring opacity-30`}
                      />
                    </div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="w-[45%] flex-shrink-0" />
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
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className={cardClasses}
                >
                  {content}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
