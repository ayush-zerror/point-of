import"./modulepreload-polyfill-B5Qt9EMX.js";gsap.to(window,{scrollTo:0});const a=document.querySelector("#cursor");window.addEventListener("mousemove",function(e){gsap.to(a,{opacity:1,top:e.clientY,left:e.clientX})});document.querySelectorAll(".text-splite").forEach(e=>{var o="";e.textContent.split("").forEach(n=>{n===" "?o+="<span>&nbsp;</span>":o+=`<span>${n}</span>`}),e.innerHTML=o});function s(){var e=gsap.timeline();e.to("#loading",{transform:"translate(-50%,-50%) scale(1.3)",duration:1.5,ease:"power1.out"},"l").to("#navbar",{transform:"translateY(0%)",duration:1.5,ease:"power1.out"},"l").to("#loading",{opacity:0,duration:.3,ease:"power1.out"},"a").to("#page1",{opacity:1,duration:0,ease:"power1.out"},"a").to("#page1",{maskSize:"200%",duration:1.6,ease:"power1.out",onComplete:()=>{gsap.set("#page1",{mask:"none"})}}).to("#hero-img",{transform:"translateY(40vh)",duration:.5,delay:-.2,ease:"power1.out"})}s();function c(){const e=document.querySelector("#point"),o=document.querySelector("#f");var n=gsap.timeline({scrollTrigger:{trigger:"#page1",scroller:"body",start:"top top",end:"top -5%",scrub:1}});n.to("#point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to("#p",{x:e.offsetWidth/2+e.offsetWidth/2/2.7,duration:.4,delay:.2},"a").to("#dot",{opacity:1,x:-o.offsetWidth*3,duration:.4,delay:.2},"a").to("#o",{x:-o.offsetWidth*2,duration:.4,delay:.2},"a")}c();function d(){var e=localStorage.getItem("mode")==="true";const o=document.documentElement;e?(o.style.setProperty("--primary","#000"),o.style.setProperty("--secondary","#fff"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line")):(o.style.setProperty("--primary","#e8e8e192"),o.style.setProperty("--secondary","#000"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line")),document.querySelector("#mode").addEventListener("click",function(){e?(o.style.setProperty("--primary","#e8e8e192"),o.style.setProperty("--secondary","#000"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),e=!1):(o.style.setProperty("--primary","#000"),o.style.setProperty("--secondary","#fff"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),e=!0),localStorage.setItem("mode",e)})}d();function l(){document.querySelectorAll(".text-splite").forEach(function(e){gsap.from(e.querySelectorAll("span"),{y:20,opacity:0,stagger:.1,duration:1.5,scrollTrigger:{trigger:e,scroller:"body",start:"top 65%",end:"top 45%",scrub:1}})})}l();const t=document.querySelector("#full-view"),r=document.querySelector("#over-view");function u(){gsap.timeline().to(window,{scrollTo:window.innerHeight*2+window.innerHeight/5,ease:"power1.out"}).to("#fullView-container",{paddingTop:"15vw",duration:.8,opacity:0,ease:"power1.out"},"a").to("#overView-container",{opacity:1,duration:1,delay:.2,ease:"power1.out",onStart:()=>{document.querySelector("#overView-container").style.display="flex",document.querySelector("#fullView-container").style.display="none"},onComplete:()=>{l()}},"a")}function y(){const e=window.innerHeight*2+window.innerHeight/5;gsap.timeline().to(window,{scrollTo:e,ease:"power1.out"}).to("#overView-container",{opacity:0,duration:.8,ease:"power1.out"},"a").to("#fullView-container",{paddingTop:"10vw",duration:.8,delay:.2,opacity:1,ease:"power1.out",onStart:()=>{document.querySelector("#overView-container").style.display="none",document.querySelector("#fullView-container").style.display="flex"},onComplete:()=>{l()}},"a")}r.addEventListener("click",function(){u(),r.classList.add("active"),t.classList.remove("active"),r.style.width="60%",r.style.backgroundColor="black",r.querySelector("h1").style.color="white",t.style.width="40%",t.style.backgroundColor="#F7F7F7",t.querySelector("h1").style.color="black"});t.addEventListener("click",function(){y(),t.classList.add("active"),r.classList.remove("active"),t.style.width="60%",t.style.backgroundColor="black",t.querySelector("h1").style.color="white",r.style.width="40%",r.style.backgroundColor="#F7F7F7",r.querySelector("h1").style.color="black"});const i=document.querySelectorAll(".view");i.forEach(function(e){e.addEventListener("mousemove",function(){e.classList.contains("active")||(e.style.width="60%",e.style.backgroundColor="black",e.querySelector("h1").style.color="white")})});i.forEach(function(e){e.addEventListener("mouseleave",function(){e.classList.contains("active")||(e.style.width="40%",e.style.backgroundColor="#F7F7F7",e.querySelector("h1").style.color="black")})});
//# sourceMappingURL=index-BX3VsqBD.js.map