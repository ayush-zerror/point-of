"use client";
import React from "react";
import Link from "next/link";

const isHexColor = (v) => typeof v === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);

const Button = ({ title, onClick, href, color = "#c0bfbf", className, textClassName }) => {
  const handleClick = (event) => {
    // Forward the click event to the parent handler (if provided).
    if (typeof onClick === "function") onClick(event);
  };

  const useInline = isHexColor(color);
  const circleStyle = useInline ? { backgroundColor: color } : undefined;
  const textStyle = useInline ? { color } : undefined;
  const underlineStyle = useInline ? { backgroundColor: color } : undefined;

  const inner = (
    <>
      {/* Circle */}
      <span
        style={circleStyle}
        className={`relative flex items-center justify-center w-2 h-2 rounded-full transition-all duration-300 group-hover:w-5 group-hover:h-5 ${
          useInline ? "" : `bg-${color}`
        }`}
      >
        {/* Arrow */}
        <svg
          className={`w-3 h-3 ${useInline ? "text-background" : `text-${color === "black" ? "foreground" : "background"}`} opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M13 6l6 6-6 6"
          />
        </svg>
      </span>

      {/* Text with animated underline */}
      <span
        style={textStyle}
        className={`relative uppercase whitespace-nowrap ${useInline ? "" : `text-${color}`} ${textClassName ?? ""}`}
      >
        {title}
        {/* Underline */}
        <span
          style={underlineStyle}
          className={`absolute pointer-events-none right-0 -bottom-1 h-px w-full transition-all duration-300 group-hover:w-0 ${
            useInline ? "" : `bg-${color}`
          }`}
        />
      </span>
    </>
  );

  return (
    <div className={`mt-10 z-20 relative ${className}`}>
      {href ? (
        href.startsWith("/") ? (
          <Link
            href={href}
            className="cursor-pointer group flex mb-1 items-center gap-2 text-sm font-semibold tracking-wide uppercase"
            title={title}
          >
            {inner}
          </Link>
        ) : (
          <a
            href={href}
            className="cursor-pointer group flex mb-1 items-center gap-2 text-sm font-semibold tracking-wide uppercase"
            title={title}
          >
            {inner}
          </a>
        )
      ) : (
        <button
          onClick={handleClick}
          className="cursor-pointer group flex mb-1 items-center gap-2 text-sm font-semibold tracking-wide uppercase"
        >
          {inner}
        </button>
      )}
    </div>
  );
};

export default Button