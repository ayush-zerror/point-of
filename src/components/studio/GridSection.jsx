import React from "react";
import Button from "../common/Button";

const GridSection = ({ title, btntitle, data }) => {
  const isFour = data.length === 4;

  return (
    <div className="w-full py-16 sm:py-20 md:py-28 lg:py-32">
      {/* Container */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-8 md:px-14">
        
        {/* Heading */}
        {title && (
          <div className="text-center mb-12 sm:mb-16 md:mb-20 flex flex-col items-center gap-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[200] leading-[1.3] max-w-3xl">
              {title}
            </h2>

            {btntitle && <Button title={btntitle} />}
          </div>
        )}

        {/* Grid */}
        <div
          className={`
            grid grid-cols-1 
            ${isFour ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}
            gap-y-12 sm:gap-y-16 md:gap-y-20 lg:gap-y-24
            gap-x-6 sm:gap-x-10 md:gap-x-16 lg:gap-x-24
          `}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-full sm:max-w-[520px] mx-auto"
            >
              {/* Video */}
              {item.video && (
                <div className="w-12 sm:w-14 md:w-16 lg:w-20 aspect-square mb-3 sm:mb-4 overflow-hidden">
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-3 sm:mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
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