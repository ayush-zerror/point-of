import BrandsIndex from '@/components/brands/BrandsIndex'
import SelectedBrands from '@/components/brands/SelectedBrands'
import StatsSection from '@/components/brands/StatsSection'
import TestimonialSection from '@/components/brands/TestimonialSection'
import GridSection from '@/components/studio/GridSection'
import HeroSection from '@/components/studio/HeroSection'
import React from 'react'
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
    title: "Product Consulting",
    desc: "Design and develop an industry leading product.",
  },
  {
    title: "Strategic Design",
    desc: "Equip teams, create processes, and futureproof your organization.",
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
            The future is an exciting <br />
            place to be. We create brands <br />
            that aspire to be there.
          </>
        }
        btntitle={"OUR EXPERTISE"}
      />
      <StatsSection />
      <SelectedBrands />
      <BrandsIndex />
      <GridSection
        title={
          <>
            Got a project in mind? <br /> Learn how we can help.
          </>
        }
        btntitle={"LET'S TALK"}
        data={cultureValues}
      />
      <TestimonialSection />
    </>
  )
}

export default Brnads