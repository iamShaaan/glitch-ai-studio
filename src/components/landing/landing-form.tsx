"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

const DEFAULT_CAL_LINK = "soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

export function LandingForm() {
  const [isLoaded, setIsLoaded] = useState(false);
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || DEFAULT_CAL_LINK;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        hideBranding: true,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#26f7b2",
            "cal-bg": "transparent",
            "cal-text": "#f8fafc",
            "cal-border": "rgba(255,255,255,0.06)",
          },
          light: {
            "cal-brand": "#26f7b2",
            "cal-bg": "#ffffff",
            "cal-text": "#0f172a",
            "cal-border": "#e2e8f0",
          },
        },
      } as any);
      // The Cal component handles loading states, but we can set our own state to
      // trigger after initialization if needed. For now, the embed handles its own spinner.
      setIsLoaded(true);
    })();
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0b2430_0%,#060d11_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#26f7b2]/[0.03] blur-[200px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#009d9a]/[0.02] blur-[150px]" />

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#26f7b2]/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center md:mb-12"
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-[#26f7b2]/15 px-4 py-2">
            <Sparkles className="h-3.5 w-3.5 text-[#26f7b2]" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#d3edea] md:text-xs">
              Instant Booking
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Book Your{" "}
            <span className="text-[#26f7b2]">15-Minute AI Consultation</span>
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-[13px] leading-relaxed text-slate-400 md:text-base">
            Pick a time instantly on our calendar for a 15-minute Google Meet consultation about AI avatar creation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          <div className="animate-border-glow glass relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-8">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#26f7b2]/40 to-transparent" />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
              {!isLoaded && (
                <div className="absolute inset-0 z-10 flex min-h-[400px] items-center justify-center bg-transparent">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-[#26f7b2]" />
                    <p className="text-sm text-slate-400">
                      Loading live availability...
                    </p>
                  </div>
                </div>
              )}

              <div className="w-full -mb-[90px]">
                <Cal
                  calLink={calLink}
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                  config={{ layout: "month_view" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

