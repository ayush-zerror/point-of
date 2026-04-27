"use client";

import { Check, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | loading | success | error
  const [newsletterError, setNewsletterError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (newsletterStatus !== "success") return;
    const t = setTimeout(() => {
      setNewsletterStatus("idle")
      setNewsletterEmail("");
    }, 6000);
    return () => clearTimeout(t);
  }, [newsletterStatus]);

  const isValidEmail = (value) => {
    const v = String(value ?? "").trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const submitNewsletter = async () => {
    const email = String(newsletterEmail ?? "").trim();
    setNewsletterError("");

    if (!isValidEmail(email)) {
      setNewsletterStatus("error");
      setNewsletterError("Please enter a valid email");
      return;
    }

    try {
      setNewsletterStatus("loading");
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setNewsletterStatus("error");
        setNewsletterError(data?.error || "Something went wrong");
        return;
      }

      setNewsletterStatus("success");
    } catch {
      setNewsletterStatus("error");
      setNewsletterError("Network error. Please try again.");
    }
  };

  return (
    <footer className="w-full bg-background relative">
      <div className="px-6 sm:px-10 md:px-12 lg:px-20 mx-auto pt-12 md:pt-16 lg:pt-30 ">

        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">

          {/* LOGO */}
          <div>
            <Link href="/" className="flex items-start" title="Go to homepage">
              <Image
                src="/logo/po-logo.png"
                alt="Point Of logo"
                width={120}
                height={40}
                className="h-12 sm:h-14 md:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 🔥 RIGHT SIDE WRAPPER */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 md:flex-nowrap md:gap-12 lg:gap-28">

            {/* NAV + SOCIAL (side-by-side on mobile) */}
            <div className="grid grid-cols-2 gap-10 sm:flex sm:flex-row sm:flex-wrap sm:gap-16 md:flex-nowrap md:gap-12 lg:gap-28">
              {/* NAV LINKS */}
              <div className="space-y-3 para text-subheading tracking-wide">
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
                    className={`link-underline block transition ${pathname.startsWith(item.href) ? "font-[600]" : "font-[500]"}`}
                    title={item.name}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* SOCIAL LINKS */}
              <div className="space-y-3 para text-subheading">
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
                    className="link-underline block transition font-[500]"
                    title={item.name}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* EMAIL SUBSCRIBE */}
            <div className="space-y-3  w-full sm:w-[260px] md:w-[300px]">
              <p className="para text-heading tracking-wide font-[500]">Don’t miss anything</p>

              <div className="relative border-b border-neutral-700 pb-2">
                <input
                  type="email"
                  placeholder="Email*"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus !== "idle") setNewsletterStatus("idle");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitNewsletter();
                    }
                  }}
                  className="w-full bg-transparent outline-none py-2 pr-10 text-sm md:text-base placeholder:text-neutral-500"
                />
                <button
                  type="button"
                  onClick={submitNewsletter}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  aria-label="Subscribe to newsletter"
                  title="Subscribe"
                  disabled={newsletterStatus === "loading"}
                >
                  {newsletterStatus === "success" ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : newsletterStatus === "loading" ? (
                    <span
                      className="inline-block w-4 h-4 rounded-full border-2 border-neutral-400/30 border-t-neutral-200 animate-spin"
                      aria-label="Loading"
                    />
                  ) : (
                    <Send className="w-5 h-5 opacity-70" />
                  )}
                </button>
              </div>

              {newsletterStatus === "success" ? (
                <p className="text-xs text-green-400">Saved</p>
              ) : newsletterStatus === "error" ? (
                <p className="text-xs text-red-400">{newsletterError || "Please enter a valid email"}</p>
              ) : null}

              <div className="text-sm">
                <p className="text-desc mb-2">Partner with us</p>
                <a
                  href="mailto:think@wearepointof.com"
                  className="link-underline para text-heading tracking-wide font-[500]"
                  title="Email Point Of"
                >
                  think@wearepointof.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-neutral-700 mt-10 md:mt-12 py-6 flex flex-row justify-between items-start md:items-center gap-4 text-sm">

          <div className="flex flex-wrap gap-3 md:gap-4 text-neutral-400">
            <Link href="/privacy" className="hover:text-white transition" title="Privacy Policy">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/legal" className="hover:text-white transition" title="Legal">
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