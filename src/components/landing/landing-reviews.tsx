"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const TOTAL_REVIEWS = 63;
const allReviews = Array.from({ length: TOTAL_REVIEWS }, (_, i) => ({
  src: `/reviews/review-${String(i + 1).padStart(2, "0")}.png`,
  alt: `Client Review ${i + 1}`,
}));

// Mobile shows a curated slice centered on middle to keep mobile DOM light & butter-smooth
const MOBILE_SLICE_START = 22;
const MOBILE_SLICE_END = 38;
const mobileReviews = allReviews.slice(MOBILE_SLICE_START, MOBILE_SLICE_END);

const GAP = 20;
const DESKTOP_MID = Math.floor(TOTAL_REVIEWS / 2);
const MOBILE_MID = Math.floor(mobileReviews.length / 2);

const metrics = [
  {
    icon: TrendingUp,
    value: "500K+",
    label: "ORGANIC EXECUTIVE VIEWS",
    highlight: false,
  },
  {
    icon: Clock,
    value: "140+ hrs",
    label: "SAVED PER FOUNDER / MO",
    highlight: true,
  },
  {
    icon: CheckCircle2,
    value: "99.4%",
    label: "VOICE & FACIAL ACCURACY",
    highlight: false,
  },
];

export function LandingReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0 });
  const initializedRef = useRef(false);

  const [cardW, setCardW] = useState(() => {
    if (typeof window === "undefined") return 380;
    return window.innerWidth < 640 ? 260 : 380;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    );
  });

  useEffect(() => {
    const handleResize = () => {
      setCardW(window.innerWidth < 640 ? 260 : 380);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reviews = isMobile ? mobileReviews : allReviews;
  const MID = isMobile ? MOBILE_MID : DESKTOP_MID;
  const [active, setActive] = useState(MID);

  useEffect(() => {
    setActive(MID);
  }, [MID]);

  const stride = cardW + GAP;

  const scrollForIndex = useCallback((i: number) => i * stride, [stride]);

  const centerMid = useCallback(() => {
    const t = trackRef.current;
    if (!t) return false;
    if (t.scrollWidth <= t.clientWidth) return false;
    t.scrollLeft = scrollForIndex(MID);
    setActive(MID);
    return true;
  }, [MID, scrollForIndex]);

  useEffect(() => {
    if (initializedRef.current) return;
    if (centerMid()) {
      initializedRef.current = true;
      return;
    }

    const t = trackRef.current;
    if (!t) return;

    const ro = new ResizeObserver(() => {
      if (initializedRef.current) {
        ro.disconnect();
        return;
      }
      if (centerMid()) {
        initializedRef.current = true;
        ro.disconnect();
      }
    });
    ro.observe(t);

    return () => ro.disconnect();
  }, [centerMid]);

  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const idx = Math.round(t.scrollLeft / stride);
    setActive(Math.max(0, Math.min(idx, reviews.length - 1)));
  }, [stride, reviews.length]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Horizontal wheel scroll
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      t.scrollLeft += d * 1.2;
    };
    t.addEventListener("wheel", onWheel, { passive: false });
    return () => t.removeEventListener("wheel", onWheel);
  }, []);

  const mDown = (e: React.MouseEvent) => {
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startScroll: trackRef.current?.scrollLeft ?? 0,
    };
    document.body.style.userSelect = "none";
  };

  const mMove = (e: React.MouseEvent) => {
    const { dragging, startX, startScroll } = dragRef.current;
    if (!dragging || !trackRef.current) return;
    trackRef.current.scrollLeft = startScroll - (e.clientX - startX);
  };

  const mUp = () => {
    dragRef.current.dragging = false;
    document.body.style.userSelect = "";
  };

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: scrollForIndex(i), behavior: "smooth" });

  return (
    <section className="w-full py-14 md:py-20 bg-[#0a0a0c] border-b border-[#262933] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-10">
        {/* Middle-Aligned Section Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2.5 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-pulse" />
            <span className="font-mono-tech text-[10px] uppercase text-[#c3f400] tracking-widest font-bold">
              VERIFIED CLIENT FEEDBACK
            </span>
          </div>
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-white tracking-[0.035em] whitespace-nowrap">
            WHAT CLIENTS SAY ABOUT US
          </h2>
          <p className="font-space text-xs md:text-sm text-[#8e92a4] max-w-xl mx-auto leading-relaxed">
            Real screenshots from client reviews — 100% transparent and unedited. The quality and performance speak for themselves.
          </p>
        </div>

        {/* Credibility Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className={`p-4 rounded-xl flex items-center justify-between border transition-all ${
                  m.highlight
                    ? "bg-[#131315] border-[#c3f400]/40 shadow-[0_0_20px_rgba(195,244,0,0.12)]"
                    : "bg-[#131315] border-[#262933]"
                }`}
              >
                <div className="flex flex-col">
                  <span
                    className={`font-anton text-2xl sm:text-3xl tracking-[0.035em] leading-none ${
                      m.highlight ? "text-[#c3f400]" : "text-white"
                    }`}
                  >
                    {m.value}
                  </span>
                  <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a1a1aa] pt-1.5">
                    {m.label}
                  </span>
                </div>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    m.highlight
                      ? "bg-[#c3f400]/15 text-[#c3f400]"
                      : "bg-[#1c1b1d] border border-[#2a2a2c] text-[#c3f400]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal Screenshot Reviews Slider */}
      <div className="relative w-full">
        {/* Left & Right Edge Fades blending into #0a0a0c */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 z-10 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 z-10 bg-gradient-to-l from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />

        <div
          ref={trackRef}
          className="flex items-center overflow-x-scroll cursor-grab active:cursor-grabbing py-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: `${GAP}px`,
            paddingLeft: `calc(50vw - ${cardW / 2}px)`,
            paddingRight: `calc(50vw - ${cardW / 2}px)`,
          }}
          onMouseDown={mDown}
          onMouseMove={mMove}
          onMouseUp={mUp}
          onMouseLeave={mUp}
        >
          {reviews.map((rev, i) => {
            const dist = Math.abs(i - active);
            const isC = dist === 0;
            const isN = dist === 1;

            return (
              <div
                key={i}
                onClick={() => {
                  if (!dragRef.current.dragging) goTo(i);
                }}
                style={{
                  minWidth: cardW,
                  width: cardW,
                  flexShrink: 0,
                  position: "relative",
                  zIndex: isC ? 20 : isN ? 10 : 1,
                  transition:
                    "transform .4s cubic-bezier(.25,.46,.45,.94), filter .4s ease, opacity .4s ease",
                  transform: isC
                    ? "scale(1.06)"
                    : isN
                    ? "scale(0.92)"
                    : "scale(0.84)",
                  filter: isC
                    ? "none"
                    : isN
                    ? "blur(1px) brightness(0.65)"
                    : "blur(2.5px) brightness(0.4)",
                  opacity: isC ? 1 : isN ? 0.75 : 0.45,
                  cursor: isC ? "default" : "pointer",
                }}
              >
                {isC && (
                  <div
                    className="absolute -inset-2 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(195,244,0,0.18) 0%, transparent 70%)",
                      filter: "blur(14px)",
                    }}
                  />
                )}
                <div
                  className="relative z-10 rounded-xl overflow-hidden bg-[#131315] transition-all"
                  style={{
                    border: isC
                      ? "1.5px solid rgba(195,244,0,0.5)"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isC
                      ? "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(195,244,0,0.12)"
                      : "0 6px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Image
                    src={rev.src}
                    alt={rev.alt}
                    width={cardW}
                    height={260}
                    className="w-full h-auto block select-none pointer-events-none"
                    sizes="(max-width: 640px) 90vw, 380px"
                    quality={isMobile ? 60 : 75}
                    priority={Math.abs(i - MID) <= 2}
                    loading={Math.abs(i - MID) <= 2 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
