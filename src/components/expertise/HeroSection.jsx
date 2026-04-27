"use client";
import { RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";
import React, { useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // Track mouse INSIDE section only
  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();

    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Toggle sound
  const toggleSound = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
      <div
      ref={sectionRef}
      className="w-full h-auto lg:h-screen px-6 sm:px-6 md:px-10 lg:px-0 pt-20 sm:pt-24 md:pt-24 lg:pt-0 pb-6 md:pb-10 lg:pb-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/home/showreel.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Custom Cursor (only inside section) */}
      {showCursor && (
        <div
          onClick={toggleSound}
          className="absolute z-50 pointer-events-auto"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-foreground">
            {muted ? (
              <RiVolumeMuteLine className="text-background scale-75" />
            ) : (
              <RiVolumeUpLine className="text-background scale-75" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;