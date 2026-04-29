"use client";
import React, { useEffect, useRef } from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
const CTASection = ({
  heading = (
    <>
      Got a project in mind?
      <br />
      Learn how we can help.
    </>
  ),
  buttonTitle = "LET’S TALK",
  graphic = false,
} = {}) => {
  const router = useRouter();
  const graphicRef = useRef(null);

  useEffect(() => {
    if (!graphic) return;
    if (typeof window === "undefined") return;
    // Desktop-only to avoid touch jank.
    if (window.innerWidth < 1024) return;

    const el = graphicRef.current;
    if (!el) return;

    let raf = 0;
    let latest = { x: 0, y: 0 };

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy; // -1..1

      // Small offsets for subtle parallax.
      latest = { x: dx * 14, y: dy * 14 };
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translate3d(${latest.x}px, ${latest.y}px, 0)`;
      });
    };

    const reset = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      el.style.transform = "translate3d(0px, 0px, 0)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", reset);
      reset();
    };
  }, [graphic]);

  const handleButtonClick = () => {
    router.push("/connect");
  }
  return (
    <section
      className="w-full bg-background relative min-h-[50vh] flex items-center justify-center px-6 
      "
    >
      <div className="text-center flex flex-col items-center">
        {/* HEADING */}
        <p className="heading-xl text-desc [&_br]:hidden sm:[&_br]:block">{heading}</p>
        {/* CTA */}
        <Button title={buttonTitle} onClick={handleButtonClick} />
        {graphic && (
        <Image
          ref={graphicRef}
          src="/expertise/graphic_expertise.webp"
          alt="graphic_expertise"
          width={1000}
          height={1000}
          className="w-26 h-26 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mt-12 sm:mt-12 md:mt-16 lg:mt-20 will-change-transform"
        />
        )}
      </div>

    </section>
  );
};

export default CTASection;
