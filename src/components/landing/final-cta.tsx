"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const CAL_LINK = "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

export function FinalCTA() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const inner = (
    <div className="relative z-10 mx-auto max-w-3xl text-center">
      <div className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-[#26f7b2]/15 px-4 py-2">
        <Sparkles className="h-3.5 w-3.5 text-[#26f7b2]" />
        <span className="text-[10px] font-medium uppercase tracking-widest text-[#d3edea] md:text-xs">
          Book Your Consultation
        </span>
      </div>

      <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">
        Ready To Build Your <span className="text-[#26f7b2]">Content Machine?</span>
      </h2>
      <p className="mx-auto mb-8 max-w-2xl px-2 text-sm leading-relaxed text-slate-300 md:text-base">
        A 15-minute call. No pitch. No pressure. We will tell you exactly what your business needs and what it costs. You decide if it makes sense.
      </p>

      <a
        href={CAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4 bg-[#26f7b2] text-[#09333f] text-sm md:text-base font-bold rounded-full hover:bg-[#26f7b2]/90 transition-all glow-emerald hover:scale-105 active:scale-95"
      >
        Book a 15-Minute Call
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
      </a>

      <p className="mt-6 text-xs md:text-sm text-slate-400">
        Or email{" "}
        <a
          href="mailto:glitchiistudio@gmail.com"
          className="text-[#26f7b2] hover:underline font-medium"
        >
          glitchiistudio@gmail.com
        </a>{" "}
        if you prefer.
      </p>
    </div>
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-12 md:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0b2430_0%,#060d11_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#26f7b2]/[0.04] blur-[200px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#009d9a]/[0.03] blur-[150px]" />

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#26f7b2]/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        {isMobile ? (
          inner
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {inner}
          </motion.div>
        )}
      </div>
    </section>
  );
}
