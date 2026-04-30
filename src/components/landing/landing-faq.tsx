"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "What is an AI Avatar and how does it work?",
    answer: "An AI avatar is a digital replica of a human that can speak naturally in videos generated from text. We clone your face and voice, allowing you to create limitless video content just by typing a script."
  },
  {
    question: "Do I need to be on camera to create an AI Avatar?",
    answer: "Not necessarily. We can create an avatar based on a short 2-minute training video of you, or we can design a completely brand-new, fictional AI influencer from scratch for your brand."
  },
  {
    question: "What kind of business processes can you automate?",
    answer: "Anything repetitive involving data. We automate lead capture, CRM data entry, personalized cold email outreach, customer support via AI chatbots, and content generation pipelines."
  },
  {
    question: "Can you build custom AI web apps just for my team?",
    answer: "Yes. As a custom AI app studio, we build secure, proprietary internal tools that leverage OpenAI, Claude, or other LLMs tailored specifically to your business logic."
  }
];

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#26f7b2]/[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {isMobile ? (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight text-white mb-4">
              Frequently Asked <span className="text-[#26f7b2]">Questions</span>
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
              Frequently Asked <span className="text-[#26f7b2]">Questions</span>
            </h2>
          </motion.div>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className="glass rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-base md:text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-[#26f7b2]/20 text-[#26f7b2]' : 'bg-white/5 text-slate-400'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                      <div className="px-6 pb-6 pt-0 text-slate-400 text-sm md:text-base leading-relaxed">
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
