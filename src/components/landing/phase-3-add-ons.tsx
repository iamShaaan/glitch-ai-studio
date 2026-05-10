"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Share2, MessageCircle, Bot, Lock } from "lucide-react";

const addOns = [
  {
    icon: Share2,
    title: "Social Media Automation",
    body: "We manually upload your Instagram Reel first. Then our automation publishes that same Reel to Facebook, TikTok, LinkedIn, X, YouTube Shorts, and more. One upload becomes everywhere.",
    price: "$200/month",
  },
  {
    icon: MessageCircle,
    title: "Lead Automation",
    body: "Set a trigger word like 'avatar' on your posts. When someone comments that word, they automatically get a DM, enter your lead flow, and we guide them straight to your offer or website.",
    price: "Included with Social Media Automation",
  },
  {
    icon: Bot,
    title: "Website Avatar Agent",
    body: "Your trained avatar can work directly on your website. It speaks to visitors through video, audio, or chat, answering questions based on your knowledge base. Your brand, available 24/7, with a face.",
    price: "Custom quote",
  },
];

export function Phase3AddOns() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="phase-3" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#009d9a]/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#26f7b2]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#009d9a]/20 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#009d9a]">
              PHASE 03
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Scale Even Further
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4 mb-6">
            Optional add-ons available exclusively to clients who have completed Phases 1 and 2.
          </p>

          {/* Gating banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fcd34d]/25 bg-[#fcd34d]/[0.06]">
            <Lock className="w-3.5 h-3.5 text-[#fcd34d]" />
            <span className="text-[11px] md:text-xs font-semibold text-[#fcd34d]">
              Available only after Phase 1 and Phase 2 setup.
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-14">
          {addOns.map((item, index) => {
            const cardClasses =
              "group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all duration-300 ease-out hover:border-[#009d9a]/55 hover:bg-[#009d9a]/[0.06] hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(0,157,154,0.55)] overflow-hidden flex flex-col";
            const content = (
              <>
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#009d9a] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(0,157,154,0.25),transparent_70%)]" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#009d9a]/10 border border-[#009d9a]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#009d9a]/30 group-hover:border-[#009d9a]/55 group-hover:shadow-[0_0_25px_rgba(0,157,154,0.45)] transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#009d9a]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed mb-5 flex-1">
                    {item.body}
                  </p>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#009d9a]/30 bg-[#009d9a]/10 self-start">
                    <span className="text-[11px] md:text-xs font-semibold text-[#009d9a]">
                      {item.price}
                    </span>
                  </div>
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

        {/* Closing line */}
        {(() => {
          const closingClasses =
            "glass rounded-2xl p-5 md:p-8 border border-white/[0.05] text-center";
          const closingBody = (
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Your scripts are written by AI. Your videos are generated by AI. Your videos are edited by AI. Your content is uploaded by AI. Your DMs and comments are answered by AI. The entire social media workload is gone. <span className="text-[#26f7b2] font-semibold">You focus only on the leads it generates.</span>
            </p>
          );

          return isMobile ? (
            <div className={closingClasses}>{closingBody}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={closingClasses}
            >
              {closingBody}
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
