"use client";
import React, { useState } from "react";
import Button from "../common/Button";



const JoinTeam = () => {


  return (
    <section id="join-our-team" className="w-full pt-24">
      <div
        className="
          w-full
          pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
          pr-6
        "
      >
        {/* Heading */}
        <h2 className="heading-xl text-subheading mb-8">
          Join Our Team
        </h2>

        {/* Description */}
        <p className="max-w-3xl para text-desc">
          We’re building a team of curious thinkers and creative doers—people who care deeply about craft, culture, and collaboration. We thrive on diversity—in people, perspectives, and possibilities. If you're passionate about humanizing technology, shaping experiences, and looking for a place to grow, contribute, and create meaningful work; whether full-time, freelance, or as a summer intern—we’d love to hear from you. Below are our current vacancies, Don’t see a role that’s speaking to you? Email us with your portfolios at—
          <a href="mailto:people@wearepointof.com" className="text-heading"> people@wearepointof.com</a>
        </p>


      </div>
    </section>
  );
};

export default JoinTeam;