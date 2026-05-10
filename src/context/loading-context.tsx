"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isReady: boolean;
  setReady: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

function detectMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mobile: skip the loader entirely. The page renders immediately —
    // hero is `priority` so it paints fast, below-fold sections lazy-
    // mount via <LazySection>. The "cinematic loading screen" was just a
    // delay; visibility:hidden never actually held back image fetches.
    if (detectMobile()) {
      setIsReady(true);
      return;
    }

    // Desktop: lock scroll + force top while loader does its preload.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const setReady = () => {
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setIsReady(true);
  };

  return (
    <LoadingContext.Provider value={{ isReady, setReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
