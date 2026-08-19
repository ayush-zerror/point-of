"use client";

import Image from "next/image";
import { CLIP_HIDDEN_BOTTOM, CLIP_VISIBLE } from "./workClip";

export default function WorkBackgroundSlides({ items, wrapRefs, imgRefs }) {
  return (
    <div className="absolute inset-0 z-0">
      {items.map((project, i) => (
        <div
          key={`bg-wrap-${i}`}
          ref={(el) => { wrapRefs.current[i] = el; }}
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            WebkitClipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            willChange: "clip-path",
            zIndex: i === 0 ? 1 : 0,
          }}
        >
          <Image
            width={1920}
            height={1080}
            src={project.coverImage}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            ref={(el) => { imgRefs.current[i] = el; }}
            style={{
              willChange: "transform, object-position",
              scale: 1,
              objectPosition: "50% 50%",
              filter: "brightness(30%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
