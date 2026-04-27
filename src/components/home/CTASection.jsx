"use client";
import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
const CTASection = ({
  heading = (
    <>
      Got a project in mind?
      <br />
      Learn how we can help.
    </>
  ),
  buttonTitle = "LET’S TALK",
  graphic = false,
} = {}) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/connect");
  }
  return (
    <section
      className="w-full bg-background relative min-h-[50vh] flex items-center justify-center px-6 
      "
    >
      <div className="text-center flex flex-col items-center">
        {/* HEADING */}
        <p className="heading-xl text-desc [&_br]:hidden sm:[&_br]:block">{heading}</p>
        {/* CTA */}
        <Button title={buttonTitle} onClick={handleButtonClick} />
        {graphic && (
        <Image
          src="/expertise/graphic_expertise.webp"
          alt="graphic_expertise"
          width={1000}
          height={1000}
          className="w-26 h-26 sm:w-40 sm:h-40 md:w-56 md:h-56 object-contain mt-12 sm:mt-12 md:mt-16 lg:mt-20"
        />
        )}
      </div>

    </section>
  );
};

export default CTASection;
