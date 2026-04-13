import React from "react";
import ShowcaseGrid from "./ShowcaseGrid";
import Image from "next/image";

const FullView = () => {
  return (
    <section className="w-full space-y-20 md:space-y-28">
      {/* IMAGE */}
      <div className="relative w-full h-auto md:h-screen overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src="https://www.wearepointof.com/d1.png"
          alt="full"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
        {/* LEFT */}
        <div>
          <p className="text-sm font-semibold text-subheading">
            CHALLENGE
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          <h2 className="heading-xl text-subheading max-w-3xl">
            An authentic tequila brand that speaks to Indian consumers
          </h2>

          <p className="para text-desc max-w-2xl">
            How do you create an authentic tequila brand that speaks to Indian
            consumers without losing its Mexican soul? The challenge was to
            develop a premium spirit that could compete with established global
            brands while telling a unique cross-cultural story. We needed to
            navigate complex regulations in both countries, appeal to Indian
            tastes and celebration traditions, and create packaging that felt
            genuine to both cultures—all while maintaining the craftsmanship and
            quality expected from premium tequila. The brand had to educate a
            new market about tequila culture while feeling immediately familiar
            and welcoming.
          </p>
        </div>
      </div>
      <ShowcaseGrid />
    </section>
  );
};

export default FullView;
