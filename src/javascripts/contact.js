document.querySelectorAll("#right form .input").forEach(function (i) {
    i.querySelector("input").addEventListener("focus", function () {
        i.classList.add("active")
    })
    i.querySelector("input").addEventListener("blur", function () {
        if (this.value == "") {
            i.classList.remove("active")
        }
    })
})

document.querySelectorAll("#right form .textarea").forEach(function (i) {
    i.querySelector("textarea").addEventListener("focus", function () {
        i.classList.add("active")
    })
    i.querySelector("textarea").addEventListener("blur", function () {
        if (this.value == "") {
            i.classList.remove("active")
        }
    })

})

document.querySelectorAll("#from-right form .pop-input").forEach(function (i) {
    i.querySelector("input").addEventListener("focus", function () {
        i.classList.add("active")
    })
    i.querySelector("input").addEventListener("blur", function () {
        if (this.value == "") {
            i.classList.remove("active")
        }
    })
})

document.querySelector("#Uplaod").addEventListener("click", function () {
    document.querySelector("#file input").click()
})

document.querySelectorAll(".lineanime").forEach(function (i) {
    i.addEventListener("mouseenter", function () {
        gsap.to(i.querySelector(".linei"), {
            scaleX: 1, // Use scaleX directly
            duration:0.3, // Add duration for smooth animation
            ease: "power1.out", // Optional easing
        });
    });

    i.addEventListener("mouseleave", function () {
        gsap.set(i.querySelector(".linei"), {
            transformOrigin: "right", // Retract towards left
        })
        gsap.to(i.querySelector(".linei"), {
            scaleX: 0, // Revert to scaleX(0) on mouse leave
            duration: 0.3,
            ease: "power1.in", // Optional easing,
            onComplete:()=>{
                gsap.set(i.querySelector(".linei"), {
                    transformOrigin: "left", // Retract towards left
                })

            }
        });
    });
});



const accordions = document.querySelectorAll(".accordion")
accordions.forEach(accordion => {
    accordion.querySelector(".accordion-title").addEventListener("click", () => {
        for (var i = 0; i < accordions.length; i++) {
            if (accordions[i] !== accordion) {
                accordions[i].classList.remove("active");
            } else {
                if (accordion.classList.contains("active")) {
                    accordion.classList.remove("active");
                }
                else {
                    accordion.classList.add("active");

                }
            }
        }

    })
})


const popup = document.querySelector("#popup-apply")
document.querySelectorAll(".apply-job").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        gsap.set(popup, { display: "block" })
        gsap.to(popup, {
            opacity: 1,
            duration: .4
        })
        gsap.to("#apply-form", {
            bottom: "0%",
            duration: .4
        })
    })
})


document.querySelector(".popup-close").addEventListener("click", function (e) {
    var tl = gsap.timeline()
    gsap.set(popup, { display: "block" })
    tl
        .to("#apply-form", {
            bottom: "-100%",
            duration: .4
        }, "a")
        .to(popup, {
            opacity: 1,
            duration: .2,
            onComplete: () => {
                gsap.set(popup, { display: "none" })
            }
        }, "a")

})