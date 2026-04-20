"use client";

export default function CaseStudyIntro({ caseStudy }) {
  const title = caseStudy?.title ?? "";
  const location = caseStudy?.location ?? "";
  const gist = caseStudy?.gist ?? "";
  const about = caseStudy?.about ?? "";
  const services = Array.isArray(caseStudy?.services) ? caseStudy.services : [];

  return (
    <section className="w-full bg-black text-white px-4 sm:px-10 md:px-16 lg:px-20 py-20 md:py-28">
      
      {/* SAME GRID STRUCTURE */}
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-start">
        
        {/* LEFT */}
        <div className="flex flex-col justify-between h-full">
          
          <div className="space-y-4">
            <h2 className="heading-xl text-heading font-normal">
              {title}
            </h2>

            <p className="heading-md text-desc">
              {location?.toUpperCase?.() ? location.toUpperCase() : location}
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          
          <h3 className="heading-xl text-subheading">
            {gist}
          </h3>

          <p className="para text-desc max-w-2xl">
            {about}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-6">
            {services.map((service) => (
              <button
                key={service}
                className="border border-white/20 px-6 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition"
              >
                {String(service).toUpperCase()}
              </button>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}