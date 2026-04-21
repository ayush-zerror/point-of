"use client";

import React from "react";
import { Spiral as Hamburger } from "hamburger-react";

export default function WorkFilterPanel({
  filterOverlayRef,
  filterPanelRef,
  isFilterOpen,
  setIsFilterOpen,
  filterOptions,
  activeFilters,
  toggleFilterItem,
  viewCount,
  onApply,
  onReset,
}) {
  return (
    <div
      ref={filterOverlayRef}
      className="w-full h-screen flex items-end opacity-0 pointer-events-none bg-background/30 backdrop-blur-xs absolute top-0 left-0 z-40"
    >
      <div
        ref={filterPanelRef}
        className="w-full h-1/2 relative bg-background will-change-transform"
      >
        <div className="h-full w-full px-8 sm:px-12 lg:px-20 py-8 text-white">
          <div className="absolute top-4 right-6 sm:right-10 lg:right-14">
            <Hamburger
              size={20}
              toggled={isFilterOpen}
              toggle={setIsFilterOpen}
              label="Close filter"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
            <div className="text-heading text-sm tracking-wide">Filter by:</div>

            <div>
              <div className="text-desc text-xs tracking-wide mb-4">Services</div>
              <ul className="filter-ul space-y-2 text-sm text-heading">
                {filterOptions.services.map((label) => (
                  <li
                    key={label}
                    className={`hover:text-white cursor-pointer w-fit ${
                      activeFilters.services.has(label) ? "active" : ""
                    }`}
                    onClick={() => toggleFilterItem("services", label)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleFilterItem("services", label);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-desc text-xs tracking-wide mb-4">Industry</div>
              <ul className="filter-ul space-y-2 text-sm text-heading">
                {filterOptions.industry.map((label) => (
                  <li
                    key={label}
                    className={`hover:text-white cursor-pointer w-fit ${
                      activeFilters.industry.has(label) ? "active" : ""
                    }`}
                    onClick={() => toggleFilterItem("industry", label)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleFilterItem("industry", label);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-desc text-xs tracking-wide mb-4">Year</div>
              <ul className="filter-ul space-y-2 text-sm text-heading">
                {filterOptions.year.map((label) => (
                  <li
                    key={label}
                    className={`hover:text-white cursor-pointer w-fit ${
                      activeFilters.year.has(label) ? "active" : ""
                    }`}
                    onClick={() => toggleFilterItem("year", label)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleFilterItem("year", label);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 sm:left-12 lg:left-16 right-8 sm:right-12 lg:right-16 flex items-center justify-between">
            <button
              type="button"
              className="heading-md text-heading transition-colors cursor-pointer"
              onClick={onApply}
            >
              View {viewCount} projects →
            </button>
            <button
              type="button"
              className="heading-md text-heading transition-colors cursor-pointer"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

