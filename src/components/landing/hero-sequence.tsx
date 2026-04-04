"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const FRAME_COUNT = 304;
const INITIAL_BATCH = 60;   // Frames loaded before animation starts — covers first scroll section
const BATCH_SIZE = 60;       // Subsequent background batch sizes

// Load a single image, resolving when complete
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img); // Resolve anyway to not block the queue
    img.src = url;
  });
}

function frameUrl(i: number) {
  return `/sequence-webp/frame_${i}.webp`;
}

function useProgressiveImageSequence() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const [initialReady, setInitialReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialBatch() {
      // Load first INITIAL_BATCH frames in parallel — fast, ~2.5MB
      const urls = Array.from({ length: INITIAL_BATCH }, (_, i) => frameUrl(i));
      const loaded = await Promise.all(urls.map((url) => loadImage(url)));
      if (cancelled) return;
      loaded.forEach((img, i) => { imagesRef.current[i] = img; });
      setInitialReady(true);

      // Load remaining frames in background batches — user is already scrolling
      for (let start = INITIAL_BATCH; start < FRAME_COUNT; start += BATCH_SIZE) {
        if (cancelled) break;
        const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
        const batchUrls = Array.from({ length: end - start }, (_, j) => frameUrl(start + j));
        const batch = await Promise.all(batchUrls.map((url) => loadImage(url)));
        if (cancelled) break;
        batch.forEach((img, j) => { imagesRef.current[start + j] = img; });
      }
    }

    loadInitialBatch();
    return () => { cancelled = true; };
  }, []);

  return { imagesRef, initialReady };
}

export function HeroSequence() {
  const { imagesRef, initialReady } = useProgressiveImageSequence();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(frameIndex.get())));
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const canvasW = rect.width;
    const canvasH = rect.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const w = imgW * scale;
    const h = imgH * scale;
    const x = (canvasW - w) / 2;
    const y = (canvasH - h) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, x, y, w, h);
  }, [frameIndex, imagesRef]);

  useEffect(() => {
    if (!initialReady) return;
    // Render once immediately
    renderFrame();
    const unsubscribe = frameIndex.on("change", renderFrame);
    window.addEventListener("resize", renderFrame);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", renderFrame);
    };
  }, [initialReady, frameIndex, renderFrame]);

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
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#030712]">

      {/* Sticky Canvas & Content Layer */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* The Frame Canvas — visible immediately once initialReady */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: initialReady ? 1 : 0, transition: "opacity 0.3s ease" }}
        />

        {/* Fallback background while first frames load (~0.5s on fast, ~2s on slow) */}
        {!initialReady && (
          <div className="absolute inset-0 bg-[#030712]" />
        )}

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
  );
}
