import React from "react";

const stats = [
  {
    number: "130+",
    label: "Brands",
    desc: "Trusted by over 130 brands across industries to craft clarity through design.",
  },
  {
    number: "350",
    label: "Projects",
    desc: "From startups to legacy icons, our projects have redefined how brands connect and grow.",
  },
  {
    number: "11",
    label: "Countries",
    desc: "Our collaborations span eleven countries, connecting brands across the USA, Europe, Asia, and the Middle East.",
  },
  {
    number: "5+",
    label: "Years",
    desc: "Over five years of shaping brands that endure, adapt, and inspire.",
  },
];

const StatsSection = () => {
  return (
    <section className="w-full md:h-screen py-16 md:py-24 px-4 sm:px-8 md:px-40">
      <div className="w-full flex flex-col md:items-end">

        {/* Top Stats */}
        <div className="w-full">
          
          {/* MOBILE VIEW */}
          <div className="flex flex-col gap-10 md:hidden">
            {stats.map((item, index) => (
              <div key={index}>
                <h3 className="text-3xl font-[200]">
                  {item.number}
                </h3>
                <p className="text-sm mt-1">{item.label}</p>
                <p className="text-sm leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW (UNCHANGED) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 md:gap-x-20">
              {stats.map((item, index) => (
                <div key={index}>
                  <h3 className="text-4xl md:text-6xl font-[200] ">
                    {item.number}
                  </h3>

                  <p className="text-sm md:text-base mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-foreground my-12 md:my-8" />

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-10 md:gap-x-20">
              {stats.map((item, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base leading-relaxed max-w-[260px]"
                >
                  {item.desc}
                </p>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Paragraph */}
        <div className="mt-16 md:mt-24 md:mt-32 max-w-full md:max-w-4xl">
          <p className="text-lg md:text-xl md:text-3xl lg:text-4xl leading-[1.4] font-[200] text-left">
            Point Of has launched brands, products, books, websites, campaigns &
            experiences with partners that range from global tech & retail
            companies to independent artists & cultural institutions.
          </p>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;