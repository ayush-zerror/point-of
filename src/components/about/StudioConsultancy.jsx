import React from "react";

const StudioConsultancy = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="px-6 sm:px-10 md:px-12 lg:px-20 md:pl-12 lg:pl-48 xl:pl-80 2xl:pl-[30rem] py-20 sm:py-24 md:py-28 lg:py-32">

        {/* Intro heading */}
        <h2 className="heading-xl text-heading mb-16 md:mb-20 max-w-4xl">
          We work with brands at two distinct moments — and across everything in between.
        </h2>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">

          {/* Studio */}
          <div className="flex flex-col gap-4">
            <h3 className="heading-lg text-heading">
              The Studio
            </h3>
            <span className="text-sm text-desc tracking-wide">0→1 (Foundation)</span>
            <p className="para text-desc">
              This is where brands are born. We take an idea — sometimes just a conviction and a name — and build it into something real. Strategy, positioning, identity, digital, print. The full creative foundation, built to hold weight from day one.
            </p>
          </div>

          {/* Consultancy */}
          <div className="flex flex-col gap-4">
            <h3 className="heading-lg text-heading">
              The Consultancy
            </h3>
            <span className="text-sm text-desc tracking-wide">1→100 (Growth)</span>
            <p className="para text-desc">
              This is where brands grow. Once the foundation is set, we stay in — as creative partner, strategic counsel, and fractional CMO. Brand strategy, media production, social, campaigns, events, performance. Whatever the brand needs to scale, we're already in the room.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudioConsultancy;