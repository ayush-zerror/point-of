"use client";

export default function CaseStudyIntro() {
  return (
    <section className="w-full bg-black text-white px-4 sm:px-10 md:px-16 lg:px-20 py-20 md:py-28">
      
      {/* SAME GRID STRUCTURE */}
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-start">
        
        {/* LEFT */}
        <div className="flex flex-col justify-between h-full">
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-light">
              Contigo Tequila
            </h2>

            <p className="text-sm md:text-base text-gray-400 tracking-wide">
              MEXICO & INDIA
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-300 leading-tight">
            Bridging Mexico and India.
          </h3>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            Contigo is a premium tequila that celebrates the connection between two vibrant cultures.
            The name means "with you" in Spanish—a promise of togetherness that resonates across borders.
            We created a brand that honors Mexican tequila-making traditions while embracing India's colorful
            celebration culture, resulting in a spirit that brings people together through shared moments of joy.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-6">
            
            <button className="border border-white/20 px-6 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition">
              NOMENCLATURE
            </button>

            <button className="border border-white/20 px-6 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition">
              BRAND IDENTITY
            </button>

            <button className="border border-white/20 px-6 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition sm:w-full md:w-auto">
              PACKAGING
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}