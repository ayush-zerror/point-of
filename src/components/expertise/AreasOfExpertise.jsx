"use client";
import React, { useLayoutEffect, useRef } from "react";
import Button from "../common/Button";
import Link from "next/link";
import { expertiseDetails } from "@/helper/expertise-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const AreasOfExpertise = () => {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top 10%",
            end: "top -40%",
            scrub: 0.3,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={rootRef} className="w-full  py-16 md:py-28">
      <div
        className="
          relative w-full
          px-4 sm:px-6 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-120
          md:pr-6
        "
      >
        <div className="max-w-5xl relative">
          {/* LEFT GRAPHIC (desktop only) */}
          <div className="hidden md:flex items-center justify-center absolute top-0 -left-[33.5%] h-full">
            <div className="flex flex-col items-center h-full">
              {/* Image */}
              <div className="w-40 h-40 lg:w-46 lg:h-46 mb-6">
                <Image
                  width={1000}
                  height={1000}
                  src="/expertise/graphic-circle.png"
                  alt="graphic"
                  className="w-full h-full object-contain spin-slow"
                />
              </div>

              {/* Line */}
               {/* Scroll-animated vertical line */}
               <div
                ref={lineRef}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                className="w-px flex-1 z-30 bg-linear-to-b from-transparent to-foreground"
              >
                <span className="w-[3px] h-[3px] bg-foreground rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="heading-xl mb-10 sm:mb-12 md:mb-16 ">
          Areas of expertise
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-16">
            {expertiseDetails.map((section, index) => (
              <div key={index}>
                <Link
                  href={`/expertise/${section.slug}`}
                  className="inline-block"
                  title={section.title}
                >
                  <h3 className="uppercase heading-md text-subheading mb-3 sm:mb-4 md:mb-6 hover:opacity-80 transition-opacity duration-200">
                    {section.expertise}
                  </h3>
                </Link>

                <ul className="expertise-list space-y-2 text-sm sm:text-base">
                  {section.accordion.map((item, i) => (
                    <li
                      key={i}
                      className="flex w-fit gap-2 text-subheading cursor-pointer transition-[opacity,filter]"
                    >
                      <span>•</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/expertise/${section.slug}`} title={`Know more about ${section.expertise}`}>
                  <Button title="KNOW MORE" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasOfExpertise;
