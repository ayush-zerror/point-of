"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Button from "../common/Button";

const items = [
  {
    title: "Branding",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
  {
    title: "Website",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
  {
    title: "Marketing",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
  {
    title: "Print",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
];

export default function Expertise() {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.1) {
        setActiveIndex(-1);
        return;
      }

      const adjusted = (v - 0.1) / 0.9;
      const index = Math.min(
        items.length - 1,
        Math.floor(adjusted * items.length)
      );

      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  return (
    <section className="relative h-[300vh] bg-black text-white" ref={ref}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full px-4 sm:px-10 md:px-16 lg:px-20 mx-auto py-12 md:py-16 flex">

          {/* LEFT */}
          <div className="w-1/2 flex flex-col justify-between">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-[200] leading-[1.3]">
              Expertise
            </h1>

            {/* Button bottom aligned */}
            <div>
              <Button title="KNOW MORE" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 relative pl-6 flex flex-col justify-start gap-10">

            {items.map((item, i) => {
              const isActive = i === activeIndex;

              return (
                <div key={i} className="relative border-b border-white/20 pb-6">

                 <div className="relative">
                   {/* Circle aligned to same X axis */}
                   <motion.div
                    animate={{ scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -left-8.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"
                  />

                  <h2
                    className={`text-3xl md:text-4xl font-light transition-colors duration-300 ${isActive ? "text-white" : "text-white/40"
                      }`}
                  >
                    {item.title}
                  </h2>
                 </div>

                  {/* Accordion */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-base md:text-lg text-white/60 mt-4 max-w-xl leading-relaxed">
                      {item.content}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}