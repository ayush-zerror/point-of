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

var loader = gsap.timeline()

loader
.to("#curtain1",{
  clipPath:" polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  duration:1,
  delay:.5
},"a")
.to("#title-hero h1",{
  transform:"translateY(-100%)",
  duration:1,
  delay:.5
},"a")
.to("#curtain2",{
  clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  duration:1,
  delay:.5
},"a")
.to("#curtain2",{
  clipPath:" polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  duration:1,
},"b")
.to("#title-hero h1",{
  transform:"translateY(-200%)",
  duration:1
},"b")
.to("#text-container",{
  left:"50%",
  transform:"translate(-50%,-50%)",
  duration:1
})


const cursor = document.querySelector("#cursor")
window.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    top: e.clientY,
    left: e.clientX,
  })
  gsap.to("#small-cursor", {
    top: e.clientY,
    left: e.clientX,
    duration:0,
  })
  gsap.to("#playCur", {
    top: e.clientY,
    left: e.clientX,
    duration: 0
  })
})
document.querySelectorAll(".cursor-scale").forEach(function(elem){
  elem.addEventListener("mouseenter", function(e) {
    gsap.to(cursor, {
      width:"2.5vw",
      height: "2.5vw",
    })
  })
})
document.querySelectorAll(".cursor-scale").forEach(function(elem){
  elem.addEventListener("mouseleave", function(e) {
    gsap.to(cursor, {
      width:"1.2vw",
      height: "1.2vw",
    })
  })
})

document.querySelector("#page6").addEventListener("mouseenter", function (e) {
  gsap.to(cursor, {
    width: "4vw",
    height: "4vw",
    backgroundColor: "white",
  })
  cursor.innerHTML = "Drag"
})
document.querySelector("#page6").addEventListener("mouseleave", function (e) {
  gsap.to(cursor, {
    width: "1.5vw",
    height: "1.5vw",
    backgroundColor: "transparent",
  })
  cursor.innerHTML = ""
})

var muted = true
document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("mouseenter", function (e) {
    gsap.to("#playCur", {
      opacity: 1,
      duration: .2
    })
    cursor.innerHTML = ""
    if (muted) {
      document.querySelector("#playCur").classList.add("ri-play-fill")
      document.querySelector("#playCur").classList.remove("ri-pause-fill")
    }
    else {
      document.querySelector("#playCur").classList.add("ri-pause-fill")
      document.querySelector("#playCur").classList.remove("ri-play-fill")
    }
  })
})
document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("mouseleave", function (e) {
    gsap.to("#playCur", {
      opacity: 0,
      duration: .2
    })
    cursor.innerHTML = "Drag"
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

// function page1Animation() {

//   const words = document.querySelectorAll(".word-style");

//   let index = 0;
//   setInterval(function () {
//     gsap.to(words[index], {
//       top: "-100%",
//       duration: 0.8,
//       onComplete: function () {
//         gsap.set(this._targets[0], { top: "100%" });
//       }
//     });

//     // Increment index before checking if it's the last element
//     index = index === words.length - 1 ? 0 : index + 1;

//     gsap.to(words[index], {
//       top: "0%",
//       duration: 0.8,
//     });
//   }, 3000);


//   const tl1 = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#page1",
//       scroller: "body",
//       start: "top 0%",
//       end: "top -100%",
//       scrub: 1,
//       pin: true,
//       // pinSpacing: false,
//     }
//   });

//   tl1
//     .to("#page1 h1", {
//       transform: "rotateY(4deg) rotateX(2deg) scale(15) translateX(-10%)", // Simplified transform
//       duration: 1.2,
//       ease: "power3.out", // Less taxing easing function
//     }, "a")
//     .to("#page1 h4", {
//       transform: "scale(1.8) rotateY(8deg) rotateX(2deg) translateX(-10%)", // Simplified transform
//       opacity: 1,
//       duration: 1.2,
//       ease: "power3.out",
//     }, "a")
//     .to("#hero-video", {
//       top: "0%",
//       // delay: -.5
//     });


// }
// page1Animation()


function page2Animation() {

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


function pointMidAnimation() {

  const page3 = document.querySelector("#page3");
  const h2 = document.querySelector("#h1height");
  const h22 = document.querySelector("#h1height2");

  let positionFromPage3Top = h2.getBoundingClientRect().top - page3.getBoundingClientRect().top + h2.offsetHeight /2
  let diff = (h22.getBoundingClientRect().top - h2.getBoundingClientRect().top) - .2

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
    }
  });


  tl
    .to("#circle2", {
      top: positionFromPage3Top,
      transform: "translate(-50%,-50%) scale(1)",
      duration: 1.5,
    })
    .to("#right-content > h2", {
      x: 300,
      filter: "blur(4px)",
      opacity: 0,
      duration: .8,
      stagger: {
        amount: 0.2,
      },
      delay: .2
    })
    .to("#right-content-top > h2", {
      transform: "translateX(0%)",
      opacity: 1,
      duration: .8,
      stagger: {
        amount: 0.2,
      }
    }, "bk")
    .to("#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
    }, "a")
    .to("#para1", {
      opacity: .5,
      duration: .5
    }, "a")

    .to("#circle2", {
      top: positionFromPage3Top + diff*1,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    },"b")
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
      duration: .5,
      delay: 1
    }, "b")
    .to("#para2", {
      opacity: .5,
      duration: .4,
      delay: .5
    })

    .to("#circle2", {
      top: positionFromPage3Top + diff*2,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    },"c")
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
      duration: .5,
      delay: 1
    }, "c")
    .to("#para3", {
      opacity: .5,
      duration: .4,
      delay: .5
    })

    .to("#circle2", {
      top: positionFromPage3Top + diff*3,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    },"d")
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
      duration: .5,
      delay: 1
    }, "d")
    .to("#para4", {
      opacity: .5,
      duration: .4,
      delay: .5
    })

    .to("#circle2", {
      top: positionFromPage3Top + diff*4,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    },"e")
    .to("#ser1,#ser2,#ser3,#ser4,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "e")
    .to("#ser5", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "e")
    .to("#para4", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "e")
    .to("#para5", {
      opacity: .5,
      duration: .4,
      delay: .5
    })

    .to("#circle2", {
      top: positionFromPage3Top + diff*5,
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
      delay: 1
    },"f")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "f")
    .to("#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "f")
    .to("#para5", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "f")
    .to("#para6", {
      opacity: .5,
      duration: .4,
      delay: .5,
    })
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
      top:"50%",
      transform: "translate(-50%,-50%) scale(1)",
      duration: 2.3,
    }, "oc")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .8,
    },"oc")
    .to("#para6", {
      opacity: 0,
      duration: .8,
    },"oc")
    .to("#circle2", {
      top:"50%",
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




