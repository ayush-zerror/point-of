// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


gsap.to(window, {
    scrollTo: 0
})

const cursor = document.querySelector("#cursor")
window.addEventListener("mousemove", function (e) {
    if (cursor) {
        gsap.to(cursor, {
            opacity: 1,
            top: e.clientY,
            left: e.clientX,
        })
    }
})

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
        document.querySelector("#navbar").style.background = `
  linear-gradient(
    180deg,
    #000000 0,
    hsla(0, 0%, 0%, .987) 11%,  
    hsla(0, 0%, 0%, .951) 20.8%, 
    hsla(0, 0%, 0%, .896) 29.6%, 
    hsla(0, 0%, 0%, .825) 37.5%, 
    hsla(0, 0%, 0%, .741) 44.6%, 
    hsla(0, 0%, 0%, .648) 51%,   
    hsla(0, 0%, 0%, .55) 57%,    
    hsla(0, 0%, 0%, .45) 62.5%,  
    hsla(0, 0%, 0%, .352) 67.7%,  
    hsla(0, 0%, 0%, .259) 72.7%,
    hsla(0, 0%, 0%, .175) 77.8%,  
    hsla(0, 0%, 0%, .104) 82.9%,  
    hsla(0, 0%, 0%, .049) 88.2%,  
    hsla(0, 0%, 0%, .013) 93.9%,  
    hsla(0, 0%, 0%, 0)
  )
`;

    } else {
        root.style.setProperty('--primary', '#F2F2EE');
        root.style.setProperty('--secondary', '#000');
        document.querySelector("#mode").classList.remove("ri-moon-line");
        document.querySelector("#mode").classList.add("ri-sun-line");
        document.querySelector("#navbar").style.background = `
  linear-gradient(
    180deg,
    #F2F2EE 0,
    hsla(0, 0%, 94.1%, .987) 11%,  
    hsla(0, 0%, 94.1%, .951) 20.8%, 
    hsla(0, 0%, 94.1%, .896) 29.6%, 
    hsla(0, 0%, 94.1%, .825) 37.5%, 
    hsla(0, 0%, 94.1%, .741) 44.6%, 
    hsla(0, 0%, 94.1%, .648) 51%,   
    hsla(0, 0%, 94.1%, .55) 57%,    
    hsla(0, 0%, 94.1%, .45) 62.5%,  
    hsla(0, 0%, 94.1%, .352) 67.7%,  
    hsla(0, 0%, 94.1%, .259) 72.7%,
    hsla(0, 0%, 94.1%, .175) 77.8%,  
    hsla(0, 0%, 94.1%, .104) 82.9%,  
    hsla(0, 0%, 94.1%, .049) 88.2%,  
    hsla(0, 0%, 94.1%, .013) 93.9%,  
    hsla(0, 0%, 94.1%, 0)
  )
`;

    }

    document.querySelector("#mode").addEventListener("click", function () {
        console.log("click");
        
        if (!mode) {
            root.style.setProperty('--primary', '#000');
            root.style.setProperty('--secondary', '#fff');
            document.querySelector("#mode").classList.remove("ri-sun-line");
            document.querySelector("#mode").classList.add("ri-moon-line");
            document.querySelector("#navbar").style.background = `
  linear-gradient(
    180deg,
    #000000 0,
    hsla(0, 0%, 0%, .987) 11%,  
    hsla(0, 0%, 0%, .951) 20.8%, 
    hsla(0, 0%, 0%, .896) 29.6%, 
    hsla(0, 0%, 0%, .825) 37.5%, 
    hsla(0, 0%, 0%, .741) 44.6%, 
    hsla(0, 0%, 0%, .648) 51%,   
    hsla(0, 0%, 0%, .55) 57%,    
    hsla(0, 0%, 0%, .45) 62.5%,  
    hsla(0, 0%, 0%, .352) 67.7%,  
    hsla(0, 0%, 0%, .259) 72.7%,
    hsla(0, 0%, 0%, .175) 77.8%,  
    hsla(0, 0%, 0%, .104) 82.9%,  
    hsla(0, 0%, 0%, .049) 88.2%,  
    hsla(0, 0%, 0%, .013) 93.9%,  
    hsla(0, 0%, 0%, 0)
  )
`;

            mode = true;
        } else {
            root.style.setProperty('--primary', '#F2F2EE');
            root.style.setProperty('--secondary', '#000');
            document.querySelector("#mode").classList.remove("ri-moon-line");
            document.querySelector("#mode").classList.add("ri-sun-line");
            document.querySelector("#navbar").style.background = `
  linear-gradient(
    180deg,
    #F2F2EE 0,
    hsla(0, 0%, 94.1%, .987) 11%,  
    hsla(0, 0%, 94.1%, .951) 20.8%, 
    hsla(0, 0%, 94.1%, .896) 29.6%, 
    hsla(0, 0%, 94.1%, .825) 37.5%, 
    hsla(0, 0%, 94.1%, .741) 44.6%, 
    hsla(0, 0%, 94.1%, .648) 51%,   
    hsla(0, 0%, 94.1%, .55) 57%,    
    hsla(0, 0%, 94.1%, .45) 62.5%,  
    hsla(0, 0%, 94.1%, .352) 67.7%,  
    hsla(0, 0%, 94.1%, .259) 72.7%,
    hsla(0, 0%, 94.1%, .175) 77.8%,  
    hsla(0, 0%, 94.1%, .104) 82.9%,  
    hsla(0, 0%, 94.1%, .049) 88.2%,  
    hsla(0, 0%, 94.1%, .013) 93.9%,  
    hsla(0, 0%, 94.1%, 0)
  )
`;


            mode = false;
        }

        // Save mode in localStorage
        localStorage.setItem("mode", mode);
    });
}
darkMode();