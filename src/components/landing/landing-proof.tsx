"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, ArrowUpRight, TrendingUp, Users, Award, CheckCircle } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "AI Systems Deployed",
    icon: TrendingUp,
    color: "text-[#26f7b2]",
  },
  {
    value: 5.0,
    suffix: "",
    label: "Client Rating",
    icon: Star,
    color: "text-amber-400",
  },
  {
    value: 100,
    suffix: "%",
    label: "Delivery Success",
    icon: CheckCircle,
    color: "text-[#26f7b2]",
  },
  {
    value: 15,
    suffix: "+",
    label: "Countries Served",
    icon: Users,
    color: "text-[#009d9a]",
  },
];

const outcomes = [
  "Clone your exact likeness and tone into a hyper-realistic AI avatar.",
  "Scale video content production without cameras, studios, or editing time.",
  "Reclaim 50+ hours per week with custom business automation workflows.",
  "Deploy proprietary custom AI applications designed exclusively for your team.",
];

export function LandingProof() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,#0b2430_0%,#060d11_60%)]" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => {
            const cardClasses = "glass rounded-2xl p-6 md:p-8 text-center group hover:bg-white/[0.04] transition-all duration-500";
            const content = (
              <>
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-4 opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-1`}>
                  {stat.value === 5.0 ? (
                    <span>
                      <AnimatedCounter target={5} />.0
                    </span>
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-slate-500 text-xs md:text-sm font-medium tracking-wide">
                  {stat.label}
                </p>
              </>
            );

            return isMobile ? (
              <div key={index} className={cardClasses}>
                {content}
              </div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ delay: index * 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className={cardClasses}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* Results Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          {isMobile ? (
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
                Results That{" "}
                <span className="text-[#26f7b2]">Speak</span>
              </h2>
              <div className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#26f7b2] flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-[13px] md:text-base leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
                Results That{" "}
                <span className="text-[#26f7b2]">Speak</span>
              </h2>
              <div className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#26f7b2] flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {outcome}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Right: Fiverr CTA Card */}
          {/* Right: Fiverr CTA Card */}
          {isMobile ? (
            <div>
              <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden group">
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#26f7b2]" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-amber-300 fill-amber-300" />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-amber-300">5.0 / 5.0</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Trusted on Fiverr
                </h3>
                <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed mb-6">
                  See why 50+ businesses trust us with their AI transformation.
                  Check out our portfolio and verified client reviews.
                </p>

                <a
                  href="https://www.fiverr.com/soumitrohalder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center md:w-auto items-center gap-2 px-6 py-3 bg-amber-300 text-slate-950 font-bold rounded-full hover:bg-amber-200 transition-all group hover:gap-3 shadow-[0_0_15px_rgba(252,211,77,0.3)]"
                >
                  View Portfolio & Reviews
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#26f7b2]" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-amber-300 fill-amber-300" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-amber-300">5.0 / 5.0</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Trusted on Fiverr
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  See why 50+ businesses trust us with their AI transformation.
                  Check out our portfolio and verified client reviews.
                </p>

                <a
                  href="https://www.fiverr.com/soumitrohalder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-300 text-slate-950 font-bold rounded-full hover:bg-amber-200 transition-all group hover:gap-3 shadow-[0_0_15px_rgba(252,211,77,0.3)]"
                >
                  View Portfolio & Reviews
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
