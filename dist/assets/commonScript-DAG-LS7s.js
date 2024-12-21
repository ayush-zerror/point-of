const n=new Lenis;n.on("scroll",t=>{const e=document.getElementById("popup");e&&e.contains(t.target)||ScrollTrigger.update()});gsap.ticker.add(t=>{n.raf(t*1e3)});gsap.ticker.lagSmoothing(0);gsap.to(window,{scrollTo:0});const l=document.querySelector("#cursor");window.addEventListener("mousemove",function(t){l&&gsap.to(l,{opacity:1,top:t.clientY,left:t.clientX})});function i(){const t=document.querySelector("#point"),e=document.querySelector("#f");var r=gsap.timeline({scrollTrigger:{trigger:"#page1",scroller:"body",start:"top top",end:"top -5%",scrub:1}});r.to("#point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#p",{x:t.offsetWidth/2+t.offsetWidth/2/1.8,duration:.4,delay:.2},"a").to("#dot",{opacity:1,x:-e.offsetWidth*3,duration:.4,delay:.2},"a").to("#o",{x:-e.offsetWidth*2,duration:.4,delay:.2},"a")}i();function c(){var t=localStorage.getItem("mode")==="true";const e=document.documentElement;t?(e.style.setProperty("--primary","#000"),e.style.setProperty("--secondary","#fff"),e.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector("#navbar").style.background=`
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
`,t=!0),localStorage.setItem("mode",t)})}c();function d(){var t=!1;document.querySelector("#menu-c").addEventListener("click",function(){t?(gsap.to("#navigation",{top:"-100%",clipPath:"polygon(0 0, 100% 0, 100% 97%, 0 89%)",duration:1.5,ease:"power4.out"}),t=!1):(gsap.to("#navigation",{top:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:1.5,ease:"power4.out"}),t=!0)});let e=document.querySelectorAll(".shape"),r=document.querySelectorAll("#shape-select a"),s=document.querySelectorAll("#social-l a");r.forEach(function(o){o.addEventListener("mouseenter",function(){for(var a=0;a<=r.length;a++)r[a]!==o?gsap.to(r[a],{filter:"blur(4px)",opacity:.4,duration:.4}):gsap.to(o,{filter:"blur(0px)",opacity:1,duration:.4});o.getAttribute("data-index")!==0&&(gsap.to(e[0],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(e[o.getAttribute("data-index")],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})}),r.forEach(function(o,a){o.addEventListener("mouseleave",function(){gsap.to(r,{filter:"blur(0px)",opacity:1,duration:.4}),gsap.to(e[o.getAttribute("data-index")],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(e[0],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"})})}),s.forEach(function(o){o.addEventListener("mouseenter",function(){for(var a=0;a<=s.length;a++)s[a]!==o?gsap.to(s[a],{filter:"blur(2px)",opacity:.5,duration:.4}):gsap.to(o,{filter:"blur(0px)",opacity:1,duration:.4})})}),s.forEach(function(o,a){o.addEventListener("mouseleave",function(){gsap.to(s,{filter:"blur(0px)",opacity:1,duration:.4})})})}d();
//# sourceMappingURL=commonScript-DAG-LS7s.js.map
