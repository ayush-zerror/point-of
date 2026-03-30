import React from "react";
import Button from "../common/Button";

const FoundersSection = () => {
  return (
    <div className="w-full  py-20 sm:py-24 md:py-28">
      {/* Container */}
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="flex flex-col md:flex-row md:justify-between gap-16 md:gap-24">
          {/* Founder 1 */}
          <div className="w-full max-w-[520px] mx-auto md:mx-0">
            <div className="w-full aspect-square overflow-hidden mb-8">
              <img
                src="/about/piran.jpeg"
                alt="Piran Tarapore"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3">
              Piran Tarapore
            </h3>

            <p className="text-xs sm:text-sm tracking-wider  mb-4">
              CO-FOUNDER & MANAGING DIRECTOR
            </p>

            <p className=" text-sm sm:text-base leading-relaxed">
              Piran Tarapore is a strategic thinker & marketing specialist with
              a passion for building brands that resonate. He drives business
              growth, marketing strategy, & brand positioning for partners
              across industries.
            </p>

            <Button title={"CONNECT"} />
          </div>

          {/* Founder 2 */}
          <div className="w-full max-w-[520px] mx-auto md:mx-0">
            <div className="w-full aspect-square overflow-hidden mb-8">
              <img
                src="/about/pearl.webp"
                alt="Pearl Jain"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3">
              Pearl Jain
            </h3>

            <p className="text-xs sm:text-sm tracking-wider  mb-4">
              CO-FOUNDER & CREATIVE DIRECTOR
            </p>

            <p className=" text-sm sm:text-base leading-relaxed">
              Pearl Jain is a visionary product designer, creative strategist
              and artist, currently based in Barcelona. She leads the studio’s
              efforts in creating brand experiences that are both innovative &
              culturally relevant.
            </p>

            <Button title={"CONNECT"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersSection;
