"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "How long does Phase 1 take?",
    answer:
      "Avatar training takes around 7 days from the moment you send us your video, voice samples, and photos. We work fast, but training high-quality models takes time we will not cut corners on.",
  },
  {
    question: "Who owns the avatar after it is built?",
    answer:
      "You do. Completely. The two AI tools we use are subscribed under your account, so the avatar is trained on your credentials and your data. You retain full ownership and copyright control. We have no claim to it.",
  },
  {
    question: "How many videos can I generate per month?",
    answer:
      "As many as you want. Each video takes around 10 minutes of automation runtime. You can queue and run continuously. Most of our clients produce 30 to 60 videos per month.",
  },
  {
    question: "Do I need to keep filming videos after Phase 1 is complete?",
    answer:
      "No. That is the entire point. After Phase 1, your avatar handles all video presentation. You only write or approve scripts.",
  },
  {
    question: "What if I do not want to write scripts?",
    answer:
      "We can train a custom GPT on your voice and content style to write scripts for you. You verify them. We generate the video.",
  },
  {
    question: "What tools do I need to subscribe to?",
    answer:
      "Two AI tools required for avatar training and voice generation. We tell you exactly which ones during the consultation call. Combined cost is typically under $100 per month.",
  },
  {
    question: "Can my avatar appear on my website too?",
    answer:
      "Yes. Through Phase 3, we can deploy your avatar as an interactive agent on your website. It speaks to visitors through video, audio, or chat, answering questions from your knowledge base.",
  },
  {
    question: "What happens during the 15-minute consultation call?",
    answer:
      "We learn about your brand, your goals, and your content needs. We tell you exactly which tools you will need, how long the build will take for your specific case, and answer every question you have. No pitch. No pressure.",
  },
];

export function NewFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="faq" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#26f7b2]/[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {isMobile ? (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black tracking-tight text-white mb-3">
              Frequently Asked <span className="text-[#26f7b2]">Questions</span>
            </h2>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              Frequently Asked <span className="text-[#26f7b2]">Questions</span>
            </h2>
          </motion.div>
        )}

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="glass rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-sm md:text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#26f7b2]/20 text-[#26f7b2]"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-0 text-slate-400 text-[13px] md:text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
