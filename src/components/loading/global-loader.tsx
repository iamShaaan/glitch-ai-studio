"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/context/loading-context";
import { useEffect, useState } from "react";

export function GlobalLoader() {
  const { progress, isReady, registerAsset, setAssetLoaded } = useLoading();
  const [displayProgress, setDisplayProgress] = useState(0);

  // Register critical global assets
  useEffect(() => {
    registerAsset("global_logo", "image");
    
    const logo = new window.Image();
    logo.src = "/logo.png";
    logo.onload = () => setAssetLoaded("global_logo");
    logo.onerror = () => setAssetLoaded("global_logo");
  }, [registerAsset, setAssetLoaded]);

  // Smooth the progress display
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev < progress) return Math.min(prev + 1, progress);
        return prev;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]"
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.1, 1] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" 
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px]" />
            
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative flex flex-col items-center gap-10 px-8 w-full max-w-sm">
            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-48 h-14"
            >
              <Image src="/logo.png" alt="Glitch AI Studio" fill className="object-contain" priority />
            </motion.div>

            {/* Status Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-mono">
                  Loading Experience
                </p>
              </div>
              <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase">
                {displayProgress < 30 ? "Initializing..." : displayProgress < 70 ? "Caching Assets..." : "Finalizing UI..."}
              </p>
            </motion.div>

            {/* High-Fidelity Progress System */}
            <div className="w-full space-y-3">
              <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  style={{ width: `${displayProgress}%` }}
                />
                <motion.div
                  className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 h-1 bg-emerald-500/40 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-emerald-400/80 text-[11px] font-mono tabular-nums tracking-widest">
                  {Math.round(displayProgress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Cinematic Corner Accents */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-white/10" />
            <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-white/10" />
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-white/10" />
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-white/10" />
          </motion.div>

          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] z-[10000]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
