"use client";
import React, { useEffect, useRef } from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GridSection = ({ title, btntitle, data }) => {
  const isFour = data.length === 4;
  const router = useRouter();
  const cardsRef = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, gridRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div className="w-full py-16 sm:py-20 md:py-28 lg:py-32">
      {/* Container */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-8 md:px-14">
        
        {/* Heading */}
        {title && (
          <div className="text-center mb-12 sm:mb-16 md:mb-20 flex flex-col items-center">
            <h2 className="heading-xl text-subheading max-w-3xl">
              {title}
            </h2>

            {btntitle && <Button title={btntitle} onClick={() => {
              router.push("/connect");
            }} />}
          </div>
        )}

        {/* Grid */}
        <div
          ref={gridRef}
          className={`
            grid grid-cols-1 
            ${isFour ? "sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-32" : "sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-24"}
            gap-y-12 sm:gap-y-16 md:gap-y-20 lg:gap-y-24
            gap-x-6 sm:gap-x-10 md:gap-x-16 
          `}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full"
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              {/* Video */}
              {item.video && (
                <div className="w-12 sm:w-14 md:w-16 lg:w-18 aspect-square mb-3 sm:mb-4 overflow-hidden">
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="heading-md text-subheading mb-3 sm:mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="para text-desc">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridSection;