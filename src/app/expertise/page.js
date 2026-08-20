import AccordionSection from '@/components/connect/AccordionSection'
import AreasOfExpertise from '@/components/expertise/AreasOfExpertise'
import HeroSection from '@/components/expertise/HeroSection'
import OurProcess from '@/components/expertise/OurProcess'
import OurApproach from '@/components/expertise/OurApproach'
import CTASection from '@/components/home/CTASection'
import HashScrollToId from '@/components/common/HashScrollToId'
import { faqs } from '@/helper/faqs'
import React from 'react'
import { transformData } from '@/helper/aboutData'
import GridSection from '@/components/about/GridSection'

export const metadata = {
  title: "Expertise",
  description: "Brand strategy, design, and digital expertise—how Point Of works.",
  keywords: ["Point Of", "Expertise", "Brand strategy", "Visual identity", "Web design", "Web development"],
  alternates: { canonical: "/expertise" },
};

const Expertise = () => {
  return (
    <>
      <HashScrollToId />
      <HeroSection />
      <AreasOfExpertise />
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-14 xl:px-20 pt-16 sm:pt-20 md:pt-28 lg:pt-32 z-20 pointer-events-none scroll-mt-24">
        <h2 id="how-we-work" className="heading-xl text-heading">How we work</h2>
        <p className="para text-desc mt-4 max-w-2xl">
          Every engagement follows the same disciplined process—from the
          first conversation to the final handoff. Clear stages. Collaborative
          at every step.
        </p>
      </div>

      <OurProcess />
      <OurApproach />
      <GridSection
        title="How we transform brands"
        intro="Six ways we think about work, and what we do for brands ready for change."
        data={transformData}
      />
      <AccordionSection data={faqs} title="FAQs" />
      <CTASection graphic={true} br={true}/>
    </>
  )
}

export default Expertise