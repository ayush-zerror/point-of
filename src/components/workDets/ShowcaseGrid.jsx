"use client";

import Image from "next/image";
import Button from "../common/Button";

export default function ShowcaseGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* 1 */}
        <div className="w-full aspect-square overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src="https://www.wearepointof.com/d2.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2 */}
        <div className="w-full aspect-square overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src="https://www.wearepointof.com/d3.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT BOX */}
        <div className="flex flex-col justify-center bg-black text-white pr-6 md:pr-14">
          <p className="text-sm font-semibold text-subheading mb-4">
            APPROACH
          </p>

          <h3 className="heading-xl text-subheading mb-6">
            The spirit of shared celebration
          </h3>

          <p className="para text-desc max-w-md">
            We positioned Contigo as the spirit of shared celebration, drawing
            parallels between Mexican fiestas and Indian festivals. The visual
            identity merges warm agave field tones with the vibrant colors of
            Indian celebrations.
          </p>

          <Button title={"DETAILED CASE-STUDY"} />
        </div>
        {/* 4 */}
        <div className="w-full aspect-[4/5] overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src="https://www.wearepointof.com/d4.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* 5 */}
        <div className="w-full aspect-square overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src="https://www.wearepointof.com/d6.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* 6 */}
        <div className="w-full aspect-square overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src="https://www.wearepointof.com/d7.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
