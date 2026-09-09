"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const CAL_LINK =
  "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Showcase", href: "#showcase" },
  { name: "Pipeline", href: "#pipeline" },
  { name: "Pricing", href: "#pricing" },
];

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-[#262933]">
      <div className="h-16 sm:h-18 md:h-20 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo - Perfectly level with button on mobile, tab, and desktop */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative h-7 w-[114px] sm:h-8 sm:w-[130px] md:h-9 md:w-[146px] lg:h-[38px] lg:w-[154px] shrink-0 transition-transform duration-200 group-hover:scale-[1.02]">
            <Image
              src="/logo.png?v=2"
              alt="Glitch AI Studio"
              fill
              priority
              unoptimized
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-space text-sm font-normal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#a1a1aa] hover:text-[#c3f400] transition-colors duration-200 tracking-wide font-normal"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle - Minimized on mobile, level with logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-[#c3f400] text-[#161e00] font-mono-tech text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_18px_rgba(195,244,0,0.25)] cursor-pointer"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center text-white hover:text-[#c3f400] transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0c] border-b border-[#262933] px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-anton text-2xl uppercase tracking-[0.035em] text-white hover:text-[#c3f400] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#262933] flex flex-col gap-3">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3.5 rounded-full bg-[#c3f400] text-[#161e00] font-mono-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(195,244,0,0.35)] cursor-pointer"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
