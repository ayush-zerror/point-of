var swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  touchRatio: 1.2,               // Slightly more sensitive than default
  threshold: 5,                  // Lower = easier to trigger slide
  touchStartPreventDefault: true, // default is true – keeps drag behavior clean
  resistance: true,              // Enable edge resistance
  resistanceRatio: 0.85,         // Prevent sticky feel near edges
  longSwipes: true,
  longSwipesRatio: 0.3,          // 0.3 = faster to trigger long swipe
  longSwipesMs: 300              // shorter duration swipe counts as a swipe
});


gsap.registerPlugin(TextPlugin);

const headerData = [
  "creativity? ",
  "design innovation?",
  "circular design?",
  "storytelling?",
  "brand loyalty?",
  "human-centered design?",
  "creative disruption?",
  "emotional design?",
  "design thinking?",
  "design ethics?",
  "design for social impact?",
  "beauty in functional design?",
  "AI as a creative partner?",
  "emotion in brand design?"
];

const changingHeader = document.querySelector(".thirdh");
let index = 0;

function typeWriter(text, onComplete) {
  let tl = gsap.timeline({ onComplete });

  for (let i = 0; i <= text.length; i++) {
    tl.to(changingHeader, {
      text: text.substring(0, i),
      duration: 0.05,
      ease: "none"
    });
  }

  return tl;
}

function backspaceText(currentText, onComplete) {
  let tl = gsap.timeline({ onComplete });

  for (let i = currentText.length; i >= 0; i--) {
    tl.to(changingHeader, {
      text: currentText.substring(0, i),
      duration: 0.03,
      ease: "none"
    });
  }

  return tl;
}

function changeHeader() {
  const currentText = changingHeader.textContent;
  const nextText = headerData[index];

  backspaceText(currentText, () => {
    typeWriter(nextText, () => {
      setTimeout(() => {
        index = (index === headerData.length - 1) ? 0 : index + 1;
        changeHeader();
      }, 2000); // pause after typing before next backspace
    });
  });
}
changeHeader();


function loader() {
  document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll("#title-hero h1").forEach(function (h) {
      let clutter = "";
      h.textContent.split("").forEach(function (l) {
        if (l === " ") {
          clutter += `<span>&nbsp;</span>`; // Use &nbsp; for non-breaking space
        } else {
          clutter += `<span>${l}</span>`;
        }
      });
      h.innerHTML = clutter;
    });

    var loader = gsap.timeline()

    loader
      .to("#curtain1", {
        clipPath: " polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: .8,
        delay: .4,
        ease: "power2.in",
      }, "a")

      .to("#curtain2", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: .8,
        delay: .3,
        ease: "power2.in",
      }, "a")
      .to(".firsth span", {
        y: "-100%",
        stagger: {
          amount: .2,
        },
        duration: .6,
        delay: .8,
        onComplete: function () {
          gsap.set(".firsth span", { y: "100%" })
        }
      }, "a")
      .to(".secondh span", {
        y: "-100%",
        stagger: {
          amount: .2,
        },
        duration: .6,
        delay: .8,
      }, "a")
      .to("#curtain2", {
        clipPath: " polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: .8,
        ease: "power2.in",
      }, "b")

      .to(".secondh span", {
        y: "-200%",
        stagger: {
          amount: .2,
        },
        duration: .6,
        delay: .2,
        onComplete: function () {
          gsap.set(".secondh span", { y: "0%" })
        }
      }, "b")
      .to(".thirdh span", {
        y: "-100%",
        stagger: {
          amount: .2,
        },
        duration: .6,
        delay: .2
      }, "b")
      .to("#page1 h1", {
        duration: 1,
        color: "var(--secondary)"
      }, "c")
      .to("#page1 h1 span", {
        duration: 1,
        color: "var(--secondary)"
      }, "c")
      .to(".toph", {
        left: "50%",
        transform: "translate(-50%,0%)",
        duration: 1
      }, "c")
      .to("#title-hero", {
        left: "50%",
        transform: "translate(-50%,0%)",
        duration: .9
      }, "c")
      .to("#navbar", {
        top: "0%",
        duration: .6,
        opacity: 1
      }, "c")
      .to("#page1-over", {
        duration: .6,
        opacity: 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        onComplete: () => {
          gsap.set(".thirdh", { top: 0 })
          // Once the first animation is complete, start the text-changing animation
          changeHeader();
        }
      })


    // window.addEventListener("mousemove", function (e) {
    //   gsap.to("#page1-over", {
    //     top: window.innerHeight / 2 - (e.clientY - window.innerHeight / 2) * 0.3,
    //     left: window.innerWidth / 2 - (e.clientX - window.innerWidth / 2) * 0.3,
    //     duration: 1.2, // Smooth slow effect
    //     ease: "power2.out",
    //   });
    // });

  })



}
// loader()



const cursor = document.querySelector("#cursor")
window.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    top: e.clientY,
    left: e.clientX,
  })
  gsap.to("#small-cursor", {
    top: e.clientY,
    left: e.clientX,
    duration: 0,
  })
  gsap.to("#playCur", {
    top: e.clientY,
    left: e.clientX,
    transform: "translate(-50%,-50%)",
    duration: 0
  })
})
document.querySelectorAll(".cursor-scale").forEach(function (elem) {
  elem.addEventListener("mouseenter", function (e) {
    gsap.to(cursor, {
      width: "2.5vw",
      height: "2.5vw",
    })
  })
})
document.querySelectorAll(".cursor-scale").forEach(function (elem) {
  elem.addEventListener("mouseleave", function (e) {
    gsap.to(cursor, {
      width: "1.2vw",
      height: "1.2vw",
    })
  })
})



function page2Animation() {
  document.querySelectorAll(".page2-text").forEach(function (text) {
    var clutter = ""
    text.textContent.split(" ").forEach((w) => {
      clutter += `<span> ${w}</span>`
    })
    text.innerHTML = clutter
  })


  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top 10%",
      end: "top 0%",
      scrub: 1,
      // markers: true
    }
  })

  tl2
    .to("#circle2", {
      opacity: 1,
      duration: .8
    }, "a")
    .to("#navbar", {
      opacity: 0,
      pointerEvents: "none",
      duration: .2
    }, "a")
    .to("#navbar-black", {
      opacity: 1,
      pointerEvents: "all",
      duration: .2
    }, "a")
    .to('.gradient',{
      opacity:0,
      duration:.5,
      delay:-.2
    },"a")


  var tl22 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top 0%",
      end: "top -140%",
      scrub: 1,
      pin: true,
      anticipatePin: 1, // Helps smooth out pin transitions

    }
  })
  tl22
    .to(document.querySelectorAll(".page2-text1 span"), {
      opacity: 1,
      stagger: 0.2,
    })
    .to(document.querySelectorAll(".page2-text2 span"), {
      opacity: 1,
      stagger: 0.2,
    })
    .to("#circle2", {
      width: "1.5vw",
      height: "1.5vw",
      // filter: "blur(0px)",
      duration: 8,
      autoRound: false
    }, "a")
    .to("#navbar-black", {
      opacity: 0,
      pointerEvents: "none",
      duration: .2
    }, "b")
    .to("#navbar", {
      opacity: 1,
      pointerEvents: "all",
      duration: .2
    }, "b")



}
page2Animation()


function pointMidAnimation() {

  const page3 = document.querySelector("#page3");
  const h2 = document.querySelector("#h1height");
  const h22 = document.querySelector("#h1height2");

  let positionFromPage3Top = h2.getBoundingClientRect().top - page3.getBoundingClientRect().top + h2.offsetHeight / 2
  let diff = (h22.getBoundingClientRect().top - h2.getBoundingClientRect().top) - .2

  var tlc = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top 100%",
      end: "top 5%",
      scrub: 1,
      // markers: true
    }
  })

  tlc
    .to("#circle2", {
      top: positionFromPage3Top,
      transform: "translate(-50%,-50%) scale(1)",
      duration: 3,
    })



  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
    }
  });

  tl

    // .to("#right-content > h2", {
    //   x: 300,
    //   filter: "blur(4px)",
    //   opacity: 0,
    //   duration: .8,
    //   stagger: {
    //     amount: 0.2,
    //   },
    //   delay: .2
    // })
    // .to("#right-content-top > h2", {
    //   transform: "translateX(0%)",
    //   opacity: 1,
    //   duration: .8,
    //   stagger: {
    //     amount: 0.2,
    //   }
    // }, "bk")
    .to("#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
    }, "a")
    .to("#para1", {
      opacity: .5,
      duration: .4
    }, "a")

    .to("#circle2", {
      top: positionFromPage3Top + diff * 1,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    }, "b")
    .to("#ser1,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "b")
    .to("#ser2", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "b")
    .to("#para1", {
      opacity: 0,
      duration: .4,
      delay: 1
    }, "b")
    .to("#para2", {
      opacity: .5,
      duration: .4,
      delay: 1.4
    }, "b")

    .to("#circle2", {
      top: positionFromPage3Top + diff * 2,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    }, "c")
    .to("#ser1,#ser2,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "c")
    .to("#ser3", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "c")
    .to("#para2", {
      opacity: 0,
      duration: .4,
      delay: 1
    }, "c")
    .to("#para3", {
      opacity: .5,
      duration: .4,
      delay: 1.4
    }, "c")

    .to("#circle2", {
      top: positionFromPage3Top + diff * 3,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    }, "d")
    .to("#ser1,#ser2,#ser3,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "d")
    .to("#ser4", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "d")
    .to("#para3", {
      opacity: 0,
      duration: .4,
      delay: 1
    }, "d")
    .to("#para4", {
      opacity: .5,
      duration: .4,
      delay: 1.4
    }, "d")

  // .to("#circle2", {
  //   top: positionFromPage3Top + diff * 4,
  //   transform: "translate(-50%,-50%) scale(1)",
  //   duration: .8,
  //   delay: 1
  // }, "e")
  // .to("#ser1,#ser2,#ser3,#ser4,#ser6", {
  //   filter: "blur(4px)",
  //   opacity: .4,
  //   duration: .5,
  //   delay: 1
  // }, "e")
  // .to("#ser5", {
  //   filter: "blur(0px)",
  //   opacity: 1,
  //   duration: .5,
  //   delay: 1
  // }, "e")
  // .to("#para4", {
  //   opacity: 0,
  //   duration: .4,
  //   delay: 1
  // }, "e")
  // .to("#para5", {
  //   opacity: .5,
  //   duration: .4,
  //   delay: 1.4
  // }, "e")

  // .to("#circle2", {
  //   top: positionFromPage3Top + diff * 5,
  //   transform: "translate(-50%,-50%) scale(1)",
  //   duration: .8,
  //   delay: 1
  // }, "f")
  // .to("#ser1,#ser2,#ser3,#ser4,#ser5", {
  //   filter: "blur(4px)",
  //   opacity: .4,
  //   duration: .5,
  //   delay: 1
  // }, "f")
  // .to("#ser6", {
  //   filter: "blur(0px)",
  //   opacity: 1,
  //   duration: .5,
  //   delay: 1
  // }, "f")
  // .to("#para5", {
  //   opacity: 0,
  //   duration: .4,
  //   delay: 1
  // }, "f")
  // .to("#para6", {
  //   opacity: .5,
  //   duration: .4,
  //   delay: 1.4,
  // }, "f")
  // .to("#para6", {
  //   opacity: .5,
  //   delay: .3,
  // })
}
pointMidAnimation()

function page4Animation() {

  var tl4e = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top 100%%",
      end: "top 63%",
      scrub: true,
      // markers: true
    }
  })
  tl4e

    .to("#circle2", {
      top: "50%",
      transform: "translate(-50%,-50%) scale(1)",
      duration: 2.3,
    }, "oc")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .8,
    }, "oc")
    .to("#para6", {
      opacity: 0,
      duration: .8,
    }, "oc")
    .to("#circle2", {
      top: "50%",
      width: "0.65vw",
      height: "0.65vw",
      backgroundColor: "transparent",
      duration: .6,
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
    .to(".home-project-wrap img", {
      transform: "translateX(-80px)",
      duration: 2.5,
      ease: "power2.out",
    }, "sl")
    .to("#project-wrapper", {
      transform: `translateX(-${slideValue}px)`,
      duration: 1.5,
      ease: "linear",
    }, "sl")
    .to("#circle2", {
      left: "-670%",
      duration: 1,
    }, "sl")
    .to(".view-all .cirr", {
      opacity: 1,
      duration: 0
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
    .to("#circle2", {
      left: "50%",
      width: "2.5vw",
      height: "2.5vw",
      backgroundColor: "var(--secondary)",
      duration: .5,
    })
    .to(".view-all", {
      opacity: 0,
      duration: .2
    })
    .to(".view-all", {
      display: "none",
      delay: .09
    })
}
page4Animation()


function page5Animation() {

  const tl5s = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "body",
      start: "top 15%",
      end: "top 0%",
      scrub: 1,
      // markers:true
    }
  })
  tl5s
    .to("#navbar", {
      opacity: 0,
      pointerEvents: "none",
      duration: .2
    }, "a")
    .to("#navbar-black", {
      opacity: 1,
      pointerEvents: "all",
      duration: .2
    }, "a")

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

function page6Animation() {
  const tl6s = gsap.timeline({
    scrollTrigger: {
      trigger: "#page6",
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
}
page6Animation()


function footerAnimation() {

  const ft = gsap.timeline({
    scrollTrigger: {
      trigger: "#footer",
      scroller: "body",
      start: "top 15%",
      end: "top 0%",
      scrub: 1,
      // markers:true
    }
  })
  ft
    .to("#navbar", {
      opacity: 0,
      pointerEvents: "none",
      duration: .2
    }, "a")
    .to("#navbar-black", {
      opacity: 1,
      duration: .2,
      pointerEvents: "all",
    }, "a")
}
footerAnimation()


