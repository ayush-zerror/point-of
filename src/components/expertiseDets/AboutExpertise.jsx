"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../common/Button";


const accordionData = [
  {
    title: "Strategy & Counsel",
    content:
      "We define brand direction through research, positioning, and long-term strategic thinking.",
  },
  {
    title: "Market Audit & Research",
    content:
      "We analyze competitors, audience, and trends to uncover opportunities for differentiation.",
  },
  {
    title: "Visual Identity",
    content:
      "We design logos, typography, and systems that create strong and memorable brand presence.",
  },
];

const AboutExpertise = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="w-full  px-4 sm:px-10 md:px-16 lg:px-20 py-20 md:py-28">
      
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-stretch">
        
        {/* LEFT */}
        <div className="flex flex-col justify-between h-full">
          
          {/* TOP CONTENT */}
          <h2 className="heading-xl text-heading">
            Branding
          </h2>

          {/* BUTTON AT BOTTOM */}
          <div className="mt-10 md:mt-0">
            <Button title={"CONNECT"} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          
          <h3 className="heading-xl text-subheading">
            We build purposeful, distinctive brands rooted in strategy,
            storytelling, and design.
          </h3>

          <p className="para text-desc max-w-xl">
            We craft brand identities that are strategic, emotionally resonant,
            and built to last. From research and positioning to visual systems
            and tone of voice, we help businesses stand out and stay consistent
            across every platform.
          </p>

          {/* ACCORDION */}
          <div className="border-t border-white/20 mt-14">
            {accordionData.map((item, index) => {
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

        </div>
      </div>
    </section>
  );
};

export default AboutExpertise;