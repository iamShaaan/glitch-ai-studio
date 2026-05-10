"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useLoading } from "@/context/loading-context";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "System", href: "#system-overview" },
  { name: "Pricing", href: "#pricing" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "FAQ", href: "#faq" },
];

const CAL_LINK = "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

export function LandingNav() {
  const { isReady } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Button Colors: True Mapping Sequence holding colors per section
  // 0 -> 0.40 : Yellow (Hero & Explore Services)
  // 0.45 -> 0.55 : Green (Services: Infinite Scale)
  // 0.60 -> 0.70 : Purple (Process: Work)
  // 0.75 -> 0.85 : Yellow (Proof: Fiverr Stars)
  // 0.90 -> 1.00 : Green (Form: Consultation)
  
  const thresholds = [0, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.7, 0.75, 0.85, 0.9, 1];

  const buttonBorder = useTransform(
    scrollYProgress,
    thresholds,
    [
      "rgba(211, 237, 234, 0.4)", "rgba(211, 237, 234, 0.4)", // Y
      "rgba(211, 237, 234, 0.4)", "rgba(211, 237, 234, 0.4)", // Y
      "rgba(38, 247, 178, 0.4)", "rgba(38, 247, 178, 0.4)", // G
      "rgba(0, 157, 154, 0.4)", "rgba(0, 157, 154, 0.4)", // P
      "rgba(211, 237, 234, 0.4)", "rgba(211, 237, 234, 0.4)", // Y
      "rgba(38, 247, 178, 0.4)", "rgba(38, 247, 178, 0.4)", // G
    ]
  );
  
  const buttonBg = useTransform(
    scrollYProgress,
    thresholds,
    [
      "rgba(211, 237, 234, 0.15)", "rgba(211, 237, 234, 0.15)", // Y
      "rgba(211, 237, 234, 0.15)", "rgba(211, 237, 234, 0.15)", // Y
      "rgba(38, 247, 178, 0.15)", "rgba(38, 247, 178, 0.15)", // G
      "rgba(0, 157, 154, 0.15)", "rgba(0, 157, 154, 0.15)", // P
      "rgba(211, 237, 234, 0.15)", "rgba(211, 237, 234, 0.15)", // Y
      "rgba(38, 247, 178, 0.15)", "rgba(38, 247, 178, 0.15)", // G
    ]
  );
  
  const buttonColor = useTransform(
    scrollYProgress,
    thresholds,
    [
      "rgb(211, 237, 234)", "rgb(211, 237, 234)", // Y
      "rgb(211, 237, 234)", "rgb(211, 237, 234)", // Y
      "rgb(38, 247, 178)", "rgb(38, 247, 178)", // G
      "rgb(0, 157, 154)", "rgb(0, 157, 154)", // P
      "rgb(211, 237, 234)", "rgb(211, 237, 234)", // Y
      "rgb(38, 247, 178)", "rgb(38, 247, 178)", // G
    ]
  );
  
  const buttonShadow = useTransform(
    scrollYProgress,
    thresholds,
    [
      "0 0 15px rgba(211,237,234,0.1)", "0 0 15px rgba(211,237,234,0.1)", // Y
      "0 0 15px rgba(211,237,234,0.1)", "0 0 15px rgba(211,237,234,0.1)", // Y
      "0 0 15px rgba(38,247,178,0.1)", "0 0 15px rgba(38,247,178,0.1)", // G
      "0 0 15px rgba(0,157,154,0.1)", "0 0 15px rgba(0,157,154,0.1)", // P
      "0 0 15px rgba(211,237,234,0.1)", "0 0 15px rgba(211,237,234,0.1)", // Y
      "0 0 15px rgba(38,247,178,0.1)", "0 0 15px rgba(38,247,178,0.1)", // G
    ]
  );

  // Link Colors: Starts Emerald, then Violet, then Amber
  const linkColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgb(38, 247, 178)", // mint
      "rgb(0, 157, 154)", // teal
      "rgb(211, 237, 234)", // light mint
    ]
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      // Do NOT set isVisible here — that is gated on isReady below
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only start tracking scroll after site is fully revealed
    if (!isReady) return;
    if (!isMobile) setIsVisible(latest > 100);
  });

  // On mobile isVisible is set immediately; on desktop we need isReady first
  useEffect(() => {
    if (isReady && isMobile) setIsVisible(true);
  }, [isReady, isMobile]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 w-full z-50"
        >
          <div className="mx-4 mt-3">
            <div className="max-w-6xl mx-auto glass-strong rounded-2xl px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="relative w-44 h-12 md:w-64 md:h-16">
                    <Image
                      src="/logo.png"
                      alt="Glitch AI Studio"
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                </Link>

                <div className="flex items-center gap-6">
                  {/* Desktop Nav Links */}
                  <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="text-sm font-medium text-white/80 hover:text-white transition-all cursor-pointer hover:-translate-y-0.5"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>

                  {/* Booking button — opens Cal.com in a new tab */}
                  {isMobile ? (
                    <a
                      href={CAL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 border border-[#26f7b2]/40 bg-[#26f7b2]/15 text-[#d3edea] text-xs font-semibold rounded-full whitespace-nowrap"
                    >
                      Book 15-Min Call
                    </a>
                  ) : (
                    <motion.a
                      href={CAL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: buttonBg,
                        borderColor: buttonBorder,
                        color: buttonColor,
                        boxShadow: buttonShadow,
                      }}
                      className="px-4 py-1.5 md:px-5 md:py-2 border text-xs md:text-sm font-semibold rounded-full hover:brightness-125 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Book 15-Min Call
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Mobile disclaimer — inline inside the card, not a separate strip */}
              <div className="md:hidden mt-2 border-t border-white/5 pt-2">
                <p className="text-center text-[9px] text-slate-500 tracking-wide">
                  ✦ Visit from desktop for a complete visual experience ✦
                </p>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
