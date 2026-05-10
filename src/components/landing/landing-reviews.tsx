"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLoading } from "@/context/loading-context";

const TOTAL_REVIEWS = 63;
const reviews = Array.from({ length: TOTAL_REVIEWS }, (_, i) => ({
  src: `/reviews/review-${String(i + 1).padStart(2, "0")}.png`,
  alt: `Fiverr Review ${i + 1}`,
}));

const GAP = 24;
const MID = Math.floor(TOTAL_REVIEWS / 2); // 31

export function LandingReviews() {
  const { isReady } = useLoading();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(MID);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0 });
  const initializedRef = useRef(false);

  const [cardW, setCardW] = useState(400);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllOnMobile, setShowAllOnMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCardW(window.innerWidth < 640 ? 260 : 400);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Mobile: defer mounting the off-window 56 cards until the user has
     scrolled past #system-overview. Cuts initial DOM weight by ~85%. */
  useEffect(() => {
    if (!isMobile || showAllOnMobile) return;

    const target = document.querySelector("#system-overview");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top < 0 && !entry.isIntersecting) {
          setShowAllOnMobile(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobile, showAllOnMobile]);

  const stride = cardW + GAP;

  /* ── Centering helpers ─────────────────────────────────────────── */
  const scrollForIndex = useCallback((i: number) => i * stride, [stride]);

  const centerMid = useCallback(() => {
    const t = trackRef.current;
    if (!t) return false;
    // Only proceed once the track has a real scrollable width
    if (t.scrollWidth <= t.clientWidth) return false;
    t.scrollLeft = scrollForIndex(MID);
    setActive(MID);
    return true;
  }, [scrollForIndex]);

  /* Center on mount — retry until layout is ready (handles visibility:hidden
     parent: the track has no layout until the parent is visible). */
  useEffect(() => {
    if (initializedRef.current) return;

    // First attempt immediately
    if (centerMid()) {
      initializedRef.current = true;
      return;
    }

    // Use ResizeObserver to catch the first time the track gets real dimensions
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

  /* Also re-center when isReady flips (visibility:hidden → visible) */
  useEffect(() => {
    if (!isReady) return;
    // Small delay lets the browser do the paint first
    const id = setTimeout(() => {
      if (!initializedRef.current) {
        centerMid();
        initializedRef.current = true;
      }
    }, 50);
    return () => clearTimeout(id);
  }, [isReady, centerMid]);

  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const idx = Math.round(t.scrollLeft / stride);
    setActive(Math.max(0, Math.min(idx, reviews.length - 1)));
  }, [stride]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* Wheel → horizontal */
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      t.scrollLeft += d * 1.3;
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
    <section className="relative pt-4 pb-0 md:pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#060d11]" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5 md:mb-14 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#26f7b2]/30 bg-[#26f7b2]/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26f7b2] animate-pulse" />
            <span className="text-[10px] font-semibold tracking-widest text-[#d3edea] uppercase">
              Real Client Reviews · 100% Unfiltered
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            What Clients Say <span className="text-[#26f7b2]">About Us</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real screenshots from Fiverr — no edits, no cherry-picking. Good
            reviews and the occasional critical one too.{" "}
            <span className="text-amber-300 font-medium">
              100% transparent
            </span>
            , because the results speak for themselves.
          </p>
        </motion.div>

        <div className="relative w-full">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-64 z-10 bg-gradient-to-r from-[#09333f] via-[#09333f]/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-64 z-10 bg-gradient-to-l from-[#09333f] via-[#09333f]/80 to-transparent" />

          <div
            ref={trackRef}
            className="flex items-center overflow-x-scroll cursor-grab active:cursor-grabbing pt-2 pb-1 md:pt-6 md:pb-2"
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
              const inWindow = Math.abs(i - MID) <= 3;
              const windowed = isMobile && !showAllOnMobile;

              // Mobile: render a lightweight placeholder for off-window cards
              // so scroll positions / centerMid math stay valid. Mounts the
              // real card once the user scrolls past #system-overview.
              if (windowed && !inWindow) {
                return (
                  <div
                    key={i}
                    style={{
                      minWidth: cardW,
                      width: cardW,
                      flexShrink: 0,
                    }}
                  />
                );
              }

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
                      ? "scale(1.08)"
                      : isN
                      ? "scale(0.91)"
                      : "scale(0.82)",
                    filter: isC
                      ? "none"
                      : isN
                      ? "blur(1.5px) brightness(0.6)"
                      : "blur(3px) brightness(0.35)",
                    opacity: isC ? 1 : isN ? 0.75 : 0.45,
                    cursor: isC ? "default" : "pointer",
                  }}
                >
                  {isC && (
                    <div
                      className="absolute -inset-3 rounded-3xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse,rgba(16,185,129,.18) 0%,transparent 70%)",
                        filter: "blur(16px)",
                      }}
                    />
                  )}
                  <div
                    className="relative z-10 rounded-2xl overflow-hidden"
                    style={{
                      border: isC
                        ? "1.5px solid rgba(16,185,129,.4)"
                        : "1px solid rgba(255,255,255,.06)",
                      backgroundColor: "#0d1117",
                      boxShadow: isC
                        ? "0 24px 64px rgba(0,0,0,.8),0 0 40px rgba(16,185,129,.1)"
                        : "0 8px 24px rgba(0,0,0,.5)",
                    }}
                  >
                    <Image
                      src={rev.src}
                      alt={rev.alt}
                      width={cardW}
                      height={300}
                      className="w-full h-auto block"
                      sizes="(max-width: 640px) 90vw, 420px"
                      priority={Math.abs(i - MID) <= 3}
                      loading={Math.abs(i - MID) <= 3 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
