"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import Button from "../common/Button";
import Image from "next/image";
import { rows } from "@/helper/brand";



// Matches vanilla exactly:
// idle/reset  → collapsed at bottom
// enter       → full reveal (bottom corners lift to top)
// leave       → collapse to top, then reset to bottom
const CLIP_IDLE  = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_FULL  = "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";
const CLIP_TOP   = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const BrandsIndex = () => {
  const [showAll, setShowAll] = useState(false);
  const showcaseRef = useRef(null);

  const visibleData = showAll ? rows : rows.slice(0, 20);

  const getSlide = (index) => {
    if (!showcaseRef.current) return null;
    return showcaseRef.current.querySelectorAll(".show")[index] ?? null;
  };

  // mouseenter — exact vanilla logic
  const handleBrandEnter = (index) => {
    const slide = getSlide(index);
    if (!slide) return;

    gsap.to(slide, {
      clipPath: CLIP_FULL,
      duration: 0.6,
    });
  };

  // mouseleave — exact vanilla logic
  const handleBrandLeave = (index) => {
    const slide = getSlide(index);
    if (!slide) return;

    gsap.to(slide, {
      clipPath: CLIP_TOP,
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        gsap.set(slide, {
          clipPath: CLIP_IDLE,
          opacity: 1,
          scale: 1,
        });
      },
    });
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 sm:px-8 md:px-20">
      <div className="w-full">

        {/* Showcase image overlay */}
        <div
          ref={showcaseRef}
          className="pointer-events-none hidden md:block fixed right-8 lg:right-16 xl:right-68 top-1/2 z-50 h-64 w-64 -translate-y-1/2 lg:h-72 lg:w-72"
        >
          {visibleData.map((item, index) => (
            <div
              key={`${item.brand}-${index}-slide`}
              className="show absolute inset-0 overflow-hidden"
              style={{ clipPath: CLIP_IDLE }}
            >
              <Image
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
                src={item.image}
                alt={item.brand}
              />
            </div>
          ))}
        </div>

        {/* Heading */}
        <h2 className="heading-xl text-subheading mb-10 md:mb-12">
          Brands Index{" "}
          <span className="text-sm md:text-base">({rows.length})</span>
        </h2>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-3 border-b border-desc text-sm tracking-wide font-heading font-normal text-subheading uppercase pb-6 mb-6">
          <span className="group relative cursor-pointer w-fit">
            <span className="absolute left-0 top-full mt-px whitespace-nowrap text-[0.62rem] font-normal capitalize opacity-0 group-hover:opacity-75">
              click to filter
            </span>
            Brand
          </span>
          <span className="group relative w-fit cursor-pointer">
            <span className="absolute left-0 top-full mt-px whitespace-nowrap text-[0.62rem] font-normal capitalize opacity-0 group-hover:opacity-75">
              click to filter
            </span>
            Industry
          </span>
          <span className="text-right">
            <span className="group relative w-fit cursor-pointer">
              <span className="absolute right-0 top-full mt-px whitespace-nowrap text-right text-[0.62rem] font-normal capitalize opacity-0 group-hover:opacity-75">
                click to filter
              </span>
              Year
            </span>
          </span>
        </div>

        {/* Rows */}
        <div>
          {visibleData.map((item, index) => (
            <div
              key={`${item.brand}-${index}`}
              className="border-b border-desc md:border-none"
            >
              {/* Mobile */}
              <div className="flex items-center justify-between md:hidden py-3">
                <span className="font-medium tracking-wide">{item.brand}</span>
                <span className="text-sm opacity-70">{item.year}</span>
              </div>
              <div className="text-sm text-desc md:hidden pb-3">
                {item.industry}
              </div>

              {/* Desktop */}
              <div
                className="brand-hover hidden cursor-default grid-cols-3 gap-0 py-1 font-body text-xs font-thin leading-[1.9] tracking-[1.5px] opacity-50 transition-opacity duration-300 hover:opacity-100 hover:font-semibold md:grid"
                data-index={index}
                onMouseEnter={() => handleBrandEnter(index)}
                onMouseLeave={() => handleBrandLeave(index)}
              >
                <span>{item.brand}</span>
                <span>{item.industry}</span>
                <span className="text-right">{item.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* See more / less */}
        {rows.length > 10 && (
          <Button
            title={showAll ? "SEE LESS" : "SEE MORE"}
            onClick={() => setShowAll(!showAll)}
          />
        )}
      </div>
    </section>
  );
};

export default BrandsIndex;