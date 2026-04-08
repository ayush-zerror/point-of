"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SEC  = "var(--secondary, #c0bfbf)";
const LINE = "var(--light-line, #333)";
const HEAD = "var(--heading, #e8e6e1)";
const DES  = "var(--des, #888)";

const columns = [
  {
    title: "Strategy",
    body: "We collaborate closely to uncover your brand's vision, audience, and market position—building a strategy that drives real results.",
    body2: "By the end, you'll have a clear roadmap to grow your brand—whether it's industry disruption or becoming a household name.",
  },
  {
    title: "Design",
    body: "Our bold, purpose-driven designs are crafted to make an impact. From typography to color, everything is chosen to communicate clearly and beautifully.",
    body2: "We bring balance, clarity, and intention together to help your brand stand out—and connect beyond first impressions.",
  },
  {
    title: "Technology",
    body: "Beyond aesthetics, we focus on how your brand performs across platforms—crafting seamless, intelligent experiences that adapt in real time.",
    body2: "Guided by design and powered by AI, every interaction is built for clarity, consistency, and connection across screens, spaces, and systems.",
  },
];

// Each column animates in its own scroll slice
// Slices: col1 → 0.0–0.33, col2 → 0.33–0.66, col3 → 0.66–1.0
const FADE_DURATION = 0.12; // portion of slice used for the fade/slide

function Column({ col, start, end }) {
  const { scrollYProgress } = useScroll(); // re-used from parent via prop instead

  return null; // placeholder — see below
}

export default function OurApproach() {
  const sectionRef = useRef(null);

  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Progress bar: 0% → 33% → 66% → 100%
  const barW = useTransform(p, [0, 0.33, 0.66, 1], ["0%", "33%", "66%", "100%"]);

  // Dot activations
  const dot1 = useTransform(p, [0, 0.10], [0, 1]);
  const dot2 = useTransform(p, [0.33, 0.43], [0, 1]);
  const dot3 = useTransform(p, [0.66, 0.76], [0, 1]);

  // Column 1: slides in at 0.0
  const c1Op = useTransform(p, [0.0, 0.12], [0, 1]);
  const c1Y  = useTransform(p, [0.0, 0.12], [50, 0]);

  // Column 2: slides in at 0.33
  const c2Op = useTransform(p, [0.33, 0.45], [0, 1]);
  const c2Y  = useTransform(p, [0.33, 0.45], [50, 0]);

  // Column 3: slides in at 0.66
  const c3Op = useTransform(p, [0.66, 0.78], [0, 1]);
  const c3Y  = useTransform(p, [0.66, 0.78], [50, 0]);

  const colAnims = [
    { opacity: c1Op, y: c1Y },
    { opacity: c2Op, y: c2Y },
    { opacity: c3Op, y: c3Y },
  ];

  const dots = [dot1, dot2, dot3];

  return (
    // 400vh gives enough room to scroll through all 3 steps
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 w-full h-[100svh] px-[6vw] py-[2.3vw] flex flex-col justify-center overflow-hidden z-[8]">

        {/* Heading */}
        <h2
          className="heading-xl text-subheading"
        >
          Our Approach
        </h2>

        <div className="w-full">

          {/* Progress bar track */}
          <div className="relative w-[72%] h-px mt-[6vw] mb-[4vw]" style={{ backgroundColor: LINE }}>

            {/* Filled bar */}
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ width: barW, backgroundColor: SEC }}
            />

            {/* Dot 1 — left */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full" style={{ backgroundColor: LINE }}>
              <motion.div className="w-full h-full rounded-full" style={{ backgroundColor: SEC, opacity: dot1 }} />
            </div>

            {/* Dot 2 — mid */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full" style={{ backgroundColor: LINE }}>
              <motion.div className="w-full h-full rounded-full" style={{ backgroundColor: SEC, opacity: dot2 }} />
            </div>

            {/* Dot 3 — right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[14px] h-[14px] rounded-full" style={{ backgroundColor: LINE }}>
              <motion.div className="w-full h-full rounded-full" style={{ backgroundColor: SEC, opacity: dot3 }} />
            </div>
          </div>

          {/* Content columns */}
          <div className="w-full flex items-start justify-between">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                className="w-[28%]"
                style={{ opacity: colAnims[i].opacity, y: colAnims[i].y }}
              >
                <h2
                  className="mb-[2vw] w-fit heading-md text-subheading"
                >
                  {col.title}
                </h2>
                <h5
                  className="mb-[1vw] para text-desc"
                  style={{ color: DES }}
                >
                  {col.body}
                </h5>
                <h5
                  className="para text-desc"
                  style={{ color: DES }}
                >
                  {col.body2}
                </h5>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
