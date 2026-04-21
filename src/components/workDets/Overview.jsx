"use client";

import Image from "next/image";
import React from "react";
import OverviewSection from "./OverviewSection";

const Overview = ({ caseStudy }) => {
  const overviewAssets = Array.isArray(caseStudy?.overviewAssets)
    ? caseStudy.overviewAssets
    : [];
  const caseStudyTitle = caseStudy?.title || caseStudy?.name || "Case study";

  const count = overviewAssets.length;

  const layouts = {
    4: [
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:col-span-2 md:row-span-2", single: false },
    ],
    5: [
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:row-span-2", single: true },
      { grid: "md:row-span-2", single: true },
    ],
    6: [
      { grid: "md:row-span-2", single: true },
      { grid: "md:row-span-2", single: true },
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:col-span-2 md:row-span-2", single: false },
      { grid: "md:row-span-2", single: true },
      { grid: "md:row-span-2", single: true },
    ],
  };

  const gridClasses = layouts[count] ?? layouts[4];

  return (
    <section className="w-full">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          gap-4 md:gap-6
          md:auto-rows-[220px]
          lg:auto-rows-[250px]
        "
      >
        {overviewAssets.map((src, index) => {
          const { grid, single } = gridClasses[index];
          return (
            <div key={index} className={`overflow-hidden ${grid}`}>
              <Image
                width={1000}
                height={1000}
                alt={`${caseStudyTitle} — overview image ${index + 1}`}
                src={src ?? ""}
                className={`w-full object-cover ${single ? "h-1/2" : "h-full"}`}
              />
            </div>
          );
        })}
      </div>
      <OverviewSection caseStudy={caseStudy} />
    </section>
  );
};

export default Overview;