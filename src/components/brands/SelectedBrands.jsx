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
    <section className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-20">
      
      <div className="w-full">
        
        {/* Heading */}
        <h2 className="heading-xl mb-10 md:mb-12">
          Selected Brands
        </h2>

        {/* Grid Container */}
        <div className="border border-foreground">
          
          <div className="grid grid-cols-3 md:grid-cols-5">
            
            {brands.map((brand, index) => (
              <div
                key={index}
                className="
                  h-24 sm:h-28 md:h-40 lg:h-52
                  flex items-center justify-center
                  border-b border-r border-foreground
                  
                  /* Remove right border on last column */
                  [&:nth-child(2n)]:sm:border-r
                  [&:nth-child(3n)]:md:border-r
                  [&:nth-child(5n)]:border-r-0
                "
              >
                <span className="text-xs sm:text-sm md:text-base tracking-wide text-center px-2">
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