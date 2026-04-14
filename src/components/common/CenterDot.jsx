"use client";

import { useEffect, useRef } from "react";

export default function CenterDot() {
  const dotRef = useRef(null);

  // Track which "mode" owns the dot right now
  // so the two sections don't fight each other
  const modeRef = useRef("idle"); // "idle" | "ourwork" | "showreel"

  useEffect(() => {
    const handleMerge = (e) => {
      if (!dotRef.current) return;
      const merged = e.detail.merged;

      if (merged) {
        modeRef.current = "ourwork";
        dotRef.current.style.transition =
          "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1)";
        dotRef.current.style.width = "40px";
        dotRef.current.style.height = "40px";
      } else {
        // Only reset to 8px if showreel isn't controlling the dot
        if (modeRef.current === "ourwork") {
          modeRef.current = "idle";
          dotRef.current.style.transition =
            "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1)";
          dotRef.current.style.width = "8px";
          dotRef.current.style.height = "8px";
        }
      }
    };

    const handleScale = (e) => {
      if (!dotRef.current) return;
      const size = e.detail.size;

      if (size <= 8) {
        // Showreel scrolled back to start — hand control back to idle
        modeRef.current = "idle";
        dotRef.current.style.transition =
          "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1)";
        dotRef.current.style.width = "8px";
        dotRef.current.style.height = "8px";
      } else {
        modeRef.current = "showreel";
        // No transition — follows scroll exactly
        dotRef.current.style.transition = "none";
        dotRef.current.style.width = `${size}px`;
        dotRef.current.style.height = `${size}px`;
      }
    };

    window.addEventListener("ourwork:merge", handleMerge);
    window.addEventListener("showreel:scale", handleScale);

    return () => {
      window.removeEventListener("ourwork:merge", handleMerge);
      window.removeEventListener("showreel:scale", handleScale);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "8px",
        height: "8px",
        borderRadius: "9999px",
        pointerEvents: "none",
        zIndex: -1,
        transition:
          "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
      className="bg-secondary opacity-0"
      id="centerDot"
    />
  );
}