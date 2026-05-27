"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AssetPlaceholder from "./AssetPlaceholder";
import { IMAGE_PLACEHOLDER_BG } from "./imagePlaceholder";

export default function CaseStudyMedia({
  src,
  alt,
  className = "w-full h-full object-cover",
  wrapperClassName = "w-full h-full min-h-full",
  width = 1000,
  height = 1000,
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  if (!src) {
    return (
      <AssetPlaceholder className={className} wrapperClassName={wrapperClassName} />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${IMAGE_PLACEHOLDER_BG} ${wrapperClassName}`}
    >
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        priority={priority}
        onLoad={(e) => {
          if (e.currentTarget.complete) setLoaded(true);
        }}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
