import"./modulepreload-polyfill-B5Qt9EMX.js";const i=document.querySelectorAll(".slide"),c=document.querySelectorAll(".inner-slide"),d=document.querySelectorAll("#count-wraper span");let s=0,g=!1;window.addEventListener("load",()=>{sessionStorage.getItem("reloadPrevious")==="true"&&(sessionStorage.removeItem("reloadPrevious"),window.location.reload())});document.addEventListener("wheel",function(o){if(g)return;g=!0;const t=window.scrollY,l=document.documentElement.scrollHeight-window.innerHeight;o.preventDefault(),o.deltaY>0&&t>=l?window.scrollTo(0,l):o.deltaY<0&&t<=0?window.scrollTo(0,0):window.scrollBy(0,o.deltaY);const n=o.deltaY>0?1:-1,e=(s+n+i.length)%i.length,a=gsap.timeline({onComplete:()=>{s=e,g=!1}});n>0?(gsap.set(i[e],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(i[e].querySelector("img"),{objectPosition:"50% -20%",scale:1.5}),gsap.set(d[e],{top:"100%",opacity:0}),gsap.set(c[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(c[e].querySelector("img"),{objectPosition:"50% 1000%"}),a.to(i[s],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(i[s].querySelector("img"),{objectPosition:"50% 20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -20%",scale:1.5})}},"a").to(i[s].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(5deg) translateY(100%)"},"a")}},"a").to(d[s],{top:"-100%",duration:.8,opacity:0,onComplete:()=>{gsap.set(d[s],{top:"100%",opacity:1})}},"a").to(d[e],{top:"0%",duration:.8,opacity:.7},"a").to(c[s],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(c[s].querySelector("img"),{objectPosition:"50% -1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 1000%"})}},"a").to(i[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(i[e].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(i[e].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(c[e],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(c[e].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a")):(gsap.set(i[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(i[e].querySelector("img"),{objectPosition:"50% 20%",scale:1.5}),gsap.set(d[e],{top:"-100%",opacity:0}),gsap.set(c[e],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(c[e].querySelector("img"),{objectPosition:"50% -1000%"}),a.to(i[s],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(i[s].querySelector("img"),{objectPosition:"50% -20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 20%",scale:1.5})}},"a").to(i[s].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(-5deg) translateY(-100%)"},"a")}},"a").to(d[s],{top:"100%",duration:.8,opacity:0,onComplete:()=>{gsap.set(d[s],{top:"-100%",opacity:1})}},"a").to(d[e],{top:"0%",duration:.8,opacity:.7},"a").to(c[s],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(c[s].querySelector("img"),{objectPosition:"50% 1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -1000%"})}},"a").to(i[e],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(i[e].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(i[e].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(c[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(c[e].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a"))},{passive:!1});const m=[{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",route:"/work-contigo"},{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",route:"/work-typcaste"},{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/c4be78168579017.670cc5493709c.png",route:"/work-label-ritu-kumar"},{image:"https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-pixel-flakes"},{image:"https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-studio-d"},{image:"https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-plugged-live-show"},{image:"https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-ali-ali"},{image:"https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-stock-dutch-design"},{image:"https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-the-st-regis-venice"},{image:"https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-rino-&-pelle"},{image:"https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-aebele-interiors"},{image:"https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-ottografie"}];document.querySelector("#allproject").addEventListener("click",async function(){if(g)return;document.querySelectorAll(".project").forEach(n=>n.remove());const o=m.filter((n,e)=>e!==s);function t(n,e={},...a){const r=document.createElement(n);if(e.classes&&r.classList.add(...e.classes),e.attributes)for(const u in e.attributes)r.setAttribute(u,e.attributes[u]);return e.style&&Object.assign(r.style,e.style),a.forEach(u=>r.appendChild(u)),r}(function(){const e=document.createDocumentFragment(),a=document.querySelector("#list");o.forEach((r,u)=>{const p=t("div",{classes:["project","animate"],attributes:{"data-url":r.route}},t("img",{attributes:{src:r.image}}));if(e.appendChild(p),u===0){const f=t("div",{classes:["project"],attributes:{"data-url":m[s].route}},t("img",{attributes:{src:m[s].image},style:{objectPosition:"50% 0%"}}));e.appendChild(f)}}),a.appendChild(e)})(),g=!0;const l=document.querySelectorAll(".animate");gsap.set(l,{y:200}),gsap.to(i[s].querySelector("img"),{scale:1.3,duration:.3}),gsap.to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:.5}),gsap.to(l,{y:0,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set("#inner-container",{zIndex:-1})}}),document.querySelectorAll(".project").forEach(function(n){n.addEventListener("click",function(e){const a=n.getAttribute("data-url");gsap.to(document.querySelector(".navbar2"),{opacity:0,top:"-10%",duration:.8,ease:"expo.out"});const r=e.clientX,u=e.clientY,p=n.getBoundingClientRect(),f=r-p.left,y=u-p.top;gsap.set(n,{position:"fixed",top:`${p.top+window.scrollY}px`,left:`${p.left+window.scrollX}px`,width:p.width+"px",height:p.height+"px",zIndex:99,transformOrigin:`${f}px ${y}px`,willChange:"width, height, top, left, transform"}),gsap.to(n,{width:"100vw",height:"100vh",top:0,left:0,duration:1,ease:"power4.inOut",onComplete:()=>{sessionStorage.setItem("reloadPrevious","true"),setTimeout(()=>{window.location.href=a},50)}})})})});document.querySelector("#close-btn").addEventListener("click",function(){const o=document.querySelectorAll(".animate");var t=gsap.timeline();t.to("#list",{scrollTo:{y:0,x:0,duration:1},ease:"power2.inOut"}).to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:.5,onComplete:()=>{gsap.set("#list",{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"s").to(o,{y:-200,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set(o,{y:200})}},"s").to(i[s].querySelector("img"),{scale:1,duration:.3},"s"),gsap.set("#inner-container",{zIndex:3,delay:.5}),g=!1});function h(){var o=localStorage.getItem("mode")==="true";const t=document.documentElement;o?(t.style.setProperty("--primary","#000"),t.style.setProperty("--secondary","#fff"),t.style.setProperty("--back","#00000086"),t.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector(".navbar2").style.background=`
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
`):(t.style.setProperty("--primary","#F2F2EE"),t.style.setProperty("--secondary","#000"),t.style.setProperty("--back","#f2f2ee83"),t.style.setProperty("--invert-filter","invert(0)"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector(".navbar2").style.background=`
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
`),document.querySelector("#mode").addEventListener("click",function(){o?(t.style.setProperty("--primary","#F2F2EE"),t.style.setProperty("--secondary","#000"),t.style.setProperty("--back","#f2f2ee83"),t.style.setProperty("--invert-filter","invert(0)"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector(".navbar2").style.background=`
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
`,o=!1):(t.style.setProperty("--primary","#000"),t.style.setProperty("--secondary","#fff"),t.style.setProperty("--back","#00000086"),t.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector(".navbar2").style.background=`
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
`,o=!0),localStorage.setItem("mode",o)})}h();document.querySelector("#inner-container").addEventListener("click",function(){g=!0,gsap.set("#inner-container",{objectPosition:"50% 0"}),gsap.to("#inner-container",{width:"100vw",height:"100vh",duration:1,ease:"power4.inOut",onUpdate:function(){gsap.set("#inner-container",{willChange:"width, height, top, left, transform"})},onComplete:()=>{sessionStorage.setItem("reloadPrevious","true"),setTimeout(()=>{window.location.href=m[s].route},50)}})});function b(){const o=document.querySelector("#point"),t=document.querySelector("#f");var l=gsap.timeline({scrollTrigger:{trigger:"#list",scroller:"#list",start:"top top",end:"top -5%",scrub:1}});l.to(".navbar2 #point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to(".navbar2 #f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to(".navbar2 #p",{x:o.offsetWidth/2+o.offsetWidth/2/1.8,duration:.4,delay:.2},"a").to(".navbar2 #dot",{opacity:1,x:-t.offsetWidth*3,duration:.4,delay:.2},"a").to(".navbar2 #o",{x:-t.offsetWidth*2,duration:.4,delay:.2},"a")}b();document.querySelector("#filter-btn").addEventListener("click",function(){gsap.set("#filterl",{top:"0%"}),gsap.to("#filterl",{opacity:1,duration:.3}),gsap.to("#filter-content",{bottom:"0%",duration:.5})});document.querySelector("#cross").addEventListener("click",function(){gsap.to("#filterl",{opacity:0,duration:.3}),gsap.to("#filter-content",{bottom:"-100%",duration:.6,onComplete:function(){gsap.set("#filterl",{top:"100%"})}})});function x(){var o=!1,t=!1;document.querySelector("#menu-c").addEventListener("click",function(){o?(gsap.to(".navigation1",{top:"-100%",clipPath:"polygon(0 0, 100% 0, 100% 97%, 0 89%)",duration:1.5,ease:"power4.out",onStart:function(){setTimeout(function(){gsap.set(".navbar1",{mixBlendMode:"normal"})},500)}}),o=!1):(gsap.set(".navbar1",{mixBlendMode:"difference"}),gsap.to(".navigation1",{top:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:1.5,ease:"power4.out"}),o=!0)}),document.querySelector(".list-menu").addEventListener("click",function(){console.log("hey"),t?(gsap.to(".navigation2",{top:"-100%",clipPath:"polygon(0 0, 100% 0, 100% 97%, 0 89%)",duration:1.5,ease:"power4.out"}),t=!1):(console.log("hey2"),gsap.to(".navigation2",{top:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:1.5,ease:"power4.out"}),t=!0)});let l=document.querySelectorAll(".shape"),n=document.querySelectorAll("#shape-select a"),e=document.querySelectorAll("#social-l a");n.forEach(function(a){a.addEventListener("mouseenter",function(){for(var r=0;r<=n.length;r++)n[r]!==a?gsap.to(n[r],{filter:"blur(4px)",opacity:.4,duration:.4}):gsap.to(a,{filter:"blur(0px)",opacity:1,duration:.4});a.getAttribute("data-index")!==0&&(gsap.to(l[0],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(l[a.getAttribute("data-index")],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})}),n.forEach(function(a,r){a.addEventListener("mouseleave",function(){gsap.to(n,{filter:"blur(0px)",opacity:1,duration:.4}),gsap.to(l[a.getAttribute("data-index")],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(l[0],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"})})}),e.forEach(function(a){a.addEventListener("mouseenter",function(){for(var r=0;r<=e.length;r++)e[r]!==a?gsap.to(e[r],{filter:"blur(2px)",opacity:.5,duration:.4}):gsap.to(a,{filter:"blur(0px)",opacity:1,duration:.4})})}),e.forEach(function(a,r){a.addEventListener("mouseleave",function(){gsap.to(e,{filter:"blur(0px)",opacity:1,duration:.4})})})}x();
//# sourceMappingURL=work-ByB1v_IF.js.map
