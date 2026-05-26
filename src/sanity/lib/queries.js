import { client } from "./client";
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
  "assets": coalesce(assets, fullViewAssets, overviewAssets)[].asset->url,
  "microanimation": microanimation.asset->url,
  meta { title, description, keywords }
`;

/** Build-safe slug list (no draftMode / live API). Use in generateStaticParams. */
export async function getCaseStudySlugs() {
  return client.fetch(
    /* groq */ `*[_type == "caseStudy" && defined(slug.current)] | order(orderRank asc) { "slug": slug.current }`
  );
}

export async function getCaseStudies() {
  const query = /* groq */ `*[_type == "caseStudy"] | order(orderRank asc) { ${CASE_STUDY_FIELDS} }`;
  const res = await sanityFetch({ query });
  return res?.data ?? res ?? [];
}

export async function getCaseStudyBySlug(slug) {
  const query = /* groq */ `*[_type == "caseStudy" && lower(slug.current) == $slug][0] { ${CASE_STUDY_FIELDS} }`;
  const res = await sanityFetch({ query, params: { slug: String(slug ?? "").toLowerCase() } });
  return res?.data ?? res ?? null;
}

