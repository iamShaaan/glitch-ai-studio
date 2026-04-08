"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TOTAL_REVIEWS = 63;
const reviews = Array.from({ length: TOTAL_REVIEWS }, (_, i) => ({
  src: `/reviews/review-${String(i + 1).padStart(2, "0")}.png`,
  alt: `Fiverr Review ${i + 1}`,
}));

const CARD_W = 400;
const GAP = 24;
const STRIDE = CARD_W + GAP;
const MID = Math.floor(TOTAL_REVIEWS / 2); // 31

export function LandingReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(MID);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0 });

  /* ── Centering helpers ─────────────────────────────────────────── */
  const scrollForIndex = (i: number) => i * STRIDE;

  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const idx = Math.round(t.scrollLeft / STRIDE);
    setActive(Math.max(0, Math.min(idx, reviews.length - 1)));
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;

    const init = () => {
      t.scrollLeft = scrollForIndex(MID);
      setActive(MID);
    };
    const id = requestAnimationFrame(() => requestAnimationFrame(init));

    t.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      t.removeEventListener("scroll", onScroll);
    };
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
    dragRef.current = { dragging: true, startX: e.clientX, startScroll: trackRef.current?.scrollLeft ?? 0 };
    document.body.style.userSelect = "none";
  };
  const mMove = (e: React.MouseEvent) => {
    const { dragging, startX, startScroll } = dragRef.current;
    if (!dragging || !trackRef.current) return;
    trackRef.current.scrollLeft = startScroll - (e.clientX - startX);
  };
  const mUp = () => { dragRef.current.dragging = false; document.body.style.userSelect = ""; };

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: scrollForIndex(i), behavior: "smooth" });

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-widest text-emerald-300 uppercase">
              Real Client Reviews · 100% Unfiltered
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            What Clients Say <span className="text-emerald-400">About Us</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real screenshots from Fiverr — no edits, no cherry-picking. Good reviews and the occasional critical one too.{" "}
            <span className="text-amber-300 font-medium">100% transparent</span>, because the results speak for themselves.
          </p>
        </motion.div>

        <div className="relative w-full">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 md:w-64 z-10 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 md:w-64 z-10 bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent" />

          <div
            ref={trackRef}
            className="flex items-center overflow-x-scroll cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: `${GAP}px`,
              paddingTop: 32,
              paddingBottom: 24,
              paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
              paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
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
                  onClick={() => { if (!dragRef.current.dragging) goTo(i); }}
                  style={{
                    minWidth: CARD_W,
                    width: CARD_W,
                    flexShrink: 0,
                    position: "relative",
                    zIndex: isC ? 20 : isN ? 10 : 1,
                    transition: "transform .4s cubic-bezier(.25,.46,.45,.94), filter .4s ease, opacity .4s ease",
                    transform: isC ? "scale(1.08)" : isN ? "scale(0.91)" : "scale(0.82)",
                    filter: isC ? "none" : isN ? "blur(1.5px) brightness(0.6)" : "blur(3px) brightness(0.35)",
                    opacity: isC ? 1 : isN ? 0.75 : 0.45,
                    cursor: isC ? "default" : "pointer",
                  }}
                >
                  {isC && (
                    <div
                      className="absolute -inset-3 rounded-3xl pointer-events-none"
                      style={{ background: "radial-gradient(ellipse,rgba(16,185,129,.18) 0%,transparent 70%)", filter: "blur(16px)" }}
                    />
                  )}
                  <div
                    className="relative z-10 rounded-2xl overflow-hidden"
                    style={{
                      border: isC ? "1.5px solid rgba(16,185,129,.4)" : "1px solid rgba(255,255,255,.06)",
                      backgroundColor: "#0d1117",
                      boxShadow: isC ? "0 24px 64px rgba(0,0,0,.8),0 0 40px rgba(16,185,129,.1)" : "0 8px 24px rgba(0,0,0,.5)",
                    }}
                  >
                    <Image
                      src={rev.src}
                      alt={rev.alt}
                      width={CARD_W}
                      height={300}
                      className="w-full h-auto block"
                      sizes="(max-width: 640px) 90vw, 420px"
                      priority={Math.abs(i - MID) <= 5}
                      loading={Math.abs(i - MID) <= 5 ? "eager" : "lazy"}
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
