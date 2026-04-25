import { sanityFetch } from "./live";

const CASE_STUDY_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  location,
  gist,
  services,
  filtersServices,
  filtersIndustry,
  filtersYear,
  about,
  challenge { title, description },
  creativeConcept { title, description },
  behanceLink,
  "coverImage": coverImage.asset->url,
  "fullViewAssets": fullViewAssets[].asset->url,
  "overviewAssets": overviewAssets[].asset->url,
  "microanimation": microanimation.asset->url,
  meta { title, description, keywords }
`;

export async function getCaseStudies() {
  const query = /* groq */ `*[_type == "caseStudy"] | order(_createdAt desc) { ${CASE_STUDY_FIELDS} }`;
  const res = await sanityFetch({ query });
  return res?.data.reverse() ?? res ?? [];
}

export async function getCaseStudyBySlug(slug) {
  const query = /* groq */ `*[_type == "caseStudy" && slug.current == $slug][0] { ${CASE_STUDY_FIELDS} }`;
  const res = await sanityFetch({ query, params: { slug } });
  return res?.data ?? res ?? null;
}

