"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  RiPauseMiniFill,
  RiPlayMiniFill,
} from "@remixicon/react";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoElRef = useRef(null);
  const overlayRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Volume Icon
  const Icon = useMemo(() => {
    const common = {
      className: "w-4 h-4 sm:w-[17px] sm:h-[17px]",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    };

    if (isMuted) {
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M11 5L6 9H3V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M16 9L21 14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M21 9L16 14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 8.5C17.1569 9.48528 18.25 10.9132 18.25 12C18.25 13.0868 17.1569 14.5147 15.5 15.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }, [isMuted]);

  // Scroll Animation
  useGSAP(() => {
    if (!sectionRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // MOBILE INITIAL SCALE
      if (isMobile) {
        gsap.set(videoWrapRef.current, {
          transform:
            "translate(-50%,-50%) scale(4.5) rotateY(0deg) rotateX(0deg)",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -250%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // MOBILE ANIMATION
      if (isMobile) {
        tl.to(videoWrapRef.current, {
          transform:
            "translate(-50%,-50%) scale(0.9) rotateY(0deg) rotateX(0deg)",
          duration: 2,
          ease: "power3.out",
        })
          .to(overlayRef.current, {
            top: "-300%",
            duration: 4,
          })
          .to(videoWrapRef.current, {
            transform:
              "translate(-50%,-50%) scale(4.5) rotateY(-20deg) rotateX(-2deg)",
            duration: 1.5,
          })
          .to(videoWrapRef.current, {
            transform: "translate(-50%,-50%) scale(4.5)",
            duration: 1.5,
          })
      }

      // DESKTOP ANIMATION
      else {
        tl.to(videoWrapRef.current, {
          transform:
            "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
          duration: 1.5,
        })
          .to(videoWrapRef.current, {
            transform:
              "translate(-50%,-50%) scale(.5) rotateY(20deg) rotateX(2deg)",
            duration: 1.5,
          })
          .to(overlayRef.current, {
            top: "-300%",
            duration: 4,
          })
          .to(videoWrapRef.current, {
            transform:
              "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
            duration: 1.5,
          })
          .to(videoWrapRef.current, {
            transform: "translate(-50%,-50%)",
            duration: 1.5,
          });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (videoElRef.current) {
      videoElRef.current.muted = nextMuted;
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoElRef.current) return;

    if (videoElRef.current.paused) {
      videoElRef.current.play();
      setPlaying(true);
    } else {
      videoElRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>


      {/* SHOWREEL SECTION */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-secondary"
        style={{ perspective: "4000px" }}
      >
        {/* FIXED CONTROLS */}
        <div className="absolute right-4 bottom-4 z-[999] sm:right-6 sm:bottom-6 md:right-8 md:bottom-8">
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="group flex h-11 items-center gap-2 rounded-full border border-white/15 bg-black/70 px-2.5 pr-3.5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-black/60 sm:h-12 sm:gap-2.5 sm:px-3 sm:pr-4"
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
              onClick={toggleMute}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:bg-black/60 sm:h-12 sm:w-12"
            >
              {Icon}
            </button>
          </div>
        </div>
        {/* VIDEO */}
        <div
          ref={videoWrapRef}
          className="aspect-video h-auto w-full overflow-hidden md:h-full md:aspect-auto"
          style={{
            transformOrigin: "center center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform:
              "translate(-50%,-50%) scale(1) rotateY(0deg) rotateX(0deg)",
          }}
        >
          <video
            ref={videoElRef}
            src="/home/showreel.mp4"
            className="h-auto w-full object-cover md:h-full"
            muted={isMuted}
            loop
            playsInline
            autoPlay
          />


        </div>

        {/* OVERLAY PANELS */}
        <div
          ref={overlayRef}
          className="absolute left-0 top-full h-[300vh] w-full"
        >
          {/* PANEL 1 */}
          <div className="relative flex h-screen items-center justify-center">
            <Image
              src="https://www.wearepointof.com/home/sticker1.png"
              alt="sticker"
              width={200}
              height={200}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
              className="absolute top-6 left-4 h-auto w-24 rotate-[-10deg] sm:top-10 sm:left-8 sm:w-32 md:w-40 lg:left-10 lg:w-48"
            />

            <Image
              src="https://www.wearepointof.com/home/sticker2.png"
              alt="sticker"
              width={200}
              height={200}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
              className="absolute right-4 bottom-6 h-auto w-24 rotate-10 sm:right-8 sm:bottom-10 sm:w-32 md:w-40 lg:right-10 lg:w-48"
            />
          </div>

          {/* PANEL 2 */}
          <div className="relative flex h-screen items-center justify-center">
            <Image
              src="https://www.wearepointof.com/home/sticker3.png"
              alt="sticker"
              width={200}
              height={200}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
              className="absolute top-6 left-4 h-auto w-24 -rotate-6 sm:top-10 sm:left-16 sm:w-32 md:w-40 lg:left-28 lg:w-48"
            />

            <Image
              src="https://www.wearepointof.com/home/sticker4.png"
              alt="sticker"
              width={200}
              height={200}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
              className="absolute right-4 bottom-6 h-auto w-24 rotate-[8deg] sm:right-8 sm:bottom-10 sm:w-32 md:w-40 lg:right-10 lg:w-48"
            />
          </div>

          {/* PANEL 3 */}
          <div className="relative flex h-screen items-center justify-center">
            <Image
              src="https://www.wearepointof.com/home/sticker5.png"
              alt="sticker"
              width={200}
              height={200}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
              className="absolute top-6 left-4 h-auto w-24 -rotate-12 sm:top-10 sm:left-8 sm:w-32 md:w-40 lg:left-10 lg:w-48"
            />

            <Image
              src="https://www.wearepointof.com/home/sticker6.png"
              alt="sticker"
              width={200}
              height={200}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
              className="absolute right-4 bottom-6 h-auto w-24 rotate-12 sm:right-8 sm:bottom-10 sm:w-32 md:w-40 lg:right-10 lg:w-48"
            />
          </div>
        </div>
      </section>
    </>
  );
}