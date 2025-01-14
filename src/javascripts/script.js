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

var whiteNav = `linear-gradient(
  180deg,
  #F2F2EE 0,
  hsla(0, 0%, 94.1%, .987) 11%,  
  hsla(0, 0%, 94.1%, .951) 20.8%, 
  hsla(0, 0%, 94.1%, .896) 29.6%, 
  hsla(0, 0%, 94.1%, .825) 37.5%, 
  hsla(0, 0%, 94.1%, .741) 44.6%, 
  hsla(0, 0%, 94.1%, .648) 51%,   
  hsla(0, 0%, 94.1%, .55) 57%,    
  hsla(0, 0%, 94.1%, .45) 62.5%,  
  hsla(0, 0%, 94.1%, .352) 67.7%,  
  hsla(0, 0%, 94.1%, .259) 72.7%,  
  hsla(0, 0%, 94.1%, .175) 77.8%,  
  hsla(0, 0%, 94.1%, .104) 82.9%,  
  hsla(0, 0%, 94.1%, .049) 88.2%,  
  hsla(0, 0%, 94.1%, .013) 93.9%,  
  hsla(0, 0%, 94.1%, 0)
)`

var blackNav = `linear-gradient(
  180deg,
  #000000 0,
  hsla(0, 0%, 0%, .987) 11%,  
  hsla(0, 0%, 0%, .951) 20.8%, 
  hsla(0, 0%, 0%, .896) 29.6%, 
  hsla(0, 0%, 0%, .825) 37.5%, 
  hsla(0, 0%, 0%, .741) 44.6%, 
  hsla(0, 0%, 0%, .648) 51%,   
  hsla(0, 0%, 0%, .55) 57%,    
  hsla(0, 0%, 0%, .45) 62.5%,  
  hsla(0, 0%, 0%, .352) 67.7%,  
  hsla(0, 0%, 0%, .259) 72.7%,  
  hsla(0, 0%, 0%, .175) 77.8%,  
  hsla(0, 0%, 0%, .104) 82.9%,  
  hsla(0, 0%, 0%, .049) 88.2%,  
  hsla(0, 0%, 0%, .013) 93.9%,  
  hsla(0, 0%, 0%, 0)
)`

const cursor = document.querySelector("#drag-cursor")
window.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    top: e.clientY,
    left: e.clientX,
  })
})
window.addEventListener("mousedown", function (e) {
  gsap.to(cursor, {
    top: e.clientY,
    left: e.clientX,
  })
})
window.addEventListener("mouseup", function (e) {
  gsap.to(cursor, {
    top: e.clientY,
    left: e.clientX,
  })
})

document.querySelector("#page6").addEventListener("mouseenter", function (e) {
  gsap.to(cursor, {
    opacity: 1,
  })
})
document.querySelector("#page6").addEventListener("mouseleave", function (e) {
  gsap.to(cursor, {
    opacity: 0,
  })
})

var muted = true
document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("mouseenter", function (e) {
    if (muted) {
      cursor.querySelector("h6").textContent = "Play"
    }
    else {
      cursor.querySelector("h6").textContent = "Pause"
    }
  })
})
document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("mouseleave", function (e) {
    cursor.querySelector("h6").textContent = "Drag"
  })
})


document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("click", function (e) {
    if (muted) {
      vid.muted = false
      muted = false
    }
    else {
      vid.muted = true
      muted = true
    }
  })
})

function page1Animation() {

  // document.querySelectorAll(".word-style").forEach((w)=>{
  //   var clutter= ""
  //   w.textContent.split("").forEach((l)=>{
  //     clutter += `<span>${l}</span>`
  //   })
  //   w.innerHTML = clutter
  // })


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


function page2Animation() {

  const tl2s = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top 15%",
      end: "top 10%",
      scrub: true,
      // markers: true
    }
  })
  tl2s
    .to("#navbar", {
      background:blackNav ,
      duration: .5,
    },"f")
    .to("#mode,#logo,#menu",{
      filter:"invert(1)",
      duration:.5
    },"f")

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


}
page2Animation()

function pointStartAnimation() {


  let mode = localStorage.getItem("mode") === "true";
  var colorToApply = mode === "true" ? blackNav : whiteNav

  const tl3s = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top 15%",
      end: "top 10%",
      scrub: true,
      // markers: true
    }
  })
  tl3s
    .to("#navbar", {
      background: colorToApply,
      duration: .5
    },"e")
    .to("#mode,#logo,#menu",{
      filter:`invert(${mode ? 1 : 0})`,
      duration:.5
    },"e")


  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top 70%",
      end: "top 0%",
      scrub: 1,
    }
  })
  tl3
    .to(".service-cir1,.service-cir2", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: .8,
    })
    .to(".service-cir1,.service-cir2", {
      left: "50%",
      duration: 1,
    })
    .to(".service-cir2", {
      opacity: 0,
      duration: .4,
    })
    .to(".service-cir1", {
      transform: "translate(-50%, -50%) scale(2)",
      duration: .8,
    })
    .to(".service-cir1", {
      transform: "translate(-50%, -50%) scale(1)",
      duration: .8,
    })

}
pointStartAnimation()


function pointMidAnimation() {


  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top 0%",
      end: "top -350%",
      scrub: 2,
      pin: true,
      anticipatePin: 1, // Helps smooth out pin transitions

    }
  });

  tl
    .to(".service-cir1", {
      left: "18%",
      duration: .8,
    })
    .to(".service-cir1", {
      left: "50%",
      transform: "translate(-50%, -50%) scale(.6)",
      duration: 1,
    })
    .to(".service-cir1", {
      left: "95.8%",
      transform: "translate(-50%, -50%) scale(1)",
      duration: 1,
    })
    .to("#text-cir", {
      opacity: 1,
      duration: .4,
    })
    .to(".service-cir1", {
      left: "95.8%",
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0)",
      duration: .4,
    })

    .to("#service-content >h2", {
      transform: "translateX(30%)",
      duration: 1.2,
      opacity: 0,
      filter: "blur(50px)",
      stagger: {
        amount: 0.3
      },
    })
    .to("#service-content2 h2", {
      transform: "translateX(0%)",
      duration: 1.2,
      opacity: 1,
      stagger: {
        amount: 0.3
      },
    })

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
      delay: .5,
      ease: "power2.inOut"
    }, "p2")
    .to("#ser1,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: 0.4,
      duration: 1,
      delay: .5,
      ease: "power2.inOut"
    }, "p2")
    .to("#ser2", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1,
      delay: .5,
      ease: "power2.inOut"
    }, "p2")
    .to("#para1", {
      opacity: 0,
      duration: 0,
      delay: .5,
      ease: "power2.inOut"
    }, "p2")
    .to("#para2", {
      opacity: 1,
      duration: 1,
      delay: .5,
      ease: "power2.inOut"
    }, "p2")

    .to("#text-cir", {
      top: "41.5%",
      duration: 1,
      delay: 1,
      ease: "power2.inOut"
    }, "p3")
    .to("#ser1,#ser2,#ser4 ,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: 0.4,
      duration: 1,
      delay: 1,
      ease: "power2.inOut"
    }, "p3")
    .to("#ser3", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1,
      delay: 1,
      ease: "power2.inOut"
    }, "p3")
    .to("#para2", {
      opacity: 0,
      duration: 0,
      delay: 1,
      ease: "power2.inOut"
    }, "p3")
    .to("#para3", {
      opacity: 1,
      duration: 1,
      delay: 1,
      ease: "power2.inOut"
    }, "p3")

    .to("#text-cir", {
      top: "58%",
      duration: 1,
      delay: 1.5,
      ease: "power2.inOut"
    }, "p4")
    .to("#ser1,#ser2,#ser3,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: 0.4,
      duration: 1,
      delay: 1.5,
      ease: "power2.inOut"
    }, "p4")
    .to("#ser4", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: "power2.inOut"
    }, "p4")
    .to("#para3", {
      opacity: 0,
      duration: 0,
      delay: 1.5,
      ease: "power2.inOut"
    }, "p4")
    .to("#para4", {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: "power2.inOut"
    }, "p4")

    .to("#text-cir", {
      top: "74.5%",
      duration: 1,
      delay: 2,
      ease: "power2.inOut"
    }, "p5")
    .to("#ser1,#ser2,#ser3,#ser4,#ser6", {
      filter: "blur(4px)",
      opacity: 0.4,
      duration: 1,
      delay: 2,
      ease: "power2.inOut"
    }, "p5")
    .to("#ser5", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1,
      delay: 2,
      ease: "power2.inOut"
    }, "p5")
    .to("#para4", {
      opacity: 0,
      duration: 0,
      delay: 2,
      ease: "power2.inOut"
    }, "p5")
    .to("#para5", {
      opacity: 1,
      duration: 1,
      delay: 2,
      ease: "power2.inOut"
    }, "p5")

    .to("#text-cir", {
      top: "91%",
      duration: 1,
      delay: 2.5,
      ease: "power2.inOut"
    }, "p6")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5", {
      filter: "blur(4px)",
      opacity: 0.4,
      duration: 1,
      delay: 2.5,
      ease: "power2.inOut"
    }, "p6")
    .to("#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1,
      delay: 2.5,
      ease: "power2.inOut"
    }, "p6")
    .to("#para5", {
      opacity: 0,
      duration: 0,
      delay: 2.5,
      ease: "power2.inOut"
    }, "p6")
    .to("#para6", {
      opacity: 1,
      duration: 1,
      delay: 2.5,
      ease: "power2.inOut"
    }, "p6")

}
pointMidAnimation()


function page4Animation() {

  var tl3e = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top 81%",
      end: "top 79%",
      scrub: true,
    }
  })

  tl3e
    .to("#text-cir", {
      opacity: 0,
      duration: .8,
    }, "c")
    .to("#cir2m", {
      opacity: 1,
      duration: .8,
    }, "c")


  var tl4e = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top 75%",
      end: "top 60%",
      scrub: 1,
    }
  })
  tl4e
    .to("#cir2m", {
      left: "49vw",
      width: "0.65vw",
      height: "0.65vw",
      backgroundColor: "transparent",
      transform: "translate(-50%,-50%) scale(1)",
      duration: 1,
    }, "c")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1,
    }, "c")
    .to("#para6", {
      opacity: 0,
      duration: 1,
    }, "c")

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
    .to("#cir2m", {
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
    .to("#cir2m", {
      left: "50%",
      duration: .1,
    }, "s")
    .to("#cir2m", {
      width: "2.5vw",
      height: "2.5vw",
      opacity: 1,
      backgroundColor: "var(--secondary)",
      duration: .1,
    })
    .to(".view-all .cirr", {
      opacity: 0,
      duration: .3,
    })
}
page4Animation()


function page5Animation() {

  let mode1 = localStorage.getItem("mode") === "true";
  var colorToApply1 = mode1 === "true" ?  whiteNav : blackNav


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
    .to("#page5", {
      opacity: 1,
      duration: .1
    }, "c")
    .to("#page5", {
      maskSize: "200%",
      duration: 4,
      delay: -.2
    })
    .to("#mode,#logo,#menu",{
      filter:`invert(${mode1 ? 0 : 1})`,
      duration:.5,
      delay: -3
    },"m")
    .to("#navbar", {
      background: colorToApply1,
      duration: .5,
      delay: -3
    },"m")
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



const tl3s = gsap.timeline({
  scrollTrigger: {
    trigger: "#page6",
    scroller: "body",
    start: "top 15%",
    end: "top 10%",
    scrub: true,
    markers: true
  }
})
tl3s
  .to("#navbar", {
    background: whiteNav,
    duration: .5
  },"e")
  .to("#mode,#logo,#menu",{
    filter:`invert(0)`,
    duration:.5
  },"e")



const tlf = gsap.timeline({
  scrollTrigger: {
    trigger: "#footer",
    scroller: "body",
    start: "top 15%",
    end: "top 10%",
    scrub: true,
    // markers: true
  }
})
tlf
  .to("#navbar", {
    background: blackNav,
    duration: .5
  },"m")
  .to("#mode,#logo,#menu",{
    filter:"invert(1)",
    duration:.5
  },"m")