/** Case study slugs shown on each expertise detail page (order preserved). */
export const EXPERTISE_CASE_STUDY_SLUGS = {
  website: ["wealth-fusion", "casa-carigar", "moheim"],
  branding: ["jadau", "whitehues", "sooka-interiors"],
  print: ["contigo-tequila", "vedanta-academy", "kvar-design"],
  marketing: ["t-swirl", "the-pantry-mumbai", "label-ritu-kumar"],
};

export function getCaseStudiesForExpertise(expertiseSlug, allCaseStudies) {
  const slugs = EXPERTISE_CASE_STUDY_SLUGS[expertiseSlug];
  if (!slugs?.length) return (allCaseStudies ?? []).slice(0, 3);

  const bySlug = new Map(
    (allCaseStudies ?? []).map((c) => [String(c?.slug ?? "").toLowerCase(), c])
  );

  return slugs.map((slug) => bySlug.get(slug.toLowerCase())).filter(Boolean);
}
