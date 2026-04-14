import React from "react";
import Button from "../common/Button";

const CTASection = () => {
  return (
    <section
      className="w-full bg-background relative min-h-[50vh] flex items-center justify-center px-6 
      "
    >
      <div className="text-center flex flex-col items-center">
        {/* HEADING */}
        <p className="heading-xl text-desc">
          Got a project in mind?
          <br />
          Learn how we can help.
        </p>
        {/* CTA */}
        <Button title={"LET’S TALK"} />
      </div>
    </section>
  );
};

export default CTASection;
