"use client";

import { useRef, useState, useEffect } from "react";
import { VIDEO_SLOTS } from "@/lib/video-config";
import { claimAudioFocus, subscribeToAudioClaims } from "@/lib/video-sync";
import { Play, Pause, Video as VideoIcon, Volume2, VolumeX, Maximize2, AlertTriangle, RotateCw } from "lucide-react";

interface VideoSlotPlayerProps {
  slotId: number;
  className?: string;
  aspectRatioClass?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  borderless?: boolean;
  blended?: boolean;
  clean?: boolean; // When true: NO text overlays, NO unmute button, NO fullscreen button, pure clean video
  showMuteOnly?: boolean; // When true: Clean video with ONLY the top-corner mute/unmute button and play/pause
  onSelect?: () => void;
  showOverlayInfo?: boolean;
}

export function VideoSlotPlayer({
  slotId,
  className = "",
  aspectRatioClass,
  autoPlay = false,
  loop = true,
  muted = true,
  borderless = false,
  blended = false,
  clean = false,
  showMuteOnly = false,
  onSelect,
  showOverlayInfo = false,
}: VideoSlotPlayerProps) {
  const slot = VIDEO_SLOTS[slotId];
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(autoPlay);

  // Reset error & loaded status when URL changes
  useEffect(() => {
    setHasError(false);
    setIsVideoLoaded(false);
    setHasStartedPlaying(autoPlay);
  }, [slot?.videoUrl, autoPlay]);

  // Global Audio Synchronization Listener
  // Invariant: If any other video on the website unmutes, this video will mute immediately
  useEffect(() => {
    const unsubscribe = subscribeToAudioClaims((detail) => {
      if (detail.activeElement !== videoRef.current) {
        setIsMuted(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handlePlay = () => {
      setIsPlaying(true);
      setHasStartedPlaying(true);
      setHasError(false);
      if (video && !video.muted && video.volume > 0) {
        claimAudioFocus(slotId, video);
      }
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };
    const handleLoadedData = () => {
      setHasError(false);
      setIsVideoLoaded(true);
    };
    const handleCanPlay = () => {
      setHasError(false);
      setIsVideoLoaded(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [slot?.videoUrl, slotId]);

  if (!slot) {
    return (
      <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs">
        Invalid Video Slot #{slotId}
      </div>
    );
  }

  const defaultAspectClass =
    slot.aspectRatio === "9/16"
      ? "aspect-[9/16]"
      : slot.aspectRatio === "16/9"
      ? "aspect-video"
      : slot.aspectRatio === "4/5"
      ? "aspect-[4/5]"
      : "aspect-[4/3]";

  const finalAspect = aspectRatioClass || defaultAspectClass;

  const togglePlay = () => {
    if (onSelect) {
      onSelect();
      return;
    }
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      if (!isMuted) {
        claimAudioFocus(slotId, videoRef.current);
      }
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    if (!nextMuted) {
      // Unmuting: Enforce global single-audio invariant across the whole website
      claimAudioFocus(slotId, videoRef.current);
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // ── Render Live Video when URL is provided ─────────────────────────────────
  if (slot.videoUrl && slot.videoUrl.trim() !== "") {
    const borderStyle = borderless
      ? "border-0 shadow-none bg-black/20"
      : "border border-[#262933] bg-[#131315]";

    return (
      <div
        ref={containerRef}
        className={`relative w-full ${finalAspect} rounded-2xl overflow-hidden group cursor-pointer select-none ${borderStyle} ${className}`}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={slot.videoUrl}
          poster={slot.posterUrl}
          autoPlay={autoPlay}
          loop={loop}
          muted={isMuted}
          playsInline
          preload={autoPlay ? "auto" : "metadata"}
          className={`w-full h-full object-cover group-hover:scale-[1.01] transition-all duration-700 ${
            (autoPlay ? isVideoLoaded : (hasStartedPlaying && isVideoLoaded)) ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Poster Image Layer with Smooth Cross-fade */}
        {slot.posterUrl && (
          <img
            src={slot.posterUrl}
            alt={slot.title || "Video preview"}
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 z-10 ${
              (autoPlay ? isVideoLoaded : (hasStartedPlaying && isVideoLoaded)) ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />
        )}

        {/* Shimmer skeleton before video or poster loads */}
        {!isVideoLoaded && (
          <div
            className={`absolute inset-0 z-[5] bg-[#121215] flex items-center justify-center transition-opacity duration-700 ${
              slot.posterUrl ? "opacity-40" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse" />
          </div>
        )}

        {/* Error Fallback State - Never leaves an empty or black void */}
        {hasError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-[#111113]/95 backdrop-blur-sm border border-[#2a2a2e] text-center gap-2.5 select-none">
            <div className="w-10 h-10 rounded-full bg-[#1c1b1f] border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono-tech text-[11px] text-amber-400 uppercase tracking-widest font-bold">
                Stream Connection Error
              </span>
              <p className="font-space text-xs text-[#a1a1aa] max-w-[220px] leading-tight">
                Unable to load video stream. Click below to reload.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasError(false);
                if (videoRef.current) {
                  videoRef.current.load();
                  videoRef.current.play().catch(() => {});
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1c1b1d] hover:bg-[#27272a] border border-[#3f3f46] hover:border-[#c3f400] text-xs font-mono-tech uppercase text-white hover:text-[#c3f400] transition-all cursor-pointer shadow-md"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Retry Stream</span>
            </button>
          </div>
        )}

        {/* Soft edge blending overlays when blended is true */}
        {blended && (
          <>
            {/* Subtle inner dark vignette */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_35px_rgba(10,10,12,0.85)] z-10" />
            {/* Soft gradient fading right edge towards text on desktop */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent z-10 hidden lg:block" />
            {/* Soft gradient fading bottom edge */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent z-10" />
            {/* Soft gradient fading left edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/30 to-transparent z-10 hidden lg:block" />
          </>
        )}

        {/* Center Play/Pause indicator */}
        {!clean && (
          <div
            className={`absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity duration-200 pointer-events-none z-20 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center shadow-[0_0_24px_rgba(195,244,0,0.5)] transition-transform group-hover:scale-110">
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </div>
          </div>
        )}

        {/* Transparent Mute/Unmute button when showMuteOnly is true (small, icon-only) */}
        {showMuteOnly && (
          <div className="absolute top-3 right-3 pointer-events-auto z-20">
            <button
              onClick={toggleMute}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isMuted
                  ? "bg-black/20 hover:bg-black/45 border-white/15 text-white/70 hover:text-white"
                  : "bg-black/30 hover:bg-black/55 border-[#c3f400]/60 text-[#c3f400] shadow-[0_0_10px_rgba(195,244,0,0.3)]"
              }`}
              title={isMuted ? "Click to unmute" : "Click to mute"}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
          </div>
        )}

        {/* Top bar controls (when NOT clean and NOT showMuteOnly) */}
        {!clean && !showMuteOnly && (
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
            <div className="px-2.5 py-1 rounded-full bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 font-mono-tech text-[10px] tracking-widest text-[#c3f400] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-ping" />
              <span>{slot.badge || `SLOT #${slot.id}`}</span>
            </div>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                className={`px-3 py-1 rounded-full backdrop-blur-md border flex items-center gap-1.5 font-mono-tech text-[10px] tracking-wider transition-all duration-200 ${
                  isMuted
                    ? "bg-[#0a0a0c]/80 border-white/10 text-[#d4d4d8] hover:text-[#c3f400] hover:border-[#c3f400]/50"
                    : "bg-[#c3f400] border-[#c3f400] text-[#161e00] font-bold shadow-[0_0_12px_rgba(195,244,0,0.4)]"
                }`}
                title={isMuted ? "Click to unmute" : "Click to mute"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>UNMUTE</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>AUDIO ON</span>
                  </>
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-full bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 text-[#d4d4d8] hover:text-white hover:border-[#c3f400]/50 transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Scrubber Progress Bar */}
        {!clean && !showMuteOnly && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#262933]/60 z-20 overflow-hidden pointer-events-none">
            <div
              className="h-full bg-[#c3f400] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Overlay info */}
        {!clean && !showMuteOnly && showOverlayInfo && (
          <div className="absolute bottom-1 left-0 right-0 p-4 bg-gradient-to-t from-[#0e0e10] to-transparent pointer-events-none">
            <span className="font-anton text-base uppercase text-white tracking-[0.035em] block">
              {slot.title}
            </span>
            <span className="font-space text-xs text-[#a1a1aa] font-light tracking-wide">
              {slot.subtitle}
            </span>
          </div>
        )}
      </div>
    );
  }

  // ── Render Architectural Numbered Placeholder when URL is awaiting ────────
  return (
    <div
      onClick={onSelect}
      className={`relative w-full ${finalAspect} rounded-xl overflow-hidden bg-[#131315] border border-[#262933] hover:border-[#c3f400]/40 transition-all duration-300 flex flex-col justify-between p-4 md:p-5 group cursor-pointer ${className}`}
    >
      {/* Background wireframe texture */}
      <div className="absolute inset-0 grid-wireframe opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1b1d]/80 via-[#131315]/90 to-[#0e0e10] pointer-events-none" />

      {/* Top Header: Slot Number + Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#201f21] border border-[#2a2a2c] font-mono-tech text-xs tracking-wider text-[#c3f400]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-pulse" />
          VIDEO #{slot.id}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-[#201f21] font-mono-tech text-[10px] uppercase tracking-widest text-[#a1a1aa] border border-[#2a2a2c]">
          {slot.aspectRatio}
        </span>
      </div>

      {/* Center Action: Play Symbol + Awaiting Label */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 text-center py-4 my-auto">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed border-[#c3f400]/50 bg-[#c3f400]/10 flex items-center justify-center text-[#c3f400] group-hover:scale-110 group-hover:bg-[#c3f400] group-hover:text-[#161e00] transition-all shadow-[0_0_20px_rgba(195,244,0,0.15)]">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
        <span className="font-mono-tech text-xs uppercase tracking-widest text-[#a1a1aa] group-hover:text-[#c3f400] transition-colors">
          Awaiting Cloudflare Link
        </span>
      </div>

      {/* Bottom Metadata */}
      <div className="relative z-10 pt-3 border-t border-[#201f21] flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-anton text-base uppercase text-white tracking-[0.035em] truncate">
            {slot.title}
          </span>
          <VideoIcon className="w-4 h-4 text-[#8e92a4]" />
        </div>
        <span className="font-space text-xs text-[#a1a1aa] font-light tracking-wide truncate">
          {slot.subtitle}
        </span>
      </div>
    </div>
  );
}
