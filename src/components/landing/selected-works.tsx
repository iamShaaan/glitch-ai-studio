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
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
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

  // IntersectionObserver: mute + pause the moment the video scrolls off screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Video has left the viewport — silence and stop it immediately
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.muted = true;
            }
            setIsHovered(false);
          }
        });
      },
      { threshold: 0 } // fires as soon as even 1px leaves the screen
    );

    observer.observe(container);
    return () => observer.disconnect();
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
      videoRef.current.muted = true;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
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
      // User was scrolling — do nothing, leave video untouched
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
          ? "scale(1.05) translateY(-8px) rotate(0deg)"
          : `rotate(${item.restingRotate}deg)`,
        zIndex: isHovered ? 40 : 10,
      }}
      className={`break-inside-avoid relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121215] border p-1.5 sm:p-2 transition-all duration-500 ease-out cursor-pointer select-none ${
        isHovered
          ? "border-[#c3f400]/80 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(195,244,0,0.25)] ring-1 ring-[#c3f400]/30"
          : "border-[#22242c] hover:border-[#383a45] shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
      } ${item.offsetClass}`}
    >
      {/* Frame Container */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/50">
        <video
          ref={videoRef}
          src={item.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) {
              setAspectRatio(videoWidth / videoHeight);
            }
          }}
          style={{
            aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
          }}
          className="w-full h-auto object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle inner dark vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl shadow-[inset_0_0_25px_rgba(10,10,12,0.6)]" />

        {/* Ambient lime hover sheen */}
        {isHovered && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#c3f400]/10 via-transparent to-transparent opacity-70 transition-opacity duration-300" />
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
      className="w-full py-16 sm:py-20 md:py-24 bg-[#0a0a0c] border-b border-[#262933] relative overflow-hidden"
    >
      {/* Anchor alias for #works link navigation */}
      <span id="works" className="absolute -top-24 pointer-events-none" />

      {/* Subtle background ambient radial accents */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c3f400]/[0.025] blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col gap-10 sm:gap-12 md:gap-14">
        {/* Middle-Aligned Section Header (Fitting Inside a Single Line) */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2">
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-white tracking-[0.035em] whitespace-nowrap">
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
