"use client";
import React, { useState } from "react";
import Button from "../common/Button";

const jobs = [
  {
    title: "Visual Designer",
    content: {
      exp: "2+ Years",
      location: "Remote / Mumbai",
      type: "Full Time",
      description:
        "We’re looking for a Visual Designer with a sharp eye for aesthetics and a passion for turning strategy into compelling design.",
      about:
        "You think in shapes, colors, and stories. You're detail-obsessed but conceptually driven.",
      work: [
        "Create and develop brand identities, layouts, and digital assets.",
        "Design for both print and digital platforms.",
        "Work closely with strategists and creative directors.",
        "Build and refine design systems.",
      ],
      requirements: [
        "2+ years of design experience in a studio, agency, or brand environment.",
        "Strong portfolio showcasing branding and digital design.",
        "Excellent understanding of typography and composition.",
        "Ability to work in fast-paced teams.",
      ],
      skills:
        "Adobe Creative Cloud, Figma, After Effects (plus), Google Workspace, AI tools.",
      culture:
        "Design is where strategy meets emotion. This is your place to create and grow.",
    },
  },

  {
    title: "Brand Strategist",
    content: {
      exp: "3+ Years",
      location: "Mumbai / Remote",
      type: "Full Time",
      description:
        "We’re looking for a Brand Strategist who can shape narratives and define positioning.",
      about:
        "You are curious, analytical, and creative — someone who connects business goals with human insights.",
      work: [
        "Develop brand strategies and positioning frameworks.",
        "Conduct research and competitor analysis.",
        "Collaborate with design teams.",
      ],
      requirements: [
        "3+ years in branding/strategy.",
        "Strong research and storytelling skills.",
        "Excellent communication skills.",
      ],
      skills: "Strategy tools, presentations, Figma/Notion.",
      culture: "We value thinkers who question and explore.",
    },
  },

  {
    title: "Motion Designer",
    content: {
      exp: "2+ Years",
      location: "Remote",
      type: "Full Time",
      description:
        "We’re looking for a Motion Designer to bring brands to life.",
      about:
        "You love movement and storytelling with a strong design sense.",
      work: [
        "Create motion graphics and animations.",
        "Work on brand films.",
        "Collaborate with teams.",
      ],
      requirements: [
        "2+ years in motion design.",
        "Strong animation portfolio.",
      ],
      skills: "After Effects, Premiere Pro, Blender.",
      culture: "We experiment and push creative boundaries.",
    },
  },

  {
    title: "UX Designer",
    content: {
      exp: "2+ Years",
      location: "Remote / Mumbai",
      type: "Full Time",
      description:
        "We’re looking for a UX Designer who can craft meaningful experiences.",
      about:
        "You care about usability, flows, and user-centered design.",
      work: [
        "Design user journeys.",
        "Create wireframes and prototypes.",
        "Conduct usability testing.",
      ],
      requirements: [
        "2+ years in UX design.",
        "Strong UX portfolio.",
      ],
      skills: "Figma, UX research tools.",
      culture: "We design with empathy and purpose.",
    },
  },
];

const JoinTeam = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24">
      <div
        className="
          w-full
          pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
          pr-6
        "
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-[200] mb-10">
          Join Our Team
        </h2>

        {/* Description */}
        <p className="max-w-3xl leading-relaxed text-sm md:text-base mb-24">
          We’re building a team of curious thinkers and creative doers who care deeply about craft and collaboration.
          <span className=""> people@wearepointof.com</span>
        </p>

        {/* Vacancies */}
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-[200] mb-16">
          Current Vacancies
        </h3>

        {/* Accordion (narrow width) */}
        <div className="space-y-6 max-w-3xl">
          {jobs.map((job, index) => (
            <div key={index} className="border-b border-gray-700 pb-6">

              {/* Header */}
              <div
                onClick={() => toggle(index)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-lg md:text-2xl  transition">
                  {job.title}
                </span>

                {/* Rotating + */}
                <span
                  className={`text-2xl transition-transform duration-300 ${activeIndex === index ? "rotate-45 " : ""
                    }`}
                >
                  +
                </span>
              </div>

              {/* Smooth Content */}
              <div
                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${activeIndex === index ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0"}
                `}
              >
                {job.content && (
                  <div className="space-y-6  text-sm md:text-[15px]">

                    {/* Meta */}
                    <div className="uppercase text-xs tracking-wide space-y-1">
                      <p>Experience: {job.content.exp}</p>
                      <p>Location: {job.content.location}</p>
                      <p>Immediate: {job.content.type}</p>
                    </div>

                    <p>{job.content.description}</p>

                    <div>
                      <h4 className=" text-xs uppercase mb-2">
                        About You:
                      </h4>
                      <p>{job.content.about}</p>
                    </div>

                    <div>
                      <h4 className=" text-xs uppercase mb-2">
                        What You'll Do:
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {job.content.work.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className=" text-xs uppercase mb-2">
                        Requirements:
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {job.content.requirements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className=" text-xs uppercase mb-2">
                        Software Skills:
                      </h4>
                      <p>{job.content.skills}</p>
                    </div>

                    <div>
                      <h4 className=" text-xs uppercase mb-2">
                        Culture Note:
                      </h4>
                      <p>{job.content.culture}</p>
                    </div>


                    <Button title="APPLY" />

                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;