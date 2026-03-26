"use client";
import React from "react";

const AboutStudio = () => {
  return (
    <section className="w-full h-screen bg-background  px-6 md:px-20 py-24 flex flex-col justify-center">
      
      {/* TEXT CONTENT */}
      <div className="max-w-5xl space-y-12 m-auto">
        
        {/* Paragraph 1 */}
        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] ">
          Point Of is an independent consultancy based in Mumbai, redefining how brands engage with culture and consumers.
        </p>

        {/* Paragraph 2 */}
        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] ">
          We work at the intersection of design, strategy, and technology—crafting identities that balance innovation with timeless storytelling. Building for India and beyond.
        </p>

        {/* CTA */}
        <div className="pt-6">
          <button className="group flex items-center gap-2 text-sm tracking-wide uppercase ">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="border-b border-transparent group-hover:border-foreground transition">
              OUR STUDIO
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutStudio;