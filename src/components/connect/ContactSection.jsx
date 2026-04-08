import React from "react";

const ContactSection = () => {
  return (
    <section className="min-h-screen md:h-screen w-full bg-black text-white">
      <div className="h-full flex items-center">
        <div
          className="
            w-full
            px-4 sm:px-6 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
            md:pr-6
          "
        >
          {/* Email */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <p className="para text-desc mb-3 md:mb-2">
              Email
            </p>

            <h1
              className="heading-xl text-subheading"
            >
              think@wearepointof.com
            </h1>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            
            <div>
              <h3 className="heading-md text-subheading mb-3 md:mb-4">
                Contact
              </h3>
              <p className="para text-desc mb-2">(+91) 91679 91888</p>
              <p className="para text-desc flex items-center gap-2">
                WhatsApp
              </p>
            </div>

            <div>
            <h3 className="heading-md text-subheading mb-3 md:mb-4">
                Mumbai, India
              </h3>
              <p className="para text-desc">Vaswani Chambers,</p>
              <p className="para text-desc">Dr Annie Besant Rd, Worli,</p>
              <p className="para text-desc">Mumbai, Maharashtra — 400025.</p>
            </div>

            <div>
            <h3 className="heading-md text-subheading mb-3 md:mb-4">
                Barcelona, Spain
              </h3>
              <p className="para text-desc">Passeig de Gràcia,</p>
              <p className="para text-desc">17 Barcelona,</p>
              <p className="para text-desc">B 08007</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;