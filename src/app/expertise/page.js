import AccordionSection from '@/components/connect/AccordionSection'
import AreasOfExpertise from '@/components/expertise/AreasOfExpertise'
import HeroSection from '@/components/expertise/HeroSection'
import OurProcess from '@/components/expertise/OurProcess'
import OurApproach from '@/components/expertise/OurApproach'
import CTASection from '@/components/home/CTASection'
import { faqs } from '@/helper/faqs'
import React from 'react'

const Expertise = () => {
  return (
    <>
      <HeroSection />
      <AreasOfExpertise />
      <OurProcess />
      <OurApproach />
      <AccordionSection data={faqs} title="FAQ" />
      <CTASection />
    </>
  )
}

export default Expertise