"use client";

import { IMAGE_PLACEHOLDER_BG } from "./imagePlaceholder";

export default function AssetPlaceholder({
  className = "",
  wrapperClassName = "w-full h-full min-h-full",
}) {
  return (
    <div
      className={`${IMAGE_PLACEHOLDER_BG} ${wrapperClassName} ${className}`}
      role="img"
      aria-label="Image placeholder"
    />
  );
}
