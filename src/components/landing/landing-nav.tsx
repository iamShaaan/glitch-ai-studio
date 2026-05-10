"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLoading } from "@/context/loading-context";

const navLinks = [
  { name: "System", href: "#system-overview" },
  { name: "Pricing", href: "#pricing" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "FAQ", href: "#faq" },
];

const CAL_LINK =
  "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

// Desktop-only: hooks live here so they only mount on desktop, never
// on mobile. Conditional mounting of this component is fine; conditional
// hook calls are not.
function DesktopBookingButton({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Color-shift sequence held per section (yellow → green → teal → yellow)
  const thresholds = [0, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.7, 0.75, 0.85, 0.9, 1];

  const buttonBorder = useTransform(scrollYProgress, thresholds, [
    "rgba(211, 237, 234, 0.4)", "rgba(211, 237, 234, 0.4)",
    "rgba(211, 237, 234, 0.4)", "rgba(211, 237, 234, 0.4)",
    "rgba(38, 247, 178, 0.4)", "rgba(38, 247, 178, 0.4)",
    "rgba(0, 157, 154, 0.4)", "rgba(0, 157, 154, 0.4)",
    "rgba(211, 237, 234, 0.4)", "rgba(211, 237, 234, 0.4)",
    "rgba(38, 247, 178, 0.4)", "rgba(38, 247, 178, 0.4)",
  ]);

  const buttonBg = useTransform(scrollYProgress, thresholds, [
    "rgba(211, 237, 234, 0.15)", "rgba(211, 237, 234, 0.15)",
    "rgba(211, 237, 234, 0.15)", "rgba(211, 237, 234, 0.15)",
    "rgba(38, 247, 178, 0.15)", "rgba(38, 247, 178, 0.15)",
    "rgba(0, 157, 154, 0.15)", "rgba(0, 157, 154, 0.15)",
    "rgba(211, 237, 234, 0.15)", "rgba(211, 237, 234, 0.15)",
    "rgba(38, 247, 178, 0.15)", "rgba(38, 247, 178, 0.15)",
  ]);

  const buttonColor = useTransform(scrollYProgress, thresholds, [
    "rgb(211, 237, 234)", "rgb(211, 237, 234)",
    "rgb(211, 237, 234)", "rgb(211, 237, 234)",
    "rgb(38, 247, 178)", "rgb(38, 247, 178)",
    "rgb(0, 157, 154)", "rgb(0, 157, 154)",
    "rgb(211, 237, 234)", "rgb(211, 237, 234)",
    "rgb(38, 247, 178)", "rgb(38, 247, 178)",
  ]);

  const buttonShadow = useTransform(scrollYProgress, thresholds, [
    "0 0 15px rgba(211,237,234,0.1)", "0 0 15px rgba(211,237,234,0.1)",
    "0 0 15px rgba(211,237,234,0.1)", "0 0 15px rgba(211,237,234,0.1)",
    "0 0 15px rgba(38,247,178,0.1)", "0 0 15px rgba(38,247,178,0.1)",
    "0 0 15px rgba(0,157,154,0.1)", "0 0 15px rgba(0,157,154,0.1)",
    "0 0 15px rgba(211,237,234,0.1)", "0 0 15px rgba(211,237,234,0.1)",
    "0 0 15px rgba(38,247,178,0.1)", "0 0 15px rgba(38,247,178,0.1)",
  ]);

  return (
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
  );
}

export function LandingNav() {
  const { isReady } = useLoading();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    const check = () => {
      const mobile =
        window.innerWidth < 768 ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isReady) return;
    if (!isMobile) setIsVisible(latest > 100);
  });

  // On mobile isVisible is set immediately once ready; on desktop scroll-gated
  useEffect(() => {
    if (isReady && isMobile) setIsVisible(true);
  }, [isReady, isMobile]);

  const scrollToSection = (href: string) => {
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
            <div className="max-w-6xl mx-auto glass-strong rounded-2xl px-4 md:px-6 py-3">
              {isMobile ? (
                // Mobile bar: logo (left) / Book CTA (right)
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href="/"
                    className="flex items-center group shrink-0"
                  >
                    <div className="relative w-28 h-8 sm:w-32 sm:h-9">
                      <Image
                        src="/logo.png"
                        alt="Glitch AI Studio"
                        fill
                        className="object-contain object-left"
                        priority
                      />
                    </div>
                  </Link>

                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 border border-[#26f7b2]/40 bg-[#26f7b2]/15 text-[#d3edea] text-xs font-semibold rounded-full whitespace-nowrap shrink-0"
                  >
                    Book 15-Min Call
                  </a>
                </div>
              ) : (
                // Desktop bar: logo left, nav + CTA right
                <div className="flex items-center justify-between">
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

                    <DesktopBookingButton
                      scrollYProgress={scrollYProgress}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
