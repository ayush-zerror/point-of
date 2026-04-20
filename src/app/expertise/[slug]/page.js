import InstagramSection from "@/components/connect/InstagramSection";
import AboutExpertise from "@/components/expertiseDets/AboutExpertise";
import HeroSection from "@/components/expertiseDets/HeroSection";
import CTASection from "@/components/home/CTASection";
import { expertiseDetails } from "@/helper/expertise-data";
import caseStudyData from "@/helper/case-study";
import { notFound } from "next/navigation";
import React from "react";

const ExpertiseDetails = async ({ params }) => {
  // Next can provide `params` synchronously or as a promise (depending on version/config).
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  const data = expertiseDetails.find((item) => item.slug === slug);
  if (!data) notFound();

  const caseStudies = (caseStudyData ?? []).slice(0, 3);

  return (
    <>
      <HeroSection src={data.banner} />
      <AboutExpertise
        expertise={data.expertise}
        title={data.title}
        description={data.description}
        accordion={data.accordion}
        currentSlug={data.slug}
      />
      <CTASection heading={data.ctaTitle} buttonTitle={data.ctaButton} />
      <InstagramSection caseStudies={caseStudies} />
    </>
  );
};

export default ExpertiseDetails;