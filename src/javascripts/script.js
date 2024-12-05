
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page2",
    scroller: "body",
    start: "top 0%",
    end: "top -400%",
    scrub: true,
    pin: true,
  }
 })
tl2

.to("#video-container", {
  clipPath: " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 1
})
.to("#video-container", {
  transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
  duration: 1.5
})
.to("#video-container", {
  transform: "translate(-50%,-50%) scale(.5) rotateY(-20deg) rotateY(20deg)   rotateX(-2deg) rotateX(2deg)",
  duration: 1.5
})
.to("#img-over", {
  top: "-300%",
  duration: 4
})
.to("#video-container", {
  transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
  duration: 1.5
})
.to("#video-container", {
  transform: "translate(-50%,-50%)",
  duration: 1.5
})

const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top 0%",
      end: "top -200%",
      scrub: 1,
      pin: true,
    }
   })
  
   tl3
   .to("#page3 svg",{
    transform:" rotateY(8deg) rotateX(2deg) scale(8) translateX(30%)",
    duration: 1.8,
    ease: "expo.out",
   },"a")
   .to("#page3 h4",{
    transform:" rotateY(8deg) rotateX(2deg) scale(2) translateX(-10%)",
    duration: 1.8,
    ease: "expo.out",
   },"a")