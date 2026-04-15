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

  // GSAP Setup — runs once
  useEffect(() => {
    if (!navRef.current) return;

    // Set initial clip-path state
    gsap.set(navRef.current, {
      top: "-100vh",
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
    });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(navRef.current, {
        top: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out",
      })
      .from(
        navRef.current.querySelectorAll(".nav-item"),
        {
          x: 50,
          opacity: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
        },
        "<"
      );
  }, []);

  // Toggle animation on menuOpen state change
  useEffect(() => {
    if (!tl.current) return;

    if (menuOpen) {
      tl.current.timeScale(1).play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.timeScale(1.8).reverse();
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 text-foreground ${
          pathname === "/work" ? "" : "nav-gradient"
        }`}
      >
        <div className="relative z-30 flex items-center justify-between h-20 px-6 md:px-12">

          {/* LEFT PLACEHOLDER */}
          <div className="w-5" />

          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block">
              <Image
                src="/logo/logo.png"
                alt="logo"
                width={180}
                height={80}
                style={{ height: "auto" }}
                className="w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] invert h-auto object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>

          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="cursor-pointer relative z-60"
          >
            <Circle className="w-5 h-5 opacity-80" />
          </button>
        </div>

        {/* FULLSCREEN MENU */}
        <div
          ref={navRef}
          className="fixed h-screen w-full bg-background text-foreground overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0 0%)" }}
        >
          <div className="flex flex-col h-full justify-end px-6 sm:px-10 md:px-20 py-8 md:py-16">

            {/* TOP */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mb-10 md:mb-16">

              {/* NAV LINKS */}
              <nav className="flex flex-col gap-3 sm:gap-4 md:gap-5">
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
                    className={`group block w-fit heading-xl uppercase font-heading font-extralight tracking-tight cursor-pointer transition-transform duration-200 hover:translate-x-2 ${
                      pathname === item.href ? "text-heading" : "text-desc"
                    }`}
                  >
                    <span className="nav-item  relative inline-block">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100" />
                    </span>
                  </Link>
                ))}
              </nav>

              {/* EMAIL BUTTON */}
              <div className="nav-item shrink-0">
                <Button title={"think@wearepointof.com"} />
              </div>
            </div>

            {/* BOTTOM */}
            <div className="nav-item border-t border-foreground/20 pt-5 md:pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-4">

              {/* SOCIAL LINKS */}
              <div className="flex flex-wrap gap-4 sm:gap-12">
                {["Instagram", "LinkedIn", "Behance", "Pinterest"].map((item) => (
                  <p
                    key={item}
                    className="text-xs sm:text-sm text-foreground/50 hover:text-foreground cursor-pointer transition-colors duration-200"
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* CTA BUTTONS */}
              <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
                {[
                  { label: "SHOWREEL", href: "/expertise" },
                  { label: "CAREERS", href: "/connect#join-our-team" },
                  { label: "UNIVERSE", href: "/universe" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                    <Button title={item.label} className="mt-0!" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}