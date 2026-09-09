"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Who will I be working with?",
    answer:
      "You work 100% directly with me, Soumitro Halder Shan. I am an independent solopreneur. There are no teammates, junior account managers, or agency middlemen. Every digital twin, autonomous video agent, and performance ad creative is personally engineered, trained, and delivered by me.",
  },
  {
    question: "How does the pricing structure work?",
    answer:
      "Avatar training is a one-time $200 investment for your digital twin and cloned voice. If you want an ongoing autonomous self-serve video engine to generate videos with your avatar on autopilot, the agent setup is a one-time $1,000 fee. For direct done-for-you performance ad campaigns and viral UGC video production, I charge a transparent hourly rate of $15 per hour.",
  },
  {
    question: "Who owns the avatar and generated videos?",
    answer:
      "You do. 100% completely. The models, voice clones, and video assets are trained on your credentials and delivered to you with full commercial IP rights. You retain complete ownership and copyright control. I have zero claim to your likeness.",
  },
  {
    question: "How does the $1,000 autonomous AI video agent work?",
    answer:
      "It is an autonomous self-service production engine trained on your avatar. Once configured, you can independently create continuous video content on autopilot without manual editing. You simply enter prompts or scripts, and the agent directs your avatar, styles the scene, adds captions, and renders ready-to-publish reels.",
  },
  {
    question: "How does the $15/hour AI ads and UGC service work?",
    answer:
      "For founders and brands wanting hands-off performance creative, I produce high-converting Meta, TikTok, and YouTube video ads at $15/hr. This includes dynamic hook variations, script engineering, UGC styling, and creative split-tests with rapid 24 to 48-hour turnarounds and zero bloated agency retainers.",
  },
  {
    question: "Do I need to keep filming myself on camera?",
    answer:
      "Never again. That is the core advantage. Once your avatar is trained, it handles all visual presentation, gestures, and voice synthesis. You only write, approve, or prompt your scripts.",
  },
  {
    question: "Where can I see reviews from past clients?",
    answer:
      "You can inspect my verified client ratings, completed contracts, and unedited reviews directly on my Upwork, Fiverr, and Contra profiles linked in the verified ratings section on this page.",
  },
  {
    question: "What happens during the 15-minute strategy call?",
    answer:
      "We discuss your content goals, audience, and whether you need avatar training ($200), an autonomous self-serve video agent ($1,000), or performance ad production ($15/hr). You talk directly with me, Soumitro Halder Shan. No pitch, no agency middlemen, no pressure.",
  },
];

export function NewFAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const col1 = faqs.slice(0, 4);
  const col2 = faqs.slice(4, 8);

  const renderFAQCard = (faq: (typeof faqs)[0], index: number) => {
    const isOpen = openIndices.includes(index);

    return (
      <div
        key={index}
        className={`rounded-xl transition-all duration-200 overflow-hidden border ${
          isOpen
            ? "bg-[#131315] border-[#c3f400]/30 shadow-[0_0_20px_rgba(195,244,0,0.06)]"
            : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
        }`}
      >
        <button
          onClick={() => toggleIndex(index)}
          className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <span className="font-anton text-xs sm:text-[14px] uppercase text-white tracking-[0.03em] leading-snug">
            {faq.question}
          </span>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isOpen
                ? "bg-[#c3f400] text-[#161e00]"
                : "bg-white/[0.05] text-[#8e92a4]"
            }`}
          >
            {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </div>
        </button>

        {isOpen && (
          <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-[11px] sm:text-xs font-space text-[#a1a1aa] font-normal leading-relaxed border-t border-white/[0.06] pt-2.5">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="w-full py-12 md:py-16 bg-[#0e0e10] border-b border-[#262933]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Middle-Aligned Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1b1d] border border-[#2a2a2c] mb-2.5">
            <HelpCircle className="w-3 h-3 text-[#c3f400]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#c3f400] font-bold">
              SYSTEM FAQ
            </span>
          </div>
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.035em] text-white mb-2 whitespace-nowrap">
            FREQUENT QUESTIONS
          </h2>
          <p className="font-space text-xs text-[#8e92a4] max-w-lg mx-auto leading-relaxed">
            Everything you need to know about avatar ownership, self-serve video agents, and ad sprints.
          </p>
        </div>

        {/* 2-Column Split Layout to dramatically cut section height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {col1.map((faq, i) => renderFAQCard(faq, i))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {col2.map((faq, i) => renderFAQCard(faq, i + 4))}
          </div>
        </div>
      </div>
    </section>
  );
}
