"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const BOTTOM_COPY =
  "From global technology companies to independent artists and cultural institutions — we've helped launch brands, campaigns, digital experiences, and ideas that needed to exist in the world.";

const stats = [
  {
    number: "130+",
    label: "Brands",
    desc: "Trusted by over 130 brands across industries to craft clarity through design.",
  },
  {
    number: "350+",
    label: "Projects",
    desc: "From startups to legacy icons, our projects have redefined how brands connect and grow.",
  },
  {
    number: "11+",
    label: "Countries",
    desc: "Our collaborations span eleven countries, connecting brands across the USA, Europe, Asia, and the Middle East.",
  },
  {
    number: "5+",
    label: "Years",
    desc: "Over five years of shaping brands that endure, adapt, and inspire.",
  },
];

const DIGITS = Array.from({ length: 10 }, (_, i) => i);
const SCROLL_DURATION = 1.6;
const STAGGER = 0.08;

/* ---------- Utils ---------- */

const parseStatNumber = (raw) => {
  const match = raw.match(/^(\d+)(\+)?$/);
  return {
    value: match ? parseInt(match[1], 10) : 0,
    suffix: match?.[2] || "",
  };
};

/* ---------- Digit Column ---------- */

function DigitColumn({ digit, active, index, total }) {
  const delay = active
    ? index * STAGGER
    : (total - index - 1) * STAGGER;

  return (
    <span className="relative inline-grid overflow-hidden h-[1em]">
      <motion.span
        className="flex flex-col"
        initial={{ y: "0%" }}
        animate={{ y: active ? `${-digit * 10}%` : "0%" }}
        transition={{
          duration: SCROLL_DURATION,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {DIGITS.map((n) => (
          <span
            key={n}
            className="h-[1em] flex items-center justify-center"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/* ---------- Odometer ---------- */

function OdometerStatNumber({ raw, active, className }) {
  const { value, suffix } = useMemo(
    () => parseStatNumber(raw),
    [raw]
  );

  const digits = useMemo(
    () => String(value).split("").map(Number),
    [value]
  );

  return (
    <h3 className={className}>
      <span className="inline-flex">
        {digits.map((d, i) => (
          <DigitColumn
            key={i}
            digit={d}
            active={active}
            index={i}
            total={digits.length}
          />
        ))}
      </span>
      {suffix}
    </h3>
  );
}

/* ---------- Main ---------- */

function StaticStatsSection() {
  return (
    <section className="relative z-10 w-full bg-background py-16 md:py-24 px-6 sm:px-8 md:px-20 lg:px-40">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full">
          {stats.map((item) => (
            <div key={item.label} className="w-full">
              <div className="flex items-baseline gap-3">
                <h3 className="text-3xl sm:text-4xl tracking-[1px] font-heading font-medium leading-[1.1] text-heading">
                  {item.number}
                </h3>
                <p className="heading-md text-heading">{item.label}</p>
              </div>

              <div className="mt-4 h-px w-full bg-foreground/20" />

              <p className="para text-desc mt-4 max-w-[60ch]">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 md:mt-20">
          <p className="heading-lg text-heading m-0 w-full max-w-none text-left leading-[1.45]">
            {BOTTOM_COPY}
          </p>
        </div>
      </div>
    </section>
  );
}

function AnimatedStatsSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    /* Intersection Observer */
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    /* GSAP Context (fix) */
    const ctx = gsap.context(() => {
      const split = new SplitType(textRef.current, {
        types: "lines, words",
        lineClass: "line",
        wordClass: "wordspan",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(".line-fill", {
        width: "100%",
        duration: 1,
      }).from(split.lines, {
        x: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
      });

      return () => split.revert();
    }, sectionRef);

    return () => {
      observer.disconnect();
      ctx.revert(); // important
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10  w-full bg-background py-16 md:py-24 px-6 sm:px-8 md:px-40"
    >
      <div className="flex flex-col md:items-end w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full">
          {stats.map((item, i) => (
            <div key={i} className="min-w-0">
              <OdometerStatNumber
                raw={item.number}
                active={inView}
                className="text-2xl md:text-4xl lg:text-[4rem] tracking-[1px] font-heading font-medium leading-[1.3]"
              />
              <p className="heading-md text-heading mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Line */}
        <div className="relative my-12 md:my-6 h-px w-full bg-foreground/20 overflow-hidden">
          <div className="line-fill h-full w-0 bg-foreground" />
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full">
          {stats.map((item, i) => (
            <p key={i} className="para text-desc min-w-0">
              {item.desc}
            </p>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 md:mt-30 w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 min-w-0">
          <div className="col-span-2 md:col-start-2 md:col-span-3 min-w-0 overflow-visible [&_.line]:block [font-kerning:none]">
            <p
              ref={textRef}
              className="heading-lg text-heading m-0 w-full max-w-none text-left leading-[1.45]"
            >
              {BOTTOM_COPY}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const StatsSection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return isDesktop ? <AnimatedStatsSection /> : <StaticStatsSection />;
};

export default StatsSection;