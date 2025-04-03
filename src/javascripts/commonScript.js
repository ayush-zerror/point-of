// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
// lenis.on('scroll', ScrollTrigger.update);

lenis.on('scroll', (event) => {
  const popup = document.getElementById('popup');

  // If the event target is inside the popup, skip Lenis logic
  if (popup && popup.contains(event.target)) {
    return;
  }

  // Otherwise, update ScrollTrigger or other handlers
  ScrollTrigger.update();
});

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
})

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


gsap.to(window, {
  scrollTo: 0
})



// const cursor = document.querySelector("#cursor")
// window.addEventListener("mousemove", function (e) {
//   if (cursor) {
//     gsap.to(cursor, {
//       opacity: 1,
//       top: e.clientY,
//       left: e.clientX,
//     })
//   }
// })

function logo() {

  const point = document.querySelector("#point")
  const f = document.querySelector("#f")

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top top",
      end: "top -5%",
      scrub: 1,
    }
  })

  tl
    .to("#point", {
      opacity: 0,
      x: 2,
      duration: .2,
      ease: "power1.out",
    }, "a")
    .to("#f", {
      opacity: 0,
      x: 2,
      duration: .2,
      ease: "power1.out"
    }, "a")
    .to("#p", {
      x: point.offsetWidth / 2 + (point.offsetWidth / 2) / 1.6,
      duration: .4,
      delay: .2
    }, "a")
    .to("#o", {
      x: -f.offsetWidth * 2.7,
      duration: .4,
      delay: .2
    }, "a")
    .to("#p", {
      y:"-1vw",
      duration: .2,
      delay: -.2
    },"s")
    .to("#dot", {
      opacity:1,
      duration: .2,
      delay: -.2
    },"s")
}
logo()

function logoBlack() {

  const point2 = document.querySelector("#point-black")
  const f2 = document.querySelector("#f-black")

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top top",
      end: "top -5%",
      scrub: 1,
    }
  })

  tl
    .to("#point-black", {
      opacity: 0,
      x: 2,
      duration: .2,
      ease: "power1.out",
    }, "a")
    .to("#f-black", {
      opacity: 0,
      x: 2,
      duration: .2,
      ease: "power1.out"
    }, "a")
    .to("#p-black", {
      x: point2?.offsetWidth / 2 + (point2?.offsetWidth / 2) / 1.6,
      duration: .4,
      delay: .2
    }, "a")
    .to("#o-black", {
      x: -f2?.offsetWidth * 2.7,
      duration: .4,
      delay: .2
    }, "a")
    .to("#p-black", {
      y:"-1vw",
      duration: .2,
      delay: -.2
    },"s")
    .to("#dot-black", {
      opacity:1,
      duration: .2,
      delay: -.2
    },"s")
}
logoBlack()


function menuOpen() {
  var menu = false
  document.querySelector("#menu-c").addEventListener("click", function () {
    if (!menu) {
      gsap.to("#navigation", {
        top: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu = true
    } else {
      gsap.to("#navigation", {
        top: "-130%",
        clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 89%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu = false
    }
  })
  document.querySelector("#menu-c-black")?.addEventListener("click", function () {
    if (!menu) {
      gsap.to("#navigation", {
        top: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu = true
    } else {
      gsap.to("#navigation", {
        top: "-130%",
        clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 89%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu = false
    }
  })

  let shapes = document.querySelectorAll(".shape")
  let link = document.querySelectorAll("#shape-select a")
  let socialLink = document.querySelectorAll("#social-l a")

  link.forEach(function (l) {
    l.addEventListener("mouseenter", function () {
      for (var i = 0; i <= link.length; i++) {
        if (link[i] !== l) {
          gsap.to(link[i], {
            filter: "blur(4px)",
            opacity: .4,
            duration: .4
          })
        }
        else {
          gsap.to(l, {
            filter: "blur(0px)",
            opacity: 1,
            duration: .4
          })
        }
      }

      if (l.getAttribute("data-index") === "0") {
        return;
      }
      gsap.to(shapes[0], {
        transform: "scale(0)",
        opacity: 0,
        duration: .5,
        ease: "power4.out",
      })
      gsap.to(shapes[l.getAttribute("data-index")], {
        transform: "scale(1)",
        opacity: 1,
        duration: .5,
        ease: "power4.out",
      })

    })
  })

  link.forEach(function (l, idx) {
    l.addEventListener("mouseleave", function () {
      gsap.to(link, {
        filter: "blur(0px)",
        opacity: 1,
        duration: .4
      })
      if (l.getAttribute("data-index") === "0") {
        return;
      }
      gsap.to(shapes[l.getAttribute("data-index")], {
        transform: "scale(0)",
        opacity: 0,
        duration: .5,
        ease: "power4.out",
      })
      gsap.to(shapes[0], {
        transform: "scale(1)",
        opacity: 1,
        duration: .5,
        ease: "power4.out",
      })
    })
  })

  socialLink.forEach(function (l) {
    l.addEventListener("mouseenter", function () {
      for (var i = 0; i <= socialLink.length; i++) {
        if (socialLink[i] !== l) {
          gsap.to(socialLink[i], {
            filter: "blur(2px)",
            opacity: .5,
            duration: .4
          })
        }
        else {
          gsap.to(l, {
            filter: "blur(0px)",
            opacity: 1,
            duration: .4
          })
        }
      }
    })
  })

  socialLink.forEach(function (l, idx) {
    l.addEventListener("mouseleave", function () {
      gsap.to(socialLink, {
        filter: "blur(0px)",
        opacity: 1,
        duration: .4
      })
    })
  })
}
menuOpen()


function darkMode() {
  // Initialize mode based on localStorage or default to false

  let mode = localStorage.getItem("mode") === "true";

  // Function to apply mode styles
  function applyModeStyles() {
    const root = document.documentElement;
    const modeButton = document.querySelector("#mode");
    const navbar = document.querySelector("#navbar");

    if (!mode) {
      root.style.setProperty("--primary", "#000");
      root.style.setProperty("--secondary", "#f2f2ee");
      root.style.setProperty("--back", "rgba(255, 255, 255, 0.473)");
      root.style.setProperty("--invert-filter", "invert(1)");
      modeButton.classList.remove("ri-sun-line", "ri-sun-fill");
      modeButton.classList.add("ri-moon-line");
      navbar.style.background = `linear-gradient(
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
      )`;
    } else {
      root.style.setProperty("--primary", "#F2F2EE");
      root.style.setProperty("--secondary", "#000");
      root.style.setProperty("--back", "rgba(0, 0, 0, 0.473)");
      root.style.setProperty("--invert-filter", "invert(0)");
      modeButton.classList.remove("ri-moon-line", "ri-moon-fill");
      modeButton.classList.add("ri-sun-line");
      navbar.style.background = `linear-gradient(
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
      )`;
    }
  }

  // Apply initial styles
  applyModeStyles();

  // Toggle mode on button click
  document.querySelector("#mode").addEventListener("click", function () {
    mode = !mode;
    localStorage.setItem("mode", mode);
    applyModeStyles();
  });

  document.querySelector("#mode-black")?.addEventListener("click", function () {
    mode = !mode;
    localStorage.setItem("mode", mode);
    applyModeStyles();
  });

  // Mouseenter and mouseleave for hover effect
  document.querySelector("#mode").addEventListener("mouseenter", function () {
    const modeButton = document.querySelector("#mode");
    if (!mode) {
      modeButton.classList.remove("ri-moon-line");
      modeButton.classList.add("ri-moon-fill");
    } else {
      modeButton.classList.remove("ri-sun-line");
      modeButton.classList.add("ri-sun-fill");
    }
  });

  document.querySelector("#mode").addEventListener("mouseleave", function () {
    applyModeStyles(); // Reset to the correct icon state
  });
 
}
darkMode();

