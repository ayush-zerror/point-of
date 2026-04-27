"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../common/Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── tiny sub-component so clock state is isolated ─── */
const Clock = ({ clockCountry, clockTimeZone }) => {
  const [country, setCountry] = useState(clockCountry || "India");
  const [timeZone, setTimeZone] = useState(clockTimeZone || "Asia/Kolkata");
  const [now, setNow] = useState(Date.now);

  /* sync props → state */
  useEffect(() => { setCountry(clockCountry || "India"); }, [clockCountry]);
  useEffect(() => { setTimeZone(clockTimeZone || "Asia/Kolkata"); }, [clockTimeZone]);

  /* geo-IP fallback (only when both props are absent) */
  useEffect(() => {
    if (clockCountry || clockTimeZone) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const { country_name, timezone } = await res.json();
        if (!cancelled) {
          if (country_name) setCountry(country_name);
          if (timezone)     setTimeZone(timezone);
        }
      } catch { /* keep fallback */ }
    })();
    return () => { cancelled = true; };
  }, [clockCountry, clockTimeZone]);

  /* tick every second */
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeText = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(now));
    } catch {
      return new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(now));
    }
  }, [now, timeZone]);

  return (
    <div
      id="clock-container"
      className="absolute -top-60 left-98 h-48 w-48 rounded-full"
    >
      <Image
        src="/contact/clock.png"
        alt="clock"
        width={1000}
        height={1000}
        priority
        className="w-full h-full object-cover spin-slow"
      />
      <div className="w-full h-full rounded-full absolute top-0 left-0 flex flex-col items-center justify-center">
        <span className="uppercase leading-none font-body font-regular text-xs tracking-[1px] text-heading">
          {country}
        </span>
        <span className="uppercase font-body font-regular text-xs tracking-[1px] text-heading">
          {timeText}
        </span>
      </div>
    </div>
  );
};

/* ─── main component ─── */
const HeroSection = ({
  bgImage = "",
  title = "",
  btntitle = "",
  onClick = () => {},
  href = "",
  imgClass = "",
  clockCountry = "",
  clockTimeZone = "",
  showClock = false,
  enableBgParallax = false,
  enableTextParallax = false,
}) => {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const root = rootRef.current;
    const bg = bgRef.current;

    const ctx = gsap.context(() => {
      // Content parallax on scroll (optional)
      if (enableTextParallax && contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 1,
          y: -200,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "top -100%",
            scrub: 0.8,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }

      // Subtle background parallax on mouse move
      if (enableBgParallax && bg) {
        const handleMouseMove = (e) => {
          const pageRect = root.getBoundingClientRect();
          const x = (e.clientX - pageRect.left) / pageRect.width;
          const y = (e.clientY - pageRect.top) / pageRect.height;
          const moveAmount = 20;

          gsap.to(bg, {
            x: -(x * moveAmount),
            y: -(y * moveAmount),
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        root.addEventListener("mousemove", handleMouseMove);
        return () => root.removeEventListener("mousemove", handleMouseMove);
      }
    }, rootRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [bgImage]);

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      {bgImage && (
        <Image
          ref={bgRef}
          width={1000}
          height={1000}
          src={bgImage}
          alt={typeof title === "string" && title.trim() ? title : "Point Of background image"}
          className={`absolute invert-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover object-center ${imgClass}`}
          priority
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center md:items-end">
        <div
          ref={contentRef}
          className="
            w-full relative
            px-6 sm:px-10 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-120
            pr-6
            py-12 sm:py-16 pt-36 sm:pt-40 md:pb-20 lg:pb-28 xl:pb-40 md:pt-0
          "
        >
          {/* Clock — mounted only when needed */}
          {showClock && (
            <Clock clockCountry={clockCountry} clockTimeZone={clockTimeZone} />
          )}

          <h2 className="heading-xl text-subheading max-w-[90%] sm:max-w-[80%] md:max-w-[700px] lg:max-w-[900px] [&_br]:hidden sm:[&_br]:block">
            {title}
          </h2>

          <Button title={btntitle} onClick={onClick} href={href} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;