import React from "react";

const Legal = () => {
  return (
    <div className="min-h-screen  px-6 md:px-20 lg:px-40 pt-32 pb-16">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            LEGAL
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-12 leading-relaxed text-[15px] md:text-base">

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing www.wearepointof.com (“Site”), you agree to these Terms.
              If you do not agree, please discontinue use of the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              2. Purpose of Website
            </h2>
            <p>
              This Site serves as a portfolio and informational platform for our
              creative practice across India and the United States. No transactions
              occur directly through the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              3. Intellectual Property
            </h2>
            <p>
              All content, including images, design, identity systems, case
              studies, written content, and proprietary frameworks is owned by:
            </p>

            <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
              <li>Point Of Collaborative LLP (India)</li>
              <li>Point of Action LLC (USA)</li>
            </ul>

            <p>
              unless credit is explicitly given otherwise.
            </p>

            <p>
              You may not duplicate or republish content without written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              4. Portfolio Material
            </h2>
            <p>
              Client work is displayed with permission or under industry-standard
              rights for creative documentation. If anything is displayed in error,
              contact us and we will take immediate action.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              5. External Links
            </h2>
            <p>
              We may link to external websites for context. We are not responsible
              for content or policies of third-party sites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              6. Unsolicited Material
            </h2>
            <p>
              We do not accept unsolicited creative pitches or concept submissions.
              If you send any, you agree we may use or disregard them without
              obligation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              7. Limitation of Liability
            </h2>
            <p>
              The Site is provided “as is.” Both Point Of Collaborative LLP and
              Point of Action LLC disclaim liability for any direct or indirect
              damages arising from use of the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              8. No Professional Advice
            </h2>
            <p>
              Content on the Site does not constitute legal, financial, or
              professional advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              9. Governing Law & Jurisdiction
            </h2>

            <p>For use of this website:</p>

            <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
              <li>Governed by the laws of the Republic of India</li>
              <li>
                Exclusive jurisdiction lies with the courts of Mumbai, Maharashtra
              </li>
            </ul>

            <p>
              For client contracts, jurisdiction is defined within each agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              10. Changes to Terms and Contact
            </h2>
            <p>
              We may update these Terms periodically. For legal matters, reach out
              to: admin@wearepointof.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Legal;