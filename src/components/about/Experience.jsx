import React from "react";
import Image from "next/image";

const Experience = ({ data }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden ">
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
        <div className="w-full max-w-[1000px] pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-120 pr-6 py-20 sm:py-24 md:py-28 lg:py-32 space-y-16 sm:space-y-20">
          {data.map((item, index) => (
            <div key={index}>
              <h2 className="heading-lg text-subheading mb-4">
                {item.title}
              </h2>

              <div className="w-full h-[1px] bg-white/30 mb-6"></div>

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