"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = ({ data }) => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const yearRef = useRef(null);
  const todayLeftRef = useRef(null);
  const todayContentRef = useRef(null);
  const statsRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Line fill: top bottom → top 20%
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      // Year opacity: muted → bright
      gsap.fromTo(yearRef.current,
        { opacity: 0.2 },
        {
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      // Year counter 2019 → 2025 scrubbed
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
        onUpdate: (self) => {
          if (yearRef.current) {
            yearRef.current.textContent = Math.round(2019 + (2025 - 2019) * self.progress);
          }
        },
      });

      // Today left label
      gsap.fromTo(todayLeftRef.current,
        { opacity: 0, y: 8 },
        {
          opacity: 0.45,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Copy block
      gsap.fromTo(copyRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Today content + stats
      gsap.fromTo([todayContentRef.current, statsRef.current],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { num: "6+",   name: "Years",   desc: "Founded in 2019. Independent by choice. Global by design." },
    { num: "3",    name: "Offices",  desc: "Mumbai · Barcelona · Austin. The work travels because the thinking has to." },
    { num: "130+", name: "Brands",   desc: "From first-time founders to market leaders. Every stage. Every scale." },
  ];

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen overflow-hidden">
      {/* Gradient strips */}
      <div className="nav-gradient pointer-events-none absolute inset-x-0 top-0 z-20 h-24" />
      <div className="nav-gradient nav-gradient-reverse pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24" />

      {/* Background Image */}
      <Image
        width={1000}
        height={1000}
        src="/about/experience.png"
        alt="background"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[120vw] object-contain opacity-75 spin-slow"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full md:pl-12 lg:pl-48 xl:pl-80 2xl:pl-120 px-6 sm:px-10 py-16 sm:py-20 md:py-28 lg:py-32">

          {/* ── MOBILE-style layout (up to lg). Desktop starts at xl ── */}
          <div className="flex flex-col space-y-8 xl:hidden">

            {/* Year */}
            <span
              className="font-bold leading-none tracking-tight select-none"
              style={{
                fontSize: "clamp(56px, 15vw, 96px)",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              2019
            </span>

            {/* Horizontal rule */}
            <div className="h-px w-full bg-white/20" />

            {/* Copy */}
            <div>
              <p className="para text-desc max-w-[560px]">
                <span className="text-white">Point Of was founded in 2019 by Piran Tarapore and Pearl Jain —</span> with a belief
                that design is most powerful when it starts with a question, not an answer.
              </p>
              <p className="para text-desc max-w-[560px] mt-4">
                Born in Mumbai, grown across three continents. Six years of building a consultancy
                that doesn't just create brands — it grows with them. From the first naming session
                to the hundredth campaign, we stay in the room.
              </p>
            </div>

            {/* Today */}
            <h2 className="heading-lg text-subheading max-w-[480px]">
              130+ brands. 3 offices. One point of view.
            </h2>

            {/* Stats — stacked by default, row on lg (still mobile-style section) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="border-t border-white/15 pt-6 pb-6 lg:border-t-0 lg:pt-0 lg:pb-0"
                >
                  <div className="heading-lg text-subheading leading-none">{stat.num}</div>
                  <div className="para text-heading mt-2 mb-2">{stat.name}</div>
                  <div className="para text-desc">{stat.desc}</div>
                </div>
              ))}
            </div>

          </div>

          {/* ── DESKTOP layout ── */}
          <div className="relative hidden xl:block">

            {/* LEFT PANEL: outside the content box via right-full */}
            <div className="absolute top-0 bottom-0 right-full hidden md:flex flex-row items-stretch pr-6 lg:pr-10">

              {/* Year + Today column */}
              <div className="flex flex-col justify-between items-end pr-4 lg:pr-6">

                {/* Year */}
                <span
                  ref={yearRef}
                  className="font-bold leading-none tracking-tight select-none"
                  style={{
                    fontSize: "clamp(48px, 7vw, 96px)",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.68,
                  }}
                >
                  2019
                </span>

                {/* Today */}
                <span
                  ref={todayLeftRef}
                  className="heading-lg text-heading"
                  style={{ opacity: 0 }}
                >
                  Today
                </span>
              </div>

              {/* Vertical line */}
              <div className="relative w-px self-stretch overflow-hidden">
                <div className="absolute inset-0 bg-white/15" />
                <div
                  ref={lineRef}
                  className="absolute inset-0 bg-white/55"
                  style={{ transformOrigin: "top center", scaleY: 0 }}
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col space-y-10 lg:space-y-14">

              {/* Copy */}
              <div ref={copyRef} style={{ opacity: 0 }}>
                <p className="para text-desc max-w-[560px]">
                  <span className="text-white">Point Of was founded in 2019 by Piran Tarapore and Pearl Jain —</span> with a belief
                  that design is most powerful when it starts with a question, not an answer.
                </p>
                <p className="para text-desc max-w-[560px] mt-4">
                  Born in Mumbai, grown across three continents. Six years of building a consultancy
                  that doesn't just create brands — it grows with them. From the first naming session
                  to the hundredth campaign, we stay in the room.
                </p>
              </div>

              {/* Today label */}
              <div ref={todayContentRef} style={{ opacity: 0 }}>
                <h2 className="heading-lg text-subheading mt-2 max-w-[480px]">
                  130+ brands. 3 offices. One point of view.
                </h2>
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="grid grid-cols-3 gap-6 lg:gap-10"
                style={{ opacity: 0 }}
              >
                {stats.map((stat) => (
                  <div key={stat.name}>
                    <div className="heading-lg text-subheading leading-none">{stat.num}</div>
                    <div className="para text-heading mt-2 mb-2">{stat.name}</div>
                    <div className="para text-desc">{stat.desc}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Experience;