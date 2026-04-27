import React from "react";

const OverviewSection = ({ caseStudy }) => {
    return (
        <section className="w-full min-h-screen py-14 sm:py-16 md:py-20">

            {/* HEADING */}
            <div className="mb-10 sm:mb-12 md:mb-16">
                <h2 className="heading-xl text-subheading max-w-4xl">
                    {caseStudy?.title ?? ""}
                </h2>
            </div>

            {/* CONTENT */}
            <div className="space-y-10 sm:space-y-12 md:space-y-16">
                {/* Row A */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-start">
                    <div className="text-white/60">
                        <p className="para text-subheading">(A) Project Challenge</p>
                    </div>
                    <div className="para text-desc">
                        <p>{caseStudy?.challenge?.description ?? ""}</p>
                    </div>
                </div>

                {/* Row B */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-start">
                    <div className="text-white/60">
                        <p className="para text-subheading">(B) Creative Concept</p>
                    </div>
                    <div className="para text-desc">
                        <p>{caseStudy?.creativeConcept?.description ?? ""}</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default OverviewSection;