import React from "react";

const BrandsSection = () => {
  return (
    <section className="w-full  text-white px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="max-w-5xl m-auto">
        {/* TEXT */}
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black dark:text-neutral-400 leading-[1.3] tracking-tight">
          We partner with visionary entrepreneurs, industry leaders, &
          disruptive startups to build brands that spark change & drive global
          impact.
        </p>

        {/* CTA */}
        <div className="mt-10 group flex items-center gap-3 cursor-pointer w-fit">
          {/* DOT */}
          <span className="w-1.5 h-1.5 bg-black dark:bg-neutral-300 rounded-full" />

          {/* TEXT */}
          <span className="relative text-sm tracking-wide text-black dark:text-neutral-400">
            OUR BRANDS
            <span className="absolute left-0 -bottom-1 w-full h-px bg-neutral-300 scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
