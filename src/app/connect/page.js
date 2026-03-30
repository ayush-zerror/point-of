import ContactSection from '@/components/connect/ContactSection'
import GetInTouch from '@/components/connect/GetInTouch'
import InstagramSection from '@/components/connect/InstagramSection'
import JoinTeam from '@/components/connect/JoinTeam'
import HeroSection from '@/components/studio/HeroSection'
import React from 'react'

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
      <div className="relative h-[200vh]">

        {/* Contact (VISIBLE FIRST) */}
        <div className="sticky top-0 h-screen z-10">
          <ContactSection />
        </div>

        {/* GetInTouch (STARTS BELOW, COMES UP) */}
        <div className="absolute bottom-0 left-0 w-full h-screen z-20">
          <GetInTouch />
        </div>

      </div>

      <JoinTeam />
      <InstagramSection />
    </>
  )
}

export default Connect