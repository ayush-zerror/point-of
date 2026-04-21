"use client";

import Image from "next/image";
import ArrowButton from "../common/ArrowButton";

export default function ShowcaseGrid({ caseStudy }) {
  const fullViewAssets = Array.isArray(caseStudy?.fullViewAssets)
    ? caseStudy.fullViewAssets
    : [];
  const caseStudyTitle = caseStudy?.title || caseStudy?.name || "Case study";

  // `FullView` uses index 0 as the hero image, so the grid starts from index 1.
  // ShowcaseGrid supports 3–5 images (excluding the hero).
  const assets = fullViewAssets.slice(1).filter(Boolean).slice(0, 5);
  const count = assets.length;

  // If 3 images: "uppercase + image 1 and 2" becomes a single full-width image (top row collapses).
  const topCollapsed = count === 3;

  // If 4 images: instead of image 4 and 5 we show only one full-width image (bottom row collapses).
  const bottomCollapsed = count === 4;

  const topLeft = assets[0] ?? "";
  const topRight = topCollapsed ? "" : (assets[1] ?? "");

  // Middle image sits next to the text box.
  // For 3 images, we use the 2nd image; otherwise we use the 3rd.
  const middleImage = topCollapsed ? (assets[1] ?? "") : (assets[2] ?? "");

  // Bottom row images.
  // For 4 images, `bottomRight` becomes the single full-width bottom image.
  const bottomLeft = bottomCollapsed ? "" : (assets[3] ?? "");
  const bottomRight =
    count === 5 ? (assets[4] ?? "") : bottomCollapsed ? (assets[3] ?? "") : "";

  const bottomFullForThree = count === 3 ? (assets[2] ?? "") : "";

  const openBehance = () => {
    if (caseStudy?.behanceLink) window.open(caseStudy.behanceLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* 1 */}
        <div className={`w-full overflow-hidden ${topCollapsed ? "md:col-span-2 aspect-video" : "aspect-square"}`}>
          <Image
            width={1000}
            height={1000}
            src={topLeft}
            alt={`${caseStudyTitle} — showcase image 1`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2 */}
        {!topCollapsed ? (
          <div className="w-full aspect-square overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={topRight}
              alt={`${caseStudyTitle} — showcase image 2`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {/* TEXT BOX */}
        <div className="flex flex-col justify-center bg-black text-white pr-6 md:pr-14">
          <p className="text-sm font-semibold text-subheading mb-4">
            CREATIVE CONCEPT
          </p>

          <h3 className="heading-xl text-subheading mb-6">
            {caseStudy?.creativeConcept?.title ?? ""}
          </h3>

          <p className="para text-desc max-w-md">
            {caseStudy?.creativeConcept?.description ?? ""}
          </p>
          <ArrowButton
            title={"DETAILED CASE-STUDY"}
            onClick={openBehance}
          />
        </div>
        {/* 3 */}
        <div className="w-full aspect-4/5 overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={middleImage}
            alt={`${caseStudyTitle} — showcase image ${topCollapsed ? 2 : 3}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4 */}
        {count === 3 ? (
          <div className="w-full md:col-span-2 aspect-video overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={bottomFullForThree}
              alt={`${caseStudyTitle} — showcase image 4`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : count >= 4 ? (
          bottomCollapsed ? (
            <div className="w-full md:col-span-2 aspect-video overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src={bottomRight}
                alt={`${caseStudyTitle} — showcase image 4`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-square overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src={bottomLeft}
                alt={`${caseStudyTitle} — showcase image 4`}
                className="w-full h-full object-cover"
              />
            </div>
          )
        ) : null}

        {/* 5 */}
        {count === 5 ? (
          <div className="w-full aspect-square overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={bottomRight}
              alt={`${caseStudyTitle} — showcase image 5`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
