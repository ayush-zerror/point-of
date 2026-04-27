"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ src, alt = "Hero image" }) => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

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
      className="w-full h-auto lg:h-screen px-6 sm:px-6 md:px-10 lg:px-0 pt-20 sm:pt-24 md:pt-24 lg:pt-0 pb-6 md:pb-10 lg:pb-0 overflow-hidden"
    >
      <div className="w-full h-full will-change-transform" ref={mediaRef}>
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          priority
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export default HeroSection;