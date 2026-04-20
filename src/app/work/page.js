import WorkSection from '@/components/work/WorkSection'
import caseStudyData from '@/helper/case-study'
import React from 'react'

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
    };
  });

  return (
    <>
      <WorkSection projects={projects} />
    </>
  )
}

export default Work