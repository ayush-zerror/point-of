import React from "react";

const brands = [
  "OOVA",
  "Duckbill",
  "duckbill",
  "COATUE",
  "COATUE",
  "BACKBONE",
  "MORE BETTER",
  "HAPPY WOLF",
  "JOOLA",
  "prose",
  "Jot",
  "ARCHER",
  "Pika",
  "PEPSICO",
  "out east",
];

const SelectedBrands = () => {
  return (
    <section className="w-full  py-24 px-20">
      
      <div
        className="
          w-full
        "
      >
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-[200]  mb-16">
          Selected Brands
        </h2>

        {/* Grid */}
        <div className="border border-foreground">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            
            {brands.map((brand, index) => (
              <div
                key={index}
                className="
                  h-32 md:h-52
                  flex items-center justify-center
                  border-r border-b border-foreground
                  last:border-r-0
                "
              >
                <span className=" text-sm md:text-base tracking-wide">
                  {brand}
                </span>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default SelectedBrands;