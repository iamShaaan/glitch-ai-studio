"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsMounted(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMounted]);

  const handlePlay = () => {
    setShouldAutoplay(true);
    setIsMounted(true);
  };

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const iframeBase = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  const iframeUrl = shouldAutoplay ? `${iframeBase}&autoplay=1` : iframeBase;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl bg-black ${className}`}
      style={{ aspectRatio }}
    >
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
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== fallbackThumb) img.src = fallbackThumb;
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 transition-opacity group-hover:opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#26f7b2] text-[#09333f] shadow-[0_0_30px_rgba(38,247,178,0.4)] transition-transform group-hover:scale-110">
              <Play className="h-7 w-7 fill-current ml-0.5" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
