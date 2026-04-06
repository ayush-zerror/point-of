"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const Showreel = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Dot scale — fires across full scroll range
    // So scrolling back naturally shrinks it back down
    const diagonal = Math.sqrt(
      Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
    );
    const maxSize = diagonal * 2;

    // Scale dot from 8px → maxSize across full progress
    const size = 8 + (maxSize - 8) * latest;

    window.dispatchEvent(
      new CustomEvent("showreel:scale", { detail: { size } })
    );
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh]"
    >
    </section>
  );
};

export default Showreel;