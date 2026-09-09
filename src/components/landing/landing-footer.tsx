"use client";

import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/mindfreack007/" },
  { name: "Instagram", href: "https://www.instagram.com/iam_shaaan_/" },
  { name: "X (Twitter)", href: "https://x.com/iam_shaaan_" },
];

export function LandingFooter() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-[#0a0a0c] text-zinc-900 dark:text-[#e5e1e4] border-t border-zinc-200 dark:border-[#262933] transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          {/* Logo & Operational Node Tag */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="relative w-40 h-10 sm:w-48 sm:h-12 shrink-0">
              <Image
                src="/logo.png?v=2"
                alt="Glitch AI Studio"
                fill
                unoptimized
                className="object-contain object-left logo-brand-filter"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-[#c3f400] animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)] dark:shadow-[0_0_12px_rgba(195,244,0,0.8)]" />
              <span className="font-mono-tech text-[10px] uppercase text-zinc-600 dark:text-[#8e92a4]">
                Founded &amp; Operated by Soumitro Halder Shan • Solopreneur
              </span>
            </div>

            <p className="font-space text-[11px] text-zinc-600 dark:text-[#8e92a4] leading-relaxed">
              Built by Soumitro Halder Shan — an independent solopreneur engineering generative AI pipelines, synthetic cinematography, and digital twins for brands worldwide. No teams or agency bloat: 100% direct collaboration.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 font-mono-tech text-[11px]">
            {/* Index */}
            <div className="flex flex-col gap-2.5">
              <span className="font-anton text-xs uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                Index
              </span>
              <a href="#services" className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors">
                Services
              </a>
              <a href="#showcase" className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors">
                Showcase
              </a>
              <a href="#pipeline" className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors">
                Pipeline
              </a>
              <a href="#pricing" className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors">
                Pricing
              </a>
            </div>

            {/* Network */}
            <div className="flex flex-col gap-2.5">
              <span className="font-anton text-xs uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                Network
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-2.5">
              <span className="font-anton text-xs uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                Legal
              </span>
              <Link href="/privacy" className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-600 dark:text-[#8e92a4] hover:text-emerald-700 dark:hover:text-[#c3f400] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 dark:border-[#201f21] font-mono-tech text-[11px] text-zinc-500 dark:text-[#8e92a4]">
          <span>
            © {new Date().getFullYear()} Glitch AI Studio. Engineered for autonomous creative synthesis.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-[#c3f400]" />
            <span>Latency 22ms</span>
            <span>•</span>
            <span>System 99.98%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
