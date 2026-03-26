"use client";
import React from "react";

const Showreel = () => {
  return (
    <section className="relative w-full h-screen  overflow-hidden">
      <video
        src="/home/showreel.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        autoPlay
      />
    </section>
  );
};

export default Showreel;
