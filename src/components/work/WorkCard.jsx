"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const WorkCard = ({ slug, title, image, video, enableFlipTransition = false }) => {
  const router = useRouter();
  const cardRef = useRef(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const href = `/work/${slug}`;

  const handleClick = (e) => {
    if (!enableFlipTransition) return;

    // Let default browser behavior work for new-tab / modified clicks.
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    // Only run the fullscreen Flip on lg+ screens.
    // On smaller screens, keep default link navigation.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }

    e.preventDefault();
    if (isExpanding) return;

    const el = cardRef.current;
    if (!el) {
      router.push(href);
      return;
    }

    const navEl = document.getElementById("site-nav");
    if (navEl) {
      gsap.to(navEl, {
        opacity: 0,
        y: -30,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
        pointerEvents: "none",
      });
    }

    gsap.set(el, { transformOrigin: "50% 50%" });
    const state = Flip.getState(el);
    flushSync(() => setIsExpanding(true));

    Flip.from(state, {
      duration: 0.8,
      ease: "power3.inOut",
      absolute: true,
      transformOrigin: "50% 50%",
      onComplete: () => router.push(href),
    });
  };

  if (!enableFlipTransition) {
    return (
      <Link
        href={href}
        className="work-card relative group block w-full min-w-0 md:w-full lg:w-[400px]"
        title={title}
        aria-label={title}
      >
        <div className="absolute left-0 overflow-hidden z-10 top-2 md:-top-8">
          <span className="inline-block origin-left translate-y-full rotate-10 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-white text-sm md:text-base tracking-wide">
            {title}
          </span>
        </div>

        <div className="relative w-full aspect-square overflow-hidden bg-neutral-900">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <Image
            width={1000}
            height={1000}
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      onClick={handleClick}
      className={`work-card block min-w-0 ${
        isExpanding
          ? "fixed inset-0 z-999 w-screen h-screen bg-neutral-900"
          : "group relative w-full md:w-full lg:w-[400px]"
      }`}
      title={title}
      aria-label={title}
    >
      <div className="absolute left-0 overflow-hidden z-10 top-2 md:-top-8">
        <span className="inline-block origin-left translate-y-full rotate-10 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-white text-sm md:text-base tracking-wide">
          {title}
        </span>
      </div>

      <div
        className={`relative w-full overflow-hidden bg-neutral-900 ${
          isExpanding ? "h-full" : "aspect-square"
        }`}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <Image
          width={1000}
          height={1000}
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
      </div>
    </Link>
  );
};

export default WorkCard;