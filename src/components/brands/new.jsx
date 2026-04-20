"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const BOTTOM_COPY =
  "Point Of has launched brands, products, books, websites, campaigns & experiences with partners that range from global tech & retail companies to independent artists & cultural institutions.";

const stats = [
  {
    number: "130+",
    label: "Brands",
    desc: "Trusted by over 130 brands across industries to craft clarity through design.",
  },
  {
    number: "350",
    label: "Projects",
    desc: "From startups to legacy icons, our projects have redefined how brands connect and grow.",
  },
  {
    number: "11",
    label: "Countries",
    desc: "Our collaborations span eleven countries, connecting brands across the USA, Europe, Asia, and the Middle East.",
  },
  {
    number: "5+",
    label: "Years",
    desc: "Over five years of shaping brands that endure, adapt, and inspire.",
  },
];

const DIGIT_STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const SCROLL_DURATION = 1.85;
const STAGGER = 0.08;

function parseStatNumber(raw) {
  const m = String(raw).match(/^(\d+)(\+)?$/);
  if (!m) return { value: 0, suffix: "" };
  return { value: parseInt(m[1], 10), suffix: m[2] ?? "" };
}

function DigitColumn({ targetDigit, active, columnIndex, digitCount }) {
  const forwardDelay = columnIndex * STAGGER;
  const reverseDelay = (digitCount - 1 - columnIndex) * STAGGER;

  return (
    <span
      className="relative inline-grid overflow-hidden align-baseline tabular-nums"
      style={{ height: "1em" }}
    >
      <motion.span
        className="flex flex-col will-change-transform"
        initial={{ y: "0%" }}
        animate={active ? { y: `${-targetDigit * 10}%` } : { y: "0%" }}
        transition={{
          duration: SCROLL_DURATION,
          delay: active ? forwardDelay : reverseDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {DIGIT_STRIP.map((n) => (
          <span
            key={n}
            className="flex h-[1em] shrink-0 items-center justify-center leading-none"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function OdometerStatNumber({ raw, active, className }) {
  const { value, suffix } = parseStatNumber(raw);
  const digits = String(value).split("").map((d) => parseInt(d, 10));
  const digitCount = digits.length;

  return (
    <h3 className={className}>
      <span className="inline-flex items-baseline">
        {digits.map((d, i) => (
          <DigitColumn
            key={`${i}-${d}`}
            targetDigit={d}
            active={active}
            columnIndex={i}
            digitCount={digitCount}
          />
        ))}
      </span>
      {suffix}
    </h3>
  );
}

const StatsSection = () => {
  const sectionRef = useRef(null);
  const bottomTextRef = useRef(null);
  const splitRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textEl = bottomTextRef.current;
    if (!section || !textEl) return;
  
    const io = new IntersectionObserver(
      ([entry]) => setStatsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(section);
  
    // ✅ GSAP context (fixes _gsap error + cleanup)
    const ctx = gsap.context(() => {
      const split = new SplitType(textEl, {
        types: "lines, words",
        lineClass: "line",
        wordClass: "word",
      });
  
      splitRef.current = split;
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller: "body",
          start: "top 0%",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
  
      tl.to(".line-fill", {
        width: "100%",
        duration: 1,
      }, "a")
      .from(
        split.lines,
        {
          x: 100,
          opacity: 0,
          stagger: { amount: 0.2 },
          duration: 1,
        },
        "a"
      );
    }, sectionRef); // 👈 important
  
    return () => {
      io.disconnect();
  
      // ✅ revert GSAP + ScrollTrigger safely
      ctx.revert();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      id="counter-section"
      className="relative z-10 w-full bg-background py-16 md:py-24 px-4 sm:px-8 md:px-40"
    >
      <div className="w-full flex flex-col md:items-end">

        <div className="w-full">

          <div className="flex flex-col gap-10 md:hidden">
            {stats.map((item, index) => (
              <div key={index}>
                <OdometerStatNumber
                  raw={item.number}
                  active={statsInView}
                  className="text-3xl font-[200]"
                />
                <p className="text-sm mt-1">{item.label}</p>
                <p className="text-sm leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 md:gap-x-20">
              {stats.map((item, index) => (
                <div key={index}>
                  <OdometerStatNumber
                    raw={item.number}
                    active={statsInView}
                    className="text-2xl md:text-4xl lg:text-[4rem] tracking-[1px] font-heading font-[500] leading-[1.3]"
                  />

                  <p className="text-sm md:text-base mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Line fill — width driven by ScrollTrigger timeline */}
        <div className="relative my-12 md:my-8 h-px w-full overflow-hidden bg-foreground/15">
          <div className="line-fill h-full w-0 bg-foreground" />
        </div>

        <div className="hidden md:block w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-10 md:gap-x-20">
            {stats.map((item, index) => (
              <p
                key={index}
                className="para text-desc max-w-[260px]"
              >
                {item.desc}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-32 w-full grid grid-cols-1 md:grid-cols-4 gap-x-10 md:gap-x-20 min-w-0">
          <div className="md:col-start-2 md:col-span-3 min-w-0 overflow-visible [&_.line]:block [font-kerning:none]">
            <p
              ref={bottomTextRef}
              id="line-split"
              className="heading-lg text-subheading m-0 w-full max-w-none text-left leading-[1.45] break-words"
            >
              {BOTTOM_COPY}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
