"use client";
import React, { useEffect, useRef } from "react";

const OfficesSection = () => {
  const cities = [
    {
      name: "Mumbai",
      label: "HQ",
      tagline: "Where it began & where it builds.",
    },
    {
      name: "Barcelona",
      label: "EU",
      tagline: "Design culture. Creative capital.",
    },
    {
      name: "Austin",
      label: "AMERICAS",
      tagline: "Strategy, growth & new frontiers.",
    },
  ];

  const cityRefs = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cityRefs.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => {
                el.classList.add("animate-in-up");
              }, i * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full px-6 sm:px-10 md:pl-12 xl:pl-48 2xl:pl-[30rem] md:pr-[max(3.5rem,calc((100%-1350px)/2+3.5rem))] py-16 sm:py-20 md:py-28 lg:py-32">
      <style>{`
        .slide-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      {/* Section heading */}
      <h2 className="heading-xl text-heading max-w-2xl mb-10 md:mb-12">
        Global presence.
      </h2>

      {/* Body copy */}
      <p className="para text-desc max-w-3xl mb-20 md:mb-28 lg:mb-32">
        Our home is Worli, Mumbai. A neighbourhood that carries the memory of the city's mill district while becoming one of its most forward-thinking addresses.
        <br /><br />
        We work from Barcelona and Austin too. Two cities chosen for what they add, not just where they are. Different latitudes, different creative cultures, the same standard. One point of view.
      </p>

      {/* City strips */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 md:gap-10 lg:gap-16"
      >
        {cities.map((city, i) => (
          <div
            key={city.name}
            ref={(el) => { cityRefs.current[i] = el; }}
            className="slide-up flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <h4 className="heading-md text-heading">{city.name}</h4>
              <span className="text-xs font-bold text-desc uppercase">
                ({city.label})
              </span>
            </div>
            <p className="para text-desc">{city.tagline}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default OfficesSection;