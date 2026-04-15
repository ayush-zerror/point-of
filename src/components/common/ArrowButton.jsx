"use client";
import React from "react";

const isHexColor = (v) => typeof v === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);

const ArrowButton = ({ title, onClick, color = "#c0bfbf", className, link }) => {
  const handleClick = (event) => {
    // Forward the click event to the parent handler (if provided).
    if (typeof onClick === "function") onClick(event);
    if (link) {
      window.open(link, "_blank");
    }
  };

  const useInline = isHexColor(color);
  const textStyle = useInline ? { color } : undefined;
  const iconStyle = useInline ? { color } : undefined;

  return (
    <div className={`mt-10 z-20 relative ${className}`}>
      <button
        onClick={handleClick}
        className="cursor-pointer group flex mb-1 items-center gap-2 text-sm font-semibold tracking-wide uppercase"
      >
        {/* Diagonal arrow (swap on hover) */}
        <span
          aria-hidden="true"
          className="relative inline-flex w-5 h-5 items-center justify-center overflow-hidden"
          style={iconStyle}
        >
          {/* current arrow → moves to top-right (out of box) */}
          <svg
            className={`absolute w-5 h-5 transition-transform duration-200 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 ${
              useInline ? "" : `text-${color}`
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M10 7h7v7"
            />
          </svg>

          {/* incoming arrow ← comes from bottom-left (fully hidden at rest) */}
          <svg
            className={`absolute w-5 h-5 -translate-x-8 translate-y-8 transition-transform duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 ${
              useInline ? "" : `text-${color}`
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M10 7h7v7"
            />
          </svg>
        </span>

        {/* Text (no underline) */}
        <span
          style={textStyle}
          className={`relative uppercase whitespace-nowrap ${useInline ? "" : `text-${color}`}`}
        >
          {title}
        </span>
      </button>
    </div>
  );
};

export default ArrowButton