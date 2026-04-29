"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import Button from "../common/Button";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
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
    <section className="w-full px-6 sm:px-10 lg:px-20 py-6 lg:py-28">
      
      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-[40%_60%] items-stretch">
        
        {/* LEFT */}
        <div className="flex flex-col justify-between h-full">
          
          {/* TOP CONTENT */}
          <h2 className="heading-xl text-heading">{expertise}</h2>

          {/* BUTTON AT BOTTOM */}
          <div className="hidden lg:block mt-10 lg:mt-0">
            <Button title={buttonTitle} onClick={() => {
              router.push(`/connect`);
            }} />
          </div>
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
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-72 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="para text-desc max-w-xl">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA (mobile first) */}
          <div className="lg:hidden flex justify-center">
            <Button
              title={buttonTitle}
              onClick={() => {
                router.push(`/connect`);
              }}
            />
          </div>

          {/* Explore other expertise */}
          {otherExpertise.length > 0 && (
            <div className="">
              <div className="flex flex-col sm:flex-row sm:items-center  gap-4 pt-8">
                <div>
                  <p className="para text-subheading">
                    Explore our other expertise :
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {otherExpertise.map((x) => (
                    <Link
                      key={x.slug}
                      href={`/expertise/${x.slug}`}
                      className="group inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm tracking-wide text-desc/90 transition-colors duration-200 hover:border-white/30 hover:bg-white/5"
                      title={x.expertise}
                    >
                      <span className="whitespace-nowrap">{x.expertise}</span>
                      <span className="ml-2 opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutExpertise;