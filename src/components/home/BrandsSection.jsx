"use client";
import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const logos = [
  { name: "Being Human", src: "/brands/Logos/balanced-assets/Being_Human.png", width: 109, height: 78 },
  { name: "Casa Carigar", src: "/brands/Logos/balanced-assets/casa-carigar.png", width: 210, height: 78 },
  { name: "Charagh Din", src: "/brands/Logos/balanced-assets/Charagh_Din.png", width: 181, height: 78 },
  { name: "Chhaya Jain", src: "/brands/Logos/balanced-assets/chhaya-jain.png", width: 230, height: 44 },
  { name: "Gaurav Gupta", src: "/brands/Logos/balanced-assets/Gaurav_Gupta.png", width: 230, height: 58 },
  { name: "Good Flipping Burgers", src: "/brands/Logos/balanced-assets/Good_Flipping_Burgers.png", width: 229, height: 78 },
  { name: "Goodrich Maritime", src: "/brands/Logos/balanced-assets/Goodrich_Maritime.png", width: 230, height: 62 },
  { name: "Groww", src: "/brands/Logos/balanced-assets/Groww.png", width: 230, height: 60 },
  { name: "House of Namah", src: "/brands/Logos/balanced-assets/House_of_Namah.png", width: 230, height: 58 },
  { name: "IDFC First Bank", src: "/brands/Logos/balanced-assets/IDFC_First_Bank.png", width: 230, height: 62 },
  { name: "Inega Talent", src: "/brands/Logos/balanced-assets/Inega_Talent.png", width: 230, height: 63 },
  { name: "JBL", src: "/brands/Logos/balanced-assets/JBL.png", width: 141, height: 78 },
  { name: "KVAR", src: "/brands/Logos/balanced-assets/kvar.png", width: 176, height: 78 },
  { name: "Label Ritu Kumar", src: "/brands/Logos/balanced-assets/Label_Ritu_Kumar.png", width: 162, height: 78 },
  { name: "Limelight Diamonds", src: "/brands/Logos/balanced-assets/Limelight_Diamonds.png", width: 230, height: 34 },
  { name: "Mokobara", src: "/brands/Logos/balanced-assets/Mokobara.png", width: 230, height: 34 },
  { name: "Orca Dive Club", src: "/brands/Logos/balanced-assets/Orca_Dive_Club.png", width: 91, height: 78 },
  { name: "Pepsi", src: "/brands/Logos/balanced-assets/Pepsi.png", width: 203, height: 78 },
  { name: "Rage Coffee", src: "/brands/Logos/balanced-assets/Rage_Coffee.png", width: 162, height: 78 },
  { name: "Salman Khan Films", src: "/brands/Logos/balanced-assets/Salman_Khan_Films.png", width: 183, height: 78 },
  { name: "Skechers", src: "/brands/Logos/balanced-assets/Skechers.png", width: 230, height: 24 },
  { name: "Talwalkers", src: "/brands/Logos/balanced-assets/Talwalkers.png", width: 86, height: 78 },
  { name: "TOD's", src: "/brands/Logos/balanced-assets/TODs.png", width: 230, height: 67 },
  { name: "Tripoto", src: "/brands/Logos/balanced-assets/Tripoto.png", width: 230, height: 65 },
  { name: "Voltas", src: "/brands/Logos/balanced-assets/Voltas.png", width: 230, height: 42 },
];

const BrandsSection = () => {
  const router = useRouter();
  return (
    <section className="w-full py-24 md:py-52 md:pb-20 bg-background relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-0 flex flex-col">
        <h2 className="heading-xl text-heading mb-4">Our partnerships</h2>
        <p className="heading-xl text-desc">
        The brands that trusted us first — and kept coming back.
        </p>
      </div>

      {/* Logo marquee (full width) */}
      <div className="w-full py-10 md:py-16">
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />

          {/* Changes: gap-24 md:gap-32 → gap-12 md:gap-16 | pr-24 md:pr-32 → pr-12 md:pr-16 | 30s → 50s | h-24 md:h-28 → h-16 md:h-20 | min-w reduced */}
          <div className="flex w-max animate-[marquee_50s_linear_infinite] items-center gap-12 md:gap-16 pr-12 md:pr-16 will-change-transform">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo.src}-${idx}`}
                className="h-10 min-w-[6rem] md:h-12 md:min-w-[10rem] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  width={logo.width}
                  height={logo.height}
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="h-auto object-contain"
                  style={{
                    width: `clamp(${Math.round(logo.width * 0.35)}px, ${Math.round(logo.width / 28)}rem, ${Math.round(logo.width * 0.5)}px)`,
                    maxHeight: `${Math.round(logo.height * 0.5)}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button title={"See all our brands"} className={"!mt-0"} onClick={() => {
          router.push("/brands");
        }} />
      </div>
    </section>
  );
};

export default BrandsSection;