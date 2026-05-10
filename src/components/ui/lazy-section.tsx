"use client";

import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  /** Reserved height for the placeholder so the scrollable height feels stable. */
  minHeight?: number;
  /** How far ahead of the viewport to start mounting (px). Default 400. */
  rootMargin?: string;
  /** When true (desktop), bypass lazy mounting entirely. */
  eager?: boolean;
  /** Mirrors the section's id onto the placeholder so anchor links
   *  (e.g. #system-overview) resolve to the correct scroll position
   *  even before the real section has mounted. */
  id?: string;
}

/**
 * Mounts its children only once the placeholder enters the viewport
 * (with rootMargin of headroom). On mobile this is the single biggest
 * lever for "buttery smooth" — instead of 12 sections all mounting +
 * fetching their images at first paint, only the hero is alive until
 * the user actually scrolls.
 *
 * React still evaluates `children` as a JSX element object, but the
 * component function inside is not executed until we render it. So
 * passing <SystemOverview /> is cheap — no side-effects fire — until
 * `mounted` flips.
 */
export function LazySection({
  children,
  minHeight = 600,
  rootMargin = "400px 0px",
  eager = false,
  id,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(eager);

  useEffect(() => {
    if (mounted) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  // When the section mounts, drop the placeholder id so the real
  // section (which has the same id) wins the anchor lookup. Until then,
  // expose the id on the placeholder so #anchor links still scroll to
  // the correct band.
  return (
    <div
      ref={ref}
      id={mounted ? undefined : id}
      style={mounted ? undefined : { minHeight, contain: "layout paint" }}
    >
      {mounted ? children : null}
    </div>
  );
}
