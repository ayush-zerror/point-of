import React from "react";

const CTASection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 
      bg-[#f3f3f1] dark:bg-black text-neutral-900 dark:text-white">
      
      <div className="text-center space-y-10">
        
        {/* HEADING */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light 
            text-black dark:text-neutral-400 leading-tight">
            Got a project in mind?
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light 
            text-black dark:text-neutral-400 leading-tight">
            Learn how we can help.
          </h2>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3 text-sm tracking-wide group cursor-pointer">
          
          {/* DOT */}
          <span className="w-1.5 h-1.5 bg-neutral-700 dark:bg-neutral-300 rounded-full" />

          {/* TEXT */}
          <span className="relative text-neutral-700 dark:text-neutral-300">
            LET’S TALK
            <span className="absolute left-0 -bottom-1 w-full h-[1px] 
              bg-neutral-700 dark:bg-neutral-300 
              scale-x-100 group-hover:scale-x-0 
              transition-transform origin-left duration-300" />
          </span>
        </div>

      </div>
    </section>
  );
};

export default CTASection;