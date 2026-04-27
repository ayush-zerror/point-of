"use client";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {

  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoElRef = useRef(null);
  const overlayRef = useRef(null);

  const cursorRef = useRef(null);
  const cursorXToRef = useRef(null);
  const cursorYToRef = useRef(null);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const Icon = useMemo(() => {
    const common = {
      className: "w-6 h-6",
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

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -250%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(videoWrapRef.current, {
        transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
        duration: 1.5
      })
      .to(videoWrapRef.current, {
        transform: "translate(-50%,-50%) scale(.5) rotateY(-20deg) rotateY(20deg)   rotateX(-2deg) rotateX(2deg)",
        duration: 1.5
      })
      .to(overlayRef.current, {
        top: "-300%",
        duration: 4
      })
      .to(videoWrapRef.current, {
        transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
        duration: 1.5
      })
      .to(videoWrapRef.current, {
        transform: "translate(-50%,-50%)",
        duration: 1.5
      })
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useGSAP(
    () => {
      if (!cursorRef.current) return;

      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

      cursorXToRef.current = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.18,
        ease: "power3.out",
      });
      cursorYToRef.current = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.18,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  const syncMuted = (nextMuted) => {
    setIsMuted(nextMuted);
    if (videoElRef.current) videoElRef.current.muted = nextMuted;
  };

  const handleMouseMove = (e) => {
    if (!sectionRef.current || !cursorRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorXToRef.current?.(x);
    cursorYToRef.current?.(y);
  };

  const toggleMute = () => {
    syncMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-secondary"
      onMouseEnter={() => setIsCursorVisible(true)}
      onMouseLeave={() => setIsCursorVisible(false)}
      onMouseMove={handleMouseMove}

      style={{ perspective: "4000px" }}
    >

      {/* CURSOR MUTE TOGGLE */}
      <div
        ref={cursorRef}
        className={[
          "hidden md:grid pointer-events-auto cursor-pointer select-none absolute left-0 top-0 z-50",
          "grid place-items-center rounded-full",
          "bg-black/60 text-white backdrop-blur-md",
          "h-16 w-16 border border-white/15",
          "transition-opacity duration-150",
          isCursorVisible ? "opacity-100" : "opacity-0",
        ].join(" ")}
        role="button"
        tabIndex={0}
        aria-label={isMuted ? "Unmute showreel" : "Mute showreel"}
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMute();
          }
        }}
      >
        {Icon}
      </div>

      {/* MOBILE MUTE BUTTON */}
      <button
        type="button"
        className={[
          "md:hidden absolute bottom-6 right-6 z-50",
          "h-10 w-10 rounded-full grid place-items-center",
          "bg-black/60 text-white backdrop-blur-md",
          "border border-white/15 active:scale-95 transition-transform",
          "[&>svg]:w-5 [&>svg]:h-5",
        ].join(" ")}
        aria-label={isMuted ? "Unmute showreel" : "Mute showreel"}
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
      >
        {Icon}
      </button>

      {/* VIDEO */}
      <div
        ref={videoWrapRef}
        
        className="w-full overflow-hidden h-auto md:h-full aspect-video md:aspect-auto"
        style={{  transformOrigin: "center center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) scale(1) rotateY(0deg) rotateX(0deg)" }}
      >
        <video
          ref={videoElRef}
          src="/home/showreel.mp4"
          className="w-full h-auto md:h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
        />
      </div>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute left-0 top-full w-full h-[300vh]"
      >

        {/* PANEL 1 */}
        <div className="relative h-screen flex items-center justify-center">
          <Image
            src="https://www.wearepointof.com/home/sticker1.png"
            alt="sticker"
            width={200}
            height={200}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
            className="absolute top-6 left-4 sm:top-10 sm:left-8 lg:left-10 rotate-[-10deg] w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />

          <Image
            src="https://www.wearepointof.com/home/sticker2.png"
            alt="sticker"
            width={200}
            height={200}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
            className="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 lg:right-10 rotate-10 w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />
        </div>

        {/* PANEL 2 */}
        <div className="relative h-screen flex items-center justify-center">
          <Image
            src="https://www.wearepointof.com/home/sticker3.png"
            alt="sticker"
            width={200}
            height={200}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
            className="absolute top-6 left-4 sm:top-10 sm:left-16 lg:left-28 -rotate-6 w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />

          <Image
            src="https://www.wearepointof.com/home/sticker4.png"
            alt="sticker"
            width={200}
            height={200}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
            className="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 lg:right-10 rotate-[8deg] w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />
        </div>

        {/* PANEL 3 */}
        <div className="relative h-screen flex items-center justify-center">
          <Image
            src="https://www.wearepointof.com/home/sticker5.png"
            alt="sticker"
            width={200}
            height={200}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
            className="absolute top-6 left-4 sm:top-10 sm:left-8 lg:left-10 -rotate-12 w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />

          <Image
            src="https://www.wearepointof.com/home/sticker6.png"
            alt="sticker"
            width={200}
            height={200}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 200px"
            className="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 lg:right-10 rotate-12 w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />
        </div>

      </div>

    </section>
  );
}