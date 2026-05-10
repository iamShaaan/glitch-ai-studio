"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isReady: boolean;
  setReady: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  // Lock body scroll + reset scroll position while loading
  useEffect(() => {
    // Force top before anything renders
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const setReady = () => {
    // Unlock scroll, reset position, then reveal
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
