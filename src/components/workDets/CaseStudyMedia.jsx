"use client";

import Image from "next/image";
import { useState } from "react";
import AssetPlaceholder from "./AssetPlaceholder";
import { IMAGE_PLACEHOLDER_BG } from "./imagePlaceholder";

export default function CaseStudyMedia({
  src,
  alt,
  className = "w-full h-full object-cover",
  width = 1000,
  height = 1000,
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return <AssetPlaceholder className={className} />;
  }

  return (
    <div className={`relative w-full h-full min-h-full overflow-hidden ${IMAGE_PLACEHOLDER_BG}`}>
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        priority={priority}
        onLoadingComplete={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
