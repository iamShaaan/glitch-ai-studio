"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export function LandingHero() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep dark gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#0a1628_0%,#030712_60%,#000000_100%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />


      {/* Spotlight glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-violet-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center max-w-6xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative w-56 h-16 md:w-72 md:h-20 mx-auto">
            <Image
              src="/logo.png"
              alt="Glitch AI Studio"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/20 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium tracking-widest text-emerald-300 uppercase">
            AI Avatar & Automation Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">We Create </span>
          <span className="text-gradient-emerald">AI Avatars</span>
          <br className="hidden sm:block" />
          <span className="text-white"> & </span>
          <span className="text-gradient-vivid">Automate</span>
          <span className="text-white"> Your Business</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-light mb-10 text-balance"
        >
          We build hyper-realistic <strong className="text-white font-semibold">AI Influencers</strong> and
          end-to-end <strong className="text-white font-semibold">Automation Systems</strong> for
          businesses and brands ready to scale beyond limits.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToContact}
            className="group px-8 py-4 sm:px-10 sm:py-5 bg-emerald-500 text-slate-950 text-lg font-bold rounded-full hover:bg-emerald-400 transition-all glow-emerald flex items-center gap-3 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const el = document.querySelector("#services");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 sm:px-10 sm:py-5 glass text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], height: [4, 8, 4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-emerald-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
