"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [sortDir, setSortDir] = useState("asc"); // year default: chronological
  const [viewMode, setViewMode] = useState("list"); // list | year | industry
  const showcaseRef = useRef(null);
  const defaultSortRef = useRef({ sortKey: "year", sortDir: "asc" });

  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [industryOpen, setIndustryOpen] = useState(false);
  const industryDropdownRef = useRef(null);
  const industries = useMemo(() => {
    const set = new Set(
      rows.map((r) => String(r.industry ?? "").trim() || "Other")
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!industryDropdownRef.current?.contains(event.target)) {
        setIndustryOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIndustryOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const sortedRows = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const copy = [...rows];

    copy.sort((a, b) => {
      // Chronological by year is always primary (as requested).
      const byYear = (Number(a.year) - Number(b.year)) * dir;
      if (byYear !== 0) return byYear;

      // Secondary ordering depends on the selected key.
      if (sortKey === "brand") {
        return String(a.brand).localeCompare(String(b.brand)) * dir;
      }

      if (sortKey === "industry") {
        return String(a.industry).localeCompare(String(b.industry)) * dir;
      }

      // sortKey === "year": keep it stable by brand name
      return String(a.brand).localeCompare(String(b.brand)) * dir;
    });

    return copy;
  }, [sortDir, sortKey]);

  const filteredRows = useMemo(() => {
    if (!selectedIndustry || selectedIndustry === "All") return sortedRows;
    return sortedRows.filter((r) => {
      const ind = String(r.industry ?? "").trim() || "Other";
      return ind === selectedIndustry;
    });
  }, [selectedIndustry, sortedRows]);

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
      .sort((a, b) => Number(a) - Number(b)); // chronological

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
      items: (map.get(industry) ?? []).slice().sort((a, b) => Number(a.year) - Number(b.year)),
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
    <section className="w-full py-16 md:py-24 px-6 sm:px-10 md:px-12 lg:px-20">
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

          {/* Industry filter (single-select) */}
          <div
            ref={industryDropdownRef}
            className="relative w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => setIndustryOpen((prev) => !prev)}
              className="group flex w-full cursor-pointer sm:w-[260px] items-center justify-between gap-6 border-b border-desc/60 pb-2 text-left tracking-[1.5px] text-xs font-heading text-subheading transition-colors hover:text-heading"
              aria-haspopup="listbox"
              aria-expanded={industryOpen}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="text-desc whitespace-nowrap para">Industry :</span>
                <span className="truncate text-heading para">
                  {selectedIndustry === "All" ? "All industries" : selectedIndustry}
                </span>
              </span>

              <motion.span
                animate={{ rotate: industryOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 text-heading"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4.5L6 8L10 4.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence>
              {industryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full z-30 mt-3 w-full sm:w-[260px] border border-desc/40 bg-background/95 backdrop-blur-sm"
                >
                  <ul className="max-h-72 overflow-y-auto py-3" data-lenis-prevent>
                    {["All", ...industries].map((ind) => {
                      const isActive = selectedIndustry === ind;
                      const label = ind === "All" ? "All industries" : ind;

                      return (
                        <li key={ind}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedIndustry(ind);
                              setIndustryOpen(false);
                              setViewMode("list");
                              setSortKey("year");
                              setSortDir("asc");
                              setShowAll(false);
                            }}
                            className={`w-full px-4 py-2 text-left cursor-pointer  para transition-colors ${
                              isActive
                                ? "text-heading"
                                : "text-subheading hover:text-heading"
                            }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span
                                className={`h-1 w-1 rounded-full ${
                                  isActive ? "bg-heading opacity-100" : "bg-heading opacity-0"
                                }`}
                              />
                              {label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
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
                setSortDir("asc");
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