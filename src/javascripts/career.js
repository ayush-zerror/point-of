document.querySelectorAll(".more-details-p").forEach(function (d) {
    d.addEventListener("click", function () {
        gsap.set("#popup", { display: "block",scrollTo:0 })
        gsap.to("#popup", {
            opacity: 1,
            duration: .5
        })
    })
})

document.querySelector("#popup-close").addEventListener("click", function () {
    gsap.to("#popup", {
        opacity: 0,
        duration: .5,
        onComplete: function () {
            gsap.set("#popup", { display: "none" })
        }
    })
})

document.querySelector("#popup").addEventListener('wheel', (e) => e.stopPropagation());
document.querySelector("#popup").addEventListener('touchmove', (e) => e.stopPropagation());