"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ContraLogo, FiverrLogo, UpworkLogo } from "@/components/ui/work-with-me-modal";

const platforms = [
  {
    name: "Contra",
    url: "https://contra.com/soumitrohaldershan",
    logo: () => <ContraLogo className="w-4 h-4 shrink-0" />,
    hoverColor: "hover:border-[#FF5C35]/60 hover:text-[#FF5C35] hover:shadow-[0_0_16px_rgba(255,92,53,0.2)]",
    activeText: "group-hover:text-[#FF5C35]",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/s/bk9QK5Y",
    logo: () => <FiverrLogo className="w-4 h-4 shrink-0" />,
    hoverColor: "hover:border-[#1DBF73]/60 hover:text-[#1DBF73] hover:shadow-[0_0_16px_rgba(29,191,115,0.2)]",
    activeText: "group-hover:text-[#1DBF73]",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~0167ccf23b8c42a887?mp_source=share",
    logo: () => <UpworkLogo className="w-4 h-4 shrink-0" />,
    hoverColor: "hover:border-[#14A800]/60 hover:text-[#14A800] hover:shadow-[0_0_16px_rgba(20,168,0,0.2)]",
    activeText: "group-hover:text-[#14A800]",
  },
];

export function VerifiedPlatforms() {
  return (
    <section className="w-full py-4 sm:py-5 bg-[#0a0a0c] border-b border-[#262933] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-center">
          <div className="inline-flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c3f400] shrink-0" />
            <span className="font-space text-xs sm:text-[13px] text-[#8e92a4] font-normal">
              Inspect unedited client reviews directly on:
            </span>
          </div>

          <div className="inline-flex items-center gap-2 sm:gap-2.5">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#131315] border border-[#262933] font-mono-tech text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#e5e1e4] transition-all duration-200 cursor-pointer group ${p.hoverColor}`}
              >
                {p.logo()}
                <span className={`transition-colors ${p.activeText}`}>{p.name}</span>
                <ArrowUpRight className="w-3 h-3 text-[#71717a] group-hover:text-current transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
