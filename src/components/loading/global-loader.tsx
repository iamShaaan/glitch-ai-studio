"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/context/loading-context";
import { useEffect, useRef, useState } from "react";

// ── MINIMAL CRITICAL ASSET LIST ──────────────────────────────────────────────
// Only the assets the user will SEE first when the page loads.
// All other images load lazily after the site is revealed.
const CRITICAL_IMAGES: string[] = [
  "/logo.png",
  "/reviews/review-30.png", // center review (MID = 31, 0-indexed = 30)
  "/reviews/review-29.png",
  "/reviews/review-31.png",
];

const VIDEO_URL = "/hero.mp4";
const MIN_DISPLAY_MS = 1200; // minimum time to show loader (brandingpurpose)
const HARD_TIMEOUT_MS = 7000; // always open, even on terrible connections

export function GlobalLoader() {
  const { isReady, setReady } = useLoading();
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const isDoneRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    const totalAssets = CRITICAL_IMAGES.length + (isMobile ? 0 : 1); // +1 for video on desktop
    const hardTimeoutMs = isMobile ? 3500 : HARD_TIMEOUT_MS;
    let loadedCount = 0;

    const onAssetLoaded = () => {
      loadedCount++;
      const rawPct = (loadedCount / totalAssets) * 100;
      setProgress(Math.min(99, rawPct));
      if (loadedCount >= totalAssets) finalize();
    };

    const finalize = () => {
      if (isDoneRef.current) return;
      isDoneRef.current = true;
      setProgress(100);
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      // Extra 300ms grace so the progress bar visually hits 100% before fade
      setTimeout(() => setReady(), remaining + 300);
    };

    // Hard timeout — site always opens within the device-appropriate budget
    const hardTimeout = setTimeout(finalize, hardTimeoutMs);

    // ── Preload images ────────────────────────────────────────────────────────
    const imageEls: HTMLImageElement[] = [];
    CRITICAL_IMAGES.forEach((src) => {
      const img = new window.Image();
      imageEls.push(img); // keep reference to prevent GC
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded; // count errors as done so we never stall
      img.src = src;
    });

    // ── Preload video (desktop only) ─────────────────────────────────────────
    if (!isMobile) {
      const video = document.createElement("video");
      video.muted = true;
      video.preload = "auto";
      video.playsInline = true;

      const onCanPlay = () => {
        onAssetLoaded();
        video.removeEventListener("canplaythrough", onCanPlay);
        video.removeEventListener("error", onCanPlay);
      };

      video.addEventListener("canplaythrough", onCanPlay);
      video.addEventListener("error", onCanPlay);
      video.src = VIDEO_URL;
      video.load();

      return () => {
        clearTimeout(hardTimeout);
        video.removeEventListener("canplaythrough", onCanPlay);
        video.removeEventListener("error", onCanPlay);
        imageEls.length = 0;
      };
    }

    return () => {
      clearTimeout(hardTimeout);
      imageEls.length = 0;
    };
  }, [setReady]);

  // ── Smooth display progress (never goes backward) ────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) return Math.min(prev + 1.2, progress);
        return prev;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060d11] touch-none overscroll-none"
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.08, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#26f7b2]/10 rounded-full blur-[120px]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#009d9a]/10 rounded-full blur-[80px]" />
            <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative flex flex-col items-center gap-10 px-8 w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative w-48 h-14"
            >
              <Image
                src="/logo.png"
                alt="Glitch AI Studio"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Status text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#26f7b2] animate-pulse" />
                <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-mono">
                  Loading Experience
                </p>
              </div>
              <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase">
                {displayProgress < 35
                  ? "Initializing..."
                  : displayProgress < 75
                  ? "Caching Assets..."
                  : "Finalizing UI..."}
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full space-y-3">
              <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#26f7b2] shadow-[0_0_10px_rgba(38,247,178,0.5)] transition-all duration-200 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
                <motion.div
                  className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.12 }}
                      className="w-1 h-1 bg-[#26f7b2]/40 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[#26f7b2]/80 text-[11px] font-mono tabular-nums tracking-widest">
                  {Math.round(displayProgress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-white/10" />
            <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-white/10" />
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-white/10" />
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-white/10" />
          </motion.div>

          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.07)_50%)] bg-[size:100%_4px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
