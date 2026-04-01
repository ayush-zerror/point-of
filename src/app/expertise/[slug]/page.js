import InstagramSection from '@/components/connect/InstagramSection'
import AboutExpertise from '@/components/expertiseDets/AboutExpertise'
import HeroSection from '@/components/expertiseDets/HeroSection'
import CTASection from '@/components/home/CTASection'
import React from 'react'

const ExpertiseDetails = () => {
  return (
    <>
      <HeroSection src="https://www.wearepointof.com/COVER%20EXPERTISE/COVER_BRANDING.jpeg" />
      <AboutExpertise/>
      <InstagramSection />
      <CTASection />
    </>
  )
}

export default ExpertiseDetails