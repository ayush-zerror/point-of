"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: "Sketchers", logo: "/brands/Logos/Skechers.png" },
  { name: "TODs", logo: "/brands/Logos/TODs.png" },
  { name: "Voltas", logo: "/brands/Logos/Voltas.png" },
  { name: "JBL", logo: "/brands/Logos/JBL.png" },
  { name: "PEPSI", logo: "/brands/Logos/Pepsi.png" },
  { name: "Being Human", logo: "/brands/Logos/Being_Human.png" },
  { name: "Mokobara", logo: "/brands/Logos/Mokobara.png" },
  { name: "Gaurav Gupta", logo: "/brands/Logos/Gaurav_Gupta.png" },
  { name: "IDFC First Bank", logo: "/brands/Logos/IDFC_First_Bank.png" },
  { name: "Goodrich Maritime", logo: "/brands/Logos/Goodrich_Maritime.png" },
  { name: "Limelight Diamonds", logo: "/brands/Logos/Limelight_Diamonds.png" },
  { name: "Salman Khan Films", logo: "/brands/Logos/Salman_Khan_Films.png" },
  { name: "Label Ritu Kumar", logo: "/brands/Logos/Label_Ritu_Kumar.png" },
  { name: "House of Namah", logo: "/brands/Logos/House_of_Namah.png" },
  { name: "Casa Carigar", logo: "/brands/Logos/casa-carigar.png" },
  { name: "Groww", logo: "/brands/Logos/Groww.png" },
  { name: "Rage Coffee", logo: "/brands/Logos/Rage_Coffee.png" },
  { name: "Good Flipping Burgers", logo: "/brands/Logos/Good_Flipping_Burgers.png" },
  { name: "Talwalkers", logo: "/brands/Logos/Talwalkers.png" },
  { name: "Charagh Din", logo: "/brands/Logos/Charagh_Din.png" },
  { name: "Tripoto", logo: "/brands/Logos/Tripoto.png" },
  { name: "KVAR", logo: "/brands/Logos/kvar.png" },
  { name: "Chhaya Jain", logo: "/brands/Logos/chhaya-jain.png" },
  { name: "Inega (Talent)", logo: "/brands/Logos/Inega_Talent.png" },
  { name: "Orca Dive Club", logo: "/brands/Logos/Orca_Dive_Club.png" },
];

const SelectedBrands = () => {
  const itemRefs = useRef([]);

  useEffect(() => {
    const triggers = [];

    itemRefs.current.forEach((el) => {
      if (!el) return;

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller: "body",   // change to your custom scroller if needed
          start: "top 85%",
          end: "top 70%",
          scrub: 1,
        },
      });

      st.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      triggers.push(st.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <section className="min-h-screen w-full py-16 md:py-24 px-6 sm:px-8 md:px-20">
      <h2 className="mb-10 md:mb-12 heading-xl text-subheading">
        Selected Brands
      </h2>

      <div className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
        {brands.map((brand, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={[
              "group relative aspect-square border border-gray-300/40",
            ].join(" ")}
          >
            {/* Hover cover */}
            <div
              className="
                absolute inset-0 flex items-center justify-center
                opacity-0 brightness-[0.8] transition-all duration-300
                group-hover:opacity-100
              "
            >
              <h2 className="heading-md text-heading">{brand.name}</h2>
            </div>

            {/* Logo */}
            <div
              className="
                flex h-full w-full items-center justify-center
                transition-all duration-800
                group-hover:opacity-0
              "
            >
              <Image
              width={100}
              height={100}
                src={brand.logo}
                alt={brand.name}
                sizes="(max-width: 640px) 30vw, (max-width: 768px) 20vw, 12vw"
                className="w-[60%] sm:w-[45%] md:w-[38%] h-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedBrands;