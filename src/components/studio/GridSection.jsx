import React from "react";
import Button from "../common/Button";

const GridSection = ({ title, btntitle, data }) => {
  const isFour = data.length === 4;

  return (
    <div className="w-full py-24 sm:py-28 md:py-32">
      {/* Container */}
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Heading */}
        {title && (
          <div className="text-center mb-20 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-heading font-[200] leading-[1.3]">
              {title}
            </h2>
            {btntitle && <Button title={btntitle} />}
          </div>
        )}

        

        {/* Grid */}
        <div
          className={`
            grid grid-cols-1 
            ${isFour ? "md:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"}
            gap-y-16 sm:gap-y-20 md:gap-y-24 
            gap-x-12 md:gap-x-24
          `}
        >
          {data.map((item, index) => (
            <div key={index} className="max-w-[520px]">
              {/* ✅ Video (only if exists) */}
              {item.video && (
                <div className="w-[60px] sm:w-[70px] md:w-[80px] aspect-square mb-2 overflow-hidden">
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover invert dark:invert-0"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed ">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridSection;
