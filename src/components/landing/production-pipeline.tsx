"use client";

export function ProductionPipeline() {
  return (
    <section
      id="pipeline"
      className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-[#0e0e10] border-b border-zinc-200 dark:border-[#262933] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* Middle-Aligned Section Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2.5">
          <span className="font-mono-tech text-[10px] uppercase text-emerald-700 dark:text-[#c3f400] tracking-widest font-bold">
            PRODUCTION PIPELINE
          </span>
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-zinc-900 dark:text-white tracking-[0.035em] whitespace-nowrap">
            ONE SETUP. LIFETIME REELS.
          </h2>
          <p className="font-space text-xs md:text-sm text-zinc-500 dark:text-[#a1a1aa] max-w-lg mx-auto font-normal leading-relaxed tracking-wide">
            Say goodbye to script anxiety and shoot-day logistics. My autonomous pipeline trains once and renders continuously.
          </p>
        </div>

        {/* 3 Minimalist Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 01 */}
          <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-[#131315] border border-zinc-200 dark:border-[#262933] flex flex-col justify-between h-full gap-6 relative overflow-hidden group hover:border-emerald-600/40 dark:hover:border-[#c3f400]/40 transition-all duration-300 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between">
              <span className="font-anton text-4xl md:text-5xl text-zinc-300 dark:text-[#353437] group-hover:text-emerald-700 dark:group-hover:text-[#c3f400] transition-colors">
                01
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-[#1c1b1d] border border-zinc-200 dark:border-[#2a2a2c] font-mono-tech text-[9px] uppercase tracking-widest text-zinc-600 dark:text-[#a1a1aa]">
                INGESTION
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-anton text-base sm:text-lg uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                SEND SAMPLES OR AD BRIEF
              </h3>
              <p className="font-space text-xs md:text-[13px] text-zinc-500 dark:text-[#a1a1aa] font-normal leading-relaxed tracking-wide">
                Submit a 2-minute smartphone video, voice audio, or your advertising campaign brief. No expensive studio set or camera crew required.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-[#131315] border border-zinc-200 dark:border-[#262933] flex flex-col justify-between h-full gap-6 relative overflow-hidden group hover:border-emerald-600/40 dark:hover:border-[#c3f400]/40 transition-all duration-300 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between">
              <span className="font-anton text-4xl md:text-5xl text-zinc-300 dark:text-[#353437] group-hover:text-emerald-700 dark:group-hover:text-[#c3f400] transition-colors">
                02
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-[#1c1b1d] border border-zinc-200 dark:border-[#2a2a2c] font-mono-tech text-[9px] uppercase tracking-widest text-zinc-600 dark:text-[#a1a1aa]">
                SYNTHESIS
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-anton text-base sm:text-lg uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                TRAIN AVATAR &amp; AGENT
              </h3>
              <p className="font-space text-xs md:text-[13px] text-zinc-500 dark:text-[#a1a1aa] font-normal leading-relaxed tracking-wide">
                I train your digital clone ($200) or configure your autonomous video agent ($1,000) with natural lip-sync, gestures, and zero-latency voice.
              </p>
            </div>
          </div>

          {/* Step 03 - Highlighted */}
          <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-[#131315] border border-emerald-600/50 dark:border-[#c3f400]/40 flex flex-col justify-between h-full gap-6 relative overflow-hidden group shadow-[0_4px_24px_rgba(22,163,74,0.12)] dark:shadow-[0_0_30px_rgba(195,244,0,0.12)]">
            <div className="flex items-center justify-between">
              <span className="font-anton text-4xl md:text-5xl text-emerald-700 dark:text-[#c3f400]">
                03
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 dark:bg-[#c3f400] font-mono-tech text-[9px] uppercase tracking-widest text-white dark:text-[#161e00] font-bold">
                DEPLOYMENT
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-anton text-base sm:text-lg uppercase text-zinc-900 dark:text-white tracking-[0.035em]">
                SELF-SERVE OR $15/HR ADS
              </h3>
              <p className="font-space text-xs md:text-[13px] text-zinc-500 dark:text-[#a1a1aa] font-normal leading-relaxed tracking-wide">
                Create videos independently on autopilot with your AI agent, or order done-for-you performance ad campaigns delivered in 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
