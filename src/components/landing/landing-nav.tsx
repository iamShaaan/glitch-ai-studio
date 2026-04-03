"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100);
  });

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
                  <div className="relative w-36 h-10 md:w-48 md:h-12">
                    <Image
                      src="/logo.png"
                      alt="Glitch AI Studio"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                  {navLinks.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-full hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer"
                  >
                    Book a Call
                  </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                  className="md:hidden text-slate-300 p-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              {/* Mobile Nav */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 pt-4 pb-2 border-t border-white/5 mt-3">
                      {navLinks.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className="text-slate-300 hover:text-emerald-400 py-2 text-left transition-colors"
                        >
                          {item.name}
                        </button>
                      ))}
                      <button
                        onClick={() => scrollToSection("#contact")}
                        className="mt-2 px-5 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-center"
                      >
                        Book a Call
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
