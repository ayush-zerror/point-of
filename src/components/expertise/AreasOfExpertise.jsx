import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import { expertiseDetails } from "@/helper/expertise-data";

const AreasOfExpertise = () => {
  return (
    <section className="w-full  py-16 md:py-28">
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
                <img
                  src="/expertise/graphic-circle.png"
                  alt="graphic"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Line */}
              <div className="w-px flex-1 bg-foreground"></div>
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
                >
                  <h3 className="uppercase text-base sm:text-lg md:text-xl tracking-wide mb-3 sm:mb-4 md:mb-6 hover:opacity-80 transition-opacity duration-200">
                    {section.expertise}
                  </h3>
                </Link>

                <ul className="space-y-2 text-sm sm:text-base ">
                  {section.accordion.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/expertise/${section.slug}`}>
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
