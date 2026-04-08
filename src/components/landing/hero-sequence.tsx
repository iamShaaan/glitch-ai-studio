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
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          // pointer-events none during exit so the fading overlay never blocks scroll on the hero
          style={{ pointerEvents: "auto" }}
          onAnimationStart={(def) => {
            // As soon as exit starts, disable pointer events immediately
            if ((def as Record<string, unknown>).opacity === 0) {
              (document.activeElement as HTMLElement | null)?.blur();
            }
          }}
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
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
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

// Static CSS-only ambient background — zero GPU-draining JS animations
const MobileBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#030712] z-0">
    <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-emerald-500/15 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-violet-500/10 rounded-full blur-[90px]" />
  </div>
);

const MobileHero = () => (
  <section className="relative w-[100vw] min-h-[100svh] bg-[#030712] pt-28 pb-16 px-6 overflow-hidden flex flex-col items-center text-center">
    <MobileBackground />

    <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto w-full gap-6">
      {/* Logo */}
      <div className="w-32 h-9 relative flex justify-center">
        <Image
          src="/logo.png"
          alt="Glitch AI Studio"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10">
        <Sparkles className="w-3 h-3 text-emerald-400" />
        <span className="text-[9px] font-semibold tracking-wider text-emerald-300 uppercase">
          AI Avatar &amp; Automation Agency
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[32px] sm:text-[36px] font-black tracking-tight leading-[1.1] text-white">
        We Build <span className="text-emerald-400">AI Avatars</span> &amp;{" "}
        <span className="text-emerald-400">Influencers</span>
      </h1>

      {/* Single paragraph */}
      <p className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed text-balance">
        We create hyper-realistic AI avatars and digital influencers for any brand or niche. If you don&apos;t have time to film, your digital twin stays active online 24/7. Beyond visuals, we build the custom AI apps, intelligent agents, and automated workflows that run your operations. <span className="block mt-2">With our end-to-end automated systems, <span className="text-amber-300 font-medium">your brand scales infinitely without you doing manual work.</span></span>
      </p>

      {/* Divider */}
      <div className="w-12 h-px bg-emerald-500/30 mb-8" />

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Ready to <span className="text-emerald-400">Grow?</span>
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed text-balance mb-4">
          Whether you want to build an AI avatar to showcase your brand online, automate repetitive backend tasks with efficiency, or create a custom app to manage your workforce—we have the solution. Let&apos;s have a call.
        </p>
        <button
          onClick={() => {
            const el = document.querySelector("#contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full py-4 bg-emerald-500 text-slate-950 text-[15px] font-bold rounded-full active:scale-95 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
        >
          Book an AI Audit
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const el = document.querySelector("#services");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full py-4 border border-white/10 bg-white/5 text-white/80 text-[14px] font-medium rounded-full active:scale-95 transition-transform"
        >
          Explore Our Solutions
        </button>
      </div>
    </div>
  </section>
);

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Use a ref so the buffering effect always reads the latest value without a stale closure
  const isMobileRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      isMobileRef.current = isMobileDevice;
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        setLoadProgress(100);
        setIsReady(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track video buffer progress for the loading screen
  useEffect(() => {
    // Always read from the ref (not state) to avoid stale closure on first render
    if (isMobileRef.current) return;

    let isDone = false;
    // Record when loading started so we can enforce a minimum display time
    const startTime = Date.now();
    // Minimum time the loader must be visible so the animation feels intentional
    const MIN_DISPLAY_MS = 1500;

    const finalizeReady = () => {
      if (isDone) return;
      isDone = true;
      setLoadProgress(100);
      // Enforce the minimum display time before fading out
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => setIsReady(true), remaining + 400);
    };

    // Hard fallback: 10 seconds max wait — enough for slow/3G connections
    const timeoutId = setTimeout(finalizeReady, 10000);

    // Simulated progress — always keeps the bar moving so it never looks frozen.
    // Fast phase: 0→80% in ~4.8s (60 ticks × 100ms interval)
    // Slow phase: 80→98% much slower so it doesn't stall visually before real load finishes
    let simulatedPct = 0;
    const simulationInterval = setInterval(() => {
      if (isDone) { clearInterval(simulationInterval); return; }
      // Ease: fast early, increasingly slow as it approaches 98%.
      const increment = simulatedPct < 80 ? 2 : simulatedPct < 90 ? 0.5 : 0.15;
      simulatedPct = Math.min(simulatedPct + increment, 98);
      setLoadProgress((prev) => Math.max(prev, Math.round(simulatedPct * 10) / 10));
    }, 100);

    const video = videoRef.current;

    if (!video) {
      return () => {
        clearTimeout(timeoutId);
        clearInterval(simulationInterval);
      };
    }

    const updateProgress = () => {
      if (isDone) return;
      if (!video.duration) return;
      try {
        const buffered = video.buffered;
        if (buffered.length > 0) {
          const pct = Math.min(99, (buffered.end(buffered.length - 1) / video.duration) * 100);
          setLoadProgress((prev) => Math.max(prev, pct));
        }
      } catch {}
    };

    // Only finalize once metadata is loaded so video.duration is valid for scrubbing
    const onMetadataLoaded = () => {
      // If already well-buffered when metadata arrives, mark ready right away
      if (video.readyState >= 4) {
        finalizeReady();
      }
    };

    const onCanPlayThrough = () => finalizeReady();

    // If video is already fully ready (cached), skip straight to done
    if (video.readyState >= 4) {
      // Still run the minimum display time
      clearInterval(simulationInterval);
      setLoadProgress(100);
      finalizeReady();
    } else {
      video.addEventListener("loadedmetadata", onMetadataLoaded);
      video.addEventListener("progress", updateProgress);
      video.addEventListener("canplaythrough", onCanPlayThrough);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(simulationInterval);
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
      video.removeEventListener("progress", updateProgress);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive video currentTime from scroll — ONLY on desktop!
  useEffect(() => {
    if (!isReady || isMobile) return;
    
    return smoothProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(videoRef.current.duration, Math.max(0, v * videoRef.current.duration));
        }
      });
    });
  }, [smoothProgress, isReady, isMobile]);

  // Content rendering based on progress steps
  const beat1Opacity = useTransform(smoothProgress, [0, 0.15, 0.2, 0.25], [1, 1, 0, 0]);
  const beat1Y = useTransform(smoothProgress, [0, 0.2], [0, -40]);

  const beat2Opacity = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const beat2Y = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [40, 0, 0, -40]);

  const beat3Opacity = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const beat3Y = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.8], [40, 0, 0, -40]);

  const beat4Opacity = useTransform(smoothProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const beat4Y = useTransform(smoothProgress, [0.85, 0.9], [40, 0]);

  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };  return (
    <>
      <CinematicLoader progress={loadProgress} isReady={isReady} />

      {/* Conditionally Render Entire Architectures */}
      {hasMounted && isMobile ? (
        <MobileHero />
      ) : (
        <section ref={containerRef} className="relative h-[400vh] w-full bg-[#030712]">
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            
            <video
              ref={videoRef}
              src="/hero.mp4"
              poster="/hero-poster.jpg"
              muted
              playsInline
              loop
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover hidden md:block"
              style={{ pointerEvents: "none" }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1400px] h-full mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none">
              <div className="max-w-[700px] w-full relative h-full">

                {/* Beat 1: Intro */}
                <motion.div
                  style={{ opacity: beat1Opacity, y: beat1Y }}
                  className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh]"
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
                      AI Avatar &amp; Automation Agency
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                    We Build <br/>
                    <span className="text-emerald-400 drop-shadow-md">AI Influencers</span>
                  </h1>
                  <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-2xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                    We create hyper-realistic AI avatars and digital influencers tailored to any niche. More than just visuals, we engineer the custom AI apps, intelligent agents, and backend automations that power them. Whether you need an always-on brand ambassador or an automated workflow to eliminate manual tasks, <span className="text-amber-300 font-medium">we orchestrate the entire pipeline so you can scale endlessly.</span>
                  </p>
                </motion.div>

                {/* Beat 2: Automation */}
                <motion.div
                  style={{ opacity: beat2Opacity, y: beat2Y }}
                  className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                    Avatars For <br />
                    <span className="text-emerald-400 drop-shadow-md">Real Personas</span>
                  </h2>
                  <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-2xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                    We know founders, coaches, and creators are often too busy to film. We clone your exact look and voice into a stunning digital twin, so you can generate countless videos just by typing text. Paired with our automated pipelines, <span className="text-amber-300 font-medium">your personal brand stays aggressively active 24/7.</span>
                  </p>
                </motion.div>

                {/* Beat 3: Value */}
                <motion.div
                  style={{ opacity: beat3Opacity, y: beat3Y }}
                  className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                    Full-Stack AI <br/>
                    <span className="text-emerald-400 drop-shadow-md">Systems &amp; Automation</span>
                  </h2>
                  <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                    From designing high-converting landing pages and deploying intelligent voice agents, to engineering seamless client onboarding systems. <span className="block mt-2">We build custom web apps to connect all your tools so your team can manage workflows effortlessly—<span className="text-amber-300 font-medium">eliminating friction and driving scale.</span></span>
                  </p>
                </motion.div>

                {/* Beat 4: CTA */}
                <motion.div
                  style={{ opacity: beat4Opacity, y: beat4Y }}
                  className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
                >
                  <div className="pointer-events-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                      Ready to <span className="text-emerald-400 drop-shadow-md">Grow?</span>
                    </h2>
                    <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                      Whether you want to build an AI avatar to showcase your brand online, automate repetitive backend tasks with efficiency, or create a custom app to manage your workforce—we have the solution. Let&apos;s have a call.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-5 pb-8 md:pb-0 w-full sm:w-auto items-start">
                      <button
                        onClick={scrollToContact}
                        className="group px-6 py-2.5 sm:px-8 sm:py-4 bg-emerald-500 text-slate-950 text-sm sm:text-base md:text-lg font-bold rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 w-fit"
                      >
                        Book an AI Audit
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.querySelector("#services");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-6 py-2.5 sm:px-8 sm:py-4 border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all shadow-[0_0_20px_rgba(253,224,71,0.15)] w-fit text-center"
                      >
                        Explore Our Solutions
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
      )}
    </>
  );
}
