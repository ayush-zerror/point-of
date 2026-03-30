"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="px-20 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* LOGO */}
          <Link href="/" className="flex items-start">
            <Image
              src="/logo/po-logo.png"
              alt="logo"
              width={120}
              height={40}
              className="h-14 w-auto object-contain invert dark:invert-0"
            />
          </Link>

          {/* NAV LINKS */}
          <div className="space-y-3 text-sm tracking-wide">
            {[
              { name: "STUDIO", href: "/studio" },
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
          <div className="space-y-3 text-sm tracking-wide">
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
                name: "PINTEREST",
                href: "https://in.pinterest.com/wearePointOf",
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
          <div className="space-y-6">
            <p className="font-medium">Don’t miss anything</p>

            <div className="relative border-b border-neutral-500">
              <input
                type="email"
                placeholder="Email*"
                className="w-full bg-transparent outline-none py-2 pr-8 text-sm placeholder:text-neutral-500"
              />
              <Send className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70 cursor-pointer" />
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

        {/* DIVIDER */}
        <div className="border-t border-neutral-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm">
          {/* LEGAL */}
          <div className="flex gap-4 text-neutral-400">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/legal" className="hover:text-white transition">
              Legal
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-white transition">
              Cookies
            </Link>
          </div>

          {/* COPYRIGHT */}
          <p className="mt-4 md:mt-0 text-neutral-400">
            © {new Date().getFullYear()} Point Of
          </p>
        </div>
      </div>
    </footer>
  );
}
