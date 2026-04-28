import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and cookie information for Point Of.",
  keywords: ["Point Of", "Privacy Policy", "Cookies", "Data protection"],
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const Privacy = () => {
  return (
    <div className="min-h-screen  px-6 sm:px-10 md:px-12 lg:px-20 pt-32 ">
      <div className="pb-16 border-b border-neutral-700">
        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <div className="mb-12">
            <h2 className="heading-xl text-subheading">
              PRIVACY POLICY
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-12 para text-desc">

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                1. Overview
              </h2>
              <p>
                Point Of Collaborative LLP (India) and Point of Action LLC (USA)
                (“Point Of”, “we”, “us”, “our”) operate www.wearepointof.com as a
                portfolio website showcasing our work, philosophy, and capabilities.
                We collect only limited personal information and use it strictly for
                communication and site performance.
              </p>
              <p>This Privacy Policy also includes our Cookie Policy.</p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">2. What We Collect</h2>
              <p>We collect only the following information:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Email Address</li>
                <li>
                  Collected when you voluntarily subscribe, opt into updates, or
                  contact us.
                </li>
              </ul>

              <p className="pt-2">We do not collect:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Payment details</li>
                <li>Identification documents</li>
                <li>Sensitive personal data</li>
                <li>Marketing profiles</li>
              </ul>

              <p>
                Google Analytics may collect device-level usage data (explained
                below).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                3. How We Use Your Information
              </h2>
              <p>Your email address is used solely to:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Respond to inquiries</li>
                <li>Share updates or newsletters you opt into</li>
                <li>Communicate selectively when relevant</li>
              </ul>

              <p>
                You can request to be removed from our records at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                4. How We Store and Process Emails
              </h2>
              <p>We handle email submissions as follows:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>
                  Emails sent through the website are processed using Nodemailer.
                </li>
                <li>
                  Your email address is then securely saved to an internal Google
                  Sheet, accessible only to our team.
                </li>
                <li>
                  Google Workspace provides secure, encrypted storage under Google’s
                  global compliance framework.
                </li>
              </ul>

              <p>
                Google Privacy Policy: https://policies.google.com/privacy
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                5. Google Analytics & Cookies
              </h2>

              <p>
                Once live, www.wearepointof.com will use Google Analytics to
                understand site usage and improve performance.
              </p>

              <p>
                Google Analytics uses non-essential cookies that may collect:
              </p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Device information</li>
                <li>Approximate location</li>
                <li>Pages viewed</li>
                <li>Time spent on the site</li>
                <li>Basic interaction metrics</li>
              </ul>

              <p>
                We do not connect this data to your identity or your email address.
              </p>

              <h3 className="pt-2 heading-md text-subheading">Cookie Consent</h3>

              <p>
                Because Google Analytics uses non-essential cookies, a cookie banner
                is displayed when you visit the site. You may accept or reject
                analytics cookies at any time.
              </p>

              <p>We do not use:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Advertising cookies</li>
                <li>Third-party marketing trackers</li>
                <li>Behavioral profiling cookies</li>
                <li>Heatmaps (e.g., Hotjar)</li>
                <li>Social media pixel tracking</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                6. Essential Cookies
              </h2>
              <p>
                Our site uses a few essential cookies required for basic
                functionality (such as page loading or security). These do not track
                your identity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">7. Data Security</h2>
              <p>We use industry-standard measures including:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Secure servers</li>
                <li>Google Workspace encryption</li>
                <li>Limited internal access</li>
                <li>Secure email handling through Nodemailer</li>
              </ul>

              <p>
                While no system is perfectly secure, we take reasonable precautions
                to protect your data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">8. Data Retention</h2>
              <p>We retain your email address until:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>You request deletion, or</li>
                <li>It is no longer required for communication purposes.</li>
              </ul>

              <p>
                To request deletion, email admin@wearepointof.com.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">9. Your Rights</h2>
              <p>You may request to:</p>

              <ul className="list-disc ml-6 space-y-1 marker:text-neutral-400">
                <li>Access your information</li>
                <li>Correct or update it</li>
                <li>Delete it</li>
                <li>Withdraw consent</li>
              </ul>

              <p>
                To exercise any rights, contact admin@wearepointof.com.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                10. Children’s Privacy
              </h2>
              <p>
                This site is not intended for individuals under 16. We do not
                knowingly collect information from minors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="heading-md text-subheading">
                11. Changes to This Policy and Contact
              </h2>
              <p>
                We may update this Privacy Policy as needed. Questions about privacy
                or data use, can be emailed to: admin@wearepointof.com
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;