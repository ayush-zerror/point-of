import BrandsIndex from '@/components/brands/BrandsIndex'
import SelectedBrands from '@/components/brands/SelectedBrands'
import StatsSection from '@/components/brands/StatsSection'
import TestimonialSection from '@/components/brands/TestimonialSection'
import GridSection from '@/components/about/GridSection'
import HeroSection from '@/components/about/HeroSection'
import React from 'react'

export const metadata = {
  title: "Brands",
  description:
    "Selected brand partners and work by Point Of — strategy, identity, and digital experiences.",
  keywords: ["Point Of", "Brands", "Brand partners", "Brand identity", "Design studio", "Consultancy"],
  alternates: { canonical: "/brands" },
};
const cultureValues = [
  {
    title: "Design a new product.",
    desc: "Design and develop an industry leading product.",
  },
  {
    title: "Improve an existing product.",
    desc: "Focus, prioritize, and turn your product into a category leader.",
  },
  {
    title: "Launch a new company.",
    desc: "Take your vision from concept to creation.",
  },
  {
    title: "Business Strategy",
    desc: "Clarity on direction before design begins. For founders navigating the decisions that shape everything after.",
  },
  {
    title: "Design Consulting",
    desc: "Embed strategic creative thinking into your team. Better briefs, sharper decisions, stronger output.",
  },
  {
    title: "Education & Workshop",
    desc: "Guided processes for dialogue, strategy and innovation.",
  },
];

const Brnads = () => {
  return (
    <>
      <HeroSection
        imgClass="!h-[150vw] !w-[150vw] spin-slow"
        bgImage="/brands/brand-bg.jpg"
        title={
          <>
            The world is being remade
            by the people willing to build it differently.
            We're the creative consultancy they call first.
          </>
        }
        btntitle={"See how we work"}
        href="/expertise"
        enableTextParallax={true}
      />
      <StatsSection />
      <SelectedBrands />
      <BrandsIndex />
      <TestimonialSection />
      <GridSection
        title={
          <>
          Working on something that <br /> needs clearer thinking?
          </>
        }
        btntitle={"Start a conversation"}
        data={cultureValues}
      />
    </>
  )
}

export default Brnads