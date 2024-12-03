const slides = document.querySelectorAll(".slide");
const innerSlides = document.querySelectorAll(".inner-slide");
let currentSlide = 0;
let isAnimating = false;

document.addEventListener("wheel", function (e) {
  if (isAnimating) return; // Prevent overlapping animations
  isAnimating = true;
  if ((window.scrollY === 0 && event.deltaY < 0) || // Scrolling up at the top
        (window.innerHeight + window.scrollY >= document.body.offsetHeight && event.deltaY > 0)) { // Scrolling down at the bottom
        event.preventDefault();
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

}, { passive: false });

const projects = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",
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
  document.querySelectorAll(".project").forEach(p => p.remove())
  const filterProject = projects.filter((p, i) => i !== currentSlide)

 // Helper function to create a video element with the specified properties
function createVideoElement(src) {
  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.src = src;
  return video;
}

//creating card for each project and second card for current project
filterProject.forEach(async function (project, index) {
  // Create a document fragment to minimize reflow and improve performance
  const fragment = document.createDocumentFragment();

  // Create the main anchor element
  const div = document.createElement("a");
  div.href = "/work-detail";
  div.classList.add("project", "animate");

  // Create and append the main image element
  const img = document.createElement("img");
  img.src = project;
  div.appendChild(img);

  // Create and append the video element for the main div
  const video = createVideoElement("https://download-video-ak.vimeocdn.com/v3-1/playback/be1179ab-5aaa-4f63-a9a7-f40c70ae895e/96953878?__token__=st=1733133641~exp=1733148041~acl=%2Fv3-1%2Fplayback%2Fbe1179ab-5aaa-4f63-a9a7-f40c70ae895e%2F96953878%2A~hmac=b8559cc5bf566e60f350a09823c494a82161d7212eef5c4adf6b1f00686ba024&r=dXMtZWFzdDE%3D");
  div.appendChild(video);

  if (index === 0) {
    // Create the empty div for the first project with an image and video
    const emptyDiv = document.createElement("a");
    emptyDiv.classList.add("project");

    // Create and configure the current image element
    const currentImg = document.createElement("img");
    currentImg.src = projects[currentSlide];
    currentImg.style.objectPosition = "50% 0%";
    emptyDiv.appendChild(currentImg);

    // Create and append a separate video element for the empty div
    const videoEmpty = createVideoElement("https://download-video-ak.vimeocdn.com/v3-1/playback/be1179ab-5aaa-4f63-a9a7-f40c70ae895e/96953878?__token__=st=1733133641~exp=1733148041~acl=%2Fv3-1%2Fplayback%2Fbe1179ab-5aaa-4f63-a9a7-f40c70ae895e%2F96953878%2A~hmac=b8559cc5bf566e60f350a09823c494a82161d7212eef5c4adf6b1f00686ba024&r=dXMtZWFzdDE%3D");
    emptyDiv.appendChild(videoEmpty);

    // Append elements to the fragment
    fragment.appendChild(div);
    fragment.appendChild(emptyDiv);
  } else {
    // Append only the main div for other projects
    fragment.appendChild(div);
  }

  // Append the fragment to the list in a single operation
  document.querySelector("#list").appendChild(fragment);
});



  isAnimating = true

  const allp = document.querySelectorAll(".animate")
  gsap.to(slides[currentSlide].querySelector("img"), {
    scale: 1.5,
    rotate: "-5deg",
    duration: .3,
  })
  gsap.to("#list", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: .5,
  })
  gsap.set(allp, {
    y: 200,
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
      rotate: "0deg",
      duration: .5,
    }, "s")

  gsap.set("#inner-container", {
    zIndex: 3,
    delay: .5
  })

  isAnimating = false
})




// document.querySelector("#mode").addEventListener("click", function(){
//   console.log("hey");
  
// })

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
      console.log("click");
      
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