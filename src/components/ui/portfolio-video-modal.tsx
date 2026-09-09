"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { claimAudioFocus, subscribeToAudioClaims } from "@/lib/video-sync";

interface PortfolioVideoModalProps {
  videoUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioVideoModal({
  videoUrl,
  isOpen,
  onClose,
}: PortfolioVideoModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  // Claim audio focus and start playing when opened
  useEffect(() => {
    if (!isOpen || !videoUrl) return;
    setIsBuffering(true);

    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      claimAudioFocus(6000, video);
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocks unmuted play, fallback to muted play
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (video) {
        video.pause();
      }
    };
  }, [isOpen, videoUrl]);

  // Global Audio synchronization listener
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = subscribeToAudioClaims((detail) => {
      if (detail.activeElement !== videoRef.current) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.muted = true;
        }
        setIsPlaying(false);
        setIsMuted(true);
      }
    });
    return unsubscribe;
  }, [isOpen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekBy(-5);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        seekBy(5);
        return;
      }
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMute();
        return;
      }
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.paused) {
      if (!isMuted) {
        claimAudioFocus(6000, video);
      }
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      claimAudioFocus(6000, video);
    }
  }, []);

  // Jump backwards or forwards by seconds
  const seekBy = useCallback(
    (seconds: number) => {
      if (!videoRef.current) return;
      const video = videoRef.current;
      const newTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
      video.currentTime = newTime;
      setCurrentTime(newTime);
    },
    []
  );

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // Timeline scrubber click / drag
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percentage * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!isOpen || !videoUrl) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Video Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#0e0e11] border border-[#2a2a32] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-emerald-500 dark:hover:border-[#c3f400] flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95 backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video Canvas Container */}
        <div
          onClick={togglePlay}
          className="relative w-full flex-1 min-h-[40vh] sm:min-h-[50vh] max-h-[66vh] sm:max-h-[72vh] flex items-center justify-center bg-black overflow-hidden cursor-pointer group"
        >
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            loop
            onWaiting={() => setIsBuffering(true)}
            onCanPlay={() => setIsBuffering(false)}
            onPlaying={() => setIsBuffering(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full max-h-[66vh] sm:max-h-[72vh] object-contain"
          />

          {/* Buffering Loading Spinner */}
          {isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none z-10">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 dark:border-[#c3f400]/20 border-t-emerald-500 dark:border-t-[#c3f400] animate-spin" />
            </div>
          )}

          {/* Center Subtle Play/Pause Overlay Indicator */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none transition-opacity duration-200 z-20 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 dark:bg-[#c3f400] text-white dark:text-[#121900] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] dark:shadow-[0_0_30px_rgba(195,244,0,0.5)] transition-transform group-hover:scale-110">
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Playback Controls Bar - Pure Minimalist Icons */}
        <div className="flex flex-col gap-2 px-3 sm:px-6 py-3 border-t border-[#201f24] bg-[#121216]/95 backdrop-blur-md z-20">
          {/* Timeline Scrubber */}
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="group/track relative w-full h-3 flex items-center cursor-pointer select-none"
          >
            {/* Background track */}
            <div className="w-full h-1 group-hover/track:h-1.5 rounded-full bg-[#26262e] transition-all relative overflow-hidden">
              {/* Progress bar */}
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-emerald-500 dark:bg-[#c3f400] shadow-[0_0_10px_rgba(16,185,129,0.8)] dark:shadow-[0_0_10px_#c3f400] transition-[width] duration-75"
              />
            </div>

            {/* Scrubber Thumb */}
            <div
              style={{ left: `${progressPercent}%` }}
              className="absolute -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 dark:bg-[#c3f400] border border-black shadow-[0_0_12px_rgba(16,185,129,0.8)] dark:shadow-[0_0_12px_rgba(195,244,0,0.8)] opacity-0 group-hover/track:opacity-100 transition-opacity pointer-events-none"
            />
          </div>

          {/* Action Buttons: Pure Icons */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 pt-1">
            {/* Left Controls: Play, Rewind 5s, Forward 5s */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-600 dark:bg-[#c3f400] hover:bg-emerald-500 dark:hover:bg-[#d6ff26] text-white dark:text-[#121900] flex items-center justify-center transition-all cursor-pointer shadow-[0_0_14px_rgba(16,185,129,0.35)] dark:shadow-[0_0_14px_rgba(195,244,0,0.35)] active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Rewind 5 Seconds */}
              <button
                onClick={() => seekBy(-5)}
                aria-label="Rewind 5 seconds"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1b1f] hover:bg-[#27262c] border border-[#2e2d33] hover:border-emerald-500/60 dark:hover:border-[#c3f400]/60 text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-[#c3f400] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Forward 5 Seconds */}
              <button
                onClick={() => seekBy(5)}
                aria-label="Forward 5 seconds"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1b1f] hover:bg-[#27262c] border border-[#2e2d33] hover:border-emerald-500/60 dark:hover:border-[#c3f400]/60 text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-[#c3f400] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Right Controls: Mute & Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1b1f] hover:bg-[#27262c] border border-[#2e2d33] hover:border-emerald-500/60 dark:hover:border-[#c3f400]/60 text-[#a1a1aa] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-amber-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-500 dark:text-[#c3f400]" />
                )}
              </button>

              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1b1f] hover:bg-[#27262c] border border-[#2e2d33] hover:border-emerald-500/60 dark:hover:border-[#c3f400]/60 text-[#a1a1aa] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
