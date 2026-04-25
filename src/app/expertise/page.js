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
      <div className="w-full px-4 sm:px-10 md:px-16 lg:px-20 pt-12 z-20 pointer-events-none">
        <h2 className="heading-xl text-heading">How we work</h2>
        <p className="para text-desc mt-4 max-w-2xl">
          Every engagement follows the same disciplined process — from the
          first conversation to the final handoff. Clear stages. Collaborative
          at every step.
        </p>
      </div>

      <OurProcess />
      <OurApproach />
      <AccordionSection data={faqs} title="FAQ" description="Questions we hear often. Answered directly." />
      <CTASection graphic={true} />
    </>
  )
}

export default Expertise