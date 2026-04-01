"use client";

import React from "react";

const Overview = () => {
  return (
    <section className="w-full">
      
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        gap-4 md:gap-6
        md:auto-rows-[220px] 
        lg:auto-rows-[250px]
      "
      >
        
        {/* IMG 1 */}
        <div className="overflow-hidden md:row-span-2 flex items-start">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/911b86203085493.669248c5b0691.png"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* IMG 2 */}
        <div className="overflow-hidden md:row-span-2 flex items-start">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8a5f1f203085493.6690ed4ea1131.png"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* IMG 3 */}
        <div className="overflow-hidden md:col-span-2 md:row-span-2">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png"
            className="w-full h-full object-cover"
          />
        </div>

        {/* IMG 4 */}
        <div className="overflow-hidden md:col-span-2 md:row-span-2">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a0d8c203085493.669b5e81b1932.png"
            className="w-full h-full object-cover"
          />
        </div>

        {/* IMG 5 */}
        <div className="overflow-hidden md:row-span-2 flex items-start">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/be2f47203085493.669248c5aeab3.png"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* IMG 6 */}
        <div className="overflow-hidden md:row-span-2 flex items-start">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/9d07b5203085493.669b5e81af856.png"
            className="w-full h-auto object-cover"
          />
        </div>

      </div>

    </section>
  );
};

export default Overview;