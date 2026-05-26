"use client";

import Image from "next/image";
import AssetPlaceholder from "./AssetPlaceholder";

export default function CaseStudyMedia({
  src,
  alt,
  className = "w-full h-full object-cover",
  width = 1000,
  height = 1000,
}) {
  if (!src) {
    return <AssetPlaceholder className={className} />;
  }

  return (
    <Image
      width={width}
      height={height}
      src={src}
      alt={alt}
      className={className}
    />
  );
}
