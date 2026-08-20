"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleHashLinkClick } from "@/helper/scrollToHash";

const isHexColor = (v) => typeof v === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);

const isDarkFill = (color) => {
  const c = String(color ?? "").toLowerCase();
  if (c === "black" || c === "#000" || c === "#000000") return true;
  if (!isHexColor(c)) return false;
  const hex = c.replace("#", "");
  const full =
    hex.length === 3
      ? hex.split("").map((ch) => ch + ch).join("")
      : hex.length === 8
        ? hex.slice(0, 6)
        : hex;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.45;
};

const Button = ({ title, onClick, href, color = "#c0bfbf", className, textClassName }) => {
  const router = useRouter();
  const handleClick = (event) => {
    if (typeof onClick === "function") onClick(event);
  };

  const useInline = isHexColor(color);
  const circleStyle = useInline ? { backgroundColor: color } : undefined;
  const textStyle = useInline ? { color } : undefined;
  const underlineStyle = useInline ? { backgroundColor: color } : undefined;
  const arrowOnFillClass = isDarkFill(color) ? "text-foreground" : "text-background";

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
          className={`w-3 h-3 ${arrowOnFillClass} opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>

      {/* Text with animated underline */}
      <span
        style={textStyle}
        className={`relative uppercase whitespace-nowrap text-[11px] md:text-sm ${
          useInline ? "" : `text-${color}`
        } ${textClassName ?? ""}`}
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

  const linkClass =
    "cursor-pointer group flex mb-1 items-center gap-1.5 md:gap-2 font-semibold tracking-wide uppercase touch-manipulation";

  return (
    <div className={`mt-6 md:mt-10 z-20 relative ${className ?? ""}`}>
      {href ? (
        href.startsWith("/") ? (
          <Link
            href={href}
            scroll={!href.includes("#")}
            className={linkClass}
            title={title}
            onClick={(e) => {
              handleHashLinkClick(e, href, {
                onNavigate: (path) => {
                  if (path) router.push(path);
                },
              });
            }}
          >
            {inner}
          </Link>
        ) : (
          <a href={href} className={linkClass} title={title}>
            {inner}
          </a>
        )
      ) : (
        <button onClick={handleClick} className={linkClass}>
          {inner}
        </button>
      )}
    </div>
  );
};

export default Button;