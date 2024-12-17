document.querySelector(".explore-btn").addEventListener("click", function(){
    let pageHeight = document.querySelector("#page1").offsetHeight;
    gsap.to(window,{
        scrollTo: {
            y: pageHeight,
            duration: 1.5
        },
        ease: "power2.inOut"
    })
})

const accordions = document.querySelectorAll(".accordion")
accordions.forEach(accordion => {
    accordion.addEventListener("click", () => {
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