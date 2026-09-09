"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { VideoSlotPlayer } from "@/components/ui/video-slot";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight, Compass, Sparkles, Target, Layers } from "lucide-react";
import { TravelReelsModal } from "@/components/ui/travel-reels-modal";
import { CloneReelsModal } from "@/components/ui/clone-reels-modal";
import { NicheReelsModal } from "@/components/ui/niche-reels-modal";

interface UseCaseCard {
  slotId: number;
  badge: string;
  title: string;
  description: string;
  secondaryDesc: string;
  takeaway: string;
  ctaButton?: {
    label: string;
    action?: string;
  };
}

const USE_CASE_CARDS: UseCaseCard[] = [
  {
    slotId: 2,
    badge: "AI Travel Influencer",
    title: "Promote Tourism-Related Business\nWith AI Influencer",
    description:
      "You can create a travel AI influencer to promote your business related to travel, tourism, hotels, and anything related to travel and tourism.",
    secondaryDesc:
      "Promote destinations, hotel experiences, photography gadgets, accessories, and travel gear with an authentic on-camera persona touring global spots on demand.",
    takeaway: "Destinations & Hotels • Travel Gear & Gadgets • Zero Travel Overhead",
    ctaButton: {
      label: "See her in more locations",
      action: "open-travel-modal",
    },
  },
  {
    slotId: 3,
    badge: "Real Human Clone",
    title: "Promote Your Service Using\nYour AI Clone",
    description:
      "Promote your service using your AI clone. A real human clone that represents your business, pitches your offers, and connects with clients effortlessly.",
    secondaryDesc:
      "Scale client acquisition and service delivery without filming burnout. Your AI clone delivers your authentic likeness, voice, and personal charisma on demand.",
    takeaway: "1:1 Human Likeness • Scalable Client Outreach • Zero Filming Burnout",
    ctaButton: {
      label: "See how others are using it",
      action: "open-clone-modal",
    },
  },
  {
    slotId: 4,
    badge: "Niche AI Persona",
    title: "Dominate Your Niche With A\nUnique AI Persona",
    description:
      "Build an AI persona that your target audience connects with well and ultimately promotes your product in a well-targeted niche market.",
    secondaryDesc:
      "Position your AI character as a trusted specialist to review offerings, showcase unique product features, and drive consistent conversions without camera crews or studio delays.",
    takeaway: "Targeted Niche Reach • Deep Audience Connection • Scalable Product Promotion",
    ctaButton: {
      label: "See more niche personas",
      action: "open-niche-modal",
    },
  },
  {
    slotId: 5,
    badge: "Avatar For Local Business",
    title: "Represent Your Business With\nAn AI Persona",
    description:
      "You can create an AI character from scratch just to represent your company or your business. It's not always necessary to clone yourself.",
    secondaryDesc:
      "If you are a company and you don't want to be bound to any person, you can create a separate AI influencer that will be a representative of your brand or business. It can be applicable for local businesses as well as big enterprises.",
    takeaway: "100% Brand Owned • Zero Person Dependency • Any Sector",
    ctaButton: {
      label: "Explore more portfolio works",
      action: "scroll-to-portfolio",
    },
  },
];

export function CinemaRack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [travelModalOpen, setTravelModalOpen] = useState(false);
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [nicheModalOpen, setNicheModalOpen] = useState(false);

  const scrollCooldownRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwipingHorizontally = useRef<boolean | null>(null);

  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % USE_CASE_CARDS.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + USE_CASE_CARDS.length) % USE_CASE_CARDS.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const showcaseEl = document.getElementById("showcase");
      if (!showcaseEl) return;
      const rect = showcaseEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwipingHorizontally.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (isSwipingHorizontally.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isSwipingHorizontally.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isSwipingHorizontally.current) {
      setDragOffset(deltaX * 0.7);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    if (touchStartX.current !== null && isSwipingHorizontally.current) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
    }
    setDragOffset(0);
    touchStartX.current = null;
    touchStartY.current = null;
    isSwipingHorizontally.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    mouseStartX.current = e.clientX;
    isMouseDown.current = true;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    setDragOffset(deltaX * 0.7);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    setIsDragging(false);
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
    setDragOffset(0);
    mouseStartX.current = null;
    isMouseDown.current = false;
  };

  const handleMouseLeave = () => {
    if (isMouseDown.current) {
      setIsDragging(false);
      setDragOffset(0);
      mouseStartX.current = null;
      isMouseDown.current = false;
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width / 2) {
      goNext();
    } else {
      goPrev();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollCooldownRef.current) return;
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

    if (isHorizontal && Math.abs(e.deltaX) > 20) {
      scrollCooldownRef.current = true;
      if (e.deltaX > 0) goNext();
      else goPrev();
      setTimeout(() => { scrollCooldownRef.current = false; }, 500);
      return;
    }

    if (Math.abs(e.deltaY) > 30) {
      scrollCooldownRef.current = true;
      if (e.deltaY > 0) goNext();
      else goPrev();
      setTimeout(() => { scrollCooldownRef.current = false; }, 500);
    }
  };

  const currentCard = USE_CASE_CARDS[currentIndex];

  return (
    <section
      id="showcase"
      className="w-full pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 border-b border-zinc-200 dark:border-[#262933] bg-zinc-50 dark:bg-[#0e0e10] relative overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-7 flex flex-col items-center">
          <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.035em] text-zinc-900 dark:text-white whitespace-nowrap">
            CHOOSE YOUR USE CASE
          </h2>
          <p className="font-space text-xs sm:text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-2 font-normal leading-relaxed">
            Select the autonomous AI video architecture engineered for your business.
          </p>
        </div>

        <div className="relative flex items-center justify-center gap-3 sm:gap-5 lg:gap-8 max-w-7xl mx-auto select-none">
          <button
            onClick={goPrev}
            aria-label="Previous use case"
            className="hidden md:flex w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-zinc-100 dark:bg-[#131315] dark:hover:bg-[#1c1b1d] border border-zinc-200 hover:border-emerald-600/50 dark:border-[#2a2a2c] dark:hover:border-[#c3f400] text-zinc-700 dark:text-white hover:text-emerald-700 dark:hover:text-[#c3f400] transition-all items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 flex-shrink-0 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onDoubleClick={handleDoubleClick}
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
            className="flex-1 min-w-0 max-w-5xl xl:max-w-6xl w-full rounded-2xl sm:rounded-3xl bg-white dark:bg-[#131315] border border-zinc-200 dark:border-[#262933] p-4 sm:p-6 md:p-7 lg:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-200"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 lg:items-center">
              <div className="block lg:hidden flex flex-col gap-1.5">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#1c1b1d] border border-emerald-200 dark:border-[#2a2a2c] text-xs font-semibold text-emerald-800 dark:text-[#c3f400] w-fit">
                  {currentCard.badge}
                </span>
                <h3 className="font-anton text-xl sm:text-2xl uppercase text-zinc-900 dark:text-white tracking-[0.035em] leading-tight whitespace-pre-line">
                  {currentCard.title}
                </h3>
              </div>

              <div className="w-full lg:col-span-7 xl:col-span-8 relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 border border-zinc-200 dark:border-[#201f21] shadow-2xl flex-shrink-0 pointer-events-auto">
                <VideoSlotPlayer
                  key={currentCard.slotId}
                  slotId={currentCard.slotId}
                  aspectRatioClass="w-full h-full aspect-video"
                  autoPlay={false}
                  showMuteOnly={true}
                  className="w-full h-full rounded-xl sm:rounded-2xl border-0"
                />
              </div>

              <div className="block lg:hidden flex flex-col gap-2 pt-1">
                <p className="font-space text-sm text-zinc-700 dark:text-[#e5e1e4] leading-relaxed">
                  {currentCard.description}
                </p>
                {currentCard.secondaryDesc && (
                  <p className="font-space text-xs text-zinc-500 dark:text-[#a1a1aa] leading-relaxed">
                    {currentCard.secondaryDesc}
                  </p>
                )}
                {currentCard.ctaButton ? (
                  <div className="pt-2 border-t border-zinc-200 dark:border-[#201f21] flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentCard.ctaButton?.action === "open-niche-modal") {
                          setNicheModalOpen(true);
                        } else if (currentCard.ctaButton?.action === "open-clone-modal") {
                          setCloneModalOpen(true);
                        } else if (currentCard.ctaButton?.action === "scroll-to-portfolio") {
                          const target = document.getElementById("portfolio") || document.getElementById("works");
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        } else {
                          setTravelModalOpen(true);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#c3f400] dark:hover:bg-[#d6ff26] dark:text-[#121900] text-[11px] font-mono-tech uppercase font-bold tracking-wider transition-all duration-200 shadow-[0_0_14px_rgba(22,163,74,0.25)] hover:shadow-[0_0_20px_rgba(22,163,74,0.35)] dark:shadow-[0_0_14px_rgba(195,244,0,0.25)] dark:hover:shadow-[0_0_20px_rgba(195,244,0,0.4)] active:scale-[0.98] cursor-pointer group/btn"
                    >
                      {currentCard.ctaButton.action === "open-niche-modal" ? (
                        <Target className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:rotate-12 transition-transform duration-300" />
                      ) : currentCard.ctaButton.action === "open-clone-modal" ? (
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:scale-110 transition-transform duration-300" />
                      ) : currentCard.ctaButton.action === "scroll-to-portfolio" ? (
                        <Layers className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:scale-110 transition-transform duration-300" />
                      ) : (
                        <Compass className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:rotate-45 transition-transform duration-300" />
                      )}
                      <span>{currentCard.ctaButton.label}</span>
                      {currentCard.ctaButton.action === "scroll-to-portfolio" ? (
                        <ArrowDownRight className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-zinc-200 dark:border-[#201f21] flex items-center gap-2 text-xs text-zinc-500 dark:text-[#8e92a4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-[#c3f400]" />
                    <span>{currentCard.takeaway}</span>
                  </div>
                )}
              </div>

              <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col justify-center gap-4 h-full py-1">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#1c1b1d] border border-emerald-200 dark:border-[#2a2a2c] text-xs font-semibold text-emerald-800 dark:text-[#c3f400] w-fit">
                  {currentCard.badge}
                </span>

                <h3 className="font-anton text-2xl xl:text-3xl uppercase text-zinc-900 dark:text-white tracking-[0.035em] leading-tight whitespace-pre-line">
                  {currentCard.title}
                </h3>

                <p className="font-space text-sm xl:text-[15px] text-zinc-700 dark:text-[#e5e1e4] font-medium leading-relaxed">
                  {currentCard.description}
                </p>

                {currentCard.secondaryDesc && (
                  <p className="font-space text-xs xl:text-sm text-zinc-500 dark:text-[#a1a1aa] font-normal leading-relaxed">
                    {currentCard.secondaryDesc}
                  </p>
                )}

                {currentCard.ctaButton ? (
                  <div className="pt-3 border-t border-zinc-200 dark:border-[#201f21] flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentCard.ctaButton?.action === "open-niche-modal") {
                          setNicheModalOpen(true);
                        } else if (currentCard.ctaButton?.action === "open-clone-modal") {
                          setCloneModalOpen(true);
                        } else if (currentCard.ctaButton?.action === "scroll-to-portfolio") {
                          const target = document.getElementById("portfolio") || document.getElementById("works");
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        } else {
                          setTravelModalOpen(true);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#c3f400] dark:hover:bg-[#d6ff26] dark:text-[#121900] text-xs font-mono-tech uppercase font-bold tracking-wider transition-all duration-200 shadow-[0_0_16px_rgba(22,163,74,0.25)] hover:shadow-[0_0_24px_rgba(22,163,74,0.4)] dark:shadow-[0_0_16px_rgba(195,244,0,0.25)] dark:hover:shadow-[0_0_24px_rgba(195,244,0,0.45)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer group/btn"
                    >
                      {currentCard.ctaButton.action === "open-niche-modal" ? (
                        <Target className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:rotate-12 transition-transform duration-300" />
                      ) : currentCard.ctaButton.action === "open-clone-modal" ? (
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:scale-110 transition-transform duration-300" />
                      ) : currentCard.ctaButton.action === "scroll-to-portfolio" ? (
                        <Layers className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:scale-110 transition-transform duration-300" />
                      ) : (
                        <Compass className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:rotate-45 transition-transform duration-300" />
                      )}
                      <span>{currentCard.ctaButton.label}</span>
                      {currentCard.ctaButton.action === "scroll-to-portfolio" ? (
                        <ArrowDownRight className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white dark:text-[#121900] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-zinc-200 dark:border-[#201f21] flex items-center gap-2 text-xs text-zinc-500 dark:text-[#8e92a4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-[#c3f400]" />
                    <span>{currentCard.takeaway}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={goNext}
            aria-label="Next use case"
            className="hidden md:flex w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-zinc-100 dark:bg-[#131315] dark:hover:bg-[#1c1b1d] border border-zinc-200 hover:border-emerald-600/50 dark:border-[#2a2a2c] dark:hover:border-[#c3f400] text-zinc-700 dark:text-white hover:text-emerald-700 dark:hover:text-[#c3f400] transition-all items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 flex-shrink-0 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Controls (md:hidden) with Left Arrow, Dots, Right Arrow */}
        <div className="flex md:hidden items-center justify-between gap-4 mt-5 max-w-xs mx-auto">
          <button
            onClick={goPrev}
            aria-label="Previous use case"
            className="w-10 h-10 rounded-full bg-white hover:bg-zinc-100 dark:bg-[#1c1b1d] dark:hover:bg-[#252427] border border-zinc-200 dark:border-[#2a2a2c] text-zinc-700 dark:text-white hover:text-emerald-700 dark:hover:text-[#c3f400] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {USE_CASE_CARDS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-7 bg-emerald-600 dark:bg-[#c3f400] shadow-[0_0_10px_rgba(22,163,74,0.5)] dark:shadow-[0_0_10px_rgba(195,244,0,0.6)]"
                    : "w-2 bg-zinc-300 dark:bg-[#2a2a2c]"
                }`}
                aria-label={`Go to use case ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next use case"
            className="w-10 h-10 rounded-full bg-white hover:bg-zinc-100 dark:bg-[#1c1b1d] dark:hover:bg-[#252427] border border-zinc-200 dark:border-[#2a2a2c] text-zinc-700 dark:text-white hover:text-emerald-700 dark:hover:text-[#c3f400] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Visual Scroll Selection Dots (md and up, NO text below) */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-6">
          {USE_CASE_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-emerald-600 dark:bg-[#c3f400] shadow-[0_0_12px_rgba(22,163,74,0.5)] dark:shadow-[0_0_12px_rgba(195,244,0,0.6)]"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-[#2a2a2c] dark:hover:bg-[#424246]"
              }`}
              aria-label={`Go to use case ${idx + 1}`}
            />
          ))}
        </div>

        {/* Floating Modal for 10 Travel Reels */}
        <TravelReelsModal
          isOpen={travelModalOpen}
          onClose={() => setTravelModalOpen(false)}
        />

        {/* Floating Modal for 9 Real Human Clone Use Case Reels */}
        <CloneReelsModal
          isOpen={cloneModalOpen}
          onClose={() => setCloneModalOpen(false)}
        />

        {/* Floating Modal for 7 Niche AI Persona Reels */}
        <NicheReelsModal
          isOpen={nicheModalOpen}
          onClose={() => setNicheModalOpen(false)}
        />
      </div>
    </section>
  );
}
