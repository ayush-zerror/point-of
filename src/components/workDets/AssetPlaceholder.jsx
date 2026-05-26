"use client";

import { IMAGE_PLACEHOLDER_BG } from "./imagePlaceholder";

export default function AssetPlaceholder({ className = "" }) {
  return (
    <div
      className={`w-full h-full min-h-full ${IMAGE_PLACEHOLDER_BG} ${className}`}
      role="img"
      aria-label="Image placeholder"
    />
  );
}
