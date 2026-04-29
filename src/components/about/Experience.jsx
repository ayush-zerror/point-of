import React from "react";
import Image from "next/image";

const Experience = ({ data }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden ">
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
        <div className="w-full max-w-[1000px] px-6 sm:px-10  md:pl-12 lg:pl-48 xl:pl-80 2xl:pl-120 pr-6 py-20 sm:py-24 md:py-28 lg:py-32 space-y-16 sm:space-y-20">
          {data.map((item, index) => (
            <div key={index}>
              <h2 className="heading-lg text-subheading mb-4">
                {item.title}
              </h2>

              <div className="mb-6 h-px w-full bg-white/30"></div>

              <p className="para text-desc max-w-[700px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;