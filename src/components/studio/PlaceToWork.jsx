import React from "react";

const PlaceToWork = () => {
  return (
    <div className="w-full  overflow-hidden">
      {/* Wrapper */}
      <div
        className="w-full 
        pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
        pr-6
        py-20 sm:py-24 md:py-28 lg:py-32"
      >
        {/* Top Content */}
        <div className="max-w-[700px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-6">
            A Place to Work
          </h2>

          <p className=" text-sm sm:text-base leading-relaxed mb-6">
            Our headquarters sit quietly in Lower Parel, Mumbai—an urban oasis
            that holds onto the memory of Mumbai’s industrial past while
            embracing the city’s creative energy. Since our founding in 2021,
            we’ve collaborated with clients across India and internationally,
            building work that resonates beyond borders.
          </p>

          <p className=" text-sm sm:text-base leading-relaxed mb-8">
            At Point Of, we value curiosity, clarity, and collaboration. We’re a
            team shaped by culture, driven by design, and always eager to
            explore what’s next. Whether you’re a brand looking for a thoughtful
            partner or a creative looking for your next chapter—our doors are
            open.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-xs sm:text-sm tracking-wider text-white/80 cursor-pointer">
            <span>↗</span>
            <span className="border-b border-white/50">LET’S TALK</span>
          </div>
        </div>

        {/* Bottom Big Statement */}
        <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32">
          <h2
            className=" text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl
              font-heading font-[200] 
              leading-[1.3] mb-6"
          >
            Two Minds. One Vision.
          </h2>

          <p className=" text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug max-w-[900px]">
            We know brands, we know design. <br />
            Our experience spans a combined 15 years.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceToWork;
