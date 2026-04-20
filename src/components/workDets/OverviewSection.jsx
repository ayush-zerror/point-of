import React from "react";

const OverviewSection = ({ caseStudy }) => {
    return (
        <section className="w-full min-h-screen bg-black text-white  py-16">

            {/* HEADING */}
            <div className="mb-20">
                <h1 className="heading-xl text-subheading max-w-4xl">
                    {caseStudy?.title ?? ""}
                </h1>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

                {/* LEFT LABELS */}
                <div className="space-y-16 text-white/60">

                    <p className="para text-subheading">
                        (A) Project Challenge
                    </p>

                    <p className="para text-subheading">
                        (B) Creative Concept
                    </p>

                </div>

                {/* RIGHT CONTENT */}
                <div className="space-y-16 para text-desc">

                    <p >

                        {caseStudy?.challenge?.description ?? ""}
                    </p>

                    <p >

                        {caseStudy?.creativeConcept?.description ?? ""}
                    </p>

                </div>
            </div>

        </section>
    );
};

export default OverviewSection;