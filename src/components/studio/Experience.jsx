import React from "react";

const Experience = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden ">
      {/* Background Image */}
      <img
        src="/about/experience.png"
        alt="background"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[120vw] object-contain opacity-75 spin-slow"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex items-center">
        <div
          className="
            w-full 
            pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
            pr-6
            py-20 sm:py-24 md:py-28 lg:py-32
            space-y-16 sm:space-y-20
            max-w-[1000px]
          "
        >
          {/* Block 1 */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4">
              5+ Years in Business
            </h2>
            <div className="w-full h-[1px] bg-white/30 mb-6"></div>
            <p className="text-sm sm:text-base leading-relaxed max-w-[700px]">
              Founded in 2019 by Piran Tarapore and Pearl Jain, Point Of began
              with a simple idea: design that inspires connection. Five years
              on, we continue to evolve—curious, adaptive, and always pushing to
              create brands that not only stand the test of time but define
              what’s next.
            </p>
          </div>

          {/* Block 2 */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4">
              100% Independent
            </h2>
            <div className="w-full h-[1px] bg-white/30 mb-6"></div>
            <p className=" text-sm sm:text-base leading-relaxed max-w-[700px]">
              Our independence gives us the freedom to think boldly, move fast,
              and stay true to our vision. We answer to ideas, not
              investors—shaping every project with agility, purpose, and a
              commitment to craft.
            </p>
          </div>

          {/* Block 3 */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4">
              25+ Global Brand Partners
            </h2>
            <div className="w-full h-[1px] bg-white/30 mb-6"></div>
            <p className=" text-sm sm:text-base leading-relaxed max-w-[700px]">
              We’re a team of thinkers and makers collaborating with partners
              across industries and time zones. United by a belief in the power
              of design, we shape ideas that connect, evolve, and leave a
              lasting mark—creating work that resonates across.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
