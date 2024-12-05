const slides = document.querySelectorAll(".slide");
const innerSlides = document.querySelectorAll(".inner-slide");
const counts = document.querySelectorAll("#count-wraper span")
let currentSlide = 0;
let isAnimating = false;



document.addEventListener("wheel", function (e) {
  if (isAnimating) return; // Prevent overlapping animations
  isAnimating = true;
  //TO STOP macOS BOUNCE AND PULL EFFECT
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  // Prevent default scrolling behavior
  e.preventDefault();

  // Detect the scroll direction and prevent overscroll
  if (e.deltaY > 0 && scrollTop >= maxScroll) {
    // Scrolling down and already at the bottom of the page
    window.scrollTo(0, maxScroll);
  } else if (e.deltaY < 0 && scrollTop <= 0) {
    // Scrolling up and already at the top of the page
    window.scrollTo(0, 0);
  } else {
    // Normal scrolling behavior
    window.scrollBy(0, e.deltaY);
  }

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
    gsap.set(counts[nextSlide], {
      top: "100%",
      opacity: 0,
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
      .to(counts[currentSlide], {
        top: "-100%",
        duration: .8,
        opacity: 0,
        onComplete: () => {
          gsap.set(counts[currentSlide], {
            top: "100%",
            opacity: 1,
          })
        }
      }, "a")
      .to(counts[nextSlide], {
        top: "0%",
        duration: .8,
        opacity: .7,
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
    gsap.set(counts[nextSlide], {
      top: "-100%",
      opacity: 0,
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
      .to(counts[currentSlide], {
        top: "100%",
        duration: .8,
        opacity: 0,
        onComplete: () => {
          gsap.set(counts[currentSlide], {
            top: "-100%",
            opacity: 1,
          })
        }
      }, "a")
      .to(counts[nextSlide], {
        top: "0%",
        duration: .8,
        opacity: .7,
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

}, { passive: false });


const projects = [
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",
    route: "/work-contigo"
  },
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",
    route: "/work-typcaste"
  },
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c4be78168579017.670cc5493709c.png",
    route: "/work-label-ritu-kumar"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-pixel-flakes"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-studio-d"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-plugged-live-show"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-ali-ali"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-stock-dutch-design"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-the-st-regis-venice"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-rino-&-pelle"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-aebele-interiors"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-ottografie"
  }
]



//for rendering all projects as list
document.querySelector("#allproject").addEventListener("click", async function () {
  if (isAnimating) return
  document.querySelectorAll(".project").forEach(p => p.remove())
  const filterProject = projects.filter((p, i) => i !== currentSlide)

  // Helper function to create a video element with the specified properties
  function createVideoElement(src) {
    const video = document.createElement("video");
    Object.assign(video, {
      autoplay: true,
      muted: true,
      loop: true,
      playsInline: true,
      src: src,
    });
    return video;
  }

  // Utility function to create an element with optional attributes and children
  function createElement(tag, options = {}, ...children) {
    const element = document.createElement(tag);
    if (options.classes) element.classList.add(...options.classes);
    if (options.attributes) {
      for (const key in options.attributes) {
        element.setAttribute(key, options.attributes[key]);
      }
    }
    if (options.style) Object.assign(element.style, options.style);
    children.forEach(child => element.appendChild(child));
    return element;
  }

  // Main rendering logic
  (function renderProjects() {
    const fragment = document.createDocumentFragment(); // Create one fragment for all projects
    const container = document.querySelector("#list"); // Cache the container reference

    filterProject.forEach((project, index) => {
      // Create the main project div
      const div = createElement(
        "div",
        {
          classes: ["project", "animate"],
          attributes: { "data-url": project.route },
        },
        createElement("img", { attributes: { src: project.image } }),
      );

      fragment.appendChild(div);

      // Handle special case for the first project
      if (index === 0) {
        const emptyDiv = createElement(
          "div",
          {
            classes: ["project"],
            attributes: { "data-url": projects[currentSlide].route },
          },
          createElement("img", {
            attributes: { src: projects[currentSlide].image },
            style: { objectPosition: "50% 0%" },
          }),
        );

        fragment.appendChild(emptyDiv);
      }
    });

    // Append all elements to the container at once
    container.appendChild(fragment);
  })();


  isAnimating = true
  const allp = document.querySelectorAll(".animate")
  gsap.set(allp, {
    y: 200,
  })
  gsap.to(slides[currentSlide].querySelector("img"), {
    scale: 1.3,
    duration: .3,
  })
  gsap.to("#list", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: .5,
  })
  gsap.to(allp, {
    y: 0,
    stagger: {
      amount: 0.3,
    },
    duration: .5,
    onComplete: () => {
      gsap.set("#inner-container", {
        zIndex: -1
      })
    }
  })

  document.querySelectorAll(".project").forEach(function (project) {
    project.addEventListener("click", function (event) {
      const route = project.getAttribute("data-url")
      gsap.to(document.querySelector(".navbar2"), {
        opacity: 0,
        top: "-10%",
        duration: .8,
        ease: "expo.out",
      })

      // Get the click position relative to the viewport
      const clickX = event.clientX;
      const clickY = event.clientY;

      // Get the position of the project element relative to the document
      const rect = project.getBoundingClientRect();
      const offsetX = clickX - rect.left;
      const offsetY = clickY - rect.top;

      // Set the initial position of the element based on the click within the element
      gsap.set(project, {
        position: "fixed", // Use absolute positioning to start from the click point
        top: `${rect.top + window.scrollY}px`, // Offset from the top of the page
        left: `${rect.left + window.scrollX}px`, // Offset from the left of the page
        width: rect.width + "px",
        height: rect.height + "px",
        objectPosition: "50% 0",
        zIndex: 99,
        transformOrigin: `${offsetX}px ${offsetY}px`, // Center the scaling on the click point
      });

      // Animate the project element to expand and move to the top-left corner
      gsap.to(project, {
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        duration: 1.5,
        ease: "power4.inOut",
        onUpdate: function () {
          // This ensures that browser optimizations for smoother transitions are applied.
          gsap.set(project, {
            willChange: "width, height, top, left, transform"
          });
        },
        onComplete: () => {
          setTimeout(() => {
            window.location.href = route;
          }, 50);
        },
      });
    });
  });



})

document.querySelector("#close-btn").addEventListener("click", function () {
  const allc = document.querySelectorAll(".animate")
  var tl = gsap.timeline()
  tl
    .to("#list", {
      scrollTo: {
        y: 0,
        x: 0,
        duration: 1
      },
      ease: "power2.inOut"
    })
    .to("#list", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: .5,
      onComplete: () => {
        gsap.set("#list", {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
        })
      }
    }, "s")
    .to(allc, {
      y: -200,
      stagger: {
        amount: 0.3,
      },
      duration: .5,
      onComplete: () => {
        gsap.set(allc, {
          y: 200
        })
      }
    }, "s")
    .to(slides[currentSlide].querySelector("img"), {
      scale: 1,
      duration: .3,
    }, "s")

  gsap.set("#inner-container", {
    zIndex: 3,
    delay: .5
  })

  isAnimating = false
})


function darkMode() {
  // Initialize mode based on localStorage or default to false
  var mode = localStorage.getItem("mode") === "true";

  // Apply initial mode
  const root = document.documentElement;
  if (mode) {
    root.style.setProperty('--primary', '#000');
    root.style.setProperty('--secondary', '#fff');
    document.querySelector("#mode").classList.remove("ri-sun-line");
    document.querySelector("#mode").classList.add("ri-moon-line");

  } else {
    root.style.setProperty('--primary', '#F2F2EE');
    root.style.setProperty('--secondary', '#000');
    document.querySelector("#mode").classList.remove("ri-moon-line");
    document.querySelector("#mode").classList.add("ri-sun-line");
  }

  document.querySelector("#mode").addEventListener("click", function () {
    if (!mode) {
      root.style.setProperty('--primary', '#000');
      root.style.setProperty('--secondary', '#fff');
      document.querySelector("#mode").classList.remove("ri-sun-line");
      document.querySelector("#mode").classList.add("ri-moon-line");
      mode = true;
    } else {
      root.style.setProperty('--primary', '#F2F2EE');
      root.style.setProperty('--secondary', '#000');
      document.querySelector("#mode").classList.remove("ri-moon-line");
      document.querySelector("#mode").classList.add("ri-sun-line");
      mode = false;
    }

    // Save mode in localStorage
    localStorage.setItem("mode", mode);
  });
}
darkMode();


document.querySelector("#inner-container").addEventListener("click", function () {
  isAnimating = true
  gsap.set("#inner-container", {
    objectPosition: "50% 0",
  });

  gsap.to("#inner-container", {
    width: "100vw",
    height: "100vh",
    duration: 1.5,
    ease: "power4.inOut",
    onUpdate: function () {
      // This ensures that browser optimizations for smoother transitions are applied.
      gsap.set("#inner-container", {
        willChange: "width, height, top, left, transform"
      });
    },
    onComplete: () => {
      setTimeout(() => {
        window.location.href = projects[currentSlide].route;
      }, 50);
    },
  });
})

