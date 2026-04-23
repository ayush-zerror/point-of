import AccordionSection from '@/components/connect/AccordionSection'
import AreasOfExpertise from '@/components/expertise/AreasOfExpertise'
import HeroSection from '@/components/expertise/HeroSection'
import OurProcess from '@/components/expertise/OurProcess'
import OurApproach from '@/components/expertise/OurApproach'
import CTASection from '@/components/home/CTASection'
import { faqs } from '@/helper/faqs'
import React from 'react'

export const metadata = {
  title: "Expertise",
  description: "Brand strategy, design, and digital expertise — how Point Of works.",
  keywords: ["Point Of", "Expertise", "Brand strategy", "Visual identity", "Web design", "Web development"],
  alternates: { canonical: "/expertise" },
};

const Expertise = () => {
  return (
    <>
      <HeroSection />
      <AreasOfExpertise />
      <OurProcess />
      <OurApproach />
      <AccordionSection data={faqs} title="FAQ" />
      <CTASection graphic={true} />
    </>
  )
}

export default Expertise