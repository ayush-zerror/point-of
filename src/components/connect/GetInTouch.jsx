import React from "react";

const GetInTouch = () => {
  return (
    <section className="h-screen w-full bg-[#EAE8E4] text-black">
      <div className="h-full flex items-center">
        <div
          className="
            w-full
            pl-6 sm:pl-12 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem]
            pr-6
          "
        >
          <h1 className="text-4xl md:text-6xl font-light mb-16">
            Get in touch
          </h1>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            
            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="Full Name*" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="Company" />

            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="Website Link" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="Email*" />

            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="+91 Phone Number*" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="Select Your Industry*" />

            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="How can we help you*" />
            <input className="border-b border-gray-400 bg-transparent outline-none py-2" placeholder="How did you hear about us?*" />

            <textarea
              className="col-span-2 border-b border-gray-400 bg-transparent outline-none py-2"
              placeholder="Brief about your Goal, Budget & Timeline.*"
            />
          </div>

          {/* Submit */}
          <div className="mt-10">
            <button className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="border-b border-black">SUBMIT</span>
            </button>

            <p className="text-sm text-gray-600 mt-6">
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