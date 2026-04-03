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
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    glowColor: "bg-cyan-500/10",
    lineColor: "from-cyan-500",
  },
  {
    number: "03",
    title: "Build & Train",
    description:
      "Our team brings the vision to life — training AI models, building custom systems, and crafting every detail to perfection.",
    icon: Rocket,
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    glowColor: "bg-violet-500/10",
    lineColor: "from-violet-500",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description:
      "We deploy, test, and optimize your solution. Then we help you scale — turning your AI investment into measurable business growth.",
    icon: BarChart3,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    glowColor: "bg-amber-500/10",
    lineColor: "from-amber-500",
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
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-cyan-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            How We{" "}
            <span className="text-gradient-vivid">Work</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            A proven 4-step process from idea to launch — designed for speed, precision, and scale.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-cyan-500/20 to-violet-500/10 hidden sm:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:items-center`}
              >
                {/* Mobile step number indicator */}
                <div className="flex-shrink-0 sm:hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl ${step.glowColor} border ${step.borderColor} flex items-center justify-center`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 md:w-[45%] ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 group hover:bg-white/[0.04] transition-all duration-500">
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <span className={`text-xs font-bold tracking-widest ${step.color} opacity-60`}>
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl ${step.glowColor} border ${step.borderColor} flex items-center justify-center backdrop-blur-sm`}
                    >
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    {/* Pulse ring */}
                    <div
                      className={`absolute inset-0 rounded-2xl ${step.borderColor} border animate-pulse-ring opacity-30`}
                    />
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
