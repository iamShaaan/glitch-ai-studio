"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  ExternalLink,
  Loader2,
  Mail,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface BookingFormInputs {
  name: string;
  email: string;
  message: string;
}

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

let calScriptPromise: Promise<void> | null = null;

function loadCalEmbedScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (calScriptPromise) {
    return calScriptPromise;
  }

  calScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(CAL_SCRIPT_ID) as
      | HTMLScriptElement
      | null;

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

function buildCalLink(rawLink?: string) {
  if (!rawLink) return "";

  return rawLink
    .replace(/^https?:\/\/(?:www\.)?cal\.com\//, "")
    .replace(/^\/+/, "")
    .trim();
}

function BackupInquiryForm({
  defaultName,
  defaultEmail,
}: {
  defaultName: string;
  defaultEmail: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormInputs>({
    defaultValues: {
      name: defaultName,
      email: defaultEmail,
      message: "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: BookingFormInputs) => {
    setSubmitting(true);
    try {
      let locationStr = "Unknown Location";

      try {
        const ipRes = await fetch("https://api.db-ip.com/v2/free/self", {
          signal: AbortSignal.timeout(5000),
        });
        const ipData = await ipRes.json();
        if (ipData.city && ipData.countryName) {
          locationStr = `${ipData.city}, ${ipData.countryName}`;
        }
      } catch (locErr) {
        console.warn("Could not fetch location:", locErr);
      }

      const payload = {
        name: data.name,
        email: data.email,
        message: data.message,
        timestamp: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        pageSource:
          typeof window !== "undefined" ? window.location.href : "Unknown",
        location: locationStr,
      };

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

      if (!webhookUrl) {
        console.error(
          "[LandingForm] NEXT_PUBLIC_N8N_WEBHOOK_URL is not set. Check your .env.local or Vercel environment variables."
        );
        toast.error("Configuration error. Please contact us directly.");
        setSubmitting(false);
        return;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown server error");
        console.error(
          `[LandingForm] Webhook responded with ${res.status}: ${errorText}`
        );
        throw new Error(`Server responded with ${res.status}`);
      }

      setSuccess(true);
      toast.success("Message received.");
      setTimeout(() => {
        setSuccess(false);
        reset({
          name: defaultName,
          email: defaultEmail,
          message: "",
        });
      }, 5000);
    } catch (error) {
      console.error("[LandingForm] Submission error:", error);
      if (error instanceof Error && error.name === "TimeoutError") {
        toast.error("Request timed out. Please check your connection and try again.");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all duration-300";
  const labelClasses =
    "text-xs font-medium text-slate-400 flex items-center gap-2 mb-1.5";

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] px-6 py-10 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">Message Received</h3>
        <p className="max-w-sm text-sm text-slate-400">
          We&apos;ve got your details and will reach out directly if email works
          better than a booked slot.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
        <div>
          <label className={labelClasses}>
            <User className="h-3.5 w-3.5 text-emerald-500" />
            Full Name
          </label>
          <input
            type="text"
            autoComplete="name"
            {...register("name", { required: "Name is required" })}
            className={inputClasses}
            placeholder="John Doe"
          />
          {errors.name && (
            <span className="mt-1 block text-xs text-red-400">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label className={labelClasses}>
            <Mail className="h-3.5 w-3.5 text-emerald-500" />
            Email Address
          </label>
          <input
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={inputClasses}
            placeholder="john@example.com"
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className={labelClasses}>
          <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
          What do you need help with?
        </label>
        <textarea
          {...register("message", {
            required: "Message is required",
          })}
          className={`${inputClasses} min-h-[120px] resize-none`}
          placeholder="Tell us what you want to build or automate..."
        />
        {errors.message && (
          <span className="mt-1 block text-xs text-red-400">
            {errors.message.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-emerald-500 py-4 text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            Send Manual Inquiry
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-slate-600">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}

export function LandingForm() {
  const searchParams = useSearchParams();
  const embedRef = useRef<HTMLDivElement | null>(null);
  const [prefillName, setPrefillName] = useState("");
  const [prefillEmail, setPrefillEmail] = useState("");
  const [showBackupForm, setShowBackupForm] = useState(false);
  const [embedStatus, setEmbedStatus] = useState<CalEmbedStatus>("idle");

  const deferredName = useDeferredValue(prefillName.trim());
  const deferredEmail = useDeferredValue(prefillEmail.trim());

  const calLink = useMemo(
    () => buildCalLink(process.env.NEXT_PUBLIC_CAL_LINK),
    []
  );

  const utmConfig = useMemo(() => {
    const source = searchParams.get("utm_source");
    const medium = searchParams.get("utm_medium");
    const campaign = searchParams.get("utm_campaign");
    const term = searchParams.get("utm_term");
    const content = searchParams.get("utm_content");

    return {
      ...(source ? { utm_source: source } : {}),
      ...(medium ? { utm_medium: medium } : {}),
      ...(campaign ? { utm_campaign: campaign } : {}),
      ...(term ? { utm_term: term } : {}),
      ...(content ? { utm_content: content } : {}),
    };
  }, [searchParams]);

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
          ...(deferredName ? { name: deferredName } : {}),
          ...(deferredEmail ? { email: deferredEmail } : {}),
          ...(typeof window !== "undefined"
            ? {
                "metadata[sourcePage]": window.location.href,
                "metadata[sourceSection]": "contact",
              }
            : {}),
          ...utmConfig,
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
  }, [calLink, deferredEmail, deferredName, utmConfig]);

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
            Pick a time instantly on our calendar for a 15-minute Google Meet
            consultation about AI avatar creation. If you&apos;d rather message us
            first, the manual inquiry form is still right below.
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

            <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-8">
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center gap-2 text-white">
                    <CalendarDays className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
                      Booking Snapshot
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <p>Event: Consultation about AI Avatar Creation</p>
                    <p>Duration: 15 minutes</p>
                    <p>Location: Google Meet</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    Speed up your booking
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-slate-500">
                    These fields are optional. If you add them here, we pass them
                    into Cal.com and your booking form starts prefilled.
                  </p>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-400">
                        <User className="h-3.5 w-3.5 text-emerald-500" />
                        Full Name
                      </span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={prefillName}
                        onChange={(event) => setPrefillName(event.target.value)}
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all duration-300 focus:border-emerald-500/50 focus:bg-white/[0.05] focus:outline-none"
                        placeholder="John Doe"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Mail className="h-3.5 w-3.5 text-emerald-500" />
                        Email Address
                      </span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={prefillEmail}
                        onChange={(event) => setPrefillEmail(event.target.value)}
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all duration-300 focus:border-emerald-500/50 focus:bg-white/[0.05] focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="min-w-0">
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

                  {!calLink || embedStatus === "error" ? (
                    <div className="flex min-h-[760px] flex-col items-center justify-center px-6 text-center">
                      <h3 className="mb-3 text-xl font-semibold text-white">
                        Calendar unavailable right now
                      </h3>
                      <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
                        Add `NEXT_PUBLIC_CAL_LINK` to enable the inline scheduler,
                        or use the direct booking page while we keep the manual
                        inquiry form available below.
                      </p>
                      <a
                        href="https://cal.com/soumitro-halder-shan-ltvmbb/consultation-about-ai-avatar-creation"
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
            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Prefer to message us instead?
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Keep Cal.com as the fast path, or open the backup inquiry form
                    if you want us to review your needs first.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBackupForm((current) => !current)}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-500/30 hover:text-emerald-300"
                >
                  {showBackupForm ? "Hide Manual Inquiry" : "Open Manual Inquiry"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {showBackupForm && (
                <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#050d18] p-4 sm:p-5">
                  <BackupInquiryForm
                    key={`${prefillName}:${prefillEmail}`}
                    defaultName={prefillName}
                    defaultEmail={prefillEmail}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
