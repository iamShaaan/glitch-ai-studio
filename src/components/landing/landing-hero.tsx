"use client";

import { useState } from "react";
import { VideoSlotPlayer } from "@/components/ui/video-slot";
import { WorkWithMeModal } from "@/components/ui/work-with-me-modal";
import { ArrowRight, User } from "lucide-react";

export function LandingHero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 border-b border-zinc-200 dark:border-[#262933] overflow-hidden transition-colors duration-200">
      {/* Ambient Grid & Subtle Neon/Emerald Aura */}
      <div className="absolute inset-0 grid-wireframe opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/[0.06] dark:bg-[#c3f400]/[0.06] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Responsive Grid Layout:
            Desktop: Video on Left Half, Text on Right Half (Both matching in height and width)
            Mobile: 1. Header Text -> 2. Video -> 3. Subtexts & Action Buttons
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-4 gap-x-8 lg:gap-x-12 items-center">
          {/* 1. Header Text: Mobile Top, Desktop Right-Top (No extra badges above) */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:row-start-1 flex flex-col gap-2 self-end">
            <h1 className="font-anton uppercase tracking-[0.035em] text-zinc-900 dark:text-white leading-[1.06] text-xl min-[360px]:text-[23px] sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[40px]">
              <span className="block whitespace-nowrap">YOU DON&apos;T HAVE TIME TO FILM.</span>
              <span className="block whitespace-nowrap text-zinc-500 dark:text-[#8e92a4]">
                YOUR BRAND STILL <span className="text-zinc-900 dark:text-white">NEEDS CONTENT.</span>
              </span>
            </h1>
          </div>

          {/* 2. Video Block: Mobile Middle, Desktop Left Half (Spans rows 1 & 2) */}
          <div className="order-2 lg:order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 self-center relative w-full my-2 lg:my-0">
            {/* Ambient Backlight Aura for Seamless Blending */}
            <div className="absolute -inset-4 md:-inset-8 bg-emerald-500/[0.06] dark:bg-[#c3f400]/[0.08] blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute -inset-10 md:-inset-16 bg-blue-500/[0.03] dark:bg-blue-500/[0.04] blur-[100px] rounded-full pointer-events-none" />

            {/* 16:9 Clean Borderless Blended Video Player - Pure Video, No Overlays, No Unmute Button */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/80 dark:border-transparent">
              <VideoSlotPlayer
                slotId={1}
                aspectRatioClass="aspect-video"
                autoPlay={true}
                loop={true}
                muted={true}
                borderless={true}
                blended={true}
                clean={true}
                isHero={true}
              />
            </div>
          </div>

          {/* 3. Subtexts & Action Buttons: Mobile Bottom, Desktop Right-Bottom */}
          <div className="order-3 lg:order-3 lg:col-span-6 lg:col-start-7 lg:row-start-2 flex flex-col gap-3.5 self-start">
            {/* Subheader Hook: Avatar, Autonomous Agent, High-Converting Ads */}
            <p className="font-space text-[15px] sm:text-base text-zinc-700 dark:text-[#e5e1e4] font-medium leading-relaxed tracking-wide">
              Tell your story and scale your brand with AI. Train your digital twin, deploy an autonomous video agent for self-serve content, or order high-converting AI ads and viral UGC.
            </p>

            {/* Operational Value: Camera-Free Scaling */}
            <p className="font-space text-xs sm:text-sm text-zinc-500 dark:text-[#a1a1aa] font-normal leading-relaxed tracking-wide">
              From $200 avatar setups to autonomous self-service video agents ($1,000) and $15/hr performance ad campaigns. Generated completely camera-free without studio sets, crews, or filming schedules.
            </p>

            {/* CTA Buttons Cluster: Sideways (side-by-side) on mobile with optimized sizes */}
            <div className="flex flex-row items-center gap-2 sm:gap-3.5 pt-1 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#c3f400] dark:hover:bg-[#d6ff26] dark:text-[#161e00] font-anton text-xs min-[380px]:text-sm sm:text-base md:text-lg uppercase tracking-[0.035em] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(22,163,74,0.25)] dark:shadow-[0_0_24px_rgba(195,244,0,0.25)] cursor-pointer whitespace-nowrap"
              >
                <span>Work with me</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>

              <a
                href="#founder"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("founder")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1c1b1d] dark:hover:bg-[#27262a] border border-zinc-300 dark:border-[#2a2a2c] text-zinc-800 dark:text-[#e5e1e4] hover:text-emerald-700 dark:hover:text-[#c3f400] hover:border-emerald-600/40 dark:hover:border-[#c3f400]/40 font-mono-tech text-[10px] min-[360px]:text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>Who am I?</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Modal for Platform Selection */}
      <WorkWithMeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
