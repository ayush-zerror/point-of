const slides = document.querySelectorAll(".slide");
const innerSlides = document.querySelectorAll(".inner-slide");
const counts = document.querySelectorAll("#count-wraper span")
const filterCount = document.querySelector("#filter-count")
let currentSlide = 0;
let isAnimating = false;
var projectByFilter = null;

window.addEventListener('load', () => {
  if (sessionStorage.getItem('reloadPrevious') === 'true') {
    sessionStorage.removeItem('reloadPrevious'); // Remove the flag after reloading
    window.location.reload(); // Reload the page
  }
});

//scroll animation for gallery view
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
    route: "/work-contigo",
    service: "Web Design",
    industry: "E-commerce",
    year: 2023,
    name: "Contigo"
  },
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",
    route: "/work-typcaste",
    service: "Branding",
    industry: "Education",
    year: 2022,
    name: "Typcaste"
  },
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c4be78168579017.670cc5493709c.png",
    route: "/work-label-ritu-kumar",
    service: "Fashion Design",
    industry: "Fashion",
    year: 2021,
    name: "Ritu Kumar Label"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-pixel-flakes",
    service: "Web Development",
    industry: "Technology",
    year: 2023,
    name: "Pixel Flakes"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-studio-d",
    service: "Interior Design",
    industry: "Architecture",
    year: 2024,
    name: "Studio D"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-plugged-live-show",
    service: "Branding",
    industry: "Entertainment",
    year: 2024,
    name: "Plugged Live Shows"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-ali-ali",
    service: "Web Design",
    industry: "E-commerce",
    year: 2022,
    name: "Ali Ali"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-stock-dutch-design",
    service: "Branding",
    industry: "Interior Design",
    year: 2021,
    name: "Stock Dutch Design"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-the-st-regis-venice",
    service: "Web Design",
    industry: "Architecture",
    year: 2020,
    name: "St. Regis Venice"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-rino-&-pelle",
    service: "Fashion Design",
    industry: "Fashion",
    year: 2022,
    name: "Rino & Pelle"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-aebele-interiors",
    service: "Interior Design",
    industry: "Architecture",
    year: 2021,
    name: "Aebele Interiors"
  },
  {
    image: "https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)",
    route: "/work-ottografie",
    service: "Web Development",
    industry: "Technology",
    year: 2020,
    name: "Ottografie"
  }
];

filterCount.textContent = projects.length

//rendering project in mobile view
if(window.innerWidth <= 600){
  document.querySelector("#page1-mobile").innerHTML = ""
  var clutter = ""
  projects.forEach(function(project){
    clutter += ` <a href=${project.route} class="project-m">
                <div class="project-showcase">
                    <img src=${project.image} alt="">
                </div>
                <h4>${project.name}</h4>
                <p>Frontier Health Innovation</p>
            </a>`
  })

  document.querySelector("#page1-mobile").innerHTML = clutter
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

// Main rendering logic for list cards
function renderProjects(filteredData, centerDiv = true) {
  const fragment = document.createDocumentFragment(); // Create one fragment for all projects
  const container = document.querySelector("#list-content"); // Cache the container reference
  container.innerHTML = ""

  filteredData.forEach((project, index) => {
    // Create the parentProject div
    const parentProject = createElement("div");
    parentProject.classList.add("project-parent", "project", "animate");
    parentProject.setAttribute("data-url", project.route)

    // Create the textWrapper div with an h5 inside
    const textWrapper = createElement(
      "div", // The textWrapper div
      {
        classes: ["text-wrapper"],
      }, // No specific options for this div
      createElement("h5", {}, document.createTextNode(project.name)) // h5 with text inside
    );

    // Create the project div with an image inside
    const projectDiv = createElement(
      "div",
      {
        classes: ["project-child"], // Add classes
      },
      createElement("img", {
        attributes: { src: project.image }, // Image attributes
      })
    );

    // Append the textWrapper and projectDiv to parentProject
    parentProject.appendChild(textWrapper);
    parentProject.appendChild(projectDiv);

    fragment.appendChild(parentProject);

    // Handle special case for the first project
    if (centerDiv) {
      if (index === 0) {
        // Create the parent div for emptyDiv
        const parentEmptyDiv = createElement("div");
        parentEmptyDiv.classList.add("project-parent", "project");
        parentEmptyDiv.setAttribute("data-url", projects[currentSlide].route)



        // Create the textWrapper div with an h5 inside for emptyDiv
        const textWrapperEmpty = createElement(
          "div",
          {
            classes: ["text-wrapper"],
          }, // No specific options for this div
          createElement("h5", {}, document.createTextNode(projects[currentSlide].name)) // h5 with text inside
        );

        // Create the emptyDiv with an image inside
        const emptyDiv = createElement(
          "div",
          {
            classes: ["project-child"], // Add classes
          },
          createElement("img", {
            attributes: { src: projects[currentSlide].image }, // Image attributes
            style: { objectPosition: "50% 0%" }, // Apply style directly
          })
        );

        // Append the textWrapper and emptyDiv to parentEmptyDiv
        parentEmptyDiv.appendChild(textWrapperEmpty);
        parentEmptyDiv.appendChild(emptyDiv);

        fragment.appendChild(parentEmptyDiv);
      }
    }
  });

  // Append all elements to the container at once
  container.appendChild(fragment);
}

//lists cards click animation
function listClickAnimation() {
  document.querySelectorAll(".project-parent").forEach(function (project) {
    project.addEventListener("click", function (event) {
      const route = project.getAttribute("data-url")
      gsap.to(document.querySelector(".navbar2"), {
        opacity: 0,
        top: "-10%",
        duration: .8,
        ease: "expo.out",
      })
      gsap.to(project.querySelector("h5"), {
        opacity: 0,
        duration: .2,
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
        // objectPosition: "50% 0",
        zIndex: 99,
        transformOrigin: `${offsetX}px ${offsetY}px`, // Center the scaling on the click point
        willChange: "width, height, top, left, transform"
      });

      // Animate the project element to expand and move to the top-left corner
      gsap.to(project, {
        width: "100vw",
        height: `103.5vh`,
        top: "-3.6vh",
        left: 0,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          sessionStorage.setItem('reloadPrevious', 'true');

          setTimeout(() => {
            window.location.href = route;
          }, 50);
        },
      });

    });
  });
}


//for rendering all projects as list
document.querySelector("#allproject").addEventListener("click", async function () {
  if (isAnimating) return
  isAnimating = true
  // var filterProject;
  // if (projectByFilter?.length > 0) {
  //   filterProject = projectByFilter
  //   renderProjects(filterProject , false)
  // } else {
  //   filterProject = projects.filter((p, i) => i !== currentSlide)
  //   renderProjects(filterProject)

  // }
  const filterProject = projects.filter((p, i) => i !== currentSlide)
  renderProjects(filterProject)
  listClickAnimation()

  function listOpeningAnimation() {
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
  }
  listOpeningAnimation()


})

//for closing grid view
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
  resetFilter()
  isAnimating = false
})

//dark mode
function darkMode() {
  // Initialize mode based on localStorage or default to false
  var mode = localStorage.getItem("mode") === "true";

  // Apply initial mode
  const root = document.documentElement;
  if (mode) {
    root.style.setProperty('--primary', '#000');
    root.style.setProperty('--secondary', '#fff');
    root.style.setProperty('--back', '#00000086');
    root.style.setProperty('--invert-filter', 'invert(1)');
    document.querySelector("#mode").classList.remove("ri-sun-line");
    document.querySelector("#mode").classList.add("ri-moon-line");
    document.querySelector(".navbar2").style.background = `
linear-gradient(
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
)
`;

  } else {
    root.style.setProperty('--primary', '#F2F2EE');
    root.style.setProperty('--secondary', '#000');
    root.style.setProperty('--back', '#f2f2ee83');
    root.style.setProperty('--invert-filter', 'invert(0)');
    document.querySelector("#mode").classList.remove("ri-moon-line");
    document.querySelector("#mode").classList.add("ri-sun-line");
    document.querySelector(".navbar2").style.background = `
linear-gradient(
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
)
`;

  }

  document.querySelector("#mode").addEventListener("click", function () {

    if (!mode) {
      root.style.setProperty('--primary', '#000');
      root.style.setProperty('--secondary', '#fff');
      root.style.setProperty('--back', '#00000086');
      root.style.setProperty('--invert-filter', 'invert(1)');
      document.querySelector("#mode").classList.remove("ri-sun-line");
      document.querySelector("#mode").classList.add("ri-moon-line");
      document.querySelector(".navbar2").style.background = `
linear-gradient(
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
)
`;

      mode = true;
    } else {
      root.style.setProperty('--primary', '#F2F2EE');
      root.style.setProperty('--secondary', '#000');
      root.style.setProperty('--back', '#f2f2ee83');
      root.style.setProperty('--invert-filter', 'invert(0)');
      document.querySelector("#mode").classList.remove("ri-moon-line");
      document.querySelector("#mode").classList.add("ri-sun-line");
      document.querySelector(".navbar2").style.background = `
linear-gradient(
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
)
`;


      mode = false;
    }

    // Save mode in localStorage
    localStorage.setItem("mode", mode);
  });
}
darkMode();


//gallery view click animation
document.querySelector("#inner-container").addEventListener("click", function () {
  isAnimating = true
  gsap.to(document.querySelector(".navbar1"), {
    opacity: 0,
    top: "-10%",
    duration: .8,
    ease: "expo.out",
  })
  gsap.set("#inner-container", {
    objectPosition: "50% 0",
  });

  gsap.to("#inner-container", {
    width: "100vw",
    height: "100vh",
    duration: 1,
    ease: "power4.inOut",
    onUpdate: function () {
      // This ensures that browser optimizations for smoother transitions are applied.
      gsap.set("#inner-container", {
        willChange: "width, height, top, left, transform"
      });
    },
    onComplete: () => {
      sessionStorage.setItem('reloadPrevious', 'true');

      setTimeout(() => {
        window.location.href = projects[currentSlide].route;
      }, 50);
    },
  });
})

//logo animation on scroll
function logo() {

  const point = document.querySelector("#point")
  const f = document.querySelector("#f")

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#list",
      scroller: "#list",
      start: "top top",
      end: "top -5%",
      scrub: 1,
    }
  })

  tl
    .to(".navbar2 #point", {
      opacity: 0,
      x: 2,
      duration: .2,
      ease: "power1.out",
    }, "a")
    .to(".navbar2 #f", {
      opacity: 0,
      x: 2,
      duration: .2,
      ease: "power1.out"
    }, "a")
    .to(".navbar2 #p", {
      x: point.offsetWidth / 2 + (point.offsetWidth / 2) / 1.8,
      duration: .4,
      delay: .2
    }, "a")
    .to(".navbar2 #dot", {
      opacity: 1,
      x: -f.offsetWidth * 3,
      duration: .4,
      delay: .2
    }, "a")
    .to(".navbar2 #o", {
      x: -f.offsetWidth * 2,
      duration: .4,
      delay: .2
    }, "a")
}
logo()

// menu open close
function menuOpen() {
  var menu = false
  var menu2 = false
  document.querySelector("#menu-c").addEventListener("click", function () {
    if (!menu) {
     if(window.innerWidth > 600){
      gsap.set(".navbar1", { mixBlendMode: "difference" })
     }
      gsap.to(".navigation1", {
        top: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu = true
    } else {
      gsap.to(".navigation1", {
        top: "-130%",
        clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 89%)",
        duration: 1.5,
        ease: "power4.out",
        onStart: function () {
          setTimeout(function () {
            if(window.innerWidth > 600){
              gsap.set(".navbar1", { mixBlendMode: "normal" })
            }
          }, 500)
        }
      })
      menu = false
    }
  })

  document.querySelector(".list-menu").addEventListener("click", function () {
    if (!menu2) {
      gsap.to(".navigation2", {
        top: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu2 = true
    } else {
      gsap.to(".navigation2", {
        top: "-100%",
        clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 89%)",
        duration: 1.5,
        ease: "power4.out"
      })
      menu2 = false
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
      if (l.getAttribute("data-index") !== 0) {
        gsap.to(shapes[0], {
          transform: "rotate(40deg) scale(0)",
          opacity: 0,
          duration: .5,
          ease: "power4.out",
        })
        gsap.to(shapes[l.getAttribute("data-index")], {
          transform: "rotate(0deg) scale(1)",
          opacity: 1,
          duration: .5,
          ease: "power4.out",
        })
      }

    })
  })

  link.forEach(function (l, idx) {
    l.addEventListener("mouseleave", function () {
      gsap.to(link, {
        filter: "blur(0px)",
        opacity: 1,
        duration: .4
      })
      gsap.to(shapes[l.getAttribute("data-index")], {
        transform: "rotate(40deg) scale(0)",
        opacity: 0,
        duration: .5,
        ease: "power4.out",
      })
      gsap.to(shapes[0], {
        transform: "rotate(0deg) scale(1)",
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

//filter open btn
document.querySelector("#filter-btn").addEventListener("click", function () {
  gsap.set("#filterl", {
    top: "0%"
  })
  gsap.to("#filterl", {
    opacity: 1,
    duration: .3
  })
  gsap.to("#filter-content", {
    bottom: "0%",
    duration: .5
  })
})

//filter close btn
document.querySelector("#cross").addEventListener("click", function () {
  if (projectByFilter.length === 0) {
    const filterProject = projects.filter((p, i) => i !== currentSlide)
    renderProjects(filterProject)
    listClickAnimation()
  }
  gsap.to("#filterl", {
    opacity: 0,
    duration: .3
  })
  gsap.to("#filter-content", {
    bottom: "-100%",
    duration: .6,
    onComplete: function () {
      gsap.set("#filterl", {
        top: "100%"
      })
    }
  })
})

const serviceFls = document.querySelectorAll(".fl-service h5")
const industryFls = document.querySelectorAll(".fl-industry h5")
const yearFls = document.querySelectorAll(".fl-year h5")
const resetbtn = document.querySelector("#reset-btn")
var service = null
var industry = null
var year = null

// for selecting filter
function toActiveFilter(services) {
  services.forEach(function (l) {
    l.addEventListener("click", async function () {
      for (var i = 0; i < services.length; i++) {
        if (services[i] !== l) {
          services[i].classList.remove("active");
          services[i].style.opacity = .4;
        }
        else {
          l.classList.add("active");
          l.style.opacity = 1;
        }
      }
      await checkForFilter()
      console.log(service, industry, year);

      projectByFilter = [];
      projectByFilter = projects.filter(project => {
        const matchesService = service ? project.service === service : true;
        const matchesIndustry = industry ? project.industry === industry : true;
        const matchesYear = year ? project.year === year : true;
        // Return true if all filters (non-null values) match
        return matchesService && matchesIndustry && matchesYear;
      });
      if (projectByFilter.length > 0) {
        filterCount.textContent = projectByFilter.length
        document.querySelector("#filter-view").style.display = "block";
        document.querySelector("#notFound").style.display = "none"
      } else {
        document.querySelector("#filter-view").style.display = "none";
        document.querySelector("#notFound").style.display = "block"
      }

      resetbtn.style.display = "block";
    })
  })

}
toActiveFilter(serviceFls)
toActiveFilter(industryFls)
toActiveFilter(yearFls)

// reset filter
document.querySelector("#reset-btn").addEventListener("click", function () {
  document.querySelectorAll(".filter-by h5").forEach(function (item) {
    resetFilter()
  })
})

function resetFilter(){
  document.querySelectorAll(".filter-by h5").forEach(function (item) {
    item.classList.remove("active");
    item.style.opacity = 1;
    resetbtn.style.display = "none";
    filterCount.textContent = projects.length
    service = null
    industry = null
    year = null
    projectByFilter = []
  })
}

//view filtered projects
document.querySelector("#filter-view").addEventListener("click", function (e) {
  if (projectByFilter && projectByFilter.length > 0) {
    if (projectByFilter.length === 1) {
      document.querySelector("#list-content").style.justifyContent = "center"
    }
    else {
      document.querySelector("#list-content").style.justifyContent = "start"
    }
    renderProjects(projectByFilter, false)
    listClickAnimation()
  } else {
    const filterProject = projects.filter((p, i) => i !== currentSlide)
    renderProjects(filterProject)
    listClickAnimation()
  }
  gsap.to("#filterl", {
    opacity: 0,
    duration: .3
  })
  gsap.to("#filter-content", {
    bottom: "-100%",
    duration: .6,
    onComplete: function () {
      gsap.set("#filterl", {
        top: "100%"
      })
    }
  })
})

//provide selected filter option
async function checkForFilter() {
  serviceFls.forEach(function (s) {
    if (s.classList.contains("active")) {
      service = s.textContent.trim()
    }
  })
  industryFls.forEach(function (i) {
    if (i.classList.contains("active")) {
      industry = i.textContent.trim()
    }
  })
  yearFls.forEach(function (y) {
    if (y.classList.contains("active")) {
      year = Number(y.textContent.trim())
    }
  })
}