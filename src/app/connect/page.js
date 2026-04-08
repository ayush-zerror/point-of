import ContactSection from '@/components/connect/ContactSection'
import GetInTouch from '@/components/connect/GetInTouch'
import InstagramSection from '@/components/connect/InstagramSection'
import JoinTeam from '@/components/connect/JoinTeam'
import HeroSection from '@/components/about/HeroSection'
import React from 'react'
import AccordionSection from '@/components/connect/AccordionSection'
import { vacancies } from '@/helper/vacancies'



const Connect = () => {
  return (
    <>
      <HeroSection
        title={
          <>
            We believe in the power of <br />
            digital, and we love partnering <br />
            with brands that feel the same.
          </>
        }
        btntitle={"CONNECT"}
      />
      {/* Scroll Scene */}
      <div className="relative md:h-[200vh]">

        {/* Contact */}
        <div className="h-auto md:sticky md:top-0 md:h-screen z-10">
          <ContactSection />
        </div>

        {/* GetInTouch */}
        <div className="w-full h-auto md:absolute md:bottom-0 md:left-0 md:h-screen z-20">
          <GetInTouch />
        </div>

      </div>

      <JoinTeam />
      <AccordionSection data={vacancies} title="Current Vacancies" />
      <InstagramSection />
    </>
  )
}

export default Connect