function page2NavSwitch() {

    var ftl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page2",
            scroller: "body",
            start: "top 60%",
            end: "top 0%",
            scrub: 1,
        }
    })
    ftl
        .to("#navbar", {
            opacity: 0,
            pointerEvent: "none",
            duration: .5
        }, "a")
        .to("#navbar-black", {
            opacity: 1,
            pointerEvent: "all",
            duration: .5
        }, "a")


}
page2NavSwitch()

 const tl6s = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top 0%",
      end: "top -5%",
      scrub: 1,
      // markers:true
    }
  })
  tl6s
    .to("#navbar-black", {
      opacity: 0,
      pointerEvents: "none",
      duration: .2
    }, "a")
    .to("#navbar", {
      opacity: 1,
      pointerEvents: "all",
      duration: .2
    }, "a")




var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page5",
        scroller:"body",
        start:"top -120%",
        end:"top -220%",
        // markers:true,
        pin:true,
        scrub:1
    }
})

tl
tl.to(".ring-circle", {
  transform: `translateX(-50%) rotateX(0deg)`,
  stagger: 0.7,
//   ease: "power2.out", // smoother ease
  duration: 1.2
});