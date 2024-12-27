gsap.to("#career",{
    top:"0%",
    scrollTrigger:{
        trigger:"#page1",
        scroller:"body",
        start:"top top",
        end:"top -100%",
        scrub:1,
        pin:true
    }
})




const accordions = document.querySelectorAll(".accordion")
accordions.forEach(accordion => {
    accordion.querySelector(".plus").addEventListener("click", () => {
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


const popup = document.querySelector("#popup-apply")
document.querySelectorAll(".apply-job").forEach(function(btn){
    btn.addEventListener("click", function(e){
        gsap.set(popup,{display:"block"})
        gsap.to(popup,{
            opacity:1,
            duration:.4
        })
        gsap.to("#apply-form",{
            bottom:"0%",
            duration:.4
        })
    })
})


document.querySelector(".popup-close").addEventListener("click", function(e){
    var tl = gsap.timeline()
    gsap.set(popup,{display:"block"})
    tl
    .to("#apply-form",{
        bottom:"-100%",
        duration:.4
    },"a")
    .to(popup,{
        opacity:1,
        duration:.4,
        onComplete:()=>{
            gsap.set(popup,{display:"none"})
        }
    },"a")
    
})