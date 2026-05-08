"use client";

import {
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "@remixicon/react";
import React, { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Toggle Sound
  const toggleSound = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      setMuted(videoRef.current.muted);
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden px-4 pt-20 pb-4 sm:px-6 sm:pt-24 sm:pb-6 md:px-10 md:pt-24 md:pb-8 lg:h-screen lg:px-0 lg:pt-0 lg:pb-0">
      
      {/* Video Wrapper */}
      <div className="relative overflow-hidden lg:h-full">
        
        {/* Video */}
        <video
          ref={videoRef}
          src="/home/showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full object-cover lg:h-full"
        />



        {/* Bottom Controls */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-end p-4 sm:p-4 md:p-4 md:py-4 lg:p-6 lg:py-6">
          
          {/* Controls Wrapper */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="group flex h-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/70 px-2.5 pr-3.5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-black/60 sm:h-12 sm:gap-2.5 sm:px-3 sm:pr-4"
            >
              {/* Icon */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-105 sm:h-8 sm:w-8">
                {playing ? (
                  <RiPauseMiniFill className="size-3.5 sm:size-4" />
                ) : (
                  <RiPlayMiniFill className="size-3.5 sm:size-4" />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col items-start leading-none">
                <span className="text-[7px] uppercase tracking-[0.2em] text-white/45 sm:text-[8px]">
                  Showreel
                </span>

                <span className="mt-1 text-[10px] font-medium tracking-[-0.01em] text-white sm:text-xs">
                  {playing ? "Pause video" : "Play video"}
                </span>
              </div>
            </button>

            {/* Sound Button */}
            <button
              onClick={toggleSound}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:bg-black/60 sm:h-12 sm:w-12"
            >
              {muted ? (
                <RiVolumeMuteFill className="size-3.5 sm:size-4" />
              ) : (
                <RiVolumeUpFill className="size-3.5 sm:size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;