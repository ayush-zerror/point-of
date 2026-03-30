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
  { brand: "BAREEK", industry: "FASHION / ARTISANAL", year: "2021" },
  { brand: "FLORELLI", industry: "ACCESSORIES", year: "2021" },
  { brand: "FORAGE BOX", industry: "GOURMET FOOD", year: "2020" },
  { brand: "GLTCH STUDIOS", industry: "DESIGN STUDIO", year: "2024" },
  { brand: "GUR ORGANIC", industry: "FOOD", year: "2020" },
  { brand: "HARISA STUDIOS", industry: "FASHION", year: "2020" },
  { brand: "HOLI GRAIL BOX", industry: "GIFTING", year: "2021" },
  { brand: "INAYA", industry: "FASHION", year: "2022" },
  { brand: "JADAU.COM", industry: "JEWELLERY", year: "2024" },
  { brand: "KREEVA LIFESTYLE", industry: "FASHION", year: "2024" },
  { brand: "KUTUBOOKU", industry: "PUBLISHING", year: "2025" },
  { brand: "LÄTT LIV (CN)", industry: "RETAIL", year: "2023" },
  { brand: "MOHEIM (JPN)", industry: "HOMEWARE", year: "2021" },
];

const BrandsIndex = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data : data.slice(0, 10);

  return (
    <section className="w-full py-24 px-20">
      <div
        className="
          w-full
        "
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-[200]  mb-12">
          Brands Index <span className="text-base">(50)</span>
        </h2>

        {/* Header Row */}
        <div className="grid grid-cols-3 text-xs uppercase tracking-widepb-4">
          <span>Brand</span>
          <span>Industry</span>
          <span className="text-right">Year</span>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground mb-6" />

        {/* Rows */}
        <div className="space-y-4">
          {visibleData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 text-sm md:text-[15px] "
            >
              <span className="tracking-wide">{item.brand}</span>
              <span>{item.industry}</span>
              <span className="text-right">{item.year}</span>
            </div>
          ))}
        </div>

        {/* See More / Less */}

        <div onClick={() => setShowAll(!showAll)}>
          <Button title={showAll ? "SEE LESS" : "SEE MORE"} />
        </div>
      </div>
    </section>
  );
};

export default BrandsIndex;
