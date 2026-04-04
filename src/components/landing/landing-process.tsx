"use client";

import { motion } from "framer-motion";
import { Search, Palette, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a deep-dive consultation to understand your brand, audience, goals, and the specific problems AI can solve for you.",
    icon: Search,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    glowColor: "bg-emerald-500/10",
    lineColor: "from-emerald-500",
  },
  {
    number: "02",
    title: "Design & Strategy",
    description:
      "We architect the perfect solution — whether it's an AI character design, automation workflow, or custom app blueprint tailored to your needs.",
    icon: Palette,
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    glowColor: "bg-violet-500/10",
    lineColor: "from-violet-500",
  },
  {
    number: "03",
    title: "Build & Train",
    description:
      "Our team brings the vision to life — training AI models, building custom systems, and crafting every detail to perfection.",
    icon: Rocket,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    glowColor: "bg-emerald-500/10",
    lineColor: "from-emerald-500",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description:
      "We deploy, test, and optimize your solution. Then we help you scale — turning your AI investment into measurable business growth.",
    icon: BarChart3,
    color: "text-violet-400",
    borderColor: "border-violet-600/30",
    glowColor: "bg-violet-600/10",
    lineColor: "from-violet-600",
  },
];

export function LandingProcess() {
  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Decorative glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-violet-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            How We{" "}
            <span className="text-violet-400">Work</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            A proven 4-step process from idea to launch — designed for speed, precision, and scale.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (Now universal) */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-violet-500/20 to-amber-500/10" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className={`relative flex items-center justify-center gap-0 w-full ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >

                {/* Content card */}
                <div
                  className={`w-[45%] flex-shrink-0 ${
                    index % 2 === 0 ? "pr-4 sm:pr-12 text-right" : "pl-4 sm:pl-12 text-left"
                  }`}
                >
                  <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 group hover:bg-white/[0.04] transition-all duration-500">
                    <div
                      className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className={`text-[10px] sm:text-xs font-bold tracking-widest ${step.color} opacity-60`}>
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-[11px] sm:text-sm md:text-base leading-snug sm:leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center node (Always visible now) */}
                <div className="flex absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="relative">
                    <div
                      className={`w-8 h-8 sm:w-14 sm:h-14 rounded-full sm:rounded-2xl ${step.glowColor} border ${step.borderColor} flex items-center justify-center backdrop-blur-sm shadow-xl`}
                    >
                      <step.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${step.color}`} />
                    </div>
                    {/* Pulse ring */}
                    <div
                      className={`absolute inset-0 rounded-full sm:rounded-2xl ${step.borderColor} border animate-pulse-ring opacity-30`}
                    />
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="w-[45%] flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
