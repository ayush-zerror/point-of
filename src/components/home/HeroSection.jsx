"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const headerData = [
  "creativity?",
  "design innovation?",
  "circular design?",
  "storytelling?",
  "brand loyalty?",
  "human-centered design?",
  "creative disruption?",
  "emotional design?",
  "design thinking?",
  "design ethics?",
  "design for social impact?",
  "beauty in functional design?",
  "AI as a creative partner?",
  "emotion in brand design?",
];

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = headerData[textIndex];

    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, 30);
    }

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % headerData.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
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
        <p className="text-lg md:text-2xl  mb-2 font-heading">
          What is the Point Of
        </p>

        {/* Typing line */}
        <h1 className="text-4xl font-heading uppercase md:text-6xl font-semibold tracking-wide">
          {displayText}
          <span className="ml-1 opacity-0">|</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
