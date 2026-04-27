"use client";
import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Button from "../common/Button";
import Image from "next/image";
import { rows } from "@/helper/brand";



// Matches vanilla exactly:
// idle/reset  → collapsed at bottom
// enter       → full reveal (bottom corners lift to top)
// leave       → collapse to top, then reset to bottom
const CLIP_IDLE  = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_FULL  = "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";
const CLIP_TOP   = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const BrandsIndex = () => {
  const [showAll, setShowAll] = useState(false);
  const [sortKey, setSortKey] = useState("year"); // year | brand | industry
  const [sortDir, setSortDir] = useState("desc"); // year default: newest first
  const [viewMode, setViewMode] = useState("list"); // list | year | industry
  const showcaseRef = useRef(null);
  const defaultSortRef = useRef({ sortKey: "year", sortDir: "desc" });

  const sortedRows = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const copy = [...rows];

    copy.sort((a, b) => {
      if (sortKey === "year") {
        const byYear = (Number(a.year) - Number(b.year)) * dir;
        if (byYear !== 0) return byYear;
        return String(a.brand).localeCompare(String(b.brand));
      }

      if (sortKey === "brand") {
        const byBrand = String(a.brand).localeCompare(String(b.brand)) * dir;
        if (byBrand !== 0) return byBrand;
        return (Number(a.year) - Number(b.year)) * -1;
      }

      // industry
      const byIndustry = String(a.industry).localeCompare(String(b.industry)) * dir;
      if (byIndustry !== 0) return byIndustry;
      return (Number(a.year) - Number(b.year)) * -1;
    });

    return copy;
  }, [sortDir, sortKey]);

  const filteredRows = sortedRows;

  const visibleRows = useMemo(() => {
    return showAll ? filteredRows : filteredRows.slice(0, 20);
  }, [filteredRows, showAll]);

  const visibleData = visibleRows;

  const yearGroups = useMemo(() => {
    const map = new Map();
    for (const item of visibleRows) {
      const y = String(item.year ?? "").trim();
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(item);
    }
    const years = Array.from(map.keys())
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a)); // newest first

    return years.map((year) => ({ year, items: map.get(year) ?? [] }));
  }, [visibleRows]);

  const industryGroups = useMemo(() => {
    const map = new Map();
    for (const item of visibleRows) {
      const ind = String(item.industry ?? "").trim() || "Other";
      if (!map.has(ind)) map.set(ind, []);
      map.get(ind).push(item);
    }

    const inds = Array.from(map.keys()).sort((a, b) => a.localeCompare(b));
    return inds.map((industry) => ({
      industry,
      items: (map.get(industry) ?? []).slice().sort((a, b) => Number(b.year) - Number(a.year)),
    }));
  }, [visibleRows]);

  const getSlide = (index) => {
    if (!showcaseRef.current) return null;
    return showcaseRef.current.querySelectorAll(".show")[index] ?? null;
  };

  // mouseenter — exact vanilla logic
  const handleBrandEnter = (index) => {
    const slide = getSlide(index);
    if (!slide) return;

    gsap.to(slide, {
      clipPath: CLIP_FULL,
      duration: 0.6,
    });
  };

  // mouseleave — exact vanilla logic
  const handleBrandLeave = (index) => {
    const slide = getSlide(index);
    if (!slide) return;

    gsap.to(slide, {
      clipPath: CLIP_TOP,
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        gsap.set(slide, {
          clipPath: CLIP_IDLE,
          opacity: 1,
          scale: 1,
        });
      },
    });
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 sm:px-8 md:px-20">
      <div className="w-full">

        {/* Showcase image overlay */}
        <div
          ref={showcaseRef}
          className="pointer-events-none hidden md:block fixed right-8 lg:right-16 xl:right-68 top-1/2 z-50 h-64 w-64 -translate-y-1/2 lg:h-72 lg:w-72"
        >
          {visibleData.map((item, index) => (
            <div
              key={`${item.brand}-${index}-slide`}
              className="show absolute inset-0 overflow-hidden"
              style={{ clipPath: CLIP_IDLE }}
            >
              <Image
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
                src={item.image}
                alt={item.brand}
              />
            </div>
          ))}
        </div>

        {/* Heading + Filter (aligned to end) */}
        <div className="mb-8 md:mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="heading-xl text-subheading mb-2 md:mb-4">
              Brands Index{" "}
              <sup className="text-sm md:text-base">({filteredRows.length})</sup>
            </h2>
            <p className="para text-desc">
              A partial record of who we've worked with and what we've worked on.
            </p>
          </div>
        </div>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-3 border-b border-desc/60 text-sm tracking-wide font-heading font-normal text-subheading uppercase pb-6 mb-6">
          <button
            type="button"
            onClick={() => {
              setViewMode("list");
              setShowAll(false);
              if (sortKey !== "brand") {
                setSortKey("brand");
                setSortDir("asc");
                return;
              }
              // second click resets to default
              setSortKey(defaultSortRef.current.sortKey);
              setSortDir(defaultSortRef.current.sortDir);
            }}
            className={[
              "group relative cursor-pointer w-fit text-left",
              sortKey === "brand" ? "font-semibold opacity-100" : "",
            ].join(" ")}
          >
            <span
              className={[
                "absolute left-0 top-full mt-px whitespace-nowrap text-[0.62rem] font-normal capitalize",
                sortKey === "brand" ? "opacity-75" : "opacity-0 group-hover:opacity-75",
              ].join(" ")}
            >
              {sortKey === "brand" ? "click to reset" : "click to filter"}
            </span>
            Brand
          </button>

          <button
            type="button"
            onClick={() => {
              setShowAll(false);
              // Industry header toggles the industry-wise grouped layout
              if (viewMode !== "industry") {
                setViewMode("industry");
                setSortKey("industry");
                setSortDir("asc");
                return;
              }

              // second click resets back to normal list view (default sort)
              setViewMode("list");
              setSortKey(defaultSortRef.current.sortKey);
              setSortDir(defaultSortRef.current.sortDir);
            }}
            className={[
              "group relative w-fit cursor-pointer text-left",
              viewMode === "industry" ? "font-semibold opacity-100" : "",
            ].join(" ")}
          >
            <span
              className={[
                "absolute left-0 top-full mt-px whitespace-nowrap text-[0.62rem] font-normal capitalize",
                viewMode === "industry" || sortKey === "industry"
                  ? "opacity-75"
                  : "opacity-0 group-hover:opacity-75",
              ].join(" ")}
            >
              {viewMode === "industry" || sortKey === "industry"
                ? "click to reset"
                : "click to filter"}
            </span>
            Industry
          </button>

          <span className="text-right">
            <button
              type="button"
              onClick={() => {
                // Year header toggles the year-wise grouped layout
                setShowAll(false);
                if (viewMode !== "year") {
                  setViewMode("year");
                  setSortKey("year");
                  setSortDir("desc");
                  return;
                }
                // second click resets back to normal list view (default sort)
                setViewMode("list");
                setSortKey(defaultSortRef.current.sortKey);
                setSortDir(defaultSortRef.current.sortDir);
              }}
              className={[
                "group relative w-fit cursor-pointer text-right",
                viewMode === "year" ? "font-semibold opacity-100" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute right-0 top-full mt-px whitespace-nowrap text-right text-[0.62rem] font-normal capitalize",
                  viewMode === "year" ? "opacity-75" : "opacity-0 group-hover:opacity-75",
                ].join(" ")}
              >
                {viewMode === "year" ? "click to reset" : "click to filter"}
              </span>
              Year
            </button>
          </span>
        </div>

        {/* Rows (animated switch) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${showAll}-${sortKey}-${sortDir}`}
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ y: 24, opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          >
            {viewMode === "year" ? (
              <div className="space-y-14">
                {yearGroups.map((group) => (
                  <div key={group.year} className="pt-8">
                    <div className="flex items-start justify-between gap-6 border-b border-desc/60 pb-3">
                      <div className="hidden md:block" />
                      <div className="ml-auto text-right ">
                        <div className="text-3xl lg:text-5xl font-heading font-light tracking-wide text-subheading">
                          {group.year}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      {group.items.map((item, index) => (
                        <div
                          key={`${group.year}-${item.brand}-${index}`}
                          className="border-b border-desc md:border-none"
                        >
                          {/* Mobile */}
                          <div className="flex items-center justify-between md:hidden py-2">
                            <span className="font-normal tracking-wide text-subheading">{item.brand}</span>
                            <span className="text-sm opacity-70">{item.year}</span>
                          </div>
                          <div className="text-sm text-desc md:hidden pb-3">
                            {item.industry}
                          </div>

                          {/* Desktop */}
                          <div className="hidden md:grid grid-cols-3 py-1 font-body text-xs uppercase font-regular leading-[1.9] tracking-[1.5px] opacity-50">
                            <span>{item.brand}</span>
                            <span>{item.industry}</span>
                            <span className="text-right">{item.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === "industry" ? (
              <div className="space-y-14">
                {industryGroups.map((group) => (
                  <div key={group.industry} className="pt-8">
                    <div className="border-b border-desc/60 pb-3">
                      {/* Desktop: align with the Industry column (middle) */}
                      <div className="hidden md:grid grid-cols-3 gap-0">
                        <div />
                        <div className="text-2xl lg:text-4xl font-heading font-light tracking-wide text-subheading">
                          {group.industry}
                        </div>
                        <div />
                      </div>
                      {/* Mobile: keep it readable */}
                      <div className="md:hidden text-xl font-heading font-light tracking-wide text-subheading">
                        {group.industry}
                      </div>
                    </div>

                    <div className="mt-6">
                      {group.items.map((item, index) => (
                        <div
                          key={`${group.industry}-${item.brand}-${index}`}
                          className="border-b border-desc md:border-none"
                        >
                          {/* Mobile */}
                          <div className="flex items-center justify-between md:hidden py-2">
                            <span className="font-normal tracking-wide text-subheading">{item.brand}</span>
                            <span className="text-sm opacity-70">{item.year}</span>
                          </div>
                          <div className="text-sm text-desc md:hidden pb-3">
                            {item.industry}
                          </div>

                          {/* Desktop */}
                          <div className="hidden md:grid grid-cols-3 py-1 font-body text-xs uppercase font-regular leading-[1.9] tracking-[1.5px] opacity-50">
                            <span>{item.brand}</span>
                            <span>{item.industry}</span>
                            <span className="text-right">{item.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {visibleData.map((item, index) => (
                  <div
                    key={`${item.brand}-${index}`}
                    className="border-b border-desc md:border-none"
                  >
                    {/* Mobile */}
                    <div className="flex items-center justify-between md:hidden py-2">
                      <span className="font-normal tracking-wide text-subheading">{item.brand}</span>
                      <span className="text-sm opacity-70">{item.year}</span>
                    </div>
                    <div className="text-sm text-desc md:hidden pb-3">
                      {item.industry}
                    </div>

                    {/* Desktop */}
                    <div
                      className="brand-hover hidden cursor-default grid-cols-3 gap-0 py-1 font-body text-xs uppercase font-regular leading-[1.9] tracking-[1.5px] opacity-50 transition-opacity duration-300 hover:opacity-100 hover:font-semibold md:grid"
                      data-index={index}
                      onMouseEnter={() => handleBrandEnter(index)}
                      onMouseLeave={() => handleBrandLeave(index)}
                    >
                      <span>{item.brand}</span>
                      <span>{item.industry}</span>
                      <span className="text-right">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* See more / less */}
        {filteredRows.length > 20 && (
          <Button
            title={showAll ? "SEE LESS" : "SEE MORE"}
            onClick={() => setShowAll(!showAll)}
          />
        )}
      </div>
    </section>
  );
};

export default BrandsIndex;