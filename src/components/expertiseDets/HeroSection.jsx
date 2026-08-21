"use client";

import { IMAGE_PLACEHOLDER_BG } from "@/components/workDets/imagePlaceholder";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ src, alt = "Hero image" }) => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax: image drifts up as you scroll past the section.
      gsap.fromTo(
        mediaRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto xl:h-screen px-6 sm:px-6 md:px-10 xl:px-0 pt-20 sm:pt-24 md:pt-24 xl:pt-0 pb-6 md:pb-10 xl:pb-0 overflow-hidden"
    >
      <div
        className={`relative w-full h-full  overflow-hidden will-change-transform ${IMAGE_PLACEHOLDER_BG}`}
        ref={mediaRef}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            priority
            onLoadingComplete={() => setLoaded(true)}
            className={`w-full h-auto xl:h-full object-cover object-center transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;