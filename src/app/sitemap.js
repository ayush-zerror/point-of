import { expertiseDetails } from "@/helper/expertise-data";
import { client } from "@/sanity/lib/client";

export default async function sitemap() {
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

  const slugs = await client.fetch(`*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`);
  const workRoutes = (slugs ?? []).map((c) => c?.slug).filter(Boolean).map((slug) => `/work/${slug}`);

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

