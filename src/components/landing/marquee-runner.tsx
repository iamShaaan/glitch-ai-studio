"use client";

export function MarqueeRunner() {
  const phrase =
    "NO CAMERAS ✦ ZERO STUDIO RENTALS ✦ VIRAL PERFORMANCE ADS ✦ 100% DIGITAL TWIN SYNTHESIS ✦ SCRIPT TO 4K REEL IN 24H ✦ GLOBAL MULTI-LANGUAGE LIPSYNC ✦ ";

  return (
    <div className="w-full bg-[#c3f400] text-[#161e00] py-3 overflow-hidden shadow-[0_0_24px_rgba(195,244,0,0.25)] select-none border-y border-[#c3f400]">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-8 font-anton text-xl sm:text-2xl uppercase tracking-[0.035em]">
          <span>{phrase}</span>
          <span>{phrase}</span>
          <span>{phrase}</span>
          <span>{phrase}</span>
        </div>
      </div>
    </div>
  );
}
