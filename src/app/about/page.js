import React from "react";
import Experience from "@/components/about/Experience";
import FoundersSection from "@/components/about/FoundersSection";
import GridSection from "@/components/about/GridSection";
import HeroSection from "@/components/about/HeroSection";
import OurValues from "@/components/about/OurValues";
import CTASection from "@/components/home/CTASection";
import StudioConsultancy from "@/components/about/StudioConsultancy";
import OfficesSection from "@/components/about/OfficesSection";
import { foundersData, experienceData, transformData, cultureValues } from "@/helper/aboutData";

export const metadata = {
  title: "About",
  description:
    "Point Of is an independent brand & strategic design consultancy. Meet the studio, our values, and the people behind the work.",
  keywords: ["Point Of", "About", "Design studio", "Brand strategy", "Mumbai", "Consultancy"],
  alternates: { canonical: "/about" },
};

/*
  lines config — drives the staggered reveal in HeroSection.
  Each entry becomes one <span class="block"> animated 0.3s apart.
  extraDelay on "no return." adds a beat of emphasis before it lands.
*/
const heroLines = [
  { prefix: "Point of ", word: "origin."      },
  { prefix: "Point of ", word: "difference."  },
  { prefix: "Point of ", word: "no return.", italic: true, extraDelay: 0.15 },
  {
    body: "We are Point Of — a creative consultancy built to shape brands from their first idea to everything that comes after.",
  },
];

const Studio = () => {
  return (
    <>
      <HeroSection
        bgImage="/about/studio-bg.webp"
        lines={heroLines}
        btntitle={"OUR BRANDS"}
        href="/brands"
        enableBgParallax={true}
        enableTextParallax={true}
      />
      <Experience data={experienceData} />
      <StudioConsultancy />
      <OurValues />
      <GridSection
        title="How we transform brands?"
        intro="Six ways we think about work — and what we do to brands that are ready for change."
        data={transformData}
      />
      <FoundersSection data={foundersData} />
      <OfficesSection />
      <GridSection
        title={
          <>
            Driven by Design. <br /> Defined by Culture.
          </>
        }
        data={cultureValues}
      />
      <CTASection
        heading={<>Every brand has a moment that defines it.
          <br />
          We are the studio that finds it, builds it, <br /> and stays for what comes next.
        </>}
        buttonTitle={"Let's find yours"}
      />
    </>
  );
};

export default Studio;
