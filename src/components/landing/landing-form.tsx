"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, Sparkles } from "lucide-react";

type CalEmbedStatus = "idle" | "loading" | "ready" | "error";

declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, (...args: unknown[]) => void>;
      q?: unknown[][];
    };
  }
}

const CAL_SCRIPT_ID = "cal-embed-script";
const CAL_NAMESPACE = "glitchAiStudioConsultation";
const DEFAULT_CAL_LINK = "soumitro-halder-shan-ltvmbb/consultation-about-ai-avatar-creation";

let calScriptPromise: Promise<void> | null = null;

function loadCalEmbedScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (calScriptPromise) {
    return calScriptPromise;
  }

  calScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(CAL_SCRIPT_ID) as HTMLScriptElement | null;
    const finalize = () => resolve();
    const fail = () => reject(new Error("Failed to load Cal.com embed script."));

    if (!window.Cal) {
      ((C, A, L) => {
        const push = (api: { q?: unknown[][] }, args: unknown[]) => {
          api.q = api.q || [];
          api.q.push(args);
        };

        const d = C.document;

        C.Cal =
          C.Cal ||
          function (...args: unknown[]) {
            const cal = C.Cal;
            if (!cal) return;

            if (!cal.loaded) {
              cal.ns = cal.ns || {};
              cal.q = cal.q || [];

              const script = d.createElement("script");
              script.src = A;
              script.async = true;
              script.id = CAL_SCRIPT_ID;
              script.addEventListener("load", finalize, { once: true });
              script.addEventListener("error", fail, { once: true });
              d.head.appendChild(script);
              cal.loaded = true;
            }

            if (args[0] === L) {
              const api = function (...apiArgs: unknown[]) {
                push(api as { q?: unknown[][] }, apiArgs);
              };

              const namespace = args[1];
              (api as { q?: unknown[][] }).q = (api as { q?: unknown[][] }).q || [];

              if (typeof namespace === "string") {
                cal.ns![namespace] = cal.ns![namespace] || api;
                push(cal.ns![namespace] as { q?: unknown[][] }, args);
                push(cal, ["initNamespace", namespace]);
              } else {
                push(cal, args);
              }

              return;
            }

            push(cal, args);
          };
      })(window, "https://app.cal.com/embed/embed.js", "init");
    }

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        finalize();
        return;
      }

      existingScript.addEventListener(
        "load",
        () => {
          existingScript.dataset.loaded = "true";
          finalize();
        },
        { once: true }
      );
      existingScript.addEventListener("error", fail, { once: true });
      return;
    }

    const script = document.getElementById(CAL_SCRIPT_ID) as HTMLScriptElement | null;
    if (script) {
      script.addEventListener(
        "load",
        () => {
          script.dataset.loaded = "true";
          finalize();
        },
        { once: true }
      );
      script.addEventListener("error", fail, { once: true });
    } else if (window.Cal?.loaded) {
      finalize();
    }
  });

  return calScriptPromise;
}

export function LandingForm() {
  const embedRef = useRef<HTMLDivElement | null>(null);
  const [embedStatus, setEmbedStatus] = useState<CalEmbedStatus>("idle");

  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || DEFAULT_CAL_LINK;

  useEffect(() => {
    if (!calLink || !embedRef.current) {
      return;
    }

    let cancelled = false;
    const container = embedRef.current;

    const renderEmbed = async () => {
      setEmbedStatus("loading");

      try {
        await loadCalEmbedScript();
        if (cancelled || !window.Cal?.ns) return;

        container.innerHTML = "";

        const config = {
          layout: "month_view",
          ...(typeof window !== "undefined"
            ? {
                "metadata[sourcePage]": window.location.href,
                "metadata[sourceSection]": "contact",
              }
            : {}),
        };

        window.Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
        window.Cal.ns[CAL_NAMESPACE]?.("inline", {
          elementOrSelector: container,
          calLink,
          config,
        });
        window.Cal.ns[CAL_NAMESPACE]?.("ui", {
          layout: "month_view",
          theme: "dark",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#34d399",
              "cal-bg": "#07111f",
              "cal-text": "#f8fafc",
              "cal-border": "#1f3a4d",
            },
          },
        });

        if (!cancelled) {
          setEmbedStatus("ready");
        }
      } catch (error) {
        console.error("[LandingForm] Failed to initialize Cal.com embed:", error);
        if (!cancelled) {
          setEmbedStatus("error");
        }
      }
    };

    renderEmbed();

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [calLink]);

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0a1628_0%,#030712_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[200px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/[0.02] blur-[150px]" />

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center md:mb-12"
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/15 px-4 py-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-300 md:text-xs">
              Instant Booking
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Book Your{" "}
            <span className="text-emerald-400">15-Minute AI Consultation</span>
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
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#07111f]">
              {(embedStatus === "loading" || embedStatus === "idle") && (
                <div className="absolute inset-0 z-10 flex min-h-[760px] items-center justify-center bg-[#07111f]/90">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
                    <p className="text-sm text-slate-400">
                      Loading live availability...
                    </p>
                  </div>
                </div>
              )}

              {embedStatus === "error" ? (
                <div className="flex min-h-[760px] flex-col items-center justify-center px-6 text-center">
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    Calendar unavailable right now
                  </h3>
                  <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
                    We could not load the inline scheduler. Please try booking directly.
                  </p>
                  <a
                    href={`https://cal.com/${calLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400/50 hover:bg-emerald-500/15"
                  >
                    Open Cal.com Booking Page
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <div ref={embedRef} className="min-h-[760px] w-full" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

