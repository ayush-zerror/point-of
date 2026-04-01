import InstagramSection from '@/components/connect/InstagramSection'
import AboutExpertise from '@/components/expertiseDets/AboutExpertise'
import HeroSection from '@/components/expertiseDets/HeroSection'
import CTASection from '@/components/home/CTASection'
import React from 'react'

const ExpertiseDetails = () => {
  return (
    <>
      <HeroSection />
      <AboutExpertise/>
      <InstagramSection />
      <CTASection />
    </>
  )
}

export default ExpertiseDetails