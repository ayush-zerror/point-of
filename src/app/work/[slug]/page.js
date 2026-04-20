import InstagramSection from '@/components/connect/InstagramSection'
import HeroSection from '@/components/expertiseDets/HeroSection'
import CaseStudyIntro from '@/components/workDets/CaseStudyIntro'
import ImageToggleSection from '@/components/workDets/ImageToggleSection'
import caseStudyData from '@/helper/case-study'
import { notFound } from 'next/navigation'
import React from 'react'

const WorkDetail = async ({ params }) => {
  const normalizeSlug = (value) => {
    const raw = typeof value === "string" ? value : String(value ?? "");
    try {
      return decodeURIComponent(raw).trim().toLowerCase();
    } catch {
      return raw.trim().toLowerCase();
    }
  };

  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams?.slug);
  const caseStudy = caseStudyData.find((c) => normalizeSlug(c?.slug) === slug);
  const otherCaseStudies = caseStudyData
    .filter((c) => normalizeSlug(c?.slug) !== slug)
    .slice(0, 3);

  if (!caseStudy) notFound()

  return (
    <>
      <HeroSection src={caseStudy.coverImage} />
      <CaseStudyIntro caseStudy={caseStudy} />
      <ImageToggleSection caseStudy={caseStudy} />
      <InstagramSection caseStudies={otherCaseStudies} />
    </>
  )
}

export default WorkDetail