"use client";

import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  { name: "Fiverr", href: "https://www.fiverr.com/soumitrohalder" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "X", href: "https://x.com" },
];

export function LandingFooter() {
  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#020408]" />

      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="relative w-40 h-12">
              <Image
                src="/logo.png"
                alt="Glitch AI Studio"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-slate-600 text-xs">
              AI Avatar & Automation Studio — Global. Remote. Distributed.
            </p>
          </div>

          {/* Social & Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors text-xs font-medium"
                  >
                    {link.name}
                  </a>
                  {index < socialLinks.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                  )}
                </span>
              ))}
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span>© {new Date().getFullYear()} Glitch AI Studio</span>
              <span className="w-1 h-1 rounded-full bg-slate-800" />
              <Link href="/privacy" className="hover:text-slate-400 transition-colors">
                Privacy
              </Link>
              <span className="w-1 h-1 rounded-full bg-slate-800" />
              <Link href="/terms" className="hover:text-slate-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
