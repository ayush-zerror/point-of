"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { expertiseDetails } from "@/helper/expertise-data";

const AboutExpertise = ({
  expertise = "Branding",
  title = "We build purposeful, distinctive brands rooted in strategy, storytelling, and design.",
  description = "We craft brand identities that are strategic, emotionally resonant, and built to last.",
  accordion = [],
  buttonTitle = "Work with us",
  currentSlug,
} = {}) => {
  const [active, setActive] = useState(null);
  const router = useRouter();

  const otherExpertise = expertiseDetails.filter((x) => x.slug !== currentSlug);

  return (
    <section className="w-full  px-4 sm:px-10 md:px-16 lg:px-20 py-20 md:py-28">
      
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-stretch">
        
        {/* LEFT */}
        <div className="flex flex-col justify-between h-full">
          
          {/* TOP CONTENT */}
          <h2 className="heading-xl text-heading">{expertise}</h2>

          {/* BUTTON AT BOTTOM */}
          <div className="mt-10 md:mt-0">
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

              return (
                <div key={index} className="border-b border-white/20">
                  
                  <button
                    onClick={() => setActive(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                  >
                    <span className="heading-lg text-desc transition">
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
                      isOpen ? "max-h-40 pb-6" : "max-h-0"
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
                      className="group inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm tracking-wide text-desc/90 transition-colors duration-200 hover:border-white/30 hover:bg-white/5"
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