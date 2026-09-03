"use client";

import { useRef, useState } from "react";
import FullView from "./FullView";
import Overview from "./Overview";

const SCROLL_OFFSET = 80;

export default function ImageToggleSection({ caseStudy }) {
  const [active, setActive] = useState("full");
  const sectionRef = useRef(null);

  const scrollToSectionTop = () => {
    const el = sectionRef.current;
    if (!el) return;

    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -SCROLL_OFFSET,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
      return;
    }

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleToggle = (type) => {
    if (type === active) {
      scrollToSectionTop();
      return;
    }

    setActive(type);
    // Wait a frame so the new view mounts before measuring scroll target
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToSectionTop);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full  px-6 sm:px-10 md:px-12 lg:px-14 xl:px-20"
    >
      {/* CONDITIONAL RENDER */}
      {active === "full" ? (
        <FullView caseStudy={caseStudy} />
      ) : (
        <Overview caseStudy={caseStudy} />
      )}

      {/* STICKY TOGGLE */}
      <div className="sticky bottom-6 flex justify-center z-20 mt-6">
        <div className="group flex w-sm gap-2 items-center bg-foreground p-2 shadow-xl overflow-hidden">
          <button
            onClick={() => handleToggle("full")}
            className={`py-3 text-lg md:text-xl lg:text-2xl font-heading font-extralight cursor-pointer leading-[1.2] tracking-[0px] transition-all duration-500 ease-in-out
        group-hover:w-1/2
        ${
          active === "full"
            ? "w-[60%] bg-black text-white group-hover:bg-black group-hover:text-white"
            : "w-[40%] bg-transparent text-black group-hover:bg-black group-hover:text-white"
        }
      `}
          >
            Full view
          </button>

          <button
            onClick={() => handleToggle("overview")}
            className={`py-3 text-lg md:text-xl lg:text-2xl font-heading font-extralight cursor-pointer leading-[1.2] tracking-[0px] transition-all duration-500 ease-in-out
        group-hover:w-1/2
        ${
          active === "overview"
            ? "w-[60%] bg-black text-white group-hover:bg-black group-hover:text-white"
            : "w-[40%] bg-transparent text-black group-hover:bg-black group-hover:text-white"
        }
      `}
          >
            Overview
          </button>
        </div>
      </div>
    </section>
  );
}
