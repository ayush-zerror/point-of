import"./modulepreload-polyfill-B5Qt9EMX.js";const a=document.querySelectorAll(".slide"),l=document.querySelectorAll(".inner-slide"),p=document.querySelectorAll("#count-wraper span");let o=0,g=!1;window.addEventListener("load",()=>{sessionStorage.getItem("reloadPrevious")==="true"&&(sessionStorage.removeItem("reloadPrevious"),window.location.reload())});document.addEventListener("wheel",function(s){if(g)return;g=!0;const t=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;s.preventDefault(),s.deltaY>0&&t>=d?window.scrollTo(0,d):s.deltaY<0&&t<=0?window.scrollTo(0,0):window.scrollBy(0,s.deltaY);const r=s.deltaY>0?1:-1,e=(o+r+a.length)%a.length,n=gsap.timeline({onComplete:()=>{o=e,g=!1}});r>0?(gsap.set(a[e],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(a[e].querySelector("img"),{objectPosition:"50% -20%",scale:1.5}),gsap.set(p[e],{top:"100%",opacity:0}),gsap.set(l[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(l[e].querySelector("img"),{objectPosition:"50% 1000%"}),n.to(a[o],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(a[o].querySelector("img"),{objectPosition:"50% 20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -20%",scale:1.5})}},"a").to(a[o].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(5deg) translateY(100%)"},"a")}},"a").to(p[o],{top:"-100%",duration:.8,opacity:0,onComplete:()=>{gsap.set(p[o],{top:"100%",opacity:1})}},"a").to(p[e],{top:"0%",duration:.8,opacity:.7},"a").to(l[o],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(l[o].querySelector("img"),{objectPosition:"50% -1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 1000%"})}},"a").to(a[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(a[e].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(a[e].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(l[e],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(l[e].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a")):(gsap.set(a[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(a[e].querySelector("img"),{objectPosition:"50% 20%",scale:1.5}),gsap.set(p[e],{top:"-100%",opacity:0}),gsap.set(l[e],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(l[e].querySelector("img"),{objectPosition:"50% -1000%"}),n.to(a[o],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(a[o].querySelector("img"),{objectPosition:"50% -20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 20%",scale:1.5})}},"a").to(a[o].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(-5deg) translateY(-100%)"},"a")}},"a").to(p[o],{top:"100%",duration:.8,opacity:0,onComplete:()=>{gsap.set(p[o],{top:"-100%",opacity:1})}},"a").to(p[e],{top:"0%",duration:.8,opacity:.7},"a").to(l[o],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(l[o].querySelector("img"),{objectPosition:"50% 1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -1000%"})}},"a").to(a[e],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(a[e].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(a[e].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(l[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(l[e].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a"))},{passive:!1});const m=[{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",route:"/work-contigo"},{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",route:"/work-typcaste"},{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/c4be78168579017.670cc5493709c.png",route:"/work-label-ritu-kumar"},{image:"https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-pixel-flakes"},{image:"https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-studio-d"},{image:"https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-plugged-live-show"},{image:"https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-ali-ali"},{image:"https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-stock-dutch-design"},{image:"https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-the-st-regis-venice"},{image:"https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-rino-&-pelle"},{image:"https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-aebele-interiors"},{image:"https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-ottografie"}];document.querySelector("#allproject").addEventListener("click",async function(){if(g)return;document.querySelectorAll(".project").forEach(r=>r.remove());const s=m.filter((r,e)=>e!==o);function t(r,e={},...n){const i=document.createElement(r);if(e.classes&&i.classList.add(...e.classes),e.attributes)for(const c in e.attributes)i.setAttribute(c,e.attributes[c]);return e.style&&Object.assign(i.style,e.style),n.forEach(c=>i.appendChild(c)),i}(function(){const e=document.createDocumentFragment(),n=document.querySelector("#list");s.forEach((i,c)=>{const u=t("div",{classes:["project","animate"],attributes:{"data-url":i.route}},t("img",{attributes:{src:i.image}}));if(e.appendChild(u),c===0){const y=t("div",{classes:["project"],attributes:{"data-url":m[o].route}},t("img",{attributes:{src:m[o].image},style:{objectPosition:"50% 0%"}}));e.appendChild(y)}}),n.appendChild(e)})(),g=!0;const d=document.querySelectorAll(".animate");gsap.set(d,{y:200}),gsap.to(a[o].querySelector("img"),{scale:1.3,duration:.3}),gsap.to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:.5}),gsap.to(d,{y:0,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set("#inner-container",{zIndex:-1})}}),document.querySelectorAll(".project").forEach(function(r){r.addEventListener("click",function(e){const n=r.getAttribute("data-url");gsap.to(document.querySelector(".navbar2"),{opacity:0,top:"-10%",duration:.8,ease:"expo.out"});const i=e.clientX,c=e.clientY,u=r.getBoundingClientRect(),y=i-u.left,h=c-u.top;gsap.set(r,{position:"fixed",top:`${u.top+window.scrollY}px`,left:`${u.left+window.scrollX}px`,width:u.width+"px",height:u.height+"px",zIndex:99,transformOrigin:`${y}px ${h}px`,willChange:"width, height, top, left, transform"}),gsap.to(r,{width:"100vw",height:"100vh",top:0,left:0,duration:1,ease:"power4.inOut",onComplete:()=>{sessionStorage.setItem("reloadPrevious","true"),setTimeout(()=>{window.location.href=n},50)}})})})});document.querySelector("#close-btn").addEventListener("click",function(){const s=document.querySelectorAll(".animate");var t=gsap.timeline();t.to("#list",{scrollTo:{y:0,x:0,duration:1},ease:"power2.inOut"}).to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:.5,onComplete:()=>{gsap.set("#list",{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"s").to(s,{y:-200,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set(s,{y:200})}},"s").to(a[o].querySelector("img"),{scale:1,duration:.3},"s"),gsap.set("#inner-container",{zIndex:3,delay:.5}),g=!1});function f(){var s=localStorage.getItem("mode")==="true";const t=document.documentElement;s?(t.style.setProperty("--primary","#000"),t.style.setProperty("--secondary","#fff"),t.style.setProperty("--back","#00000086"),t.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector(".navbar2").style.background=`
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
`),document.querySelector("#mode").addEventListener("click",function(){s?(t.style.setProperty("--primary","#F2F2EE"),t.style.setProperty("--secondary","#000"),t.style.setProperty("--back","#f2f2ee83"),t.style.setProperty("--invert-filter","invert(0)"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector(".navbar2").style.background=`
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
`,s=!1):(t.style.setProperty("--primary","#000"),t.style.setProperty("--secondary","#fff"),t.style.setProperty("--back","#00000086"),t.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector(".navbar2").style.background=`
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
`,s=!0),localStorage.setItem("mode",s)})}f();document.querySelector("#inner-container").addEventListener("click",function(){g=!0,gsap.set("#inner-container",{objectPosition:"50% 0"}),gsap.to("#inner-container",{width:"100vw",height:"100vh",duration:1,ease:"power4.inOut",onUpdate:function(){gsap.set("#inner-container",{willChange:"width, height, top, left, transform"})},onComplete:()=>{sessionStorage.setItem("reloadPrevious","true"),setTimeout(()=>{window.location.href=m[o].route},50)}})});function b(){const s=document.querySelector("#point"),t=document.querySelector("#f");var d=gsap.timeline({scrollTrigger:{trigger:"#list",scroller:"#list",start:"top top",end:"top -5%",scrub:1}});d.to(".navbar2 #point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to(".navbar2 #f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to(".navbar2 #p",{x:s.offsetWidth/2+s.offsetWidth/2/1.8,duration:.4,delay:.2},"a").to(".navbar2 #dot",{opacity:1,x:-t.offsetWidth*3,duration:.4,delay:.2},"a").to(".navbar2 #o",{x:-t.offsetWidth*2,duration:.4,delay:.2},"a")}b();document.querySelector("#filter-btn").addEventListener("click",function(){gsap.set("#filterl",{top:"0%"}),gsap.to("#filterl",{opacity:1,duration:.3}),gsap.fromTo("#filter-content",{y:"100%"},{y:"0%",duration:.5})});document.querySelector("#cross").addEventListener("click",function(){gsap.to("#filterl",{opacity:0,duration:.3}),gsap.to("#filter-content",{y:"100%",duration:.5,onComplete:function(){gsap.set("#filterl",{top:"-100%"})}})});
//# sourceMappingURL=work-CYqkUQq5.js.map
