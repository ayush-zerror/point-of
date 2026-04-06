import CenterDot from '@/components/common/CenterDot'
import AboutStudio from '@/components/home/AboutStudio'
import BrandsSection from '@/components/home/BrandsSection'
import CTASection from '@/components/home/CTASection'
import Expertise from '@/components/home/Expertise'
import HeroSection from '@/components/home/HeroSection'
import OurWork from '@/components/home/OurWork'
import Showreel from '@/components/home/Showreel'
import ShowreelVideo from '@/components/home/ShowreelVideo'
import React from 'react'

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutStudio />
      <Expertise />
      <OurWork />
      <Showreel />
      <ShowreelVideo />
      <BrandsSection />
      <CTASection />
      {/* Center dot — always fixed at viewport center across all pages */}
      <CenterDot />
    </>
  )
}

export default Home