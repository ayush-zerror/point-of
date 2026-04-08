import React from "react";

const GetInTouch = () => {
  return (
    <section className="min-h-screen md:h-screen w-full bg-[#EAE8E4] text-black">
      <div className="h-full flex items-center">
        <div
          className="
            w-full
            px-4 sm:px-6 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
            md:pr-6
          "
        >
          <h1 className="heading-xl mb-10 sm:mb-12 md:mb-16">
            Get in touch
          </h1>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-10">
            
            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="Full Name*" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="Company" />

            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="Website Link" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="Email*" />

            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="+91 Phone Number*" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="Select Your Industry*" />

            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="How can we help you*" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base" placeholder="How did you hear about us?*" />

            <textarea
              className="md:col-span-2 border-b border-gray-400 bg-transparent outline-none py-2 text-sm sm:text-base"
              placeholder="Brief about your Goal, Budget & Timeline.*"
            />
          </div>

          {/* Submit */}
          <div className="mt-8 md:mt-10">
            <button className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="border-b border-black text-sm sm:text-base">
                SUBMIT
              </span>
            </button>

            <p className="text-xs sm:text-sm text-gray-600 mt-4 md:mt-6">
              By clicking connect you accept our{" "}
              <span className="underline">Privacy Policy</span>
              <br />
              Prefer email? think@wearepointof.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;