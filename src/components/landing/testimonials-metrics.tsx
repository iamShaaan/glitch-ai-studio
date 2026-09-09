"use client";

import { CheckCircle2, Clock, TrendingUp, User } from "lucide-react";

export function TestimonialsMetrics() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#0e0e10] border-b border-[#262933]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Middle-Aligned Section Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400]" />
            <span className="font-mono-tech text-[10px] uppercase text-[#c3f400] tracking-widest font-bold">
              CLIENT IMPACT
            </span>
          </div>
          <h2 className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-white tracking-[0.035em] whitespace-nowrap">
            PROVEN CLIENT RESULTS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Big Testimonial Editorial Quote */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            <blockquote className="font-anton text-lg sm:text-2xl md:text-3xl uppercase text-white leading-snug tracking-[0.035em]">
              “I HAVEN&apos;T STEPPED IN FRONT OF A CAMERA IN 4 MONTHS, YET OUR LINKEDIN AND TWITTER VIDEO OUTPUT INCREASED BY 500%. WORKING DIRECTLY WITH SHAN DELIVERED A DIGITAL TWIN THAT SOUNDS MORE ARTICULATE THAN I DO ON A MONDAY MORNING.”
            </blockquote>

            <div className="flex items-center gap-3.5 pt-1">
              <div className="w-10 h-10 rounded-full bg-[#1c1b1d] border border-[#c3f400]/40 flex items-center justify-center text-[#c3f400] shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-anton text-sm sm:text-base uppercase text-white tracking-[0.035em]">
                  Managing Partner
                </span>
                <span className="font-mono-tech text-[10px] tracking-wider text-[#a1a1aa]">
                  Boutique Corporate Legal Practice
                </span>
              </div>
            </div>
          </div>

          {/* Live Performance Stat Counters */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {/* Stat 1 */}
            <div className="p-5 rounded-2xl bg-[#131315] border border-[#262933] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-anton text-3xl sm:text-4xl text-white leading-none tracking-[0.035em]">
                  500K+
                </span>
                <span className="font-mono-tech text-[10px] tracking-widest text-[#a1a1aa] pt-1.5">
                  ORGANIC EXECUTIVE VIEWS
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center text-[#c3f400]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 2 - Highlighted */}
            <div className="p-5 rounded-2xl bg-[#131315] border border-[#c3f400]/40 flex items-center justify-between shadow-[0_0_24px_rgba(195,244,0,0.12)]">
              <div className="flex flex-col">
                <span className="font-anton text-3xl sm:text-4xl text-[#c3f400] leading-none tracking-[0.035em]">
                  140+ hrs
                </span>
                <span className="font-mono-tech text-[10px] tracking-widest text-[#a1a1aa] pt-1.5">
                  SAVED PER FOUNDER / MONTH
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#c3f400]/10 border border-[#c3f400]/40 flex items-center justify-center text-[#c3f400]">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-5 rounded-2xl bg-[#131315] border border-[#262933] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-anton text-3xl sm:text-4xl text-white leading-none tracking-[0.035em]">
                  99.4%
                </span>
                <span className="font-mono-tech text-[10px] tracking-widest text-[#a1a1aa] pt-1.5">
                  VOICE &amp; FACIAL ACCURACY SCORE
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center text-[#c3f400]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
