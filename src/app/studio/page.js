import React from "react";
import Experience from "@/components/studio/Experience";
import FoundersSection from "@/components/studio/FoundersSection";
import GridSection from "@/components/studio/GridSection";
import HeroSection from "@/components/studio/HeroSection";
import PlaceToWork from "@/components/studio/PlaceToWork";


const transformData = [
  {
    title: "Empower",
    desc: "Design and develop an industry leading product.",
    video: "/about/1.mp4",
  },
  {
    title: "Procreate",
    desc: "Focus, prioritize, and turn your product into a category leader.",
    video: "/about/2.mp4",
  },
  {
    title: "Optimization",
    desc: "Take your vision from concept to creation.",
    video: "/about/3.mp4",
  },
  {
    title: "Pivot",
    desc: "Guiding your brand to metamorphosize, accept and adjust to change.",
    video: "/about/4.mp4",
  },
  {
    title: "Reposition",
    desc: "Equip teams, create processes, and futureproof your organization.",
    video: "/about/5.mp4",
  },
  {
    title: "Propel",
    desc: "Guided processes for dialogue, strategy and innovation.",
    video: "/about/6.mp4",
  },
];

const cultureValues = [
  {
    title: "Move as One Team",
    desc: "We work as one—strategists, designers, and creators aligned around shared intent. Every project is built on seamless collaboration, where diverse perspectives come together to create something unified and meaningful.",
  },
  {
    title: "Build Strong Bonds",
    desc: "We believe the best work grows from trust. By building lasting relationships—with each other and with our partners—we create space for open dialogue, shared vision, and design that makes a difference.",
  },
  {
    title: "Champion Customers",
    desc: "Our focus is always on the people we create for. We listen deeply, design thoughtfully, and deliver work that not only meets expectations but elevates them—driving real value for our partners and their audiences.",
  },
  {
    title: "Hold High Expectations",
    desc: "We hold ourselves to the highest standards of craft and clarity. Every detail, decision, and design reflects our belief that excellence isn’t a target—it’s a responsibility we bring to every collaboration.",
  },
];


const Studio = () => {
  return (
    <>
      <HeroSection
        bgImage="/about/studio-bg.webp"
        title={
          <>
            We craft brands that connect, <br />
            captivate, and resonate. <br />
            Creating the future of branding.
          </>
        }
        btntitle={"OUR BRANDS"}
      />
      <Experience />
      <PlaceToWork />
      <FoundersSection />

      <GridSection
        title="How We Transform Brands?"
        data={transformData}
      />

      <GridSection
        title={
          <>
            Driven by Design. <br /> Defined by Culture.
          </>
        }
        data={cultureValues}
      />
    </>
  );
};

export default Studio;