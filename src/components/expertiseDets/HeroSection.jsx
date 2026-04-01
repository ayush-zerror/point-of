"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full h-auto lg:h-screen px-4 sm:px-6 md:px-10 lg:px-0 pt-20 sm:pt-24 md:pt-24 lg:pt-0 pb-6 md:pb-10 lg:pb-0">
      
        
        <Image
          src="https://www.wearepointof.com/COVER%20EXPERTISE/COVER_BRANDING.jpeg"
          alt="hero"
          width={1600}
          height={900}
          priority
          className="w-full h-full object-cover"
        />


    </section>
  );
};

export default HeroSection;