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
      {/* Global circle2 — fixed, GSAP-controlled */}
      <div
        id="circle2"
        className="fixed w-[200vw] h-[200vw] opacity-0 bg-heading rounded-full  pointer-events-none top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
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