"use client";

import { useEffect, useRef } from "react";

export function InfinityBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip the parallax rAF loop on mobile — it's a fixed-pos decorative SVG
    // that costs scroll-event work on every frame. Desktop only.
    const desktop = window.matchMedia("(min-width: 768px)");
    if (!desktop.matches) return;

    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const y = window.scrollY * 0.28;
        containerRef.current.style.transform = `translateY(-${y}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer parallax wrapper — shifted by scroll */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          width="1100"
          height="550"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Glow filter */}
            <filter id="infinity-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle outer glow halo */}
            <filter id="infinity-halo" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="18" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>

            {/* Animated gradient stroke */}
            <linearGradient id="infinity-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#26f7b2" stopOpacity="1" />
              <stop offset="40%" stopColor="#009d9a" stopOpacity="1" />
              <stop offset="70%" stopColor="#d3edea" stopOpacity="1" />
              <stop offset="100%" stopColor="#26f7b2" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/*
            Lemniscate of Bernoulli — parametric approximation as a smooth cubic bezier path.
            Center: (500, 250), half-width: ~380, half-height: ~190
          */}

          {/* Halo layer (very faint, blurred behind) */}
          <path
            d="
              M 500 250
              C 500 100, 880 60, 880 250
              C 880 440, 500 400, 500 250
              C 500 100, 120 60, 120 250
              C 120 440, 500 400, 500 250
              Z
            "
            fill="none"
            stroke="#26f7b2"
            strokeWidth="3"
            opacity="0.06"
            filter="url(#infinity-halo)"
          />

          {/* Main traced path — animated dashoffset */}
          <path
            id="infinity-path"
            d="
              M 500 250
              C 500 100, 880 60, 880 250
              C 880 440, 500 400, 500 250
              C 500 100, 120 60, 120 250
              C 120 440, 500 400, 500 250
              Z
            "
            fill="none"
            stroke="url(#infinity-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.18"
            filter="url(#infinity-glow)"
            style={{
              strokeDasharray: 2400,
              strokeDashoffset: 2400,
              animation: "infinity-trace 8s cubic-bezier(0.4,0,0.2,1) infinite",
            }}
          />

          {/* Second path offset — creates the continuous flowing feel */}
          <path
            d="
              M 500 250
              C 500 100, 880 60, 880 250
              C 880 440, 500 400, 500 250
              C 500 100, 120 60, 120 250
              C 120 440, 500 400, 500 250
              Z
            "
            fill="none"
            stroke="url(#infinity-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.10"
            filter="url(#infinity-glow)"
            style={{
              strokeDasharray: 2400,
              strokeDashoffset: 2400,
              animation: "infinity-trace 8s cubic-bezier(0.4,0,0.2,1) infinite",
              animationDelay: "-4s",
            }}
          />
        </svg>
      </div>

      <style>{`
        @keyframes infinity-trace {
          0% {
            stroke-dashoffset: 2400;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          80% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          90% {
            stroke-dashoffset: 0;
            opacity: 0.6;
          }
          100% {
            stroke-dashoffset: -2400;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
