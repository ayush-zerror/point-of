import CenterDot from '@/components/common/CenterDot'
import AboutStudio from '@/components/home/AboutStudio'
import BrandsSection from '@/components/home/BrandsSection'
import CTASection from '@/components/home/CTASection'
import Expertise from '@/components/home/Expertise'
import HeroSection from '@/components/home/HeroSection'
import OurWork from '@/components/home/OurWork'
import Showreel from '@/components/home/Showreel'
import React from 'react'

export const metadata = {
  title: "Point Of — Global Brand & Strategic Design Consultancy",
  description:
    "An independent consultancy based in Mumbai, working globally — rethinking how brands engage with culture and people. Design, strategy, and technology. Building for India and beyond.",
  keywords: [
    "Point Of",
    "Brand strategy",
    "Branding",
    "Strategic design",
    "Design consultancy",
    "Mumbai",
    "India",
  ],
  alternates: { canonical: "/" },
};

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
      <BrandsSection />
      <CTASection />
      {/* Center dot — always fixed at viewport center across all pages */}
      <CenterDot />
    </>
  )
}

export default Home