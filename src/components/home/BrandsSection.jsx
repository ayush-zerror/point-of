import React from "react";
import Button from "../common/Button";

const logos = [
  "https://framerusercontent.com/images/f5tEzCq9SEshAyPmvmHwFwDwRw.png?scale-down-to=512",
  "https://framerusercontent.com/images/BL8goJzMhAaoO7CkplhamSYnPc.png?scale-down-to=512",
  "https://framerusercontent.com/images/ivg3Oth8MzfKRnx1RBFZzP5duM.png?scale-down-to=512",
  "https://framerusercontent.com/images/WVorucVaiyMByNUIs8xPRV9nOYg.png?scale-down-to=512",
  "https://framerusercontent.com/images/O9u7FsWZdWhYyxmvj4tO7SwfRw8.svg",
  "https://framerusercontent.com/images/0GGVO06ulbCq35T4OUvQ4UbB1w.png?scale-down-to=1024",
  "https://framerusercontent.com/images/XTOQUwb6Lu4L0ChMsustBWlk.png",
];

const BrandsSection = () => {
  return (
    <section className="w-full  py-24 md:py-52 bg-black">
      <div className="max-w-5xl m-auto">
        <p className="text-2xl md:text-4xl lg:text-5xl font-heading font-[200] leading-[1.3]">
          We partner with visionary entrepreneurs, industry leaders, &
          disruptive startups to build brands that spark change & drive global
          impact.
        </p>

        <div className="mt-8">
          <Button title={"OUR BRANDS"} />
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
