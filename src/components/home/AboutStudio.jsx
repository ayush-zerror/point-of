"use client";
import React from "react";
import Button from "../common/Button";

const AboutStudio = () => {
  return (
    <section className="w-full h-screen bg-background  px-6 md:px-20 py-24 flex flex-col justify-center">
      {/* TEXT CONTENT */}
      <div className="mx-auto">
        <div className="max-w-5xl space-y-12">
        {/* Paragraph 1 */}
        <p className="heading-xl">
          Point Of is an independent consultancy based in Mumbai, redefining how
          brands engage with culture and consumers.
        </p>

        {/* Paragraph 2 */}
        <p className="heading-xl">
          We work at the intersection of design, strategy, and
          technology—crafting identities that balance innovation with timeless
          storytelling. Building for India and beyond.
        </p>

        {/* CTA */}
      </div>
        <Button title={"OUR STUDIO"} />
      </div>
    </section>
  );
};

export default AboutStudio;
