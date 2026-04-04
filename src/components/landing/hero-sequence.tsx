"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const FRAME_COUNT = 304;

function preloadImages(
  urls: string[],
  onProgress: (progress: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve, reject) => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    if (urls.length === 0) {
      resolve(images);
      return;
    }

    urls.forEach((url, i) => {
      const img = new window.Image();
      img.onload = () => {
        loaded++;
        onProgress((loaded / urls.length) * 100);
        if (loaded === urls.length) {
          resolve(images);
        }
      };
      img.onerror = () => {
        loaded++;
        onProgress((loaded / urls.length) * 100);
        if (loaded === urls.length) {
          resolve(images);
        }
      };
      img.src = url;
      images[i] = img;
    });
  });
}

function useImageSequence() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Determine the URLs format. We generated frame_0.jpeg .. frame_303.jpeg
    const urls = Array.from({ length: FRAME_COUNT }).map(
      (_, i) => `/sequence/frame_${i}.jpeg`
    );

    preloadImages(urls, (progress) => {
      setLoadingProgress(progress);
    }).then((loadedImages) => {
      setImages(loadedImages);
      setIsLoaded(true);
    });
  }, []);

  return { images, loadingProgress, isLoaded };
}

export function HeroSequence() {
  const { images, loadingProgress, isLoaded } = useImageSequence();
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

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(frameIndex.get()))
      );
      const img = images[index];

      if (img && img.complete) {
        // Handle high DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const canvasW = rect.width;
        const canvasH = rect.height;
        const imgW = img.width;
        const imgH = img.height;

        // Custom composition: we want 'cover' behavior, but weighted right
        // Desktop: Subject is on the right, Text is on the left
        // Mobile: Subject is visible, keep text readable
        
        const scale = Math.max(canvasW / imgW, canvasH / imgH);
        const w = imgW * scale;
        const h = imgH * scale;

        // By default center vertically
        const y = (canvasH - h) / 2;
        
        // Always perfectly center to ensure no edges have gaps
        // Since the source image is already framed with the subject on the right, perfect centering preserves the layout natively.
        const x = (canvasW - w) / 2;

        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(img, x, y, w, h);
      }
    };

    // Render initially
    render();

    // Subscribe to framer motion changes
    const unsubscribe = frameIndex.on("change", render);
    
    // Handle resize
    window.addEventListener("resize", render);
    
    return () => {
      unsubscribe();
      window.removeEventListener("resize", render);
    };
  }, [isLoaded, images, frameIndex]);

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
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]">
          <div className="w-full max-w-md px-8 flex flex-col items-center">
            <div className="w-64 h-16 relative mb-12">
               <div className="text-emerald-400 font-bold tracking-widest text-xl mb-2 text-center">GLITCH AI</div>
               <div className="text-white/50 text-xs tracking-widest text-center uppercase">Loading Cinematic Experience</div>
            </div>
            <div className="w-full h-[1px] bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <p className="mt-4 text-emerald-500/80 font-mono text-sm">
              {Math.round(loadingProgress)}%
            </p>
          </div>
        </div>
      )}

      <section ref={containerRef} className="relative h-[400vh] w-full bg-[#030712]">
      
      {/* Sticky Canvas & Content Layer */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* The Frame Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Darkening gradient over canvas to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Content Restraint */}
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
                  AI Avatar & Automation Studio
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
                & <span className="text-emerald-400 drop-shadow-md">Automate</span><br />
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
            {/* Mouse/Scroll Icon */}
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
