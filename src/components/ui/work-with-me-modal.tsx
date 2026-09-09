"use client";

import { useEffect } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  url: string;
  accentBorder: string;
  accentBg: string;
  hoverGlow: string;
  renderLogo: () => React.ReactNode;
}

interface WorkWithMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContraLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1C1B1D" />
      <path
        d="M12 4C12 8.418 8.418 12 4 12C8.418 12 12 15.582 12 20C12 15.582 15.582 12 20 12C15.582 12 12 8.418 12 4Z"
        fill="#FF5C35"
      />
    </svg>
  );
}

export function UpworkLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1C1B1D" />
      <path
        d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
        fill="#14A800"
        transform="scale(0.7) translate(5, 5)"
      />
    </svg>
  );
}

export function FiverrLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1C1B1D" />
      <path
        d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"
        fill="#1DBF73"
        transform="scale(0.7) translate(5, 5)"
      />
    </svg>
  );
}

const PLATFORMS: Platform[] = [
  {
    id: "contra",
    name: "Contra",
    badge: "0% Commission • Direct Contracts",
    badgeColor: "text-[#FF5C35] bg-[#FF5C35]/10 border-[#FF5C35]/30",
    description: "Independent freelance platform with transparent scope, flexible milestones, and direct checkout.",
    url: "https://contra.com/soumitrohaldershan",
    accentBorder: "hover:border-[#FF5C35]/60",
    accentBg: "group-hover:bg-[#FF5C35]/5",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(255,92,53,0.15)]",
    renderLogo: () => <ContraLogo className="w-10 h-10 shrink-0" />,
  },
  {
    id: "upwork",
    name: "Upwork",
    badge: "Top Rated • Escrow Protection",
    badgeColor: "text-[#14A800] bg-[#14A800]/10 border-[#14A800]/30",
    description: "Enterprise & startup contracts, verified reviews, hourly tracking, and milestone escrow security.",
    url: "https://www.upwork.com/freelancers/~0167ccf23b8c42a887?mp_source=share",
    accentBorder: "hover:border-[#14A800]/60",
    accentBg: "group-hover:bg-[#14A800]/5",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(20,168,0,0.15)]",
    renderLogo: () => <UpworkLogo className="w-10 h-10 shrink-0" />,
  },
  {
    id: "fiverr",
    name: "Fiverr",
    badge: "Direct Gigs • Instant Booking",
    badgeColor: "text-[#1DBF73] bg-[#1DBF73]/10 border-[#1DBF73]/30",
    description: "Fixed-scope video packages, instant order placement, commercial rights, and streamlined delivery.",
    url: "https://www.fiverr.com/s/bk9QK5Y",
    accentBorder: "hover:border-[#1DBF73]/60",
    accentBg: "group-hover:bg-[#1DBF73]/5",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(29,191,115,0.15)]",
    renderLogo: () => <FiverrLogo className="w-10 h-10 shrink-0" />,
  },
];

export function WorkWithMeModal({ isOpen, onClose }: WorkWithMeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Floating Modal Window */}
      <div
        className="relative z-10 w-full max-w-xl rounded-3xl bg-white dark:bg-[#131315] border border-zinc-200 dark:border-[#262933] shadow-2xl p-6 sm:p-8 flex flex-col gap-6 overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Accent Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-40 bg-emerald-500/[0.08] dark:bg-[#c3f400]/[0.08] blur-[80px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-72 h-40 bg-blue-500/[0.04] blur-[80px] pointer-events-none rounded-full" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-[#201f21]">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-[#c3f400] animate-pulse" />
              <span className="font-mono-tech text-xs uppercase tracking-widest text-emerald-700 dark:text-[#c3f400] font-bold">
                DIRECT SOLOPRENEUR COLLABORATION
              </span>
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-[0.035em] text-zinc-900 dark:text-white leading-none">
              WORK DIRECTLY WITH SHAN
            </h2>
            <p className="font-space text-xs sm:text-sm text-zinc-600 dark:text-[#a1a1aa] font-normal leading-relaxed">
              Work 100% directly with Soumitro Halder Shan — solopreneur. Select your preferred platform for escrow protection or direct hire:
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-[#1c1b1d] border border-zinc-200 dark:border-[#2a2a2c] flex items-center justify-center text-zinc-500 dark:text-[#a1a1aa] hover:text-zinc-900 dark:hover:text-white hover:border-emerald-500/50 dark:hover:border-[#c3f400]/50 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Platform Buttons List */}
        <div className="relative z-10 flex flex-col gap-3.5">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-zinc-50 dark:bg-[#1c1b1d] border border-zinc-200 dark:border-[#262933] ${platform.accentBorder} ${platform.accentBg} ${platform.hoverGlow} transition-all duration-300 cursor-pointer shadow-xs`}
            >
              <div className="flex items-center gap-4">
                {platform.renderLogo()}

                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="font-anton text-lg sm:text-xl uppercase text-zinc-900 dark:text-white tracking-[0.035em] group-hover:text-emerald-700 dark:group-hover:text-[#c3f400] transition-colors">
                      {platform.name}
                    </span>
                    <span
                      className={`font-mono-tech text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${platform.badgeColor}`}
                    >
                      {platform.badge}
                    </span>
                  </div>

                  <p className="font-space text-xs text-zinc-600 dark:text-[#a1a1aa] font-light leading-snug line-clamp-2 max-w-sm">
                    {platform.description}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white dark:bg-[#131315] border border-zinc-200 dark:border-[#262933] flex items-center justify-center text-zinc-500 dark:text-[#a1a1aa] group-hover:text-white dark:group-hover:text-[#161e00] group-hover:bg-emerald-600 dark:group-hover:bg-[#c3f400] group-hover:border-emerald-600 dark:group-hover:border-[#c3f400] transition-all shrink-0 ml-2 shadow-xs">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Modal Footer Assurance */}
        <div className="relative z-10 pt-3 border-t border-zinc-200 dark:border-[#201f21] flex items-center justify-between text-[11px] font-mono-tech text-zinc-600 dark:text-[#a1a1aa]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c3f400]" />
            <span>Fast response on all platforms</span>
          </div>
          <span className="text-zinc-500 dark:text-[#8e92a4]">100% Secure Checkout</span>
        </div>
      </div>
    </div>
  );
}
