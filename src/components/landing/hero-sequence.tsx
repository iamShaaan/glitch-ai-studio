"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useLoading } from "@/context/loading-context";

const CAL_LINK =
  "https://cal.com/soumitro-halder-shan-ltvmbb/ai-consultation-with-shan";

const MobileBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#060d11] z-0">
    <Image
      src="/hero-poster.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#060d11]/80 to-[#060d11] pointer-events-none" />
    <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-[#26f7b2]/15 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-[#009d9a]/10 rounded-full blur-[90px]" />
  </div>
);

const MobileHero = () => {
  const goToCaseStudies = () => {
    const el = document.querySelector("#case-studies");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-[100vw] min-h-[100svh] bg-[#060d11] pt-28 pb-16 px-6 overflow-hidden flex flex-col items-center text-center">
      <MobileBackground />

      <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto w-full gap-6">
        {/* Logo */}
        <div className="w-28 h-8 relative flex justify-center">
          <Image
            src="/logo.png"
            alt="Glitch AI Studio"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#26f7b2]/30 bg-[#26f7b2]/10">
          <Sparkles className="w-3 h-3 text-[#26f7b2]" />
          <span className="text-[9px] font-semibold tracking-wider text-[#d3edea] uppercase">
            AI Avatar Content System
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[24px] sm:text-[28px] font-black tracking-tight leading-[1.15] text-white">
          You don&apos;t have time to film
          <span className="block text-[#26f7b2]">
            Your business still needs content
          </span>
        </h1>

        {/* Subhead — explicit "Do X → Get Y" exchange */}
        <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed text-balance">
          Type a script — get a fully edited, branded video in your face and
          voice.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-[#26f7b2]/30" />

        {/* Single primary CTA + friction-killer microcopy */}
        <div className="flex flex-col items-center gap-2 w-full">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#26f7b2] text-[#09333f] text-[15px] font-bold rounded-full active:scale-95 transition-transform shadow-[0_0_20px_rgba(38,247,178,0.25)] flex items-center justify-center gap-2"
          >
            Book a 15-Min Call
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[12px] text-slate-400 leading-snug text-balance">
            Free · 15 min · No deck, no pitch — just one call to see if it
            fits.
          </p>
        </div>

        {/* Proof strip — validates only the next step */}
        <button
          type="button"
          onClick={goToCaseStudies}
          className="text-[12px] text-slate-400 hover:text-[#26f7b2] transition-colors leading-snug cursor-pointer"
        >
          Trusted by Karl, Tyfany, Kristina + 60 Fiverr reviews →
        </button>
      </div>

      {/* Scroll indicator — anchors the empty bottom space */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-5 h-8 rounded-full border-2 border-[#26f7b2]/30 flex items-start justify-center p-1 shadow-[0_0_12px_rgba(38,247,178,0.2)]">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-[#26f7b2] rounded-full"
          />
        </div>
        <span className="uppercase tracking-[0.2em] text-[9px] font-bold font-mono text-[#26f7b2]/80">
          Scroll
        </span>
      </div>
    </section>
  );
};

// ── Desktop: scroll-driven 4-beat cinematic ─────────────────────────────────
// All hooks live here so they only mount when the desktop tree is rendered.
// Behavior is identical to pre-split: same useTransform input/output ranges,
// same useSpring config, same 400vh container, same sticky positioning,
// same video-currentTime scrubbing useEffect.
const DesktopHero = () => {
  const { isReady } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  // Drive video currentTime from scroll — only after the global loader is ready
  useEffect(() => {
    if (!isReady) return;

    return smoothProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration,
            Math.max(0, v * videoRef.current.duration)
          );
        }
      });
    });
  }, [smoothProgress, isReady]);

  // Content rendering transitions — DO NOT change these ranges
  const beat1Opacity = useTransform(smoothProgress, [0, 0.15, 0.2, 0.25], [1, 1, 0, 0]);
  const beat1Y = useTransform(smoothProgress, [0, 0.2], [0, -40]);

  const beat2Opacity = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const beat2Y = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [40, 0, 0, -40]);

  const beat3Opacity = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const beat3Y = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.8], [40, 0, 0, -40]);

  const beat4Opacity = useTransform(smoothProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const beat4Y = useTransform(smoothProgress, [0.85, 0.9], [40, 0]);

  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  const scrollToSystemOverview = () => {
    const el = document.querySelector("#system-overview");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#060d11]">
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
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#26f7b2]/30 bg-[#26f7b2]/10 mb-4 md:mb-6 shadow-[0_0_15px_rgba(38,247,178,0.15)] self-start">
                <Sparkles className="w-3 h-3 text-[#26f7b2]" />
                <span className="text-[9px] md:text-[10px] font-semibold tracking-wider text-[#d3edea] uppercase">
                  AI Avatar Content System
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-[30px] lg:text-[36px] font-black tracking-tight leading-[1.15] mb-3 md:mb-4 text-white drop-shadow-lg">
                You don&apos;t have time to film
                <span className="block text-[#26f7b2] drop-shadow-md">Your business still needs content</span>
              </h1>
              <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-2xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                We build hyper-realistic AI avatars that look, sound, and present like you. Type a script, get a fully edited branded video. <span className="text-amber-300 font-medium">Your brand stays active even when you don&apos;t.</span>
              </p>
            </motion.div>

            {/* Beat 2: The Avatar */}
            <motion.div
              style={{ opacity: beat2Opacity, y: beat2Y }}
              className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                Your AI avatar, <br />
                <span className="text-[#26f7b2] drop-shadow-md">trained in 7 days.</span>
              </h2>
              <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-2xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                Send us a 2-minute video, 40 minutes of voice, and 20 photos. We train your digital twin. Different looks, different outfits, different angles. <span className="text-amber-300 font-medium">Your trained voice. Ready to speak any script you give it.</span>
              </p>
            </motion.div>

            {/* Beat 3: The Automation */}
            <motion.div
              style={{ opacity: beat3Opacity, y: beat3Y }}
              className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                30 days of content, <br/>
                <span className="text-[#26f7b2] drop-shadow-md">delivered in 24 hours.</span>
              </h2>
              <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                Our system writes, generates, edits, and brands every video automatically. You only verify the script. We handle the rest. <span className="text-amber-300 font-medium">Color grading, motion design, sound effects, all matched to your brand.</span>
              </p>
            </motion.div>

            {/* Beat 4: CTA */}
            <motion.div
              style={{ opacity: beat4Opacity, y: beat4Y }}
              className="absolute inset-0 flex flex-col justify-end pb-[10vh] md:pb-[15vh] pointer-events-none"
            >
              <div className="pointer-events-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-3 md:mb-4 text-white drop-shadow-lg">
                  Ready to build your <span className="text-[#26f7b2] drop-shadow-md">content machine?</span>
                </h2>
                <p className="text-[13px] sm:text-sm md:text-[15px] text-slate-300 font-light max-w-xl leading-relaxed text-balance drop-shadow-md mb-6 md:mb-8">
                  One-time setup, lifetime use. Join Karl, Tyfany, Kristina, and other businesses producing daily content without filming.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-5 pb-8 md:pb-0 w-full sm:w-auto items-start">
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-2.5 sm:px-8 sm:py-4 bg-[#26f7b2] text-[#09333f] text-sm sm:text-base md:text-lg font-bold rounded-full hover:bg-[#26f7b2]/90 transition-all shadow-[0_0_15px_rgba(38,247,178,0.3)] flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 w-fit"
                  >
                    Book a 15-Min Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={scrollToSystemOverview}
                    className="px-6 py-2.5 sm:px-8 sm:py-4 border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all shadow-[0_0_20px_rgba(253,224,71,0.15)] w-fit text-center"
                  >
                    See How It Works
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 md:left-24 flex items-center gap-3 sm:gap-4 text-[#26f7b2] pointer-events-none"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-[#26f7b2]/30 flex items-start justify-center p-1 sm:p-1.5 shadow-[0_0_15px_rgba(38,247,178,0.2)]">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 sm:h-3 bg-[#26f7b2] rounded-full"
            />
          </div>
          <span className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-bold font-mono text-[#26f7b2]/80">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
};

export function HeroSequence() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth < 768 ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (hasMounted && isMobile) {
    return <MobileHero />;
  }

  return <DesktopHero />;
}
