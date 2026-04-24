"use client";
import React from "react";

const isHexColor = (v) => typeof v === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);

const GridButton = ({ title, onClick, color = "#c0bfbf", className, textClassName }) => {
  const handleClick = (event) => {
    if (typeof onClick === "function") onClick(event);
  };

  const useInline = isHexColor(color);
  const iconStyle = useInline ? { color } : undefined;
  const textStyle = useInline ? { color } : undefined;

  const inner = (
    <>
      {/* Icon + ring */}
      <span
        style={iconStyle}
        className={`relative flex items-center justify-center w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0 ${
          useInline ? "" : `text-${color}`
        }`}
      >
        <span
          className={`absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            useInline ? "" : `border-${color}`
          }`}
          style={useInline ? { borderColor: color } : undefined}
        />
        <svg
          viewBox="0 0 9 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-2.5 h-2.5 md:w-3 md:h-3 transition-opacity duration-300 group-hover:opacity-0"
        >
          <g>
            <path d="M0.296875 5.73439C0.494792 5.53972 0.729167 5.44238 1 5.44238C1.27083 5.44238 1.50521 5.53972 1.70313 5.73439C1.90104 5.92906 2 6.1596 2 6.42599C2 6.67189 1.90104 6.8973 1.70313 7.10222C1.50521 7.30714 1.27604 7.4096 1.01563 7.4096C0.744792 7.4096 0.505208 7.31226 0.296875 7.11759C0.0989582 6.92292 -5.55499e-08 6.69238 -4.37114e-08 6.42599C-3.18729e-08 6.1596 0.0989585 5.92906 0.296875 5.73439Z" fill="currentColor" />
            <path d="M0.296875 11.2918C0.494792 11.0971 0.729167 10.9998 1 10.9998C1.27083 10.9998 1.50521 11.0971 1.70313 11.2918C1.90104 11.4864 2 11.717 2 11.9834C2 12.2293 1.90104 12.4547 1.70313 12.6596C1.50521 12.8645 1.27604 12.967 1.01563 12.967C0.744792 12.967 0.505208 12.8696 0.296875 12.675C0.0989582 12.4803 -5.55499e-08 12.2498 -4.37114e-08 11.9834C-3.18729e-08 11.717 0.0989585 11.4864 0.296875 11.2918Z" fill="currentColor" />
            <path d="M0.296875 0.291764C0.494792 0.097092 0.729167 -0.000244198 1 -0.000244184C1.27083 -0.000244169 1.50521 0.097092 1.70313 0.291764C1.90104 0.486437 2 0.716969 2 0.983363C2 1.22926 1.90104 1.45467 1.70313 1.65959C1.50521 1.86451 1.27604 1.96697 1.01563 1.96697C0.744792 1.96697 0.505208 1.86963 0.296875 1.67496C0.0989582 1.48029 -5.55499e-08 1.24976 -4.37114e-08 0.983363C-3.18729e-08 0.716969 0.0989585 0.486436 0.296875 0.291764Z" fill="currentColor" />
            <path d="M7.29688 5.73439C7.49479 5.53972 7.72917 5.44238 8 5.44238C8.27083 5.44238 8.50521 5.53972 8.70313 5.73439C8.90104 5.92906 9 6.1596 9 6.42599C9 6.67189 8.90104 6.8973 8.70313 7.10222C8.50521 7.30714 8.27604 7.4096 8.01563 7.4096C7.74479 7.4096 7.50521 7.31226 7.29687 7.11759C7.09896 6.92292 7 6.69238 7 6.42599C7 6.1596 7.09896 5.92906 7.29688 5.73439Z" fill="currentColor" />
            <path d="M7.29688 11.2918C7.49479 11.0971 7.72917 10.9998 8 10.9998C8.27083 10.9998 8.50521 11.0971 8.70313 11.2918C8.90104 11.4864 9 11.717 9 11.9834C9 12.2293 8.90104 12.4547 8.70313 12.6596C8.50521 12.8645 8.27604 12.967 8.01563 12.967C7.74479 12.967 7.50521 12.8696 7.29687 12.675C7.09896 12.4803 7 12.2498 7 11.9834C7 11.717 7.09896 11.4864 7.29688 11.2918Z" fill="currentColor" />
            <path d="M7.29688 0.291764C7.49479 0.097092 7.72917 -0.000244198 8 -0.000244184C8.27083 -0.000244169 8.50521 0.097092 8.70313 0.291764C8.90104 0.486437 9 0.716969 9 0.983363C9 1.22926 8.90104 1.45467 8.70313 1.65959C8.50521 1.86451 8.27604 1.96697 8.01563 1.96697C7.74479 1.96697 7.50521 1.86963 7.29687 1.67496C7.09896 1.48029 7 1.24976 7 0.983363C7 0.716969 7.09896 0.486436 7.29688 0.291764Z" fill="currentColor" />
          </g>
        </svg>
      </span>

      {/* Text */}
      <span
        style={textStyle}
        className={`relative uppercase whitespace-nowrap text-[11px] md:text-sm ${
          useInline ? "" : `text-${color}`
        } ${textClassName ?? ""}`}
      >
        {title}
      </span>
    </>
  );

  return (
    <div className={`mt-6 md:mt-10 z-20 relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer group flex mb-1 items-center gap-1.5 md:gap-2 font-semibold tracking-wide uppercase touch-manipulation"
      >
        {inner}
      </button>
    </div>
  );
};

export default GridButton;