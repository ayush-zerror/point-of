import InstagramSection from '@/components/connect/InstagramSection'
import HeroSection from '@/components/expertiseDets/HeroSection'
import CaseStudyIntro from '@/components/workDets/CaseStudyIntro'
import ImageToggleSection from '@/components/workDets/ImageToggleSection'
import React from 'react'

const WorkDetail = () => {
  return (
    <>
      <HeroSection src={"https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png"} />
      <CaseStudyIntro />
      <ImageToggleSection/>
      <InstagramSection/>
    </>
  )
}

export default WorkDetail