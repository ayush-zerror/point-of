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

  const words = document.querySelectorAll(".word-style");

  let index = 0;
  setInterval(function () {
    gsap.to(words[index], {
      top: "-100%",
      duration: 0.8,
      onComplete: function () {
        gsap.set(this._targets[0], { top: "100%" });
      }
    });

    // Increment index before checking if it's the last element
    index = index === words.length - 1 ? 0 : index + 1;

    gsap.to(words[index], {
      top: "0%",
      duration: 0.8,
    });
  }, 3000);


  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top 0%",
      end: "top -200%",
      scrub: 1,
      pin: true,
      anticipatePin: 1, // Helps smooth out pin transitions
    }
  });

  tl1
    .to("#page1 h1", {
      transform: "rotateY(8deg) rotateX(2deg) scale(9) translateX(20%)", // Simplified transform
      duration: 1.2,
      ease: "power3.out", // Less taxing easing function
    }, "a")
    .to("#page1 h4", {
      transform: "scale(1.8) rotateY(8deg) rotateX(2deg) translateX(-10%)", // Simplified transform
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "a")
    .to("#hero-video", {
      top: "0%",
      duration: 1.8, // Ensure a smooth duration
      ease: "power3.out",
    }); // Align with other animations


}
page1Animation()

var clutter = ""
document.querySelector("#page2-text").textContent.split(" ").forEach((w) => {
  clutter += `<span> ${w}</span>`
})

document.querySelector("#page2-text").innerHTML = clutter

gsap.to(document.querySelectorAll("#page2-text span"), {
  opacity: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "body",
    start: "top 0%",
    end: "top -100%",
    scrub: 1,
    pin: true,
    anticipatePin: 1, // Helps smooth out pin transitions

  }
})


var tll = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    scroller: "body",
    start: "top 60%",
    end: "top 0%",
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
    duration: 0,
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


var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    scroller: "body",
    start: "top 0%",
    end: "top -300%",
    scrub: 1,
    pin: true,
    anticipatePin: 1, // Helps smooth out pin transitions

  }
});

tl
  .to("#service-content >h2", {
    transform: "translateX(30%)",
    duration: 1.2,
    opacity: 0,
    filter: "blur(50px)",
    stagger: {
      amount: 0.3
    },
    ease: "power2.out",
  })
  .to("#service-content2 h2", {
    transform: "translateX(0%)",
    duration: 1.2,
    opacity: 1,
    stagger: {
      amount: 0.3
    },
    ease: "power2.inOut",
  }, "s")

  .to("#cir2", {
    left: "47.65%",
    duration: 1,
    ease: "power2.inOut"
  }, "s")
  .to("#cir2", {
    opacity: 0,
    duration: 0,
    ease: "power2.inOut"
  }, "o")
  .to("#text-cir", {
    opacity: 1,
    duration: 0,
    ease: "power2.inOut"
  }, "o")
  .to("#text-cir", {
    top: "8.5%",
    duration: 1,
    ease: "power2.inOut"
  }, "b")
  .to("#ser2,#ser3,#ser4,#ser5,#ser6", {
    filter: "blur(4px)",
    opacity: 0.4,
    duration: 1,
    ease: "power2.inOut"
  }, "p1")
  .to("#para1", {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
  }, "p1")
  .to("#text-cir", {
    top: "25%",
    duration: 1,
    delay: 1,
    ease: "power2.inOut"
  }, "p2")
  .to("#ser1,#ser3,#ser4,#ser5,#ser6", {
    filter: "blur(4px)",
    opacity: 0.4,
    duration: 1,
    delay: 1,
    ease: "power2.inOut"
  }, "p2")
  .to("#ser2", {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    delay: 1,
    ease: "power2.inOut"
  }, "p2")
  .to("#para1", {
    opacity: 0,
    duration: 0,
    delay: 1,
    ease: "power2.inOut"
  }, "p2")
  .to("#para2", {
    opacity: 1,
    duration: 1,
    delay: 1,
    ease: "power2.inOut"
  }, "p2")

  .to("#text-cir", {
    top: "41.5%",
    duration: 1,
    delay: 2,
    ease: "power2.inOut"
  }, "p3")
  .to("#ser1,#ser2,#ser4 ,#ser5,#ser6", {
    filter: "blur(4px)",
    opacity: 0.4,
    duration: 1,
    delay: 2,
    ease: "power2.inOut"
  }, "p3")
  .to("#ser3", {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    delay: 2,
    ease: "power2.inOut"
  }, "p3")
  .to("#para2", {
    opacity: 0,
    duration: 0,
    delay: 2,
    ease: "power2.inOut"
  }, "p3")
  .to("#para3", {
    opacity: 1,
    duration: 1,
    delay: 2,
    ease: "power2.inOut"
  }, "p3")

  .to("#text-cir", {
    top: "58%",
    duration: 1,
    delay: 3,
    ease: "power2.inOut"
  }, "p4")
  .to("#ser1,#ser2,#ser3,#ser5,#ser6", {
    filter: "blur(4px)",
    opacity: 0.4,
    duration: 1,
    delay: 3,
    ease: "power2.inOut"
  }, "p4")
  .to("#ser4", {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    delay: 3,
    ease: "power2.inOut"
  }, "p4")
  .to("#para3", {
    opacity: 0,
    duration: 0,
    delay: 3,
    ease: "power2.inOut"
  }, "p4")
  .to("#para4", {
    opacity: 1,
    duration: 1,
    delay: 3,
    ease: "power2.inOut"
  }, "p4")

  .to("#text-cir", {
    top: "74.5%",
    duration: 1,
    delay: 4,
    ease: "power2.inOut"
  }, "p5")
  .to("#ser1,#ser2,#ser3,#ser4,#ser6", {
    filter: "blur(4px)",
    opacity: 0.4,
    duration: 1,
    delay: 4,
    ease: "power2.inOut"
  }, "p5")
  .to("#ser5", {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    delay: 4,
    ease: "power2.inOut"
  }, "p5")
  .to("#para4", {
    opacity: 0,
    duration: 0,
    delay: 4,
    ease: "power2.inOut"
  }, "p5")
  .to("#para5", {
    opacity: 1,
    duration: 1,
    delay: 4,
    ease: "power2.inOut"
  }, "p5")

  .to("#text-cir", {
    top: "91%",
    duration: 1,
    delay: 5,
    ease: "power2.inOut"
  }, "p6")
  .to("#ser1,#ser2,#ser3,#ser4,#ser5", {
    filter: "blur(4px)",
    opacity: 0.4,
    duration: 1,
    delay: 5,
    ease: "power2.inOut"
  }, "p6")
  .to("#ser6", {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    delay: 5,
    ease: "power2.inOut"
  }, "p6")
  .to("#para5", {
    opacity: 0,
    duration: 0,
    delay: 5,
    ease: "power2.inOut"
  }, "p6")
  .to("#para6", {
    opacity: 1,
    duration: 1,
    delay: 5,
    ease: "power2.inOut"
  }, "p6")

  .to("#text-cir", {
    top: "50%",
    duration: 1.1,
    ease: "power2.inOut"
  }, "p7")
  .to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6", {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
  }, "p7")
  .to("#para6", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut"
  }, "p7")

  .to("#cir2", {
    opacity: 1,
    duration: .6,
    ease: "power2.inOut"
  }, "e")
  .to("#text-cir", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut"
  }, "e")
  .to("#cir2", {
    left: "20%",
    duration: 1.2,
    ease: "power2.inOut"
  })



function page4Animation() {


  gsap.to("#cir2", {
    left: "49vw",
    width: "0.65vw",
    height: "0.65vw",
    backgroundColor: "transparent",
    transform: "translate(-50%,-50%) scale(1)",
    duration: 1,
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top 85%",
      end: "top 70%",
      scrub: 1,
    }
  })

  const page4WrapperWidth = document.querySelector("#project-wrapper").scrollWidth
  const slideValue = page4WrapperWidth - window.innerWidth

  var tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top top",
      end: "top -180%",
      scrub: 1,
      pin: true,
    }
  })

  tl4
    .to("#project-wrapper", {
      transform: `translateX(-${slideValue}px)`,
      duration: 1,
      ease: "linear",
    })
    .to(".view-all .cirr", {
      opacity: 1,
      duration: 0
    }, "c")
    .to("#cir2", {
      opacity: 0,
      duration: 0,
    }, "c")
    .to(".view-all .cirr", {
      width: "2.5vw",
      height: "2.5vw",
      backgroundColor: "var(--secondary)",
      duration: .2,
    }, "s")
    .to(".view-all .cirr i", {
      opacity: 1,
      duration: .1,
      delay: 0.1
    }, "s")
    .to("#cir2", {
      left: "50%",
      duration: .1,
    }, "s")
    .to("#cir2", {
      width: "1.5vw",
      height: "1.5vw",
      opacity: 1,
      backgroundColor: "var(--secondary)",
      duration: .1,
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
      scrub: 1,
      pin: true,
    }
  })
  tl5

    .fromTo("#cir2", {
      opacity: 1,
    }, {
      opacity: 0,
      duration: .1,
    }, "c")
    .to("#page5", {
      opacity: 1,
      duration: .1
    }, "c")
    .to("#page5", {
      maskSize: "200%",
      duration: 4,
      delay: -.2
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


