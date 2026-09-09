"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  Volume2,
  VolumeX,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NICHE_PERSONA_REELS } from "@/lib/video-config";
import { claimAudioFocus, subscribeToAudioClaims } from "@/lib/video-sync";

interface NicheReelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NicheReelsModal({ isOpen, onClose }: NicheReelsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = NICHE_PERSONA_REELS.length;
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const scrollCooldownRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwipingHorizontally = useRef<boolean | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setIsPaused(false);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setIsPaused(false);
  }, [total]);

  // Global Audio synchronization listener
  useEffect(() => {
    const unsubscribe = subscribeToAudioClaims((detail) => {
      const activeVideo = videoRefs.current[currentIndex];
      if (detail.activeElement !== activeVideo) {
        setIsMuted(true);
        if (activeVideo) {
          activeVideo.muted = true;
        }
      }
    });
    return unsubscribe;
  }, [currentIndex]);

  // Play current active video, pause all others
  useEffect(() => {
    if (!isOpen) return;

    NICHE_PERSONA_REELS.forEach((reel, idx) => {
      const vid = videoRefs.current[idx];
      if (!vid) return;

      if (idx === currentIndex) {
        vid.muted = isMuted;
        if (!isPaused) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        vid.pause();
        vid.muted = true;
      }
    });
  }, [currentIndex, isOpen, isMuted, isPaused]);

  // Modal keyboard & scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setIsMuted(true);
      setIsPaused(false);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const video = videoRefs.current[currentIndex];
      if (!video) return;

      const nextMuted = !isMuted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);

      if (!nextMuted) {
        claimAudioFocus(4000 + currentIndex, video);
        if (video.paused) {
          video.play().catch(() => {});
          setIsPaused(false);
        }
      }
    },
    [currentIndex, isMuted]
  );

  const togglePlay = useCallback(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, [currentIndex]);

  // Trackpad / mouse wheel horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollCooldownRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 25) {
      scrollCooldownRef.current = true;
      if (delta > 0) goNext();
      else goPrev();
      setTimeout(() => {
        scrollCooldownRef.current = false;
      }, 300);
    }
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwipingHorizontally.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (isSwipingHorizontally.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isSwipingHorizontally.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isSwipingHorizontally.current) {
      setDragOffset(deltaX * 0.7);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    if (touchStartX.current !== null && isSwipingHorizontally.current) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
    }
    setDragOffset(0);
    touchStartX.current = null;
    touchStartY.current = null;
    isSwipingHorizontally.current = null;
  };

  // Mouse drag handlers (for desktop click & drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    setDragOffset(deltaX * 0.7);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    setIsDragging(false);
    isMouseDown.current = false;
    if (mouseStartX.current !== null) {
      const deltaX = e.clientX - mouseStartX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
    }
    setDragOffset(0);
    mouseStartX.current = null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        onClick={onClose}
      />

      {/* Floating Window Container - 100% focus on video */}
      <div
        className="relative z-10 w-full max-w-[98vw] lg:max-w-7xl h-[86vh] sm:h-[88vh] md:h-[90vh] max-h-[800px] flex flex-col justify-between rounded-3xl bg-[#0c0c0e] border border-[#22242c] shadow-2xl overflow-hidden p-3 sm:p-5 select-none"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        {/* Subtle Close Button in Top-Right */}
        <div className="relative z-30 flex items-center justify-end w-full px-2">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#18181b]/80 hover:bg-[#222226] border border-[#2a2a30] hover:border-[#c3f400]/60 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors cursor-pointer shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ── Circular Infinite Reel Stage ── */}
        <div
          className="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Left Arrow Button */}
          <button
            onClick={goPrev}
            aria-label="Previous video"
            className="hidden md:flex absolute left-4 z-40 w-12 h-12 rounded-full bg-[#131315]/85 hover:bg-[#1c1b20] border border-[#2a2a2e] hover:border-[#c3f400] text-white hover:text-[#c3f400] transition-all items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Vignette Edge Blurs: Hard on the edges, transparent towards middle */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 md:w-44 bg-gradient-to-r from-[#0c0c0e] via-[#0c0c0e]/70 to-transparent z-25" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 md:w-44 bg-gradient-to-l from-[#0c0c0e] via-[#0c0c0e]/70 to-transparent z-25" />

          {/* Centered Circular Wheel Track */}
          <div className="relative w-full h-full flex items-center justify-center">
            {NICHE_PERSONA_REELS.map((reel, idx) => {
              // Calculate shortest circular distance
              let diff = idx - currentIndex;
              while (diff > total / 2) diff -= total;
              while (diff < -total / 2) diff += total;

              const isMiddle = diff === 0;
              const absDiff = Math.abs(diff);

              // Responsive horizontal spacing between card centers
              const baseSpacing =
                windowWidth < 640 ? 185 : windowWidth < 1024 ? 240 : 295;

              const translateX = diff * baseSpacing + dragOffset;

              let blurPx = 0;
              let opacity = 1;
              let scale = 1;
              let zIndex = 30;

              if (absDiff === 0) {
                blurPx = 0;
                opacity = 1;
                scale = 1;
                zIndex = 30;
              } else if (absDiff === 1) {
                blurPx = 3;
                opacity = 0.72;
                scale = 0.88;
                zIndex = 20;
              } else if (absDiff === 2) {
                blurPx = 8;
                opacity = 0.42;
                scale = 0.76;
                zIndex = 10;
              } else if (absDiff === 3) {
                blurPx = 14;
                opacity = 0.18;
                scale = 0.66;
                zIndex = 5;
              } else {
                blurPx = 20;
                opacity = 0;
                scale = 0.55;
                zIndex = 1;
              }

              return (
                <div
                  key={reel.id}
                  onClick={() => {
                    if (!isMiddle) {
                      setCurrentIndex(idx);
                      setIsPaused(false);
                    } else {
                      togglePlay();
                    }
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
                    filter: `blur(${blurPx}px)`,
                    opacity,
                    zIndex,
                    transition: isDragging
                      ? "none"
                      : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease, opacity 0.45s ease",
                  }}
                  className={`absolute h-[56vh] sm:h-[62vh] md:h-[68vh] max-h-[580px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border transition-colors duration-300 shadow-2xl flex flex-col justify-between ${
                    isMiddle
                      ? "border-[#c3f400] shadow-[0_0_30px_rgba(195,244,0,0.22)] cursor-pointer"
                      : "border-[#202025] hover:border-[#383842] cursor-pointer"
                  }`}
                >
                  {/* 9:16 Video Player: Only mounted for current & adjacent slides (max 3 decoders) */}
                  {absDiff <= 1 ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={reel.videoUrl}
                      loop
                      playsInline
                      preload={isMiddle ? "auto" : "metadata"}
                      muted={isMuted || !isMiddle}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#121216] flex items-center justify-center p-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Delicate Transparent Audio Toggle on Active Middle Video */}
                  {isMiddle && (
                    <div className="absolute top-3.5 right-3.5 z-20 pointer-events-auto">
                      <button
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 backdrop-blur-md hover:bg-black/80 border border-white/20 hover:border-[#c3f400] text-white hover:text-[#c3f400] flex items-center justify-center transition-all cursor-pointer shadow-md"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 opacity-80" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#c3f400]" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Play/Pause Indicator on tap */}
                  {isMiddle && isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] pointer-events-none z-10">
                      <div className="w-12 h-12 rounded-full bg-[#c3f400] text-[#121900] flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                  )}


                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={goNext}
            aria-label="Next video"
            className="hidden md:flex absolute right-4 z-40 w-12 h-12 rounded-full bg-[#131315]/85 hover:bg-[#1c1b20] border border-[#2a2a2e] hover:border-[#c3f400] text-white hover:text-[#c3f400] transition-all items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Minimal Bottom Wheel Indicator Dots */}
        <div className="relative z-30 flex items-center justify-center gap-1.5 py-1">
          {NICHE_PERSONA_REELS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPaused(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-[#c3f400] shadow-[0_0_8px_rgba(195,244,0,0.6)]"
                  : "w-1.5 bg-[#25252a] hover:bg-[#404048]"
              }`}
              aria-label={`Go to reel ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
