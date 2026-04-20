"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";

const FullscreenMenu = React.forwardRef(function FullscreenMenu(
  { pathname, setMenuOpen, socialLinks },
  ref
) {
  return (
    <div
      ref={ref}
      className="fixed h-screen w-full bg-background text-foreground overflow-hidden"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0 0%)" }}
    >
      <div className="flex flex-col h-full justify-end px-6 sm:px-10 md:px-20 py-8 md:py-24">
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
            <Button
              title={"think@wearepointof.com"}
              href="mailto:think@wearepointof.com"
              textClassName="text-base sm:text-2xl !lowercase !font-normal"
            />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="nav-item border-t border-foreground/20 pt-5 md:pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-4">
          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap gap-4 sm:gap-12">
            {(socialLinks ?? []).map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-xs sm:text-sm text-foreground/50 hover:text-foreground cursor-pointer transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
            {[
              { label: "SHOWREEL", href: "/expertise" },
              { label: "CAREERS", href: "/connect#join-our-team" },
              { label: "UNIVERSE", href: "/universe" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <Button title={item.label} className="mt-0!" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default FullscreenMenu;

