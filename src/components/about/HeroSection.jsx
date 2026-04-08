import React from "react";
import Button from "../common/Button";

const HeroSection = ({
  bgImage = "",
  title = "",
  btntitle = "",
  imgClass = "",
}) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      {bgImage && (
        <img
          src={bgImage}
          alt="background"
          className={`absolute invert-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full h-full object-cover ${imgClass}`}
        />
      )}

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex items-end">
        <div
          className="
            w-full 
            pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
            pr-6
            pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-40
          "
        >
          {/* Title */}
          <h2
            className="heading-xl text-subheading max-w-[90%] sm:max-w-[80%] md:max-w-[700px] lg:max-w-[900px]"
          >
            {title}
          </h2>

          <Button title={btntitle} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
