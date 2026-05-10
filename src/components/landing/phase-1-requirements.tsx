"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Video, Mic, Images, AlertTriangle, CheckCircle2 } from "lucide-react";

const requirements = [
  {
    number: "01",
    icon: Video,
    title: "A 2-Minute Video",
    body: "Record yourself talking in front of the camera for at least 2 minutes. Good lighting. Clear sound. Front-facing. This is what we use to clone your face and presentation style.",
  },
  {
    number: "02",
    icon: Mic,
    title: "40 Minutes of Voice",
    body: "Send us at least 40 minutes of your voice in different tones: excited, calm, explaining, storytelling, casual conversation. We can also extract usable audio from your existing content.",
  },
  {
    number: "03",
    icon: Images,
    title: "20 Photos",
    body: "Send us 20 photos of yourself in different poses and angles. This trains the avatar to render you accurately in any context.",
  },
];

export function Phase1Requirements() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="phase-1" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#26f7b2]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#26f7b2]/15 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#26f7b2]">
              PHASE 01
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            What We Need From You
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
            To train your avatar, we need three things. That&apos;s it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {requirements.map((req, index) => {
            const cardClasses =
              "group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all duration-300 ease-out hover:border-[#26f7b2]/50 hover:bg-[#26f7b2]/[0.05] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(38,247,178,0.45)] overflow-hidden";
            const content = (
              <>
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#26f7b2] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(38,247,178,0.2),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-white/[0.06] group-hover:text-[#26f7b2]/30 transition-colors duration-300">
                      {req.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#26f7b2]/10 border border-[#26f7b2]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#26f7b2]/25 group-hover:border-[#26f7b2]/50 group-hover:shadow-[0_0_25px_rgba(38,247,178,0.4)] transition-all duration-300">
                      <req.icon className="w-5 h-5 text-[#26f7b2]" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                    {req.title}
                  </h3>
                  <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed">
                    {req.body}
                  </p>
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
                transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
                className={cardClasses}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* Important Callout */}
        {(() => {
          const calloutClasses =
            "relative glass rounded-2xl p-5 md:p-6 border border-[#fcd34d]/25 bg-[#fcd34d]/[0.04] mb-8 md:mb-12";
          const calloutBody = (
            <div className="flex flex-col md:flex-row gap-4 md:gap-5">
              <div className="w-10 h-10 rounded-2xl bg-[#fcd34d]/10 border border-[#fcd34d]/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#fcd34d]" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-1.5 tracking-tight">
                  One Important Note: Tool Ownership
                </h4>
                <p className="text-slate-300 text-[13px] md:text-sm leading-relaxed">
                  The two AI tools we use to train your avatar must be subscribed under your account. You provide the login access during setup and training. This ensures full ownership and copyright control of your avatar stays with you. There is no other way to do this ethically.
                </p>
              </div>
            </div>
          );

          return isMobile ? (
            <div className={calloutClasses}>{calloutBody}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={calloutClasses}
            >
              {calloutBody}
            </motion.div>
          );
        })()}

        {/* Phase 1 Result */}
        {(() => {
          const resultClasses =
            "relative glass rounded-2xl p-5 md:p-8 border border-[#26f7b2]/20 bg-gradient-to-br from-[#26f7b2]/[0.05] to-transparent text-center overflow-hidden";
          const resultBody = (
            <>
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#26f7b2]/40 to-transparent" />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#26f7b2]/30 bg-[#26f7b2]/10 mb-3">
                <CheckCircle2 className="w-3 h-3 text-[#26f7b2]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#26f7b2]">
                  PHASE 01 RESULT
                </span>
              </div>
              <h3 className="text-xl md:text-3xl font-black tracking-tight text-white mb-2.5">
                Your Avatar Is Trained And Ready
              </h3>
              <p className="text-slate-300 text-[13px] md:text-sm leading-relaxed max-w-2xl mx-auto">
                You now have your avatar in different looks, outfits, and angles. Your trained voice. The base system ready for daily content production.
              </p>
            </>
          );

          return isMobile ? (
            <div className={resultClasses}>{resultBody}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={resultClasses}
            >
              {resultBody}
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
