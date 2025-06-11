document.querySelector("#page1").addEventListener("mousemove", (e) => {
  const bg = document.querySelector("#page1 #bg");
  const pageRect = document.querySelector("#page1").getBoundingClientRect();

  const x = (e.clientX - pageRect.left) / pageRect.width;
  const y = (e.clientY - pageRect.top) / pageRect.height;

  const moveAmount = 20; // reduce from 100 to 30 for smoother movement

  gsap.to(bg, {
    x: -(x * moveAmount),
    y: -(y * moveAmount),
    duration: 0.5,
    ease: "power2.out"
  });
});

function page1Animation() {
  gsap.to("#about-hero-over", {
    opacity: 1,
    y: -200,
    duration:1, 
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top 0%", 
      end: "top -100%",   
      scrub: 1,         
      // markers: true
    }
  });
}
page1Animation();

function page2Animation() {
  gsap.fromTo("#page2 .accordion", {
    opacity: 0,
    x: 100,
  }, {
    opacity: 1,
    x: 0,
    stagger: 0.4,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top 50%",
      end: "top 0%",
      // scrub: true,
      // markers:true
    }
  })
}
page2Animation()

function page5Animation() {
  gsap.fromTo("#page5-top .box", {
    opacity: 0,
    y: 50,
  }, {
    opacity: 1,
    y: 0,
    stagger:.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page5-top",
      scroller: "body",
      start: "top 50%",
      end: "top 20%",
      // scrub: true,
      // markers:true
    }
  })
}
page5Animation()









function ringAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "body",
      start: "top -120%",
      end: "top -220%",
      // markers:true,
      pin: true,
      scrub: 1
    }
  })

  tl
  tl.to(".ring-circle", {
    transform: `translateX(-50%) rotateX(0deg)`,
    stagger: 0.7,
    //   ease: "power2.out", // smoother ease
    duration: 1.2
  });
}
if(window.innerWidth >600){
  ringAnimation()
}

function page6Animation() {
  gsap.fromTo("#page6 .box-pg6", {
    opacity: 0,
    y: 50,
  }, {
    opacity: 1,
    y: 0,
    stagger:.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page6-cont",
      scroller: "body",
      start: "top 50%",
      end: "top 20%",
      // scrub: true,
      // markers:true
    }
  })
}
page6Animation()

function footerNavSwitch() {

    var ftl = gsap.timeline({
        scrollTrigger: {
            trigger: "#footer",
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
if(window.innerWidth > 600){
    footerNavSwitch()
}