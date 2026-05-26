"use client";

export default function AssetPlaceholder({ className = "" }) {
  return (
    <div
      className={`w-full h-full min-h-full bg-neutral-800 animate-pulse ${className}`}
      role="img"
      aria-label="Image placeholder"
    />
  );
}
