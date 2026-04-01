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
            <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4">
              Email
            </p>

            <h1
              className="
                text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[4rem]
                font-[200]
                text-gray-300
                break-words
              "
            >
              think@wearepointof.com
            </h1>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-gray-400">
            
            <div>
              <h3 className="text-white text-base sm:text-lg mb-3 md:mb-4">
                Contact
              </h3>
              <p className="mb-2">(+91) 91679 91888</p>
              <p className="flex items-center gap-2">
                WhatsApp
                <span className="text-green-400 text-xs">●</span>
              </p>
            </div>

            <div>
              <h3 className="text-white text-base sm:text-lg mb-3 md:mb-4">
                Mumbai, India
              </h3>
              <p>Vaswani Chambers,</p>
              <p>Dr Annie Besant Rd, Worli,</p>
              <p>Mumbai, Maharashtra — 400025.</p>
            </div>

            <div>
              <h3 className="text-white text-base sm:text-lg mb-3 md:mb-4">
                Barcelona, Spain
              </h3>
              <p>Passeig de Gràcia,</p>
              <p>17 Barcelona,</p>
              <p>B 08007</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;