"use client";

import { Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Spiral as Hamburger } from 'hamburger-react'
import FullscreenMenu from "./FullscreenMenu";

export default function Navbar() {
  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/wearepointof" },
    { name: "LinkedIn", href: "https://linkedin.com/company/wearepointof" },
    { name: "Behance", href: "https://www.behance.net/wearepointof" },
  ];

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
            <Link href="/" className="block" onClick={() => setMenuOpen(false)}>
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
          <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={20} />
        </div>

        {/* FULLSCREEN MENU */}
        <FullscreenMenu
          ref={navRef}
          pathname={pathname}
          setMenuOpen={setMenuOpen}
          socialLinks={socialLinks}
        />
      </nav>
    </>
  );
}