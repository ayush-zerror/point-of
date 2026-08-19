"use client";

import Image from "next/image";
import Link from "next/link";
import GridButton from "../common/GridButton";
import { CLIP_HIDDEN_TOP, CLIP_VISIBLE } from "./workClip";

const pad2 = (n) => String(n).padStart(2, "0");

export default function WorkCenterForeground({
  items,
  wrapperRef,
  slideRefs,
  imgRefs,
  counterRefs,
  activeIndex,
  expandingIndex,
  isGridOpen,
  onCenterCardClick,
  onToggleGrid,
}) {
  return (
    <div
      ref={wrapperRef}
      className={`min-w-[300px] md:min-w-[350px] lg:min-w-[270px] xl:min-w-[400px] aspect-square z-20 transition-opacity duration-300 ${
        isGridOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${
        expandingIndex !== null
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999 w-screen h-screen bg-neutral-900"
          : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      }`}
    >
      <div id="center-foreground" className="w-full h-full overflow-hidden">
        {items.map((project, i) => (
          <Link
            key={`ctr-${i}`}
            href={`/work/${project.slug}`}
            ref={(el) => { slideRefs.current[i] = el; }}
            onClick={(e) => onCenterCardClick(e, i, project.slug)}
            className={`absolute inset-0 block overflow-hidden ${
              expandingIndex !== null
                ? "pointer-events-none"
                : `group ${i === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`
            }`}
            aria-label={`Open ${project.name}`}
            title={`Open ${project.name}`}
            style={{
              clipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
              WebkitClipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
              willChange: "clip-path",
              zIndex: i === 0 ? 1 : 0,
            }}
          >
            <Image
              width={1000}
              height={1000}
              ref={(el) => { imgRefs.current[i] = el; }}
              src={project.coverImage}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                willChange: "transform, object-position",
                scale: 1,
                objectPosition: "50% 50%",
              }}
            />
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <video src={project.microanimation} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </Link>
        ))}
      </div>

      <div
        className={`w-full flex items-center justify-between absolute top-full pt-4 left-0 transition-opacity duration-300 ${isGridOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <GridButton title={"GRID VIEW"} onClick={onToggleGrid} className={"mt-0!"} />
        <div className="z-30 flex items-center gap-2 pointer-events-none">
          <div className="relative h-3.5 overflow-hidden min-w-8">
            {items.map((_, i) => (
              <span
                key={`cnt-${i}`}
                ref={(el) => { counterRefs.current[i] = el; }}
                className="absolute right-0 text-white text-sm font-heading font-extralight tracking-[0.3px] leading-none tabular-nums"
                style={{ top: i === 0 ? "0%" : "100%", opacity: i === 0 ? 0.7 : 0, willChange: "top, opacity" }}
              >
                {pad2(i + 1)}
              </span>
            ))}
          </div>
          <span className="text-white/40 text-sm font-heading font-extralight tracking-[0.3px] leading-[1.2] tabular-nums">
            / {pad2(items.length)}
          </span>
        </div>
      </div>
    </div>
  );
}
