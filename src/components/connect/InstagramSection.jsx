"use client";

import React, { useEffect, useRef } from "react";
import ArrowButton from "../common/ArrowButton";
import WorkCard from "../work/WorkCard";

const InstagramSection = ({ caseStudies }) => {
  const marqueeInnerRef = useRef(null);

  useEffect(() => {
    const inner = marqueeInnerRef.current;
    if (!inner) return;

    let xPos = 0;
    let rafId;
    const speed = 0.8;
    let singleSetWidth = 0;

    const init = () => {
      singleSetWidth = inner.scrollWidth / 4;

      const tick = () => {
        xPos -= speed;
        if (Math.abs(xPos) >= singleSetWidth) {
          xPos = 0;
        }
        inner.style.transform = `translate3d(${xPos}px, 0, 0)`;
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const frameId = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(rafId);
    };
  }, [caseStudies]);

  const posts = Array.isArray(caseStudies) ? caseStudies : [];
  const duplicated = [...posts, ...posts, ...posts, ...posts];

  return (
    <section className="w-full overflow-hidden py-20 bg-background">

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-10 md:mb-16">
        <h2 className="heading-lg text-subheading">@wearepointof</h2>
        <ArrowButton
          title={"FOLLOW"}
          link={"https://www.instagram.com/wearepointof/"}
        />
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden">
        <div
          ref={marqueeInnerRef}
          className="flex w-max will-change-transform gap-6 sm:gap-10 md:gap-12 lg:gap-20"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {duplicated.map((post, index) => (
            <div
              key={`instagram-${index}`}
              className="flex-shrink-0 pt-10 w-[70vw] sm:w-[45vw] md:w-[35vw] lg:w-[400px]"
            >
              <WorkCard
                slug={post.slug}
                title={post.title}
                image={post.coverImage}
                video={post.microanimation}
                className="!w-full lg:!w-full"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default InstagramSection;