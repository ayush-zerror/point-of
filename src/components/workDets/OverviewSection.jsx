import React from "react";

const OverviewSection = () => {
    return (
        <section className="w-full min-h-screen bg-black text-white  py-16">

            {/* HEADING */}
            <div className="mb-20">
                <h1 className="heading-xl text-subheading max-w-4xl">
                    Breaking design's status quo.
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

                        How do you brand a design agency that wants to disrupt the very industry it operates in? The challenge was creating an identity that stands apart from Mumbai's saturated agency landscape while remaining credible to both traditional corporations and progressive startups. We needed to communicate radical thinking without appearing reckless, and showcase Indian creativity without exotic clichés. The brand had to attract clients ready for transformation while filtering out those seeking safe, predictable solutions. Most critically, we had to capture Typcaste's vision of design as a tool for social and cultural change, not just commercial success.
                    </p>

                    <p >

                        We positioned Typcaste as "design insurgents"—creators who question before they create. The visual identity deliberately breaks typographic conventions, with letterforms that shift between structured and fluid, suggesting transformation in progress. We chose a bold black and white foundation punctuated by unexpected color interventions, representing clarity of thought with bursts of possibility. The logo itself is never static—it adapts and evolves across applications, embodying their belief that brands should be living systems, not fixed marks. The website functions as a manifesto, with case studies presented as cultural provocations rather than portfolio pieces. Typography becomes activism, layouts become arguments, and every touchpoint challenges what Indian design can be. The result is a brand that attracts the brave—clients who see design not as decoration but as revolution.
                    </p>

                </div>
            </div>

        </section>
    );
};

export default OverviewSection;