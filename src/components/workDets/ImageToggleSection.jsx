"use client";

import { useRef, useState } from "react";
import FullView from "./FullView";
import Overview from "./Overview";

export default function ImageToggleSection() {
  const [active, setActive] = useState("full");
  const sectionRef = useRef(null);

  const handleToggle = (type) => {
    setActive(type);

    // scroll to top of section
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black px-4 sm:px-10 md:px-16 lg:px-20 py-10 md:py-16"
    >
      {/* CONDITIONAL RENDER */}
      {active === "full" ? <FullView /> : <Overview />}

      {/* STICKY TOGGLE */}
      <div className="sticky bottom-6 flex justify-center z-20 mt-6">
        <div className="flex items-center bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/30">
          <button
            onClick={() => handleToggle("full")}
            className={`px-8 py-3 rounded-xl text-sm md:text-base font-medium transition ${
              active === "full" ? "bg-black text-white" : "text-black"
            }`}
          >
            Full view
          </button>

          <button
            onClick={() => handleToggle("overview")}
            className={`px-8 py-3 rounded-xl text-sm md:text-base font-medium transition ${
              active === "overview" ? "bg-black text-white" : "text-black"
            }`}
          >
            Overview
          </button>
        </div>
      </div>
    </section>
  );
}
