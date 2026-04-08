"use client";
import React, { useState } from "react";
import Button from "../common/Button";

const data = [
  { brand: "FAIR BETS", industry: "D2C", year: "2024" },
  { brand: "FRESHEN GO", industry: "FMCG", year: "2021" },
  { brand: "MAASIKA", industry: "FEMTECH", year: "2020" },
  { brand: "NAAZ BIJOUTERIES", industry: "JEWELLERY", year: "2020" },
  { brand: "PARZAAN DASTUR", industry: "PERSONAL BRAND", year: "2020" },
  { brand: "OVENLY PATISSERIE", industry: "BAKERY", year: "2021" },
  { brand: "ZOTA HEALTHCARE", industry: "HEALTHCARE", year: "2021" },
  { brand: "ZARIYA INDIA", industry: "FASHION / ARTISANAL", year: "2021" },
  { brand: "HERBANIZE", industry: "WELLNESS", year: "2021" },
  { brand: "AASHIM GULATI", industry: "PERSONAL BRAND", year: "2021" },
  { brand: "AHAKZAI", industry: "FASHION", year: "2021" },
  { brand: "BAKULI BLU POTTERY", industry: "CRAFT / HOME", year: "2021" },
];

const BrandsIndex = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data : data.slice(0, 10);

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-20">
      <div className="w-full">

        {/* Heading */}
        <h2 className="heading-xl mb-10 md:mb-12">
          Brands Index{" "}
          <span className="text-sm md:text-base">({data.length})</span>
        </h2>

        {/* Desktop Header (NO BORDER NOW) */}
        <div className="hidden md:grid grid-cols-3 border-b text-xs uppercase tracking-wide pb-4">
          <span>Brand</span>
          <span>Industry</span>
          <span className="text-right">Year</span>
        </div>

        {/* Rows */}
        <div>
          {visibleData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-b md:border-none border-foreground"
            >
              {/* Mobile */}
              <div className="flex items-center justify-between md:hidden">
                <span className="font-medium tracking-wide">
                  {item.brand}
                </span>
                <span className="text-sm opacity-70">
                  {item.year}
                </span>
              </div>

              <div className="text-sm text-muted-foreground md:hidden mt-1">
                {item.industry}
              </div>

              {/* Desktop */}
              <div className="hidden md:grid grid-cols-3 text-sm md:text-[15px]">
                <span>{item.brand}</span>
                <span>{item.industry}</span>
                <span className="text-right">{item.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        {data.length > 10 && (
          <Button
            title={showAll ? "SEE LESS" : "SEE MORE"}
            onClick={() => setShowAll(!showAll)}
          />
        )}

      </div>
    </section>
  );
};

export default BrandsIndex;