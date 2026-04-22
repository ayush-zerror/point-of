"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: "OOVA",       logo: "https://cdn.sanity.io/images/6q3eaif3/production/7ed1935761a09de1de4eb5903a437be531fc8dd3-114x64.svg",  border: "border-l border-t border-b" },
  { name: "Duckbill",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/9bedfa5382b341812eb48a6fdb0dd9bdb810e246-114x64.svg",  border: "border-l border-t border-b" },
  { name: "Duckbill",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/9bedfa5382b341812eb48a6fdb0dd9bdb810e246-114x64.svg",  border: "border-l border-t border-b" },
  { name: "COATUE",     logo: "https://cdn.sanity.io/images/6q3eaif3/production/35a232a6fb1f620a00fd4e4602da24686ffd6f12-114x64.svg",  border: "border-l border-t border-b" },
  { name: "COATUE",     logo: "https://cdn.sanity.io/images/6q3eaif3/production/35a232a6fb1f620a00fd4e4602da24686ffd6f12-114x64.svg",  border: "border-l border-r border-t border-b" },
  { name: "BACKBONE",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/41d8517a674941ff80418164e9c714d3628362c5-114x64.svg",  border: "border-b border-l" },
  { name: "More Better",logo: "https://cdn.sanity.io/images/6q3eaif3/production/48de9128984b01c22571d312dafab6a26ae1b9cb-114x64.svg",  border: "border-b border-l" },
  { name: "HAPPY WOLF", logo: "https://cdn.sanity.io/images/6q3eaif3/production/560bdcd17df733fd3d3f12d6900661deef974914-114x64.svg",  border: "border-b border-l" },
  { name: "JOOLA",      logo: "https://cdn.sanity.io/images/6q3eaif3/production/54a06083358068c5786f7c39b3155ed42812bf4c-114x64.svg",  border: "border-b border-l" },
  { name: "Prose",      logo: "https://cdn.sanity.io/images/6q3eaif3/production/70e77a19ef71ec33a928e6216d90eee2d5bf0f52-114x64.svg",  border: "border-b border-l border-r" },
  { name: "Jot",        logo: "https://cdn.sanity.io/images/6q3eaif3/production/6d630ccfdf30d4c45f277a1e301ddc9c802cb488-114x64.svg",  border: "border-b border-l" },
  { name: "ARCHER",     logo: "https://cdn.sanity.io/images/6q3eaif3/production/4fdefa44178442ac1355518ea4abb6a0362f2a7f-114x64.svg",  border: "border-b border-l" },
  { name: "Pika",       logo: "https://cdn.sanity.io/images/6q3eaif3/production/04b367c4e1366ee9334a2e869b68399aeaf4944c-114x64.svg",  border: "border-b border-l" },
  { name: "PEPSICO",    logo: "https://cdn.sanity.io/images/6q3eaif3/production/4bf2c197e3ea48d8e0830b3bdfdec199304da3a2-114x64.svg",  border: "border-b border-l" },
  { name: "Out East",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/1e3e240fb30c2083924324eb23db53aaf528c536-114x64.svg",  border: "border-b border-l border-r" },
  { name: "Out East",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/1e3e240fb30c2083924324eb23db53aaf528c536-114x64.svg",  border: "border-b border-l" },
  { name: "Casper",     logo: "https://cdn.sanity.io/images/6q3eaif3/production/0a0b968a836ee6cbc3412378ea8b3317f5024e4b-114x64.svg",  border: "border-b border-l" },
  { name: "NBA",        logo: "https://cdn.sanity.io/images/6q3eaif3/production/7ca812eb5dca92531c05997930c91c1febc69a62-114x64.svg",  border: "border-b border-l" },
  { name: "PETLIBRO",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/7a85491fc9bcd262a1c68cd7c4ecb2b34a1858b7-114x64.svg",  border: "border-b border-l" },
  { name: "FIGURE",     logo: "https://cdn.sanity.io/images/6q3eaif3/production/fd1ffbc189004713e67126ba708d163ecf88c3f0-114x64.svg",  border: "border-b border-l border-r" },
  { name: "Jot",        logo: "https://cdn.sanity.io/images/6q3eaif3/production/6d630ccfdf30d4c45f277a1e301ddc9c802cb488-114x64.svg",  border: "border-b border-l" },
  { name: "ARCHER",     logo: "https://cdn.sanity.io/images/6q3eaif3/production/4fdefa44178442ac1355518ea4abb6a0362f2a7f-114x64.svg",  border: "border-b border-l" },
  { name: "Pika",       logo: "https://cdn.sanity.io/images/6q3eaif3/production/04b367c4e1366ee9334a2e869b68399aeaf4944c-114x64.svg",  border: "border-b border-l" },
  { name: "PEPSICO",    logo: "https://cdn.sanity.io/images/6q3eaif3/production/4bf2c197e3ea48d8e0830b3bdfdec199304da3a2-114x64.svg",  border: "border-b border-l" },
  { name: "Out East",   logo: "https://cdn.sanity.io/images/6q3eaif3/production/1e3e240fb30c2083924324eb23db53aaf528c536-114x64.svg",  border: "border-b border-l border-r" },
];

const SelectedBrands = () => {
  const itemRefs = useRef([]);

  useEffect(() => {
    const triggers = [];

    itemRefs.current.forEach((el) => {
      if (!el) return;

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller: "body",   // change to your custom scroller if needed
          start: "top 85%",
          end: "top 70%",
          scrub: 1,
        },
      });

      st.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      triggers.push(st.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <section className="min-h-screen w-full py-16 md:py-24 px-4 sm:px-8 md:px-20">
      <h2 className="mb-10 md:mb-12 heading-xl text-subheading">
        Selected Brands
      </h2>

      <div className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
        {brands.map((brand, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={[
              "group relative aspect-square border border-gray-300/40",
            ].join(" ")}
          >
            {/* Hover cover */}
            <div
              className="
                absolute inset-0 flex items-center justify-center
                opacity-0 brightness-[0.8] transition-all duration-300
                group-hover:opacity-100
              "
            >
              <h2 className="text-[1.5vw] font-semibold">{brand.name}</h2>
            </div>

            {/* Logo */}
            <div
              className="
                flex h-full w-full items-center justify-center
                transition-all duration-800
                group-hover:opacity-0
              "
            >
              <Image
              width={100}
              height={100}
                src={brand.logo}
                alt={brand.name}
                className="w-[38%] dark:invert"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedBrands;