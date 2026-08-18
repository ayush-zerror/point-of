import CenterDot from '@/components/common/CenterDot'
import AboutStudio from '@/components/home/AboutStudio'
import BrandsSection from '@/components/home/BrandsSection'
import CTASection from '@/components/home/CTASection'
import Expertise from '@/components/home/Expertise'
import HeroSection from '@/components/home/HeroSection'
import AccordionSection from '@/components/connect/AccordionSection'
import { expertiseItems } from '@/helper/expertise-items'
import { getCaseStudies } from '@/sanity/lib/queries'
import React from 'react'
import OurWorkShowreel from '@/components/home/OurWorkShowreel'

export const metadata = {
  title: "Point Of—Global Brand & Strategic Design Consultancy",
  description:
    "An independent brand consultancy working globally at the intersection of design, strategy, and culture.",
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

const Home = async () => {
  const all = await getCaseStudies();
  const posts = (all ?? []).slice(0, 5);

  return (
    <>
      <HeroSection />
      {/* Global circle—fixed at bottom center, GSAP-controlled */}
      <div
        id="circle2"
        className="hidden md:block fixed w-[200vw] h-[200vw] opacity-0 bg-secondary rounded-full pointer-events-none top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <AboutStudio />
      {/* Mobile: replace Expertise with accordion */}
      <div className="md:hidden">
        <AccordionSection
          title="Expertise"
          data={expertiseItems.map((it) => ({ title: it.title, description: it.content }))}
        />
      </div>
      <div className="hidden md:block">
        <Expertise />
      </div>
      <OurWorkShowreel posts={posts} />
      {/* <OurWork posts={posts} /> */}
      {/* <Showreel /> */}
      <BrandsSection />
      <CTASection
        heading={<>Every brand has a moment that defines it.
          <br />
          We are the studio that finds it, builds it, <br /> and stays for what comes next.
        </>}
        buttonTitle={"Let's find yours"}
        href="/connect#get-in-touch"
      />
      {/* Center dot—always fixed at viewport center across all pages */}
      <CenterDot />
    </>
  )
}

export default Home
