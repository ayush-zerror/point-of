"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const headerData = [
  "creativity?",
  "design?",
  "storytelling?",
  "brand loyalty?",
  "craft?",
  "human-centred design?",
  "imagination?",
  "minimalism?",
  "design ethics?",
  "beauty?",
  "brand trust?",
  "emotional design?",
  "creative disruption?",
  "design for impact?",
  "doing it differently?",
];

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const glowPalette = [
    "#FFD6A5", // warm peach
    "#BDE0FE", // cool sky
    "#FFE5B4", // warm champagne
    "#CDE7FF", // cool ice
    "#FFD1DC", // warm blush
    "#B8FFF1", // cool mint
    "#FFE9C8", // warm soft gold
    "#C8D7FF", // cool periwinkle
  ];

  const glowColor = glowPalette[textIndex % glowPalette.length];

  useEffect(() => {
    const currentText = headerData[textIndex];

    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, 40);
    }

    if (!isDeleting && displayText === currentText) {
      const isLast = textIndex === headerData.length - 1;
      timeout = setTimeout(() => setIsDeleting(true), isLast ? 4000 : 2500);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % headerData.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative bg-black w-full h-screen overflow-hidden">
      {/* ROTATING IMAGE */}
      <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/home/graphic-home.webp"
          alt="hero"
          width={1000}
          height={1000}
          className="h-[220vh] w-full object-contain spin-slow"
          priority
        />
      </div>

      {/* GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-[12vh] bg-linear-to-t from-background via-background/60 to-transparent pointer-events-none" />
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* First line */}
        <h1 className="font-thin tracking-[0.5px] leading-[1.2] font-heading mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-[2rem] xl:text-[2.2rem]">
        What is the point of
        </h1>

        {/* Typing line */}
          <p className="font-medium leading-none tracking-[1px] uppercase font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[3rem]">
            <span className="relative inline-block">
              {/* diffuse glow behind text */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 blur-3xl opacity-35 mix-blend-screen transition-[color,opacity,filter] duration-700"
                style={{ color: glowColor, filter: "blur(28px)" }}
              >
                {displayText || "\u00A0"}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 blur-xl opacity-22 mix-blend-screen transition-[color,opacity,filter] duration-700"
                style={{ color: glowColor, filter: "blur(14px)" }}
              >
                {displayText || "\u00A0"}
              </span>
              <span className="relative text-white">{displayText}</span>
            </span>
            <span className="ml-1 opacity-0">|</span>
          </p>
      </div>
    </section>
  );
};

export default HeroSection;
