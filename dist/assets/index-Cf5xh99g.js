import"./modulepreload-polyfill-B5Qt9EMX.js";const t=new Lenis;t.on("scroll",ScrollTrigger.update);gsap.ticker.add(e=>{t.raf(e*1e3)});gsap.ticker.lagSmoothing(0);gsap.to(window,{scrollTo:0});const o=document.querySelector("#cursor");window.addEventListener("mousemove",function(e){o&&gsap.to(o,{opacity:1,top:e.clientY,left:e.clientX})});function a(){const e=document.querySelector("#point"),s=document.querySelector("#f");var l=gsap.timeline({scrollTrigger:{trigger:"#page1",scroller:"body",start:"top top",end:"top -5%",scrub:1}});l.to("#point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#p",{x:e.offsetWidth/2+e.offsetWidth/2/2.7,duration:.4,delay:.2},"a").to("#dot",{opacity:1,x:-s.offsetWidth*3,duration:.4,delay:.2},"a").to("#o",{x:-s.offsetWidth*2,duration:.4,delay:.2},"a")}a();function r(){var e=localStorage.getItem("mode")==="true";const s=document.documentElement;e?(s.style.setProperty("--primary","#000"),s.style.setProperty("--secondary","#fff"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector("#navbar").style.background=`
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
`):(s.style.setProperty("--primary","#F2F2EE"),s.style.setProperty("--secondary","#000"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector("#navbar").style.background=`
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
`),document.querySelector("#mode").addEventListener("click",function(){console.log("click"),e?(s.style.setProperty("--primary","#F2F2EE"),s.style.setProperty("--secondary","#000"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector("#navbar").style.background=`
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
`,e=!1):(s.style.setProperty("--primary","#000"),s.style.setProperty("--secondary","#fff"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector("#navbar").style.background=`
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
`,e=!0),localStorage.setItem("mode",e)})}r();
//# sourceMappingURL=index-Cf5xh99g.js.map
