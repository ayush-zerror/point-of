const accordions = document.querySelectorAll(".accordion")
accordions.forEach(accordion => {
    accordion.querySelector(".accordion-title").addEventListener("click", () => {
        for (var i = 0; i < accordions.length; i++) {
            if (accordions[i] !== accordion) {
                accordions[i].classList.remove("active");
            } else {
                if(accordion.classList.contains("active")) {
                    accordion.classList.remove("active");
                }
                else{
                    accordion.classList.add("active");

                }
            }
        }
        
    })
})


function footerNavSwitch() {

    var ftl = gsap.timeline({
        scrollTrigger: {
            trigger: "#footer",
            scroller: "body",
            start: "top 60%",
            end: "top 0%",
            scrub: 1,
        }
    })
    ftl
        .to("#navbar", {
            opacity: 0,
            pointerEvent: "none",
            duration: .5
        }, "a")
        .to("#navbar-black", {
            opacity: 1,
            pointerEvent: "all",
            duration: .5
        }, "a")


}
footerNavSwitch()