"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  useGSAP(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -250%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(videoRef.current, {
        transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
        duration: 1.5
      })
      .to(videoRef.current, {
        transform: "translate(-50%,-50%) scale(.5) rotateY(-20deg) rotateY(20deg)   rotateX(-2deg) rotateX(2deg)",
        duration: 1.5
      })
      .to(overlayRef.current, {
        top: "-300%",
        duration: 4
      })
      .to(videoRef.current, {
        transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
        duration: 1.5
      })
      .to(videoRef.current, {
        transform: "translate(-50%,-50%)",
        duration: 1.5
      })
    }, sectionRef);
    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-secondary"

      style={{ perspective: "4000px" }}
    >


      {/* VIDEO */}
      <div
        ref={videoRef}
        
        className="w-full h-full overflow-hidden"
        style={{  transformOrigin: "center center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) scale(1) rotateY(0deg) rotateX(0deg)" }}
      >
        <video
          src="/home/showreel.mp4"
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
        />
      </div>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute left-0 top-full w-full h-[300vh]"
      >

        {/* PANEL 1 */}
        <div className="relative h-screen flex items-center justify-center">
          <Image
            src="https://www.wearepointof.com/home/sticker1.png"
            alt="sticker"
            width={200}
            height={200}
            className="absolute top-10 left-10 rotate-[-10deg]"
          />

          <Image
            src="https://www.wearepointof.com/home/sticker2.png"
            alt="sticker"
            width={200}
            height={200}
            className="absolute bottom-10 right-10 rotate-10"
          />
        </div>

        {/* PANEL 2 */}
        <div className="relative h-screen flex items-center justify-center">
          <Image
            src="https://www.wearepointof.com/home/sticker3.png"
            alt="sticker"
            width={200}
            height={200}
            className="absolute top-10 left-28 -rotate-6"
          />

          <Image
            src="https://www.wearepointof.com/home/sticker4.png"
            alt="sticker"
            width={200}
            height={200}
            className="absolute bottom-10 right-10 rotate-[8deg]"
          />
        </div>

        {/* PANEL 3 */}
        <div className="relative h-screen flex items-center justify-center">
          <Image
            src="https://www.wearepointof.com/home/sticker5.png"
            alt="sticker"
            width={200}
            height={200}
            className="absolute top-10 left-10 -rotate-12"
          />

          <Image
            src="https://www.wearepointof.com/home/sticker6.png"
            alt="sticker"
            width={200}
            height={200}
            className="absolute bottom-10 right-10 rotate-12"
          />
        </div>

      </div>

    </section>
  );
}