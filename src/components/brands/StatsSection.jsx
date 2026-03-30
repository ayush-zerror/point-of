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
    <section className="w-full h-screen  py-24 px-40">
      <div
        className="
          w-full
          flex flex-col items-end
        "
      >
        {/* Top Stats */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 md:gap-x-20">
            {stats.map((item, index) => (
              <div key={index}>
                <h3 className="text-4xl md:text-6xl font-[200] ">
                  {item.number}
                </h3>

                <p className="text-sm md:text-base  mt-1">{item.label}</p>
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
        {/* Bottom Paragraph */}
        <div className="mt-24 md:mt-32 max-w-4xl ">
          <p className=" text-xl md:text-3xl lg:text-4xl leading-[1.4] font-[200]">
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
