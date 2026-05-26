export function getCaseStudyAssets(caseStudy) {
  const raw = Array.isArray(caseStudy?.assets) ? caseStudy.assets : [];
  return raw.filter(Boolean);
}

export function hasCaseStudyAssets(caseStudy) {
  return getCaseStudyAssets(caseStudy).length > 0;
}
