"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Sparkles, ArrowRight, Zap, Globe, Video, Code, Users, Workflow } from "lucide-react";

const services = [
  {
    title: "AI Avatar & Influencer Creation",
    subtitle: "For Any Business & Brand",
    description:
      "We design, train, and deploy hyper-realistic AI avatars and virtual influencers that become the face of your brand — speaking in any language, creating content 24/7, and scaling your digital presence infinitely.",
    icon: Bot,
    accentColor: "violet",
    features: [
      { icon: Video, text: "Photorealistic video avatars" },
      { icon: Globe, text: "29+ languages with your tone" },
      { icon: Sparkles, text: "AI influencer character design" },
      { icon: Users, text: "Brand ambassador at scale" },
    ],
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    borderColor: "hover:border-violet-500/40",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(139,92,246,0.12)]",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    featureIconColor: "text-violet-500/70",
    dotColor: "bg-violet-500",
  },
  {
    title: "Automation & Custom App Development",
    subtitle: "For Any Business & Brand",
    description:
      "We build intelligent automation systems and custom applications that eliminate manual work, streamline operations, and give your business a competitive edge with AI-powered workflows.",
    icon: Cpu,
    accentColor: "emerald",
    features: [
      { icon: Workflow, text: "End-to-end workflow automation" },
      { icon: Code, text: "Custom AI-powered apps" },
      { icon: Zap, text: "System integration & APIs" },
      { icon: Sparkles, text: "AI agents & chatbots" },
    ],
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderColor: "hover:border-emerald-500/40",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(16,185,129,0.12)]",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    featureIconColor: "text-emerald-500/70",
    dotColor: "bg-emerald-500",
  },
];

export function LandingServices() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0a1628_0%,#030712_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-6">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Two Services.{" "}
            <span className="text-emerald-400">Infinite Scale.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            We focus on what matters — building AI-powered assets that grow your brand and streamline your operations.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className={`group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 transition-all duration-700 ${service.borderColor} ${service.glowColor} overflow-hidden`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              {/* Top accent line */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${service.accentColor === 'violet' ? 'via-violet-500/30' : 'via-emerald-500/30'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`${service.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
                  {service.title}
                </h3>
                <p className={`text-sm font-medium ${service.iconColor} mb-4 tracking-wide`}>
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <feature.icon className={`w-4 h-4 ${service.featureIconColor} flex-shrink-0`} />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${service.iconColor} group-hover:gap-3 transition-all cursor-pointer`}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
