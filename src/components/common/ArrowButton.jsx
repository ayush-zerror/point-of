"use client";
import React from "react";

const isHexColor = (v) => typeof v === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);

const ArrowButton = ({ title, onClick, color = "#c0bfbf", className, link }) => {
  const handleClick = (event) => {
    if (typeof onClick === "function") onClick(event);
    if (link) window.open(link, "_blank");
  };

  const useInline = isHexColor(color);
  const textStyle = useInline ? { color } : undefined;
  const iconStyle = useInline ? { color } : undefined;

  return (
    <div className={`mt-6 md:mt-10 z-20 relative ${className ?? ""}`}>
      <button
        onClick={handleClick}
        className="cursor-pointer group flex mb-1 items-center gap-1.5 md:gap-2 font-semibold tracking-wide uppercase touch-manipulation"
      >
        {/* Diagonal arrow (swap on hover) */}
        <span
          aria-hidden="true"
          className="relative inline-flex w-4 h-4 md:w-5 md:h-5 items-center justify-center overflow-hidden flex-shrink-0"
          style={iconStyle}
        >
          {/* current arrow → moves to top-right */}
          <svg
            className={`absolute w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 ${
              useInline ? "" : `text-${color}`
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M10 7h7v7" />
          </svg>

          {/* incoming arrow ← comes from bottom-left */}
          <svg
            className={`absolute w-4 h-4 md:w-5 md:h-5 -translate-x-8 translate-y-8 transition-transform duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 ${
              useInline ? "" : `text-${color}`
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M10 7h7v7" />
          </svg>
        </span>

        {/* Text */}
        <span
          style={textStyle}
          className={`relative uppercase whitespace-nowrap text-[11px] md:text-sm ${
            useInline ? "" : `text-${color}`
          }`}
        >
          {title}
        </span>
      </button>
    </div>
  );
};

export default ArrowButton;