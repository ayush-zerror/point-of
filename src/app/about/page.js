import React from "react";
import Experience from "@/components/about/Experience";
import FoundersSection from "@/components/about/FoundersSection";
import GridSection from "@/components/about/GridSection";
import HeroSection from "@/components/about/HeroSection";
import PlaceToWork from "@/components/about/PlaceToWork";
import OurValues from "@/components/about/OurValues";
import CTASection from "@/components/home/CTASection";

export const metadata = {
  title: "About",
  description:
    "Point Of is an independent brand & strategic design consultancy. Meet the studio, our values, and the people behind the work.",
  keywords: ["Point Of", "About", "Design studio", "Brand strategy", "Mumbai", "Consultancy"],
  alternates: { canonical: "/about" },
};

const experienceData = [
  {
    title: "5+ Years in Business",
    desc: <>
      Point Of was founded in 2019 by Piran Tarapore and Pearl Jain — with a belief that design is most powerful when it starts with a question, not an answer.
      <br />
      <br />
      Born in Mumbai, grown across three continents, we've spent six years building a consultancy that doesn't just create brands — it grows with them. From the first naming session to the hundredth campaign, we stay in the room.

    </>,
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
    desc: "Piran builds bridges — between a brand's ambition and the market it is trying to reach, between people who should be in the same room but aren't, between the problem as presented and the one that actually needs solving.\n\nAt Point Of, he leads all things business, strategy, partnerships and growth. He has worked alongside over a hundred brands across industries — and is usually the first call a founder makes when something needs to shift.",
    image: "/about/piran.png",
    objectPosition: "object-[50%_10%]",
    buttonText: "CONNECT",
    link: "https://www.linkedin.com/in/iampirantee/",
  },
  {
    name: "Pearl Jain",
    role: "CO-FOUNDER & CREATIVE DIRECTOR",
    desc: "Pearl leads all things creative at Point Of — identity, experience, motion, interaction, and the frontier where design meets emerging technology. Her practice spans art, product design, and interaction design, shaped by a restless curiosity about how things are made and why they matter.\n\nBased in Barcelona, she leads the studio's European creative presence — bringing a rigour and range to the work that comes from treating design as both a discipline and an art form.",
    image: "/about/pearl.webp",
    objectPosition: "object-[50%_25%]",
    buttonText: "CONNECT",
    link: "https://www.linkedin.com/in/pearllbe/",
  },
];

const transformData = [
  {
    title: "Empower",
    desc: (
      <>
        We give brands the tools, language, and confidence to stand on their own.
      </>
    ),
    video: "/about/1.mp4",
  },
  {
    title: "Originate",
    desc: (
      <>
        We build from nothing — finding the idea at the root that makes everything else make sense.

      </>
    ),
    video: "/about/2.mp4",
  },
  {
    title: "Optimization",
    desc: (
      <>
        We sharpen what exists. Better decisions, cleaner systems, less friction.
      </>
    ),
    video: "/about/3.mp4",
  },
  {
    title: "Pivot",
    desc: (
      <>
        We help brands move when staying still is the greater risk.
      </>
    ),
    video: "/about/4.mp4",
  },
  {
    title: "Reposition",
    desc: (
      <>
        We reframe how a brand is seen — in the market, in culture, in people's minds.
      </>
    ),
    video: "/about/5.mp4",
  },
  {
    title: "Propel",
    desc: (
      <>
        We accelerate brands that are ready to lead their category.
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
        href="/brands"
        enableBgParallax={true}
        enableTextParallax={true}
      />
      <Experience data={experienceData} />
      <PlaceToWork />
      <FoundersSection data={foundersData} />

      <GridSection
        title="How we transform brands?"
        intro="Six ways we think about work — and what we do to brands that are ready for change."
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