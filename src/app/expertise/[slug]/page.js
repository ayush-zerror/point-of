import InstagramSection from "@/components/connect/InstagramSection";
import AboutExpertise from "@/components/expertiseDets/AboutExpertise";
import HeroSection from "@/components/expertiseDets/HeroSection";
import CTASection from "@/components/home/CTASection";
import { expertiseDetails } from "@/helper/expertise-data";
import { getCaseStudies } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const data = expertiseDetails.find((item) => item.slug === slug);
  if (!data) return {};

  const title = data.title || "Expertise";
  const description = String(data.description || "Expertise by Point Of.").trim();
  const image = data.banner || "/og.jpg";
  const keywords = ["Point Of", "Expertise", data.expertise, data.title, "Brand strategy", "Design"].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/expertise/${data.slug}` },
    openGraph: {
      title,
      description,
      url: `/expertise/${data.slug}`,
      images: [{ url: `/${image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/${image}`],
    },
  };
}

const ExpertiseDetails = async ({ params }) => {
  // Next can provide `params` synchronously or as a promise (depending on version/config).
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  const data = expertiseDetails.find((item) => item.slug === slug);
  if (!data) notFound();

  const all = await getCaseStudies();
  const caseStudies = (all ?? []).slice(0, 3);

  return (
    <>
      <HeroSection src={data.banner} />
      <AboutExpertise
        expertise={data.expertise}
        title={data.title}
        description={data.description}
        accordion={data.accordion}
        currentSlug={data.slug}
      />
      <CTASection heading={data.ctaTitle} buttonTitle={data.ctaButton} />
      <InstagramSection caseStudies={caseStudies} />
    </>
  );
};

export default ExpertiseDetails;