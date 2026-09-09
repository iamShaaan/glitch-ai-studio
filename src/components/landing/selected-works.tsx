"use client";

import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_WORKS } from "@/lib/video-config";
import { claimAudioFocus, subscribeToAudioClaims } from "@/lib/video-sync";
import { PortfolioVideoModal } from "@/components/ui/portfolio-video-modal";

interface CollageItemConfig {
  id: number;
  videoUrl: string;
  restingRotate: number;
  offsetClass: string;
  aspectRatio: "9/16" | "16/9" | "4/5" | "4/3";
  title?: string;
  posterUrl?: string;
}

const ROTATION_PATTERNS = [
  -1.2, 1.4, -1.5, 0.9, -1.0, 1.3, -0.8, 1.5, -1.3, 0.8, -1.1, 1.2, -0.9, 1.4,
  -1.2,
];

const OFFSET_PATTERNS = [
  "mb-7 sm:mb-9 lg:mb-11",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-5",
  "mb-7 sm:mb-9 lg:mb-11 lg:mt-2",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-7",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-3",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-6",
  "mb-7 sm:mb-9 lg:mb-11",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-5",
  "mb-7 sm:mb-9 lg:mb-11 lg:mt-3",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-6",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-4",
  "mb-7 sm:mb-9 lg:mb-11",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-5",
  "mb-7 sm:mb-9 lg:mb-11 sm:mt-3",
  "mb-7 sm:mb-9 lg:mb-11 lg:mt-2",
];

const COLLAGE_ITEMS: CollageItemConfig[] = PORTFOLIO_WORKS.map((work, idx) => ({
  id: work.id,
  videoUrl: work.videoUrl,
  restingRotate: ROTATION_PATTERNS[idx % ROTATION_PATTERNS.length],
  offsetClass: OFFSET_PATTERNS[idx % OFFSET_PATTERNS.length],
  aspectRatio: work.aspectRatio || (idx % 3 === 0 ? "16/9" : "9/16"),
  title: work.title || `PORTFOLIO SPECIMEN 0${work.id}`,
  posterUrl: work.posterUrl,
}));

// TAP_THRESHOLD: max pixels of finger movement to still count as a "tap" (not a scroll)
const TAP_THRESHOLD = 8;

function FloatingCollageCard({
  item,
  onSelect,
}: {
  item: CollageItemConfig;
  onSelect: (url: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Track touch start position to distinguish tap vs. scroll
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const didScroll = useRef(false);

  // Global Audio synchronization: if another video claims audio, silence this one
  useEffect(() => {
    const unsubscribe = subscribeToAudioClaims((detail) => {
      if (detail.activeElement !== videoRef.current) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.muted = true;
        }
        setIsHovered(false);
      }
    });
    return unsubscribe;
  }, []);

  // Viewport & Proximity Observers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Proximity observer: Mounts video tag when within 350px of viewport
    const proximityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true);
          } else {
            // Unmount video when scrolled far off-screen to free hardware decoders on mobile
            setIsNearViewport(false);
            setIsVideoLoaded(false);
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.muted = true;
            }
          }
        });
      },
      { rootMargin: "350px 0px" }
    );

    // 2. Strict visibility observer: Pause immediately when scrolled off-screen
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.muted = true;
            }
            setIsHovered(false);
          }
        });
      },
      { threshold: 0 }
    );

    proximityObserver.observe(container);
    visibilityObserver.observe(container);

    return () => {
      proximityObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.muted = false;
    video.volume = 1.0;
    claimAudioFocus(5000 + item.id, video);

    video.play().catch(() => {
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
    setIsHovered(false);
    onSelect(item.videoUrl);
  };

  // On mobile: record finger position at touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    didScroll.current = false;
  };

  // If finger moves more than TAP_THRESHOLD pixels it's a scroll — mark it
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
    if (dx > TAP_THRESHOLD || dy > TAP_THRESHOLD) {
      didScroll.current = true;
    }
  };

  // Only toggle play/pause if it was a genuine tap (finger barely moved)
  const handleTouchEnd = () => {
    if (didScroll.current) {
      touchStartPos.current = null;
      return;
    }
    touchStartPos.current = null;

    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.paused) {
      video.muted = false;
      video.volume = 1.0;
      claimAudioFocus(5000 + item.id, video);
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
      setIsHovered(true);
    } else {
      video.pause();
      video.muted = true;
      setIsHovered(false);
    }
  };

  const aspectClass =
    item.aspectRatio === "16/9"
      ? "aspect-video"
      : item.aspectRatio === "4/5"
      ? "aspect-[4/5]"
      : item.aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[9/16]";

  const isVideoActivelyPlaying = isHovered && isVideoLoaded;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: isHovered
          ? "scale(1.04) translateY(-6px) rotate(0deg)"
          : `rotate(${item.restingRotate}deg)`,
        zIndex: isHovered ? 40 : 10,
      }}
      className={`break-inside-avoid relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-100 dark:bg-[#121215] border p-1.5 sm:p-2 transition-all duration-500 ease-out cursor-pointer select-none ${
        isHovered
          ? "border-emerald-600/80 dark:border-[#c3f400]/80 shadow-[0_16px_40px_rgba(22,163,74,0.2)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(195,244,0,0.25)] ring-1 ring-emerald-600/30 dark:ring-[#c3f400]/30"
          : "border-zinc-200 hover:border-zinc-300 dark:border-[#22242c] dark:hover:border-[#383a45] shadow-md dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
      } ${item.offsetClass}`}
    >
      {/* Fixed Stable Frame Container with Exact Original Aspect Ratio */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-200 dark:bg-[#141418]`}
      >
        {/* Shimmer Placeholder while thumbnail is loading */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-pulse pointer-events-none" />

        {/* Video Thumbnail Screenshot (Always displayed by default) */}
        {item.posterUrl && (
          <img
            src={item.posterUrl}
            alt={item.title || "Portfolio preview"}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 z-10 ${
              isVideoActivelyPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* Virtualized Video Tag: Mounted only when near viewport, plays on hover */}
        {isNearViewport && (
          <video
            ref={videoRef}
            src={item.videoUrl}
            muted
            loop
            playsInline
            preload={isHovered ? "auto" : "metadata"}
            onLoadedData={() => setIsVideoLoaded(true)}
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover block transition-all duration-500 ease-out ${
              isVideoActivelyPlaying ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"
            }`}
          />
        )}
        {/* Subtle inner dark vignette for clean borders */}
        <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.25)] z-20" />

        {/* Ambient emerald hover sheen */}
        {isHovered && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-600/10 dark:from-[#c3f400]/10 via-transparent to-transparent opacity-70 transition-opacity duration-300 z-20" />
        )}
      </div>
    </div>
  );
}

export function SelectedWorks() {
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  return (
    <section
      id="portfolio"
      className="w-full py-16 sm:py-20 md:py-24 bg-white dark:bg-[#0a0a0c] border-b border-zinc-200 dark:border-[#262933] relative overflow-hidden transition-colors duration-200"
    >
      {/* Anchor alias for #works link navigation */}
      <span id="works" className="absolute -top-24 pointer-events-none" />

      {/* Subtle background ambient radial accents */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/[0.04] dark:bg-[#c3f400]/[0.025] blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col gap-10 sm:gap-12 md:gap-14">
        {/* Middle-Aligned Section Header (Fitting Inside a Single Line) */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2">
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-zinc-900 dark:text-white tracking-[0.035em] whitespace-nowrap">
            DIVERSE PORTFOLIO WORKS
          </h2>
        </div>

        {/* Artistic Casual CSS Collage Layout - Zero interstitial text */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8 lg:gap-10 [column-fill:_balance]">
          {COLLAGE_ITEMS.map((item) => (
            <FloatingCollageCard
              key={item.id}
              item={item}
              onSelect={(url) => setActiveModalVideo(url)}
            />
          ))}
        </div>
      </div>

      {/* Floating Video Modal with 5s Back/Forward Timeline Controls */}
      <PortfolioVideoModal
        videoUrl={activeModalVideo}
        isOpen={!!activeModalVideo}
        onClose={() => setActiveModalVideo(null)}
      />
    </section>
  );
}
