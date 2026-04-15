"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import Button from "../common/Button";
import Image from "next/image";

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
      className="w-48 h-48 absolute -top-60 left-[24.5rem] rounded-full"
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
  imgClass = "",
  clockCountry = "",
  clockTimeZone = "",
  showClock = false,
}) => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      {bgImage && (
        <Image
          width={1000}
          height={1000}
          src={bgImage}
          alt="background"
          className={`absolute invert-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover ${imgClass}`}
          priority
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div
          className="
            w-full relative
            pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
            pr-6
            pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-40
          "
        >
          {/* Clock — mounted only when needed */}
          {showClock && (
            <Clock clockCountry={clockCountry} clockTimeZone={clockTimeZone} />
          )}

          <h2 className="heading-xl text-subheading max-w-[90%] sm:max-w-[80%] md:max-w-[700px] lg:max-w-[900px]">
            {title}
          </h2>

          <Button title={btntitle} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;