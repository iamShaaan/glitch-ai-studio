"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Sparkles, ArrowRight, Zap, Globe, Video, Code, Users, Workflow } from "lucide-react";

const services = [
  {
    title: "AI Avatar & Influencer Creation",
    subtitle: "Scale Your Content 24/7",
    description:
      "Stop filming manual videos. We design, clone, and deploy hyper-realistic AI avatars and digital influencers. Let your custom AI spokesperson speak in 29+ languages, educate customers, and generate leads around the clock.",
    icon: Bot,
    accentColor: "violet",
    features: [
      { icon: Video, text: "Photorealistic video avatars" },
      { icon: Globe, text: "Multi-language content scaling" },
      { icon: Sparkles, text: "Custom AI voice cloning" },
      { icon: Users, text: "Digital brand ambassadors" },
    ],
    gradient: "from-[#009d9a]/20 via-[#009d9a]/5 to-transparent",
    borderColor: "hover:border-[#009d9a]/40",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(0,157,154,0.12)]",
    iconBg: "bg-[#009d9a]/10",
    iconColor: "text-[#009d9a]",
    featureIconColor: "text-[#009d9a]/70",
    dotColor: "bg-[#009d9a]",
  },
  {
    title: "AI Automation & Custom App Development",
    subtitle: "Eliminate Manual Operations",
    description:
      "Stop losing time on repetitive tasks. We build intelligent workflows and custom AI applications tailored to your business rules. From automated lead generation to complete internal tool development.",
    icon: Cpu,
    accentColor: "emerald",
    features: [
      { icon: Workflow, text: "End-to-end workflow automation" },
      { icon: Code, text: "Custom AI app development" },
      { icon: Zap, text: "CRM & API integrations" },
      { icon: Sparkles, text: "AI agents & intelligent chatbots" },
    ],
    gradient: "from-[#26f7b2]/20 via-[#26f7b2]/5 to-transparent",
    borderColor: "hover:border-[#26f7b2]/40",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(38,247,178,0.12)]",
    iconBg: "bg-[#26f7b2]/10",
    iconColor: "text-[#26f7b2]",
    featureIconColor: "text-[#26f7b2]/70",
    dotColor: "bg-[#26f7b2]",
  },
];

import { useState, useEffect } from "react";

export function LandingServices() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section id="services" className="relative py-16 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0b2430_0%,#060d11_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#009d9a]/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-6">
            <Zap className="w-3.5 h-3.5 text-[#26f7b2]" />
            <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Two Specialized AI Solutions.{" "}
            <span className="text-[#26f7b2]">Infinite Business Scale.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-lg leading-relaxed px-4">
            We engineer AI systems that solve your two biggest bottlenecks: content creation at scale and operational efficiency.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const cardClasses = `group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 transition-all duration-700 ${service.borderColor} ${service.glowColor} overflow-hidden`;
            const content = (
              <>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${service.accentColor === 'violet' ? 'via-[#009d9a]/30' : 'via-[#26f7b2]/30'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`${service.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
                    {service.title}
                  </h3>
                  <p className={`text-[13px] font-medium ${service.iconColor} mb-4 tracking-wide`}>
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-[13px] text-slate-300"
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
                    Book 15-Min Call <ArrowRight className="w-4 h-4" />
                  </button>
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
                viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
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
