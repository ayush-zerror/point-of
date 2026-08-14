import React from "react";
import RelatedWork from "@/components/connect/RelatedWork";
import AboutExpertise from "@/components/expertiseDets/AboutExpertise";
import HeroSection from "@/components/expertiseDets/HeroSection";
import CTASection from "@/components/home/CTASection";
import { expertiseDetails } from "@/helper/expertise-data";
import { getCaseStudiesForExpertise } from "@/helper/expertise-case-studies";
import { getCaseStudies } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import InstagramSection from "@/components/connect/InstagramSection";

export const dynamicParams = true;

export function generateStaticParams() {
  return expertiseDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = expertiseDetails.find((item) => item.slug === slug);
  if (!data) return {};

  const title = data.title || "Expertise";
  const description = String(data.description || "Expertise by Point Of.").trim();
  const image = data.banner || "/pointof-og.png";
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
      images: [{ url: image.startsWith("/") ? image : `/${image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("/") ? image : `/${image}`],
    },
  };
}

const ExpertiseDetails = async ({ params }) => {
  const { slug } = await params;

  const data = expertiseDetails.find((item) => item.slug === slug);
  if (!data) notFound();

  const all = await getCaseStudies();
  const caseStudies = getCaseStudiesForExpertise(slug, all);

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
      <RelatedWork caseStudies={caseStudies} related={true}/>
      <CTASection heading={data.ctaTitle} buttonTitle={data.ctaButton} />
      {/* <InstagramSection caseStudies={caseStudies} /> */}
    </>
  );
};

export default ExpertiseDetails;