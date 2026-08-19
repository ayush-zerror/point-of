import WorkSection from '@/components/work/WorkSection'
import { getCaseStudies } from '@/sanity/lib/queries'
import React from 'react'

export const metadata = {
  title: "Work",
  description: "Selected case studies and projects by Point Of.",
  keywords: ["Point Of", "Work", "Case studies", "Projects", "Branding", "Design"],
  alternates: { canonical: "/work" },
};

const Work = async () => {
  const caseStudies = await getCaseStudies();
  const projects = (caseStudies ?? []).map((c) => {
    const title = String(c?.title ?? "").trim();
    const displayTitle = title || String(c?.slug ?? "Project");

    return {
      coverImage: c?.coverImage,
      name: displayTitle,
      slug: c?.slug,
      gist: c?.gist ?? "",
      microanimation: c?.microanimation,
      filtersServices: c?.filtersServices ?? [],
      filtersIndustry: c?.filtersIndustry ?? [],
      filtersYear: c?.filtersYear ?? "",
    };
  });

  return (
    <>
      <WorkSection projects={projects} />
    </>
  )
}

export default Work