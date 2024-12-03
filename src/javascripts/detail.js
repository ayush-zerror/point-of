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
    },"p")
    .to("#navbar", {
      transform: "translateY(0%)",
      duration: .5,
      ease: "power1.out",
    }, "p")
}
loader()

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
      duration: .6,
      opacity: 0,
    }, "a")
    .to("#overView-container", {
      paddingTop:"10vw",
      opacity: 1,
      duration: .6,
      delay: .2,
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
      paddingTop:"20vw",
      opacity: 0,
      duration: .6,
    }, "a")
    .to("#fullView-container", {
      paddingTop: "10vw",
      duration: .6,
      delay: .2,
      opacity: 1,
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

document.querySelectorAll(".next-p").forEach(function(p){
  gsap.to(p.querySelector("img"),{
    transform:"scale(1)",
    duration:.5,
    scrollTrigger:{
      trigger:p,
      scroller:"body",
      start:"top 60%",
      end:"top 40%",
      scrub:1,
    }
  })
})