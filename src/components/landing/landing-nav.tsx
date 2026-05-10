"use client";

import { useState, useEffect, useRef } from "react";
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
import { Menu, X, ArrowRight } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

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

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Focus trap + Escape close while overlay is open
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const overlay = overlayRef.current;
      if (!overlay) return;

      const focusables = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const closeOverlay = () => {
    setIsOpen(false);
    triggerButtonRef.current?.focus();
  };

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
                  // Mobile bar: hamburger / logo / CTA
                  <div className="flex items-center gap-3">
                    <button
                      ref={triggerButtonRef}
                      type="button"
                      onClick={() => setIsOpen(true)}
                      aria-label="Open menu"
                      aria-expanded={isOpen}
                      aria-controls="mobile-nav-overlay"
                      className="text-white/80 hover:text-white p-2 -ml-1 cursor-pointer"
                    >
                      <Menu className="w-5 h-5" />
                    </button>

                    <Link
                      href="/"
                      className="flex-1 flex justify-center items-center group"
                    >
                      <div className="relative w-32 h-9">
                        <Image
                          src="/logo.png"
                          alt="Glitch AI Studio"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </Link>

                    <a
                      href={CAL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border border-[#26f7b2]/40 bg-[#26f7b2]/15 text-[#d3edea] text-xs font-semibold rounded-full whitespace-nowrap"
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

      {/* Mobile fullscreen overlay drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="relative w-32 h-9">
                <Image
                  src="/logo.png"
                  alt="Glitch AI Studio"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeOverlay}
                aria-label="Close menu"
                className="text-white/80 hover:text-white p-2 -mr-1 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.name}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-3xl font-bold text-white hover:text-[#26f7b2] transition-colors cursor-pointer"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-[#26f7b2] text-[#09333f] text-base font-bold rounded-full active:scale-95 transition-transform shadow-[0_0_20px_rgba(38,247,178,0.25)] flex items-center justify-center gap-2"
              >
                Book a 15-Min Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
