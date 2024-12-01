gsap.to(window, {
  scrollTo: 0
})

const cursor = document.querySelector("#cursor")

window.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    opacity: 1,
    top: e.clientY,
    left: e.clientX,
  })
})

document.querySelectorAll(".text-splite").forEach((t) => {
  var clutter = ""
  t.textContent.split("").forEach((l) => {
    if (l === " ") {
      clutter += `<span>&nbsp;</span>`;
    } else {
      clutter += `<span>${l}</span>`;
    }
  })
  t.innerHTML = clutter
})

function loader() {
  var ltl = gsap.timeline()

  ltl
    .to("#loading", {
      transform: "translate(-50%,-50%) scale(1.3)",
      duration: 1.5,
      ease: "power1.out",
    }, "l")
    .to("#navbar", {
      transform: "translateY(0%)",
      duration: 1.5,
      ease: "power1.out",
    }, "l")
    .to("#loading", {
      opacity: 0,
      duration: .3,
      ease: "power1.out",
    }, "a")
    .to("#page1", {
      opacity: 1,
      duration: 0,
      ease: "power1.out",
    }, "a")
    .to("#page1", {
      maskSize: "200%",
      duration: 1.6,
      ease: "power1.out",
      onComplete: () => {
        gsap.set("#page1", {
          mask: "none"
        })
      }
    })
    .to("#hero-img", {
      transform: "translateY(40vh)",
      duration: .5,
      delay: -.2,
      ease: "power1.out",
    })
}
loader()
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
      x: point.offsetWidth / 2 + (point.offsetWidth / 2) / 2.7,
      duration: .4,
      delay: .2
    }, "a")
    .to("#dot", {
      opacity: 1,
      x: -f.offsetWidth * 3,
      duration: .4,
      delay: .2
    }, "a")
    .to("#o", {
      x: -f.offsetWidth * 2,
      duration: .4,
      delay: .2
    }, "a")
}
logo()
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
    root.style.setProperty('--primary', '#e8e8e192');
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
      root.style.setProperty('--primary', '#e8e8e192');
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

function text() {
  document.querySelectorAll(".text-splite").forEach(function (t) {
    gsap.from(t.querySelectorAll("span"), {
      y: 20,
      opacity: 0,
      stagger: .1,
      duration: 1.5,
      scrollTrigger: {
        trigger: t,
        scroller: "body",
        start: "top 65%",
        end: "top 45%",
        scrub: 1,
      }
    })
  })
}
text()

function zoom() {
  document.querySelectorAll(".zoom").forEach(function (card) {
    gsap.fromTo(card.querySelector("img"), {
      scale: 1,
    }, {
      scale: 1.2,
      duration: 1.5,
      scrollTrigger: {
        trigger: card,
        scroller: "body",
        start: "top 10%",
        end: "top -50%",
        scrub: 1,
      }
    })
  })
}
// zoom()

const fullView = document.querySelector("#full-view")
const overView = document.querySelector("#over-view")


function scrollForView() {
  const tl = gsap.timeline()
  tl
    .to(window, {
      scrollTo: window.innerHeight * 2 + window.innerHeight / 5,
      ease: "power1.out",
    })
    .to("#fullView-container", {
      paddingTop: "15vw",
      duration: .8,
      opacity: 0,
      ease: "power1.out",
    }, "a")
    .to("#overView-container", {
      opacity: 1,
      duration: 1,
      delay: .2,
      ease: "power1.out",
      onStart: () => {
        document.querySelector("#overView-container").style.display = "flex";
        document.querySelector("#fullView-container").style.display = "none";
      },
      onComplete: () => {
        text()
        // zoom()
      }
    }, "a")
}

function scrollForFullView() {
  const scroll = window.innerHeight * 2 + window.innerHeight / 5
  const tl = gsap.timeline()
  tl
    .to(window, {
      scrollTo: scroll,
      ease: "power1.out",
    })
    .to("#overView-container", {
      opacity: 0,
      duration: .8,
      ease: "power1.out",
    }, "a")
    .to("#fullView-container", {
      paddingTop: "10vw",
      duration: .8,
      delay: .2,
      opacity: 1,
      ease: "power1.out",
      onStart: () => {
        document.querySelector("#overView-container").style.display = "none";
        document.querySelector("#fullView-container").style.display = "flex";
      },
      onComplete: () => {
        text()
        // zoom()
      }
    }, "a")

}

overView.addEventListener("click", function () {
  scrollForView()
  overView.classList.add("active")
  fullView.classList.remove("active")

  overView.style.width = "60%"
  overView.style.backgroundColor = "black"
  overView.querySelector("h1").style.color = "white"

  fullView.style.width = "40%"
  fullView.style.backgroundColor = "#F7F7F7"
  fullView.querySelector("h1").style.color = "black"
})
fullView.addEventListener("click", function () {
  scrollForFullView()
  fullView.classList.add("active")
  overView.classList.remove("active")

  fullView.style.width = "60%"
  fullView.style.backgroundColor = "black"
  fullView.querySelector("h1").style.color = "white"

  overView.style.width = "40%"
  overView.style.backgroundColor = "#F7F7F7"
  overView.querySelector("h1").style.color = "black"
})

const view = document.querySelectorAll(".view")
view.forEach(function (v) {
  v.addEventListener("mousemove", function () {
    if (!v.classList.contains("active")) {
      v.style.width = "60%"
      v.style.backgroundColor = "black"
      v.querySelector("h1").style.color = "white"
    }
  })
})
view.forEach(function (v) {
  v.addEventListener("mouseleave", function () {
    if (!v.classList.contains("active")) {
      v.style.width = "40%"
      v.style.backgroundColor = "#F7F7F7"
      v.querySelector("h1").style.color = "black"
    }
  })
})

