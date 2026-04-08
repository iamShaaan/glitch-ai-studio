"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, ShoppingBag, Target } from "lucide-react";
import { useState, useEffect } from "react";

const useCases = [
  {
    title: "Founders & Personal Brands",
    description: "Clone yourself to scale your content presence without burning out.",
    icon: Users,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]"
  },
  {
    title: "Marketing Agencies",
    description: "Automate reporting and produce video ad creatives at 100x speed.",
    icon: Briefcase,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
  },
  {
    title: "Consultants & Coaches",
    description: "Build AI bots that onboard clients and avatars that teach your courses.",
    icon: Target,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
  },
  {
    title: "E-Commerce Brands",
    description: "Deploy AI influencers to showcase products across social channels 24/7.",
    icon: ShoppingBag,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]"
  }
];

export function LandingUseCases() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {isMobile ? (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-white mb-4">
              Who We <span className="text-emerald-400">Build For</span>
            </h2>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Who We <span className="text-emerald-400">Build For</span>
            </h2>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {useCases.map((useCase, index) => {
            const content = (
              <div className={`glass h-full rounded-2xl p-6 relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.04] ${useCase.glow}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-12 h-12 rounded-xl ${useCase.bg} ${useCase.border} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                  {useCase.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            );

            return isMobile ? (
              <div key={index} className="h-full">{content}</div>
            ) : (
              <motion.div
                key={index}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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
