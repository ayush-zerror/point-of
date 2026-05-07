
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import ArrowButton from "../common/ArrowButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FoundersSection = ({ data }) => {
  const rootRef = useRef(null);
  const mediaRefs = useRef([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      mediaRefs.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement, // overflow-hidden image box
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full  py-20 sm:py-24 md:py-28">
      {/* Container */}
      <div className="w-full  overflow-hidden">
        {/* Wrapper */}
        <div
          className="w-full 
          px-6 sm:px-10 md:pl-12 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
          pr-6
          pb-20 sm:pb-24 md:pb-28 lg:pb-32
          "
        >

          <h2
            className="heading-xl text-subheading mb-6"
          >
            Two minds. One vision
          </h2>

          <p className="heading-lg text-desc max-w-[900px]">
            Point Of was built by two people who see the same problem differently — which is exactly why it works.
          </p>
        </div>
      </div>
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="flex flex-col md:flex-row md:justify-between gap-16 md:gap-12 lg:gap-24">

          {data.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-[520px] mx-auto md:mx-0"
            >
              <motion.div
                className="w-full aspect-square overflow-hidden mb-8"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.35 }}
              >
                <div
                  ref={(el) => { mediaRefs.current[index] = el; }}
                  className="w-full h-full will-change-transform"
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover ${item.objectPosition}`}
                  />
                </div>
              </motion.div>

              <h3 className="heading-lg font-light! text-subheading mb-3">
                {item.name}
              </h3>

              <p className="text-xs sm:text-sm uppercase tracking-[1px] heading-lg font-medium! text-subheading mb-4">
                {item.role}
              </p>

              <div className="para text-desc space-y-4">
                {String(item.desc ?? "")
                  .split(/\n\s*\n/)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>

              <ArrowButton title={item.buttonText || "CONNECT"} link={item.link} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default FoundersSection;