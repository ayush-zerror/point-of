import caseStudyData from "@/helper/case-study";
import { expertiseDetails } from "@/helper/expertise-data";

export default function sitemap() {
  const base = "https://www.wearepointof.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/brands",
    "/work",
    "/expertise",
    "/connect",
    "/privacy",
    "/legal",
  ];

  const workRoutes = (caseStudyData ?? [])
    .map((c) => c?.slug)
    .filter(Boolean)
    .map((slug) => `/work/${slug}`);

  const expertiseRoutes = (expertiseDetails ?? [])
    .map((e) => e?.slug)
    .filter(Boolean)
    .map((slug) => `/expertise/${slug}`);

  const urls = [...staticRoutes, ...workRoutes, ...expertiseRoutes];

  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));
}

