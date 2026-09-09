"use client";

import { useEffect } from "react";

/**
 * Disables the browser's automatic scroll restoration and forces the page
 * to start at the very top on every fresh load or refresh.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return null;
}
