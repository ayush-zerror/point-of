"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background relative">
      <div className="px-4 sm:px-10 md:px-16 lg:px-20 mx-auto pt-12 md:pt-16 lg:pt-30 ">
        
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">
          
          {/* LOGO */}
          <div>
            <Link href="/" className="flex items-start">
              <Image
                src="/logo/po-logo.png"
                alt="logo"
                width={120}
                height={40}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 🔥 RIGHT SIDE WRAPPER */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 md:gap-24 lg:gap-28">
            
            {/* NAV LINKS */}
            <div className="space-y-3 para text-subheading tracking-wide w-fit">
              {[
                { name: "ABOUT", href: "/about" },
                { name: "WORK", href: "/work" },
                { name: "EXPERTISE", href: "/expertise" },
                { name: "BRANDS", href: "/brands" },
                { name: "CONNECT", href: "/connect" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block hover:opacity-60 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* SOCIAL LINKS */}
            <div className="space-y-3 para text-subheading w-fit">
              {[
                {
                  name: "INSTAGRAM",
                  href: "https://instagram.com/wearepointof",
                },
                {
                  name: "LINKEDIN",
                  href: "https://linkedin.com/company/wearepointof",
                },
                {
                  name: "BEHANCE",
                  href: "https://www.behance.net/wearepointof",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-60 transition"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* EMAIL SUBSCRIBE */}
            <div className="space-y-3  w-full sm:w-[260px] md:w-[300px]">
              <p className="font-medium">Don’t miss anything</p>

              <div className="relative border-b border-neutral-500 pb-2">
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full bg-transparent outline-none py-2 pr-10 text-sm md:text-base placeholder:text-neutral-500"
                />
                <Send className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70 cursor-pointer" />
              </div>

              <div className="text-sm">
                <p className="text-neutral-400">Partner with us</p>
                <a
                  href="mailto:think@wearepointof.com"
                  className="font-medium hover:underline"
                >
                  think@wearepointof.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-neutral-700 mt-10 md:mt-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm">
          
          <div className="flex flex-wrap gap-3 md:gap-4 text-neutral-400">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/legal" className="hover:text-white transition">
              Legal
            </Link>
          </div>

          <p className="text-neutral-400">
            © {new Date().getFullYear()} Point Of
          </p>
        </div>

      </div>
    </footer>
  );
}