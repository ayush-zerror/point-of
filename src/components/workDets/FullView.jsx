"use client";

import React, { useEffect, useRef } from "react";
import ShowcaseGrid from "./ShowcaseGrid";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FullView = ({ caseStudy }) => {
  const heroWrapRef = useRef(null);
  const heroMediaRef = useRef(null);

  useEffect(() => {
    if (!heroWrapRef.current || !heroMediaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroMediaRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, heroWrapRef);

    return () => ctx.revert();
  }, []);

  const fullViewAssets = Array.isArray(caseStudy?.fullViewAssets)
    ? caseStudy.fullViewAssets
    : [];

  const heroImage = fullViewAssets?.[0] ?? caseStudy?.coverImage ?? "";
  const caseStudyTitle = caseStudy?.title || caseStudy?.name || "Case study";

  return (
    <section className="w-full space-y-20 md:space-y-28">
      {/* IMAGE */}
      <div ref={heroWrapRef} className="relative w-full h-auto md:h-auto lg:h-screen overflow-hidden">
        <div ref={heroMediaRef} className="w-full h-full will-change-transform">
          <Image
            width={1000}
            height={1000}
            src={heroImage}
            alt={`${caseStudyTitle} — hero image`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-[40%_60%]">
        {/* LEFT */}
        <div>
          <p className="text-sm font-semibold text-subheading">
            CHALLENGE
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          <h2 className="heading-xl text-subheading max-w-3xl">
            {caseStudy?.challenge?.title ?? ""}
          </h2>

          <p className="para text-desc max-w-2xl">
            {caseStudy?.challenge?.description ?? ""}
          </p>
        </div>
      </div>
      <ShowcaseGrid caseStudy={caseStudy} />
    </section>
  );
};

export default FullView;
