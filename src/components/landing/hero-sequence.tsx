"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

function CinematicLoader({ progress, isReady }: { progress: number; isReady: boolean }) {
  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712]"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[80px]" />
          </div>

          <div className="relative flex flex-col items-center gap-10 px-8 w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative w-48 h-14"
            >
              <Image src="/logo.png" alt="Glitch AI Studio" fill className="object-contain" priority />
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center gap-1"
            >
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono">
                Preparing Cinematic Experience
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-full"
            >
              <div className="relative w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-emerald-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
                {/* Shimmer */}
                <motion.div
                  className="absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent"
                  animate={{ left: [`-10%`, `110%`] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-white/20 text-[9px] font-mono tracking-widest">GLITCH.AI</span>
                <span className="text-emerald-400/60 text-[10px] font-mono tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/5" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/5" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/5" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  // Track video buffer progress for the loading screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!video.duration) return;
      try {
        const buffered = video.buffered;
        if (buffered.length > 0) {
          const pct = Math.min(100, (buffered.end(buffered.length - 1) / video.duration) * 100);
          setLoadProgress(pct);
        }
      } catch {}
    };

    const onCanPlayThrough = () => {
      setLoadProgress(100);
      // Small delay so the 100% tick is visible before fade-out
      setTimeout(() => setIsReady(true), 400);
    };

    // If video is already fully buffered (cached), mark ready immediately
    if (video.readyState >= 4) {
      setLoadProgress(100);
      setIsReady(true);
      return;
    }

    video.addEventListener("progress", updateProgress);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    // Also listen for timeupdate as a fallback on mobile
    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("progress", updateProgress);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  // Drive video currentTime from scroll — only when ready
  useEffect(() => {
    if (!isReady) return;
    return smoothProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = Math.min(video.duration, Math.max(0, v * video.duration));
    });
  }, [smoothProgress, isReady]);

  // Content rendering based on progress steps
  const beat1Opacity = useTransform(smoothProgress, [0, 0.15, 0.25, 0.3], [1, 1, 0, 0]);
  const beat1Y = useTransform(smoothProgress, [0, 0.25], [0, -40]);

  const beat2Opacity = useTransform(smoothProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const beat2Y = useTransform(smoothProgress, [0.2, 0.3, 0.5, 0.6], [40, 0, 0, -40]);

  const beat3Opacity = useTransform(smoothProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const beat3Y = useTransform(smoothProgress, [0.5, 0.6, 0.8, 0.9], [40, 0, 0, -40]);

  const beat4Opacity = useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const beat4Y = useTransform(smoothProgress, [0.8, 0.9], [40, 0]);

  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.05], [0.7, 0]);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Branded Cinematic Loading Screen */}
      <CinematicLoader progress={loadProgress} isReady={isReady} />

      <section ref={containerRef} className="relative h-[400vh] w-full bg-[#030712]">

        {/* Sticky Canvas & Content Layer */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">

          {/* Hardware-accelerated video */}
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: "none" }}
          />

          {/* Darkening gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] h-full mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none">
            <div className="max-w-[500px] w-full relative h-full">

              {/* Beat 1: Intro */}
              <motion.div
                style={{ opacity: beat1Opacity, y: beat1Y }}
                className="absolute inset-0 flex flex-col justify-end pb-[7vh] md:justify-center md:pb-0"
              >
                <div className="mb-6 w-36 h-10 md:w-56 md:h-14 relative">
                  <Image
                    src="/logo.png"
                    alt="Glitch AI Studio"
                    fill
                    className="object-contain object-left drop-shadow-md"
                    priority
                  />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4 md:mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)] self-start">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-[9px] md:text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">
                    AI Avatar &amp; Automation Studio
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                  We Create <br/>
                  <span className="text-emerald-400 drop-shadow-md">AI Avatars</span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-slate-300 font-light max-w-sm text-balance drop-shadow-md pb-8 md:pb-0">
                  Hyper-realistic digital humans and intelligent influencers for brands <span className="text-amber-200">ready to scale beyond limits</span>.
                </p>
              </motion.div>

              {/* Beat 2: Automation */}
              <motion.div
                style={{ opacity: beat2Opacity, y: beat2Y }}
                className="absolute inset-0 flex flex-col justify-end pb-[7vh] md:justify-center md:pb-0 pointer-events-none"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                  &amp; <span className="text-emerald-400 drop-shadow-md">Automate</span><br />
                  Your Business
                </h2>
                <p className="text-sm sm:text-base md:text-xl text-slate-300 font-light max-w-md text-balance drop-shadow-md pb-8 md:pb-0">
                  End-to-end autonomous systems that work 24/7. <span className="text-amber-200">Eliminating bottlenecks</span> to fuel aggressive growth.
                </p>
              </motion.div>

              {/* Beat 3: Value */}
              <motion.div
                style={{ opacity: beat3Opacity, y: beat3Y }}
                className="absolute inset-0 flex flex-col justify-end pb-[7vh] md:justify-center md:pb-0 pointer-events-none"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                  Next-Gen <br/>
                  <span className="text-emerald-400">Storytelling</span>
                </h2>
                <p className="text-sm sm:text-base md:text-xl text-slate-300 font-light max-w-md text-balance drop-shadow-md pb-8 md:pb-0">
                  Merge cinematic visuals with automated logic. Transform your reach, engage faster, and <span className="text-amber-200">dominate the digital landscape</span>.
                </p>
              </motion.div>

              {/* Beat 4: CTA */}
              <motion.div
                style={{ opacity: beat4Opacity, y: beat4Y }}
                className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
              >
                <div className="pointer-events-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-5 md:mb-6 text-white drop-shadow-lg">
                    Ready to <span className="text-emerald-400 drop-shadow-md">Scale?</span>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-5 pb-8 md:pb-0 w-full sm:w-auto items-start">
                    <button
                      onClick={scrollToContact}
                      className="group px-6 py-2.5 sm:px-8 sm:py-4 bg-emerald-500 text-slate-950 text-sm sm:text-base md:text-lg font-bold rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 w-fit"
                    >
                      Book a Call
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => {
                        const el = document.querySelector("#services");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-2.5 sm:px-8 sm:py-4 border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all shadow-[0_0_20px_rgba(253,224,71,0.15)] w-fit text-center"
                    >
                      Explore Services
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Scroll Prompt */}
          <motion.div
            style={{ opacity: scrollPromptOpacity }}
            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 md:left-24 flex items-center gap-3 sm:gap-4 text-emerald-400 pointer-events-none"
          >
            <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-emerald-500/30 flex items-start justify-center p-1 sm:p-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-2 sm:h-3 bg-emerald-400 rounded-full"
              />
            </div>
            <span className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-bold font-mono text-emerald-400/80">Scroll</span>
          </motion.div>

        </div>
      </section>
    </>
  );
}
