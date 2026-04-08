"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/context/loading-context";
import { useEffect, useRef, useState } from "react";

// All critical assets to preload before site is revealed.
// This is the SINGLE SOURCE OF TRUTH for preloading.
const CRITICAL_IMAGE_URLS: string[] = [
  "/logo.png",
  // Preload the 11 central review images (index 26-36 out of 63)
  ...Array.from({ length: 11 }, (_, i) =>
    `/reviews/review-${String(26 + i).padStart(2, "0")}.png`
  ),
];

const VIDEO_URL = "/hero.mp4";
const MIN_DISPLAY_MS = 1500;
const HARD_TIMEOUT_MS = 10000;

export function GlobalLoader() {
  const { isReady, setReady } = useLoading();
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const isDoneRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    // ── DETERMINISTIC ASSET MANIFEST ──────────────────────────────
    // Two buckets: images (70% weight on desktop, 100% on mobile) and video (30% on desktop)
    const totalImageCount = CRITICAL_IMAGE_URLS.length;
    let loadedImages = 0;
    const videoWeight = isMobile ? 0 : 30;
    const imageWeight = 100 - videoWeight;

    const imageRefs: HTMLImageElement[] = []; // GC protection

    const recalc = (videoProgress: number) => {
      const imgPct = (loadedImages / totalImageCount) * imageWeight;
      const vidPct = (videoProgress / 100) * videoWeight;
      setProgress(Math.min(99, imgPct + vidPct));
    };

    const finalize = () => {
      if (isDoneRef.current) return;
      isDoneRef.current = true;
      setProgress(100);
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => setReady(), remaining + 300);
    };

    // Hard timeout — site always opens, even on terrible connections
    const hardTimeout = setTimeout(finalize, HARD_TIMEOUT_MS);

    // ── PRELOAD IMAGES ─────────────────────────────────────────────
    let pendingImages = totalImageCount;
    CRITICAL_IMAGE_URLS.forEach((src) => {
      const img = new window.Image();
      imageRefs.push(img);
      const onDone = () => {
        loadedImages++;
        pendingImages--;
        recalc(isMobile ? 100 : 0); // video progress starts at 0
        if (pendingImages === 0 && isMobile) finalize();
      };
      img.onload = onDone;
      img.onerror = onDone;
      img.src = src;
    });

    // ── PRELOAD VIDEO (desktop only) ───────────────────────────────
    if (!isMobile) {
      const video = document.createElement("video");
      video.muted = true;
      video.preload = "auto";

      const onProgress = () => {
        if (isDoneRef.current || !video.duration) return;
        try {
          const buf = video.buffered;
          if (buf.length > 0) {
            const pct = Math.min(99, (buf.end(buf.length - 1) / video.duration) * 100);
            recalc(pct);
          }
        } catch {}
      };

      const onCanPlayThrough = () => {
        recalc(100);
        // Only finalize once images are also done
        if (pendingImages === 0) finalize();
        else {
          // Images still loading — wait for images but cap video contribution at 100%
        }
      };

      video.addEventListener("progress", onProgress);
      video.addEventListener("timeupdate", onProgress);
      video.addEventListener("canplaythrough", onCanPlayThrough);
      video.src = VIDEO_URL;
      video.load();

      return () => {
        clearTimeout(hardTimeout);
        video.removeEventListener("progress", onProgress);
        video.removeEventListener("timeupdate", onProgress);
        video.removeEventListener("canplaythrough", onCanPlayThrough);
        imageRefs.length = 0;
      };
    }

    return () => {
      clearTimeout(hardTimeout);
      imageRefs.length = 0;
    };
  }, [setReady]);

  // Smooth progress display (never goes backward)
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = progress;
        if (prev < target) return Math.min(prev + 0.8, target);
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
            transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]"
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px]" />
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative flex flex-col items-center gap-10 px-8 w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-48 h-14"
            >
              <Image src="/logo.png" alt="Glitch AI Studio" fill className="object-contain" priority />
            </motion.div>

            {/* Status text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-mono">
                  Loading Experience
                </p>
              </div>
              <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase">
                {displayProgress < 30
                  ? "Initializing..."
                  : displayProgress < 70
                  ? "Caching Assets..."
                  : "Finalizing UI..."}
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full space-y-3">
              <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-300 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
                <motion.div
                  className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 h-1 bg-emerald-500/40 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-emerald-400/80 text-[11px] font-mono tabular-nums tracking-widest">
                  {Math.round(displayProgress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-white/10" />
            <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-white/10" />
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-white/10" />
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-white/10" />
          </motion.div>

          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%)] bg-[size:100%_4px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
