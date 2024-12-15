const l=new Lenis;l.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>{l.raf(t*1e3)});gsap.ticker.lagSmoothing(0);gsap.to(window,{scrollTo:0});const s=document.querySelector("#cursor");window.addEventListener("mousemove",function(t){s&&gsap.to(s,{opacity:1,top:t.clientY,left:t.clientX})});function n(){const t=document.querySelector("#point"),e=document.querySelector("#f");var o=gsap.timeline({scrollTrigger:{trigger:"#page1",scroller:"body",start:"top top",end:"top -5%",scrub:1}});o.to("#point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#p",{x:t.offsetWidth/2+t.offsetWidth/2/1.8,duration:.4,delay:.2},"a").to("#dot",{opacity:1,x:-e.offsetWidth*3,duration:.4,delay:.2},"a").to("#o",{x:-e.offsetWidth*2,duration:.4,delay:.2},"a")}n();function i(){var t=localStorage.getItem("mode")==="true";const e=document.documentElement;t?(e.style.setProperty("--primary","#000"),e.style.setProperty("--secondary","#fff"),e.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector("#navbar").style.background=`
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
`):(e.style.setProperty("--primary","#F2F2EE"),e.style.setProperty("--secondary","#000"),e.style.setProperty("--invert-filter","invert(0)"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector("#navbar").style.background=`
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
`),document.querySelector("#mode").addEventListener("click",function(){console.log("click"),t?(e.style.setProperty("--primary","#F2F2EE"),e.style.setProperty("--secondary","#000"),e.style.setProperty("--invert-filter","invert(0)"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector("#navbar").style.background=`
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
`,t=!1):(e.style.setProperty("--primary","#000"),e.style.setProperty("--secondary","#fff"),e.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector("#navbar").style.background=`
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
`,t=!0),localStorage.setItem("mode",t)})}i();function c(){var t=!1;document.querySelector("#menu-c").addEventListener("click",function(){t?(gsap.to("#navigation",{top:"-100%",clipPath:"polygon(0 0, 100% 0, 100% 97%, 0 89%)",duration:1.5,ease:"power4.out"}),t=!1):(gsap.to("#navigation",{top:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:1.5,ease:"power4.out"}),t=!0)});let e=document.querySelectorAll(".shape"),o=document.querySelectorAll("#shape-select a");o.forEach(function(a){a.addEventListener("mouseenter",function(){for(var r=0;r<=o.length;r++)o[r]!==a?gsap.to(o[r],{filter:"blur(3px)",duration:.4}):gsap.to(a,{filter:"blur(0px)",duration:.4});a.getAttribute("data-index")!==0&&(gsap.to(e[0],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(e[a.getAttribute("data-index")],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})}),o.forEach(function(a,r){a.addEventListener("mouseleave",function(){gsap.to(o,{filter:"blur(0px)",duration:.4}),gsap.to(e[a.getAttribute("data-index")],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(e[0],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"})})})}c();
//# sourceMappingURL=commonScript-JB-va8Gp.js.map
