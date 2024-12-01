const slides = document.querySelectorAll(".slide");
const innerSlides = document.querySelectorAll(".inner-slide");
let currentSlide = 0;
let isAnimating = false;

document.addEventListener("wheel", function (e) {
  if (isAnimating) return; // Prevent overlapping animations
  isAnimating = true;

  const direction = e.deltaY > 0 ? 1 : -1; // Determine scroll direction (down = 1, up = -1)
  const nextSlide = (currentSlide + direction + slides.length) % slides.length; // Calculate next slide dynamically

  const tl = gsap.timeline({
    onComplete: () => {
      currentSlide = nextSlide; // Update current slide index
      isAnimating = false;
    },
  });

  // For scrolling down (direction = 1)
  if (direction > 0) {
    gsap.set(slides[nextSlide], {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    })
    gsap.set(slides[nextSlide].querySelector("img"), {
      objectPosition: "50% -20%",
      scale: 1.5,
    })
    //for inner slides
    gsap.set(innerSlides[nextSlide], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    })
    gsap.set(innerSlides[nextSlide].querySelector("img"), {
      objectPosition: "50% 1000%",
    })

    tl.to(slides[currentSlide], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.5,
      ease: "expo.out",
      onComplete: function () {
        gsap.set(this._targets[0], {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
        })
      }
    }, "a")
      .to(slides[currentSlide].querySelector("img"), {
        objectPosition: "50% 20%",
        scale: 1.5,
        duration: 1.5,
        ease: "expo.out",
        onComplete: function () {
          gsap.set(this._targets[0], {
            objectPosition: "50% -20%",
            scale: 1.5,
          })
        }
      }, "a")
      .to(slides[currentSlide].querySelectorAll(".slide-text h1"), {
        transform: "rotate(-5deg) translateY(-100%)",
        opacity: 0,
        duration: .8,
        onComplete: function () {
          gsap.set(this._targets[0], {
            transform: "rotate(5deg) translateY(100%)"
          }, "a")
        }
      }, "a")

      //for inner slides
      .to(innerSlides[currentSlide], {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "expo.out",
        onComplete: function () {
          gsap.set(this._targets[0], {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
          })
        }
      }, "a")
      .to(innerSlides[currentSlide].querySelector("img"), {
        objectPosition: "50% -1000%",
        duration: 1.5,
        ease: "expo.out",
        onComplete: function () {
          gsap.set(this._targets[0], {
            objectPosition: "50% 1000%",
          })
        }
      }, "a")




      // Animate next slide in
      .to(slides[nextSlide], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "expo.out",
      }, "a")
      .to(slides[nextSlide].querySelector("img"), {
        objectPosition: "50% 0%",
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
      }, "a")
      .fromTo(slides[nextSlide].querySelectorAll(".slide-text h1"), {
        transform: "rotate(5deg) translateY(100%)",
        opacity: 0
      }, {
        transform: "rotate(0deg) translateY(0%)",
        opacity: 1,
        duration: .8,
      }, "a")

      //for inner slides
      .to(innerSlides[nextSlide], {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "expo.out",
      }, "a")
      .to(innerSlides[nextSlide].querySelector("img"), {
        objectPosition: "50% 0%",
        duration: 1.5,
        ease: "expo.out",
      }, "a")
  }
  // For scrolling up (direction = -1)
  else {
    gsap.set(slides[nextSlide], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    })
    gsap.set(slides[nextSlide].querySelector("img"), {
      objectPosition: "50% 20%",
      scale: 1.5,
    })
    //for inner slides
    gsap.set(innerSlides[nextSlide], {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    })
    gsap.set(innerSlides[nextSlide].querySelector("img"), {
      objectPosition: "50% -1000%",
    })

    tl.to(slides[currentSlide], {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "expo.out",
      onComplete: function () {
        gsap.set(this._targets[0], {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
        })
      }
    }, "a")
      .to(slides[currentSlide].querySelector("img"), {
        objectPosition: "50% -20%",
        scale: 1.5,
        duration: 1.5,
        ease: "expo.out",
        onComplete: function () {
          gsap.set(this._targets[0], {
            objectPosition: "50% 20%",
            scale: 1.5,
          })
        }
      }, "a")
      .to(slides[currentSlide].querySelectorAll(".slide-text h1"), {
        transform: "rotate(5deg) translateY(100%)",
        opacity: 0,
        duration: .8,
        onComplete: function () {
          gsap.set(this._targets[0], {
            transform: "rotate(-5deg) translateY(-100%)"
          }, "a")
        }
      }, "a")

      //for inner slides
      .to(innerSlides[currentSlide], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "expo.out",
        onComplete: function () {
          gsap.set(this._targets[0], {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
          })
        }
      }, "a")
      .to(innerSlides[currentSlide].querySelector("img"), {
        objectPosition: "50% 1000%",
        duration: 1.5,
        ease: "expo.out",
        onComplete: function () {
          gsap.set(this._targets[0], {
            objectPosition: "50% -1000%",
          })
        }
      }, "a")

      // Animate next slide in
      .to(slides[nextSlide], {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "expo.out",
      }, "a")
      .to(slides[nextSlide].querySelector("img"), {
        objectPosition: "50% 0%",
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
      }, "a")
      .fromTo(slides[nextSlide].querySelectorAll(".slide-text h1"), {
        transform: "rotate(-5deg) translateY(-100%)",
        opacity: 0
      }, {
        transform: "rotate(0deg) translateY(0%)",
        opacity: 1,
        duration: .8,
      }, "a")

      //for inner slides
      .to(innerSlides[nextSlide], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "expo.out",
      }, "a")
      .to(innerSlides[nextSlide].querySelector("img"), {
        objectPosition: "50% 0%",
        duration: 1.5,
        ease: "expo.out",
      }, "a")
  }

});

const projects = [
  "https://a.storyblok.com/f/133769/2409x3000/c155d3e27e/amaterasu-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/61c001bac1/columbia-pictures-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2409x3000/cfd16e1a58/cambium-carbon-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)",
  "https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)",
]

//for rendering all projects as list
document.querySelector("#allproject").addEventListener("click", async function () {
  if (isAnimating) return
  const filterProject = projects.filter((p, i) => i !== currentSlide)
  document.querySelectorAll(".project").forEach(p=> p.remove())
  
  //creating card for each project and second card for current project
  filterProject.forEach(function (project, index) {
    const div = document.createElement("div")
    const emptyDiv = document.createElement("div")
    emptyDiv.classList.add("project")
    const currentImg = document.createElement("img")
    currentImg.src = projects[currentSlide]
    currentImg.style.objectPosition = "50% 0%"
    emptyDiv.appendChild(currentImg)
    div.classList.add("project")
    div.classList.add("animate")
    const img = document.createElement("img")
    img.src = project

    div.appendChild(img)
    if (index == 0) {
      document.querySelector("#list").appendChild(div)
      document.querySelector("#list").appendChild(emptyDiv)
    } else {
      document.querySelector("#list").appendChild(div)
    }
  })
  isAnimating = true
  const allp = document.querySelectorAll(".animate")
  gsap.to(slides[currentSlide].querySelector("img"),{
    scale:1.5,
    rotate:"-5deg",
    duration:.3,
  })
  gsap.to("#list", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration:.5,
  })
  gsap.set(allp, {
    y: 200,
  })
  gsap.to(allp, {
    y: 0,
    stagger: {
      amount: 0.3,
    },
    duration:.5,
    onComplete: () => {
      gsap.set("#inner-container", {
        zIndex: -1
      })
    }
  })

})



document.querySelector("#close-btn").addEventListener("click", function () {
  const allc = document.querySelectorAll(".animate")
  var tl = gsap.timeline()
  tl
  .to("#list",{
    scrollTo: {
      y: 0,
      x: 0,
      duration: 1
    },
    ease: "power2.inOut"
  })
  .to("#list", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration:.5,
    onComplete: () => {
      gsap.set("#list", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
      })
    }
  },"s")
  .to(allc, {
    y: -200,
    stagger: {
      amount: 0.3,
    },
    duration:.5,
    onComplete: () => {
      gsap.set(allc, {
        y: 200
      })
    }
  },"s")
  .to(slides[currentSlide].querySelector("img"),{
    scale:1,
    rotate:"0deg",
    duration:.5,
  },"s")

  gsap.set("#inner-container", {
    zIndex: 3,
    delay:.5
  })
  
  isAnimating = false
})



