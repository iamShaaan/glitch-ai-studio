"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface Asset {
  id: string;
  progress: number; // 0 to 100
  isLoaded: boolean;
  type: "video" | "image" | "font" | "other";
}

interface LoadingContextType {
  isLoading: boolean;
  isReady: boolean;
  progress: number;
  registerAsset: (id: string, type: Asset["type"]) => void;
  updateAssetProgress: (id: string, progress: number) => void;
  setAssetLoaded: (id: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Record<string, Asset>>({});
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const registerAsset = useCallback((id: string, type: Asset["type"]) => {
    setAssets((prev) => ({
      ...prev,
      [id]: { id, progress: 0, isLoaded: false, type },
    }));
  }, []);

  const updateAssetProgress = useCallback((id: string, progress: number) => {
    setAssets((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], progress },
      };
    });
  }, []);

  const setAssetLoaded = useCallback((id: string) => {
    setAssets((prev) => {
      // If asset isn't registered yet, we create it to avoid race conditions
      const existing = prev[id] || { id, progress: 0, isLoaded: false, type: "other" };
      return {
        ...prev,
        [id]: { ...existing, progress: 100, isLoaded: true },
      };
    });
  }, []);

  // Calculate total progress
  const assetValues = Object.values(assets);
  const totalProgress = assetValues.length > 0
    ? assetValues.reduce((acc, asset) => acc + asset.progress, 0) / assetValues.length
    : 0;

  useEffect(() => {
    // If we have assets and all are loaded (or we reach 100% total progress)
    if (assetValues.length > 0 && assetValues.every(a => a.isLoaded)) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setIsReady(true);
        // After transition finishes, stop being "loading" so things can animate
        setTimeout(() => setIsLoading(false), 800);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [assets, assetValues]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isReady,
        progress: totalProgress,
        registerAsset,
        updateAssetProgress,
        setAssetLoaded,
      }}
    >
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
