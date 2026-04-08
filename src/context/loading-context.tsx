"use client";

import React, { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isReady: boolean;
  setReady: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const setReady = () => setIsReady(true);

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
