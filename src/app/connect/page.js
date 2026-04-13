import ContactSection from '@/components/connect/ContactSection'
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
        showClock={true}
        title={
          <>
            We believe in the power of <br />
            digital, and we love partnering <br />
            with brands that feel the same.
          </>
        }
        btntitle={"CONNECT"}
      />
      <ContactSection />
      <JoinTeam />
      <AccordionSection data={vacancies} title="Current Vacancies" />
      <InstagramSection />
    </>
  )
}

export default Connect