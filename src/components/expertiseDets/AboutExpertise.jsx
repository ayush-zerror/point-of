"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { expertiseDetails } from "@/helper/expertise-data";

const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AboutExpertise = ({
  expertise = "Branding",
  title = "We build purposeful, distinctive brands rooted in strategy, storytelling, and design.",
  description = "We craft brand identities that are strategic, emotionally resonant, and built to last.",
  accordion = [],
  buttonTitle = "Work with us",
  currentSlug,
} = {}) => {
  const [active, setActive] = useState(null);
  const pendingScrollIdRef = useRef(null);
  const pathname = usePathname();

  const otherExpertise = expertiseDetails.filter((x) => x.slug !== currentSlug);

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash || "";
      const id = raw.replace(/^#/, "").trim();
      if (!id) return;

      const idx = (accordion ?? []).findIndex((x) => toSlug(x?.title) === id);
      if (idx < 0) return;

      pendingScrollIdRef.current = id;
      setActive(idx);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [accordion]);

  // Scroll to hash after client navigation (App Router: tied to pathname)
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      setTimeout(() => {
        requestAnimationFrame(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ block: "center" });
        });
      }, 10);
    };

    handleScrollToHash();
  }, [pathname]);

  // After we open the matching accordion, scroll to it.
  useEffect(() => {
    const id = pendingScrollIdRef.current;
    if (!id) return;

    const t = setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      pendingScrollIdRef.current = null;
    }, 200);

    return () => clearTimeout(t);
  }, [active]);



  return (
    <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-16 sm:py-20 md:py-28 lg:py-32">
      
      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-[40%_60%] items-start">
        
        {/* LEFT */}
        <div>
          <h2 className="heading-xl text-heading">{expertise}</h2>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          
          <h3 className="heading-xl text-subheading">{title}</h3>

          <p className="para text-desc max-w-xl">{description}</p>

          {/* ACCORDION */}
          <div className="border-t border-white/20 mt-14">
            {accordion.map((item, index) => {
              const isOpen = active === index;
              const id = toSlug(item?.title);

              return (
                <div key={index} id={id} className="border-b border-white/20 scroll-mt-24">
                  
                  <button
                    onClick={() => setActive(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-6 lg:py-8 text-left group cursor-pointer"
                  >
                    <span className={`heading-lg text-desc transition hover:text-heading ${isOpen ? "text-heading" : "text-desc"}`}>
                      {item.title}
                    </span>

                    <Plus
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <p className="para text-desc max-w-xl pb-6">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-[40%_60%] items-baseline pt-10 lg:pt-14">
        <Link
          href="/connect"
          className="group inline-flex items-baseline gap-1.5 md:gap-2 uppercase whitespace-nowrap text-[11px] md:text-sm font-semibold tracking-wide leading-none text-[#c0bfbf]"
          title={buttonTitle}
        >
          <span className="inline-block w-2 h-2 shrink-0 self-center rounded-full bg-[#c0bfbf] transition-all duration-300 group-hover:w-5 group-hover:h-5" />
          <span className="relative">
            {buttonTitle}
            <span className="absolute pointer-events-none right-0 -bottom-1 h-px w-full bg-[#c0bfbf] transition-all duration-300 group-hover:w-0" />
          </span>
        </Link>

        {otherExpertise.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <span className="uppercase whitespace-nowrap text-[11px] md:text-sm font-semibold tracking-wide leading-none text-desc">
              Explore
            </span>
            {otherExpertise.map((x) => (
              <Link
                key={x.slug}
                href={`/expertise/${x.slug}`}
                className="uppercase whitespace-nowrap text-[11px] md:text-sm font-semibold tracking-wide leading-none text-[#c0bfbf] hover:text-heading transition-colors duration-200"
                title={x.expertise}
              >
                {x.expertise}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutExpertise;