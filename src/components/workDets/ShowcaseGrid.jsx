"use client";

import ArrowButton from "../common/ArrowButton";
import CaseStudyMedia from "./CaseStudyMedia";
import { getCaseStudyAssets, hasCaseStudyAssets } from "./caseStudyAssets";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_GRID_COUNT = 5;

export default function ShowcaseGrid({ caseStudy }) {
  const wrapRef = useRef(null);
  const mediaRefs = useRef([]);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      const els = mediaRefs.current.filter(Boolean);
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const caseStudyAssets = getCaseStudyAssets(caseStudy);
  const hasAssets = hasCaseStudyAssets(caseStudy);
  const caseStudyTitle = caseStudy?.title || caseStudy?.name || "Case study";

  // `FullView` uses index 0 as the hero image, so the grid starts from index 1.
  // ShowcaseGrid supports 3–5 images (excluding the hero).
  const assets = hasAssets
    ? caseStudyAssets.slice(1).filter(Boolean).slice(0, 5)
    : Array.from({ length: PLACEHOLDER_GRID_COUNT }, () => "");

  const count = hasAssets ? assets.length : PLACEHOLDER_GRID_COUNT;

  const topCollapsed = count === 3;
  const bottomCollapsed = count === 4;

  const topLeft = assets[0] ?? "";
  const topRight = topCollapsed ? "" : (assets[1] ?? "");
  const middleImage = topCollapsed ? (assets[1] ?? "") : (assets[2] ?? "");
  const bottomLeft = bottomCollapsed ? "" : (assets[3] ?? "");
  const bottomRight =
    count === 5 ? (assets[4] ?? "") : bottomCollapsed ? (assets[3] ?? "") : "";
  const bottomFullForThree = count === 3 ? (assets[2] ?? "") : "";

  const openBehance = () => {
    if (caseStudy?.behanceLink) window.open(caseStudy.behanceLink, "_blank", "noopener,noreferrer");
  };

  const media = (src, alt, refIndex) => (
    <div
      ref={(el) => { mediaRefs.current[refIndex] = el; }}
      className="w-full h-full will-change-transform"
    >
      <CaseStudyMedia src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );

  return (
    <section ref={wrapRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* 1 */}
        <div className={`w-full overflow-hidden ${topCollapsed ? "md:col-span-2 aspect-video" : "aspect-square"}`}>
          {media(topLeft, `${caseStudyTitle} — showcase image 1`, 0)}
        </div>

        {/* 2 */}
        {!topCollapsed ? (
          <div className="w-full aspect-square overflow-hidden">
            {media(topRight, `${caseStudyTitle} — showcase image 2`, 1)}
          </div>
        ) : null}

        {/* CREATIVE CONCEPT */}
        <div className="md:col-span-2 grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-black text-white pr-6 md:pr-0 lg:pr-14">
            <p className="text-sm font-semibold text-subheading mb-4">
              CREATIVE CONCEPT
            </p>

            <h3 className="heading-xl text-subheading mb-6">
              {caseStudy?.creativeConcept?.title ?? ""}
            </h3>

            <p className="para text-desc max-w-md md:w-full md:max-w-none lg:w-auto lg:max-w-md">
              {caseStudy?.creativeConcept?.description ?? ""}
            </p>
            <ArrowButton
              title={"DETAILED CASE-STUDY"}
              onClick={openBehance}
            />
          </div>

          <div className="w-full aspect-4/5 overflow-hidden">
            {media(
              middleImage,
              `${caseStudyTitle} — showcase image ${topCollapsed ? 2 : 3}`,
              2
            )}
          </div>
        </div>

        {/* 4 */}
        {count === 3 ? (
          <div className="w-full md:col-span-2 aspect-video overflow-hidden">
            {media(bottomFullForThree, `${caseStudyTitle} — showcase image 4`, 3)}
          </div>
        ) : count >= 4 ? (
          bottomCollapsed ? (
            <div className="w-full md:col-span-2 aspect-video overflow-hidden">
              {media(bottomRight, `${caseStudyTitle} — showcase image 4`, 3)}
            </div>
          ) : (
            <div className="w-full aspect-square overflow-hidden">
              {media(bottomLeft, `${caseStudyTitle} — showcase image 4`, 3)}
            </div>
          )
        ) : null}

        {/* 5 */}
        {count === 5 ? (
          <div className="w-full aspect-square overflow-hidden">
            {media(bottomRight, `${caseStudyTitle} — showcase image 5`, 4)}
          </div>
        ) : null}
      </div>
    </section>
  );
}
