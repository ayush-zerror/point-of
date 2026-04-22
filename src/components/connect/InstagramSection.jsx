
"use client";

import React, { useEffect, useRef } from "react";
import Button from "../common/Button";
import WorkCard from "../work/WorkCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "../common/ArrowButton";

gsap.registerPlugin(ScrollTrigger);

const InstagramSection = ({ caseStudies }) => {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      gsap.set(cards, { x: 60, opacity: 0 });

      gsap.to(cards, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [caseStudies]);

  const posts = Array.isArray(caseStudies)
    ? caseStudies.slice(0, 3)
    : [];

  return (
    <section ref={rootRef} className="w-full overflow-hidden py-20 md:py-28 ">

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
        <h2 className="heading-lg text-subheading">
          @wearepointof
        </h2>
        <ArrowButton title={"FOLLOW"} link={"https://www.instagram.com/wearepointof/"} /> 
      </div>

      {/* Container */}
      <div className="px-4 sm:px-10 md:px-12 lg:px-20">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-20">
          {posts.map((post, index) => (
            <div key={post.slug ?? index} ref={(el) => { cardRefs.current[index] = el; }}>
              <WorkCard slug={post.slug} title={post.title} image={post.coverImage} video={post.microanimation} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;