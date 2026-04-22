"use client";
import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
const CTASection = ({
  heading = (
    <>
      Got a project in mind?
      <br />
      Learn how we can help.
    </>
  ),
  buttonTitle = "LET’S TALK",
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
      </div>
    </section>
  );
};

export default CTASection;
