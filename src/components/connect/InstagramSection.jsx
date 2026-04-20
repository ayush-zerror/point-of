import React from "react";
import Link from "next/link";
import Button from "../common/Button";
import Image from "next/image";
import WorkCard from "../work/WorkCard";

const InstagramSection = ({ caseStudies }) => {
  const posts = Array.isArray(caseStudies)
    ? caseStudies.slice(0, 3)
    : [];

  return (
    <section className="w-full bg-black text-white py-20 md:py-28">

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
        <h2 className="heading-lg text-subheading">
          @wearepointof
        </h2>
        <Button title={"FOLLOW"} />
      </div>

      {/* Container */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-28 xl:px-20">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-20">
          {posts.map((post, index) => (

           <WorkCard key={index} slug={post.slug} title={post.title} image={post.coverImage} video={post.microanimation} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;