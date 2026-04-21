import WorkSection from '@/components/work/WorkSection'
import caseStudyData from '@/helper/case-study'
import React from 'react'

export const metadata = {
  title: "Work",
  description: "Selected case studies and projects by Point Of.",
  keywords: ["Point Of", "Work", "Case studies", "Projects", "Branding", "Design"],
  alternates: { canonical: "/work" },
};

const Work = () => {
  const projects = (caseStudyData ?? []).map((c) => {
    const title = String(c?.title ?? "").trim();
    const words = title.split(/\s+/).filter(Boolean);

    return {
      coverImage: c?.coverImage,
      name: title || String(c?.slug ?? "Project"),
      slug: c?.slug,
      gist: c?.gist ?? "",
      titles: words.length <= 1 ? [title] : [words[0], words.slice(1).join(" ")],
      microanimation: c?.microanimation,
    };
  });

  return (
    <>
      <WorkSection projects={projects} />
    </>
  )
}

export default Work