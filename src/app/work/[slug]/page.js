import InstagramSection from '@/components/connect/InstagramSection'
import HeroSection from '@/components/expertiseDets/HeroSection'
import CaseStudyIntro from '@/components/workDets/CaseStudyIntro'
import ImageToggleSection from '@/components/workDets/ImageToggleSection'
import NavbarReveal from '@/components/common/NavbarReveal'
import { getCaseStudies, getCaseStudyBySlug } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({ params }) {
  const normalizeSlug = (value) => {
    const raw = typeof value === "string" ? value : String(value ?? "");
    try {
      return decodeURIComponent(raw).trim().toLowerCase();
    } catch {
      return raw.trim().toLowerCase();
    }
  };

  const resolvedParams = await Promise.resolve(params);
  const slug = normalizeSlug(resolvedParams?.slug);
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.title || "Case Study"}`;
  const description = String(caseStudy.gist || "Case study by Point Of.").trim();
  const image = caseStudy.coverImage || "/og.jpg";
  const keywords = [
    "Point Of",
    "Case study",
    caseStudy.title,
    ...(Array.isArray(caseStudy.filtersServices) ? caseStudy.filtersServices : []),
    ...(Array.isArray(caseStudy.filtersIndustry) ? caseStudy.filtersIndustry : []),
    caseStudy.filtersYear,
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/work/${caseStudy.slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${caseStudy.slug}`,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const WorkDetail = async ({ params }) => {
  const normalizeSlug = (value) => {
    const raw = typeof value === "string" ? value : String(value ?? "");
    try {
      return decodeURIComponent(raw).trim().toLowerCase();
    } catch {
      return raw.trim().toLowerCase();
    }
  };

  const resolvedParams = await Promise.resolve(params);
  const slug = normalizeSlug(resolvedParams?.slug);
  const caseStudy = await getCaseStudyBySlug(slug);
  const all = await getCaseStudies();
  const otherCaseStudies = (all ?? []).filter((c) => normalizeSlug(c?.slug) !== slug).slice(0, 3);

  if (!caseStudy) notFound()

  return (
    <>
      <NavbarReveal />
      <HeroSection src={caseStudy.coverImage} />
      <CaseStudyIntro caseStudy={caseStudy} />
      <ImageToggleSection caseStudy={caseStudy} />
      <InstagramSection caseStudies={otherCaseStudies} />
    </>
  )
}

export default WorkDetail