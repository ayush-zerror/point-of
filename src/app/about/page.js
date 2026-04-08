import React from "react";
import Experience from "@/components/about/Experience";
import FoundersSection from "@/components/about/FoundersSection";
import GridSection from "@/components/about/GridSection";
import HeroSection from "@/components/about/HeroSection";
import PlaceToWork from "@/components/about/PlaceToWork";
import OurValues from "@/components/about/OurValues";

const experienceData = [
  {
    title: "5+ Years in Business",
    desc: "Founded in 2019 by Piran Tarapore and Pearl Jain, Point Of began with a simple idea: design that inspires connection. Five years on, we continue to evolve—curious, adaptive, and always pushing to create brands that not only stand the test of time but define what’s next.",
  },
  {
    title: "100% Independent",
    desc: "Our independence gives us the freedom to think boldly, move fast, and stay true to our vision. We answer to ideas, not investors—shaping every project with agility, purpose, and a commitment to craft.",
  },
  {
    title: "25+ Global Brand Partners",
    desc: "We’re a team of thinkers and makers collaborating with partners across industries and time zones. United by a belief in the power of design, we shape ideas that connect, evolve, and leave a lasting mark—creating work that resonates across.",
  },
];
const foundersData = [
  {
    name: "Piran Tarapore",
    role: "CO-FOUNDER & MANAGING DIRECTOR",
    desc: "Piran Tarapore is a strategic thinker & marketing specialist with a passion for building brands that resonate. He drives business growth, marketing strategy, & brand positioning for partners across industries.",
    image: "/about/piran.png",
    objectPosition: "object-[50%_10%]",
    buttonText: "CONNECT",
  },
  {
    name: "Pearl Jain",
    role: "CO-FOUNDER & CREATIVE DIRECTOR",
    desc: "Pearl Jain is a visionary product designer, creative strategist and artist, currently based in Barcelona. She leads the studio’s efforts in creating brand experiences that are both innovative & culturally relevant.",
    image: "/about/pearl.webp",
    objectPosition: "object-[50%_25%]",
    buttonText: "CONNECT",
  },
];

const transformData = [
  {
    title: "Empower",
    desc: (
      <>
        Design and develop <br />
        an industry leading product.
      </>
    ),
    video: "/about/1.mp4",
  },
  {
    title: "Procreate",
    desc: (
      <>
        Focus, prioritize, and turn <br /> your product
        into a category leader.
      </>
    ),
    video: "/about/2.mp4",
  },
  {
    title: "Optimization",
    desc: (
      <>
        Take your vision from <br /> concept
        to creation.
      </>
    ),
    video: "/about/3.mp4",
  },
  {
    title: "Pivot",
    desc: (
      <>
        Guiding your brand to metamorphosize,<br />
        accept and adjust to change.
      </>
    ),
    video: "/about/4.mp4",
  },
  {
    title: "Reposition",
    desc: (
      <>
        Equip teams, create processes,<br />
        and futureproof your organization.
      </>
    ),
    video: "/about/5.mp4",
  },
  {
    title: "Propel",
    desc: (
      <>
        Guided processes for dialogue,<br />
        strategy and innovation.
      </>
    ),
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
      <Experience data={experienceData} />
      <PlaceToWork />
      <FoundersSection data={foundersData} />

      <GridSection
        title="How We Transform Brands?"
        data={transformData}
      />
      <OurValues />

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