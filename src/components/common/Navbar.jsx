"use client";

import { useTheme } from "next-themes";
import { Circle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import Image from "next/image";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 nav-gradient text-foreground">
        <div className="relative flex items-center justify-between h-16 px-6">
          {/* LEFT (Theme Toggle) */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full cursor-pointer transition-all duration-300 hover:-rotate-45"
          >
            {isDark ? (
              <RiSunLine className="w-5 h-5  hover:fill-foreground" />
            ) : (
              <RiMoonLine className="w-5 h-5  hover:fill-foreground" />
            )}
          </button>

          {/* CENTER */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo/logo.png"
              alt="logo"
              width={180} // ⬅️ increased
              height={80} // ⬅️ increased
              className="object-contain dark:invert"
              priority
            />
          </div>

          {/* RIGHT */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-full hover:bg-foreground/10 transition"
          >
            <Circle className="w-5 h-5 opacity-80" />
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 z-50 bg-background text-foreground transition-all duration-500 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-foreground/20">
          <div />
          <h1 className="tracking-[0.6em] text-xs md:text-sm font-light uppercase">
            POINT OF
          </h1>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MAIN */}
        <div className="flex flex-col justify-between h-[calc(100%-64px)] px-6 md:px-12 py-10 md:py-16">
          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* LEFT BIG NAV */}
            <div className="space-y-6 md:space-y-8">
              {["Studio", "Work", "Expertise", "Brands", "Connect"].map(
                (item) => (
                  <p
                    key={item}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground/50 hover:text-foreground cursor-pointer transition-all duration-300 hover:translate-x-3"
                  >
                    {item}
                  </p>
                ),
              )}
            </div>

            {/* RIGHT EMAIL */}
            <div className="flex items-start md:items-center justify-end w-full md:w-auto">
              <p className="text-base md:text-lg border-b border-foreground/40 pb-1">
                • think@wearepointof.com
              </p>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="border-t border-foreground/20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* SOCIALS */}
            <div className="flex flex-wrap gap-6 text-sm text-foreground/60">
              {["Instagram", "LinkedIn", "Behance", "Pinterest"].map((item) => (
                <p
                  key={item}
                  className="hover:text-foreground cursor-pointer transition"
                >
                  {item}
                </p>
              ))}
            </div>

            {/* RIGHT LINKS */}
            <div className="flex gap-10 text-sm">
              <p className="flex items-center gap-2 cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                <span className="border-b border-transparent group-hover:border-foreground transition">
                  SHOWREEL
                </span>
              </p>

              <p className="flex items-center gap-2 cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                <span className="border-b border-transparent group-hover:border-foreground transition">
                  CAREER
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
