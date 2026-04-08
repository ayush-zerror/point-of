"use client";

import { Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navRef = useRef(null);
  const tl = useRef(null);

  // GSAP Setup
  useEffect(() => {
    if (!navRef.current) return;

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(navRef.current, {
        top: "0vh",
        duration: 1.2,
        ease: "expo.inOut",
      })
      .fromTo(
        navRef.current.querySelectorAll(".nav-item"),
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.5"
      );
  }, []);

  // Control animation
  useEffect(() => {
    if (!tl.current) return;

    if (menuOpen) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 text-foreground ${pathname === "/work" ? "" : "nav-gradient"
          }`}
      >
        <div className="relative z-30 flex items-center justify-between h-20 px-6 md:px-12">

          {/* LEFT EMPTY (previously theme toggle) */}
          <div className="w-5" />


          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block">
              <Image
                src="/logo/logo.png"
                alt="logo"
                width={180}
                height={80}
                className="w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] invert h-auto object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>
          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <Circle className="w-5 h-5 opacity-80" />
          </button>
        </div>

        {/* FULLSCREEN MENU */}
        <div
          ref={navRef}
          className="absolute h-screen top-[-100vh] w-full z-10 bg-background text-foreground"
        >
          <div className="flex flex-col h-full justify-center gap-20 px-6 md:px-20 py-10 md:py-16">

            {/* TOP */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-6 md:space-y-4">
                {[
                  { name: "About", href: "/about" },
                  { name: "Work", href: "/work" },
                  { name: "Expertise", href: "/expertise" },
                  { name: "Brands", href: "/brands" },
                  { name: "Connect", href: "/connect" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-item block text-2xl md:text-4xl uppercase lg:text-5xl font-heading font-extralight cursor-pointer hover:translate-x-2 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="nav-item">
                <Button title={"think@wearepointof.com"} />
              </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-foreground/20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex flex-wrap gap-6 text-sm text-foreground/60">
                {["Instagram", "LinkedIn", "Behance", "Pinterest"].map(
                  (item) => (
                    <p
                      key={item}
                      className="nav-item hover:text-foreground cursor-pointer transition"
                    >
                      {item}
                    </p>
                  )
                )}
              </div>

              <div className="flex gap-6 md:gap-10 text-sm">
                <div className="nav-item">
                  <Button title={"SHOWREEL"} />
                </div>
                <div className="nav-item">
                  <Button title={"CAREER"} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}