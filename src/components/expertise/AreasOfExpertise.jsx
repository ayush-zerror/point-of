"use client";
import React, { useLayoutEffect, useRef } from "react";
import Button from "../common/Button";
import Link from "next/link";
import { expertiseDetails } from "@/helper/expertise-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AreasOfExpertise = () => {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const imageWrapRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const ctx = gsap.context(() => {
      const imageWrap = imageWrapRef.current;
      const heading = headingRef.current;

      // Section enter animation: image + heading
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      })
        .fromTo(
          imageWrap,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          0
        )
        .fromTo(
          heading,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          0.05
        );

      // Each box animates as a unit (title + ul + li + button)
      const boxes = gsap.utils.toArray(root.querySelectorAll("[data-expertise-box]"));
      boxes.forEach((box) => {
        const titleEl = box.querySelector("[data-box-title]");
        const listEl = box.querySelector("ul.expertise-list");
        const itemEls = listEl ? listEl.querySelectorAll("li") : [];
        const buttonWrap = box.querySelector("[data-box-button]");

        const tlBox = gsap.timeline({
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tlBox
          .fromTo(
            titleEl,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
            0
          )
          .fromTo(
            listEl,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
            0.05
          )
          .fromTo(
            itemEls,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.03 },
            0.1
          )
          .fromTo(
            buttonWrap,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            0.2
          );
      });

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
          px-6 sm:px-6 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-120
          md:pr-6
        "
      >
        <div className="max-w-5xl relative">
          {/* LEFT GRAPHIC (desktop only) */}
          <div className="hidden md:flex items-center justify-center absolute top-0 -left-[33.5%] h-full">
            <div className="flex flex-col items-center h-full">
              {/* Image */}
              <div ref={imageWrapRef} className="w-40 h-40 lg:w-46 lg:h-46 mb-6">
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
          <h2 ref={headingRef} className="heading-xl mb-10 sm:mb-12 md:mb-16 ">
          Areas of expertise
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-16">
            {expertiseDetails.map((section, index) => (
              <div key={index} data-expertise-box>
                <Link
                  href={`/expertise/${section.slug}`}
                  className="inline-block"
                  title={section.title}
                >
                  <h3
                    data-box-title
                    className="uppercase heading-md text-subheading mb-3 sm:mb-4 md:mb-6 hover:opacity-80 transition-opacity duration-200"
                  >
                    {section.expertise}
                  </h3>
                </Link>

                <ul className="expertise-list space-y-2 text-sm sm:text-base">
                  {section.accordion.map((item, i) => (
                    <li key={i} className="flex w-fit">
                      <Link
                        href={`/expertise/${section.slug}#${toSlug(item.title)}`}
                        className="flex w-fit gap-2 text-subheading cursor-pointer transition-[opacity,filter]"
                        title={item.title}
                      >
                        <span>•</span>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  data-box-button
                  href={`/expertise/${section.slug}`}
                  title={`Know more about ${section.expertise}`}
                >
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
