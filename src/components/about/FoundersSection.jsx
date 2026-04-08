import React from "react";
import Button from "../common/Button";
import Image from "next/image";

const FoundersSection = ({ data }) => {
  return (
    <div className="w-full  py-20 sm:py-24 md:py-28">
      {/* Container */}
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="flex flex-col md:flex-row md:justify-between gap-16 md:gap-24">
          
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-[520px] mx-auto md:mx-0"
            >
              <div className="w-full aspect-square overflow-hidden mb-8">
                <Image
                width={1000}
                height={1000}
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover ${item.objectPosition}`}
                />
              </div>

              <h3 className="heading-lg !font-[300] text-subheading mb-3">
                {item.name}
              </h3>

              <p className="text-xs sm:text-sm uppercase tracking-[1px] heading-lg !font-[500] text-subheading mb-4">
                {item.role}
              </p>

              <p className="para text-desc">
                {item.desc}
              </p>

              <Button title={item.buttonText || "CONNECT"} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default FoundersSection;