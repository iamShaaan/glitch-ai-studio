"use client";

import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${
        isDark
          ? "bg-[#1c1b1d] hover:bg-[#27262a] border border-[#2a2a2c] hover:border-[#c3f400]/60 text-amber-300 hover:text-amber-200 shadow-md"
          : "bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 hover:border-emerald-600/50 text-zinc-700 hover:text-emerald-700 shadow-sm"
      } ${className}`}
    >
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-300" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0 text-zinc-700" />
      )}
    </button>
  );
}
