"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  aspectRatio?: string;
  className?: string;
}

export function YouTubeEmbed({
  videoId,
  title,
  aspectRatio = "9/16",
  className = "",
}: YouTubeEmbedProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < 768 ||
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePlay = () => {
    setShouldAutoplay(true);
    setIsMounted(true);
  };

  // hqdefault is ~10x smaller than maxresdefault (~12KB vs ~120KB on
  // Shorts) and is guaranteed to exist for every video, so we avoid the
  // double-roundtrip you get when maxresdefault 404s and onError swaps.
  // For 9:16 Shorts the 4:3 hqdefault crops cleanly under object-cover.
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const iframeBase = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  const iframeUrl = shouldAutoplay ? `${iframeBase}&autoplay=1` : iframeBase;

  const wrapperClass = `relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d2a2a] via-[#0a1a1f] to-[#09333f] ${className}`;

  // ── Mobile: static link to YouTube ──────────────────────────────────────
  // No iframe, no postMessage handlers, no YouTube IFrame API. The
  // thumbnail + play overlay is identical to the desktop poster; tap
  // opens the YouTube app (or the watch page) where playback is
  // smoother than an embedded iframe anyway.
  if (isMobile) {
    return (
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} on YouTube`}
        className={`group block ${wrapperClass}`}
        style={{ aspectRatio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail served from i.ytimg.com which is not configured as a Next.js image domain */}
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#26f7b2] text-[#09333f] shadow-[0_0_30px_rgba(38,247,178,0.4)]">
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </div>
            <span className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">
              Watch on YouTube
            </span>
          </div>
        </div>
      </a>
    );
  }

  // ── Desktop: existing click-to-mount iframe ────────────────────────────
  return (
    <div className={wrapperClass} style={{ aspectRatio }}>
      {isMounted ? (
        <iframe
          src={iframeUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail served from i.ytimg.com which is not configured as a Next.js image domain */}
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 backdrop-blur-[1px] transition-all group-hover:backdrop-blur-[3px] group-hover:from-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#26f7b2] text-[#09333f] shadow-[0_0_30px_rgba(38,247,178,0.4)] transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 fill-current ml-0.5" />
              </div>
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                Click to play
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
