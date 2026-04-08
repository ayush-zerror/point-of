"use client";
import React, { useState } from 'react'
import Button from '../common/Button'

const AccordionSection = ({ data ,title }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <section className="w-full py-24">
            <div
                className="
          w-full
          pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-120
          pr-6
        "
            >
                {/* Vacancies */}
                <h3 className="heading-xl text-subheading mb-12">
                    {title}
                </h3>

                {/* Accordion (narrow width) */}
                <div className="space-y-6 max-w-3xl">
                    {data.map((job, index) => (
                        <div key={index} className="border-b border-white/20 pb-6">

                            {/* Header */}
                            <button
                                type="button"
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between cursor-pointer group text-left"
                            >
                                <span className="heading-lg text-desc transition">
                                    {job.title}
                                </span>

                                {/* Rotating + */}
                                <span
                                    className={`text-2xl transition-transform duration-300 ${activeIndex === index ? "rotate-45 " : ""
                                        }`}
                                >
                                    +
                                </span>
                            </button>

                            {/* Smooth Content */}
                            <div
                                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${activeIndex === index ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0"}
                `}
                            >
                                {activeIndex === index && job.content ? (
                                    <div className="space-y-6 para text-subheading">

                                        {/* Meta */}
                                        <div className="uppercase space-y-1">
                                            <p className="font-medium text-heading">Experience: {job.content.exp}</p>
                                            <p className="font-medium text-heading">Location: {job.content.location}</p>
                                            <p className="font-medium text-heading">Immediate: {job.content.type}</p>
                                        </div>

                                        <p>{job.content.description}</p>

                                        <div>
                                            <h4 className="font-medium text-heading uppercase mb-2">
                                                About You:
                                            </h4>
                                            <p>{job.content.about}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-heading uppercase mb-2">
                                                What You'll Do:
                                            </h4>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {job.content.work.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-heading uppercase mb-2">
                                                Requirements:
                                            </h4>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {job.content.requirements.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-heading uppercase mb-2">
                                                Software Skills:
                                            </h4>
                                            <p>{job.content.skills}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-heading uppercase mb-2">
                                                Culture Note:
                                            </h4>
                                            <p>{job.content.culture}</p>
                                        </div>


                                        <Button title="APPLY" />

                                    </div>
                                ) : activeIndex === index ? (
                                    <div className="para text-subheading">
                                        <p>{job.body ?? job.description}</p>
                                    </div>
                                ) : null}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default AccordionSection