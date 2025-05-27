function loader() {
  var ltl = gsap.timeline()
  ltl
    .to("#navbar", {
      transform: "translateY(0%)",
      duration: .6,
      delay: .2,
      eease: "expo.in",
    }, "p")
}
loader()
gsap.to("#hero-img", {
  y: 80, // ← cleaner and faster
  duration: 1,
  scrollTrigger: {
    trigger: "#page1",
    scroller: "body", // only needed if using a custom scroller like Lenis
    start: "top 0%",
    end: "bottom -20%",
    scrub: 0.5,
    markers: true,
  },
})

function imageParallax() {
  const parallexImage = document.querySelectorAll(".zoom");

  parallexImage?.forEach(function (img) {
    gsap.to(img.querySelector("img"), {
      y: 80, // ← cleaner and faster
      duration: 1,
      scrollTrigger: {
        trigger: img,
        scroller: "body", // only needed if using a custom scroller like Lenis
        start: "top 10%",
        end: "bottom -50%",
        scrub: 0.5,
        // markers: true,
      },
    });
  });

}
imageParallax()

const fullView = document.querySelector("#full-view")
const overView = document.querySelector("#over-view")


function scrollForView() {
  document.querySelector("#page3").scrollIntoView({ behavior: "smooth" })
  const tl = gsap.timeline()
  tl
    // .to(window, {
    //   scrollTo: window.innerHeight * 2 + window.innerHeight / 5,
    //   ease: "power1.out",
    // })
    .to("#fullView-container", {
      paddingTop: "15vw",
      duration: .6,
      opacity: 0,
    }, "a")
    .to("#overView-container", {
      paddingTop: "0vw",
      opacity: 1,
      duration: .6,
      delay: .2,
      onStart: () => {
        document.querySelector("#overView-container").style.display = "flex";
        document.querySelector("#fullView-container").style.display = "none";
      }

    }, "a")


}

function scrollForFullView() {
  // const scroll = window.innerHeight * 2 + window.innerHeight / 5
  document.querySelector("#page3").scrollIntoView({ behavior: "smooth" })

  const tl = gsap.timeline()
  tl
    // .to(window, {
    //   scrollTo: scroll,
    //   ease: "power1.out",
    // })
    .to("#overView-container", {
      paddingTop: "20vw",
      opacity: 0,
      duration: .6,
    }, "a")
    .to("#fullView-container", {
      paddingTop: "0vw",
      duration: .6,
      delay: .2,
      opacity: 1,
      onStart: () => {
        document.querySelector("#overView-container").style.display = "none";
        document.querySelector("#fullView-container").style.display = "flex";

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

