var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  loop: true, // Enable infinite loop
  freeMode: true, // Allow free dragging
  centeredSlides: false, // Don't center the slides
  freeModeMomentum: true, // Enable smooth momentum
  freeModeMomentumRatio: 0.5, // Control the momentum speed (lower = slower, smoother)
  freeModeMomentumBounce: false, // Prevent bounce effect
  speed: 600, // Adjust slide transition speed
});


function page1Animation() {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top 0%",
      end: "top -200%",
      scrub: 1,
      pin: true,
    }
  })

  tl1
    .to("#page1 h1", {
      transform: " rotateY(8deg) rotateX(2deg) scale(9) translateX(30%)",
      duration: 1.2,
      ease: "expo.out",
    }, "a")
    .to("#page1 h4", {
      transform: " rotateY(8deg) rotateX(2deg) scale(1.8) translateX(-10%)",
      duration: 1.2,
      ease: "expo.out",
    }, "a")
    .to("#hero-video", {
      top: "0%",
      delay: -.4
      // duration: 1.8,
    })


}
page1Animation()

var tll = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    scroller: "body",
    start: "top 60%",
    end: "top -150%",
    scrub: 1,
  }
})
tll
  .to("#cir1,#cir2", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    duration: .1,
  })
  .to("#cir1", {
    left: "22.5%",
    duration: .1,
  }, "a")
  .to("#cir2", {
    left: "22.5%",
    duration: .1,
  }, "a")
  .to("#cir1", {
    display: "none",
    duration:0,
  })
  .to("#cir2", {
    transform: "translateY(-50%) scale(3)",
    duration: .1,
  })
  .to("#cir2", {
    transform: "translateY(-50%) scale(.8)",
    duration: .1,
  })
  .to("#cir2", {
    transform: "translateY(-50%) scale(1)",
    duration: .1,
  })
  .to("#cir2", {
    left: "30%",
    duration: .1,
  })
  .to("#cir2", {
    left: "10%",
    duration: .1,
  })
  .to("#cir2", {
    left: "22.5%",
    duration: .1,
  })
  .to("#cir2", {
    top: "20%",
    duration: .1,
  })
  .to("#cir2", {
    left: "50%",
    transform: "translate(-50%,-50%) scale(1)",
    duration: .1,
  })
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    scroller: "body",
    start: "top 0%",
    end: "top -100%",
    scrub: 1,
    pin: true,
  }
})
tl
  .to("#service-content >h2", {
    transform: "translateX(30%)",
    duration: .5,
    opacity: 0,
    filter: "blur(50px)",
    stagger: {
      amount: .3
    },
  })
  .to("#service-content2 h2", {
    transform: "translateX(0%)",
    duration: .5,
    opacity: 1,
    stagger: {
      amount: .3
    },
  })



function page4Animation() {
  const page4WrapperWidth = document.querySelector("#project-wrapper").scrollWidth
  const slideValue = page4WrapperWidth - window.innerWidth

  gsap.to("#project-wrapper", {
    transform: `translateX(-${slideValue + 100}px)`,
    duration: 1,
    ease: "linear",
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      // markers: true,
      start: "top top",
      end: "top -200%",
      scrub: 1,
      pin: true,
    }
  })
}
page4Animation()


function page5Animation() {

  const tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "body",
      start: "top 0%",
      end: "top -400%",
      scrub: true,
      pin: true,
    }
  })
  tl5

    .to("#cir2", {
      opacity: 0
    },"c")
    .to("#page5", {
      opacity: 1
    },"c")
    .to("#page5", {
      maskSize: "200%",
      duration:4,
      delay:-.2
    })
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


}
page5Animation()


