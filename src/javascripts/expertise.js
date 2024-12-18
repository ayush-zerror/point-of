const service1 = document.querySelectorAll(".service1 h5")
const service2 = document.querySelectorAll(".service2 h5")
const service3 = document.querySelectorAll(".service3 h5")
const service4 = document.querySelectorAll(".service4 h5")
const service5 = document.querySelectorAll(".service5 h5")
const service6 = document.querySelectorAll(".service6 h5")

function serviceBlurAnime(services) {
    services.forEach(function (l) {
        l.addEventListener("mouseenter", function () {
            for (var i = 0; i <= services.length; i++) {
                if (services[i] !== l) {
                    gsap.to(services[i], {
                        filter: "blur(2px)",
                        opacity: .6,
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

    services.forEach(function (l, idx) {
        l.addEventListener("mouseleave", function () {
            gsap.to(services, {
                filter: "blur(0px)",
                opacity: 1,
                duration: .4
            })
        })
    })


}

serviceBlurAnime(service1) 
serviceBlurAnime(service2) 
serviceBlurAnime(service3) 
serviceBlurAnime(service4) 
serviceBlurAnime(service5) 
serviceBlurAnime(service6) 


function page3svgAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3",
            scroller: "body",
            // markers: true,
            start: "top 0%",
            end: "top -250%",
            scrub: 1, // Higher scrub value for smoother effect
            pin: true,
        },
    });
    tl
        .to("#svg-container", {
            x: "-100vw", // Horizontal movement
        })
        .to("#svg-container", {
            x: "-100vw",
            y: "-100vh", // Add vertical movement
        })


}
page3svgAnimation()
