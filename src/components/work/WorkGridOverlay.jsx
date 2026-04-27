"use client";

import React from "react";
import GridButton from "../common/GridButton";
import WorkCard from "./WorkCard";

export default function WorkGridOverlay({
  gridListRef,
  toggleGridList,
  toggleFilter,
  projects,
}) {
  console.log(projects);
  const col3Map = ["lg:justify-start", "lg:justify-center", "lg:justify-end"];
  const col2Map = ["md:justify-start", "md:justify-end"];
  return (
    <div
      id="grid-list"
      ref={gridListRef}
      className="w-full h-full bg-background absolute top-0 left-0 z-30 overflow-y-auto"
      style={{
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        WebkitClipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        willChange: "clip-path",
      }}
      data-lenis-prevent
    >
      <div className="w-full flex items-center justify-between fixed bottom-0 left-0 z-30 px-6 sm:px-10 md:px-20 pb-6 sm:pb-10 md:pb-10">
        <GridButton title={"GALLERY VIEW"} onClick={toggleGridList} className={"mt-0!"} />
        <GridButton title={"FILTER"} onClick={toggleFilter} className={"mt-0!"} />
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 sm:px-10 md:px-20 pt-20 sm:pt-24 md:pt-0 pb-24 sm:pb-28 md:pb-0">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className={`w-full h-auto py-10 sm:py-14 md:h-screen md:py-0 flex items-center justify-center ${col2Map[index % 2]} ${col3Map[index % 3]}`}
          >
            <WorkCard
              slug={project.slug}
              title={project.name}
              image={project.coverImage}
              video={project.microanimation}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

