import"./modulepreload-polyfill-B5Qt9EMX.js";const s=document.querySelectorAll(".slide"),d=document.querySelectorAll(".inner-slide"),y=document.querySelectorAll("#count-wraper span"),E=document.querySelector("#filter-count");let i=0,b=!1;var m=null;window.addEventListener("load",()=>{sessionStorage.getItem("reloadPrevious")==="true"&&(sessionStorage.removeItem("reloadPrevious"),window.location.reload())});document.addEventListener("wheel",function(e){if(b)return;b=!0;const t=window.scrollY,a=document.documentElement.scrollHeight-window.innerHeight;e.preventDefault(),e.deltaY>0&&t>=a?window.scrollTo(0,a):e.deltaY<0&&t<=0?window.scrollTo(0,0):window.scrollBy(0,e.deltaY);const r=e.deltaY>0?1:-1,o=(i+r+s.length)%s.length,c=gsap.timeline({onComplete:()=>{i=o,b=!1}});r>0?(gsap.set(s[o],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(s[o].querySelector("img"),{objectPosition:"50% -20%",scale:1.5}),gsap.set(y[o],{top:"100%",opacity:0}),gsap.set(d[o],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(d[o].querySelector("img"),{objectPosition:"50% 1000%"}),c.to(s[i],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(s[i].querySelector("img"),{objectPosition:"50% 20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -20%",scale:1.5})}},"a").to(s[i].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(5deg) translateY(100%)"},"a")}},"a").to(y[i],{top:"-100%",duration:.8,opacity:0,onComplete:()=>{gsap.set(y[i],{top:"100%",opacity:1})}},"a").to(y[o],{top:"0%",duration:.8,opacity:.7},"a").to(d[i],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(d[i].querySelector("img"),{objectPosition:"50% -1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 1000%"})}},"a").to(s[o],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(s[o].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(s[o].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(d[o],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(d[o].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a")):(gsap.set(s[o],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(s[o].querySelector("img"),{objectPosition:"50% 20%",scale:1.5}),gsap.set(y[o],{top:"-100%",opacity:0}),gsap.set(d[o],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(d[o].querySelector("img"),{objectPosition:"50% -1000%"}),c.to(s[i],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(s[i].querySelector("img"),{objectPosition:"50% -20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 20%",scale:1.5})}},"a").to(s[i].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(-5deg) translateY(-100%)"},"a")}},"a").to(y[i],{top:"100%",duration:.8,opacity:0,onComplete:()=>{gsap.set(y[i],{top:"-100%",opacity:1})}},"a").to(y[o],{top:"0%",duration:.8,opacity:.7},"a").to(d[i],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(d[i].querySelector("img"),{objectPosition:"50% 1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -1000%"})}},"a").to(s[o],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(s[o].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(s[o].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(d[o],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(d[o].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a"))},{passive:!1});const p=[{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",route:"/work-contigo",service:"Web Design",industry:"E-commerce",year:2023,name:"Contigo"},{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",route:"/work-typcaste",service:"Branding",industry:"Education",year:2022,name:"Typcaste"},{image:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/c4be78168579017.670cc5493709c.png",route:"/work-label-ritu-kumar",service:"Fashion Design",industry:"Fashion",year:2021,name:"Ritu Kumar Label"},{image:"https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-pixel-flakes",service:"Web Development",industry:"Technology",year:2023,name:"Pixel Flakes"},{image:"https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-studio-d",service:"Interior Design",industry:"Architecture",year:2024,name:"Studio D"},{image:"https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-plugged-live-show",service:"Branding",industry:"Entertainment",year:2024,name:"Plugged Live Shows"},{image:"https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-ali-ali",service:"Web Design",industry:"E-commerce",year:2022,name:"Ali Ali"},{image:"https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-stock-dutch-design",service:"Branding",industry:"Architecture",year:2021,name:"Stock Dutch Design"},{image:"https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-the-st-regis-venice",service:"Web Design",industry:"Architecture",year:2020,name:"St. Regis Venice"},{image:"https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-rino-&-pelle",service:"Fashion Design",industry:"Fashion",year:2022,name:"Rino & Pelle"},{image:"https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-aebele-interiors",service:"Interior Design",industry:"Architecture",year:2021,name:"Aebele Interiors"},{image:"https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)",route:"/work-ottografie",service:"Web Development",industry:"Technology",year:2020,name:"Ottografie"}];E.textContent=p.length;if(window.innerWidth<=600){document.querySelector("#page1-mobile").innerHTML="";var A="";p.forEach(function(e){A+=` <a href=${e.route} class="project-m">
                <div class="project-showcase">
                    <img src=${e.image} alt="">
                </div>
                <h4>${e.name}</h4>
                <p>Frontier Health Innovation</p>
            </a>`}),document.querySelector("#page1-mobile").innerHTML=A}function g(e,t={},...a){const r=document.createElement(e);if(t.classes&&r.classList.add(...t.classes),t.attributes)for(const o in t.attributes)r.setAttribute(o,t.attributes[o]);return t.style&&Object.assign(r.style,t.style),a.forEach(o=>r.appendChild(o)),r}function P(e,t=!0){const a=document.createDocumentFragment(),r=document.querySelector("#list-content");r.innerHTML="",e.forEach((o,c)=>{const u=g("div");u.classList.add("project-parent","project","animate"),u.setAttribute("data-url",o.route);const n=g("div",{classes:["text-wrapper"]},g("h5",{},document.createTextNode(o.name))),l=g("div",{classes:["project-child"]},g("img",{attributes:{src:o.image}}));if(u.appendChild(n),u.appendChild(l),a.appendChild(u),t&&c===0){const x=g("div");x.classList.add("project-parent","project"),x.setAttribute("data-url",p[i].route);const F=g("div",{classes:["text-wrapper"]},g("h5",{},document.createTextNode(p[i].name))),T=g("div",{classes:["project-child"]},g("img",{attributes:{src:p[i].image},style:{objectPosition:"50% 0%"}}));x.appendChild(F),x.appendChild(T),a.appendChild(x)}}),r.appendChild(a)}function k(){document.querySelectorAll(".project-parent").forEach(function(e){e.addEventListener("click",function(t){const a=e.getAttribute("data-url");gsap.to(document.querySelector(".navbar2"),{opacity:0,top:"-10%",duration:.8,ease:"expo.out"}),gsap.to(e.querySelector("h5"),{opacity:0,duration:.2,ease:"expo.out"});const r=t.clientX,o=t.clientY,c=e.getBoundingClientRect(),u=r-c.left,n=o-c.top;gsap.set(e,{position:"fixed",top:`${c.top+window.scrollY}px`,left:`${c.left+window.scrollX}px`,width:c.width+"px",height:c.height+"px",zIndex:99,transformOrigin:`${u}px ${n}px`,willChange:"width, height, top, left, transform"}),gsap.to(e,{width:"100vw",height:"103.5vh",top:"-3.6vh",left:0,duration:1,ease:"power4.inOut",onComplete:()=>{sessionStorage.setItem("reloadPrevious","true"),setTimeout(()=>{window.location.href=a},50)}})})})}document.querySelector("#allproject").addEventListener("click",async function(){if(b)return;b=!0;const e=p.filter((a,r)=>r!==i);P(e),k();function t(){const a=document.querySelectorAll(".animate");gsap.set(a,{y:200}),gsap.to(s[i].querySelector("img"),{scale:1.3,duration:.3}),gsap.to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:.5}),gsap.to(a,{y:0,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set("#inner-container",{zIndex:-1})}})}t()});document.querySelector("#close-btn").addEventListener("click",function(){const e=document.querySelectorAll(".animate");var t=gsap.timeline();t.to("#list",{scrollTo:{y:0,x:0,duration:1},ease:"power2.inOut"}).to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:.5,onComplete:()=>{gsap.set("#list",{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"s").to(e,{y:-200,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set(e,{y:200})}},"s").to(s[i].querySelector("img"),{scale:1,duration:.3},"s"),gsap.set("#inner-container",{zIndex:3,delay:.5}),j(),b=!1});function Y(){var e=localStorage.getItem("mode")==="true";const t=document.documentElement;e?(t.style.setProperty("--primary","#000"),t.style.setProperty("--secondary","#fff"),t.style.setProperty("--back","#00000086"),t.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector(".navbar2").style.background=`
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
`),document.querySelector("#mode").addEventListener("click",function(){e?(t.style.setProperty("--primary","#F2F2EE"),t.style.setProperty("--secondary","#000"),t.style.setProperty("--back","#f2f2ee83"),t.style.setProperty("--invert-filter","invert(0)"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),document.querySelector(".navbar2").style.background=`
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
`,e=!1):(t.style.setProperty("--primary","#000"),t.style.setProperty("--secondary","#fff"),t.style.setProperty("--back","#00000086"),t.style.setProperty("--invert-filter","invert(1)"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),document.querySelector(".navbar2").style.background=`
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
`,e=!0),localStorage.setItem("mode",e)})}Y();document.querySelector("#inner-container").addEventListener("click",function(){b=!0,gsap.to(document.querySelector(".navbar1"),{opacity:0,top:"-10%",duration:.8,ease:"expo.out"}),gsap.set("#inner-container",{objectPosition:"50% 0"}),gsap.to("#inner-container",{width:"100vw",height:"100vh",duration:1,ease:"power4.inOut",onUpdate:function(){gsap.set("#inner-container",{willChange:"width, height, top, left, transform"})},onComplete:()=>{sessionStorage.setItem("reloadPrevious","true"),setTimeout(()=>{window.location.href=p[i].route},50)}})});function D(){const e=document.querySelector("#point"),t=document.querySelector("#f");var a=gsap.timeline({scrollTrigger:{trigger:"#list",scroller:"#list",start:"top top",end:"top -5%",scrub:1}});a.to(".navbar2 #point",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to(".navbar2 #f",{opacity:0,x:2,duration:.2,ease:"power1.out"},"a").to(".navbar2 #p",{x:e.offsetWidth/2+e.offsetWidth/2/1.8,duration:.4,delay:.2},"a").to(".navbar2 #dot",{opacity:1,x:-t.offsetWidth*3,duration:.4,delay:.2},"a").to(".navbar2 #o",{x:-t.offsetWidth*2,duration:.4,delay:.2},"a")}D();function I(){var e=!1,t=!1;document.querySelector("#menu-c").addEventListener("click",function(){e?(gsap.to(".navigation1",{top:"-130%",clipPath:"polygon(0 0, 100% 0, 100% 97%, 0 89%)",duration:1.5,ease:"power4.out",onStart:function(){setTimeout(function(){window.innerWidth>600&&gsap.set(".navbar1",{mixBlendMode:"normal"})},500)}}),e=!1):(window.innerWidth>600&&gsap.set(".navbar1",{mixBlendMode:"difference"}),gsap.to(".navigation1",{top:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:1.5,ease:"power4.out"}),e=!0)}),document.querySelector(".list-menu").addEventListener("click",function(){t?(gsap.to(".navigation2",{top:"-100%",clipPath:"polygon(0 0, 100% 0, 100% 97%, 0 89%)",duration:1.5,ease:"power4.out"}),t=!1):(gsap.to(".navigation2",{top:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:1.5,ease:"power4.out"}),t=!0)});let a=document.querySelectorAll(".shape"),r=document.querySelectorAll("#shape-select a"),o=document.querySelectorAll("#social-l a");r.forEach(function(n){n.addEventListener("mouseenter",function(){for(var l=0;l<=r.length;l++)r[l]!==n?gsap.to(r[l],{filter:"blur(4px)",opacity:.4,duration:.4}):gsap.to(n,{filter:"blur(0px)",opacity:1,duration:.4});n.getAttribute("data-index")!=="0"&&(gsap.to(a[0],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(a[n.getAttribute("data-index")],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})}),r.forEach(function(n,l){n.addEventListener("mouseleave",function(){gsap.to(r,{filter:"blur(0px)",opacity:1,duration:.4}),n.getAttribute("data-index")!=="0"&&(gsap.to(a[n.getAttribute("data-index")],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(a[0],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})}),o.forEach(function(n){n.addEventListener("mouseenter",function(){for(var l=0;l<=o.length;l++)o[l]!==n?gsap.to(o[l],{filter:"blur(2px)",opacity:.5,duration:.4}):gsap.to(n,{filter:"blur(0px)",opacity:1,duration:.4})})}),o.forEach(function(n,l){n.addEventListener("mouseleave",function(){gsap.to(o,{filter:"blur(0px)",opacity:1,duration:.4})})});let c=document.querySelectorAll(".navigation2 .shape"),u=document.querySelectorAll(".navigation2 #shape-select a");u.forEach(function(n){n.addEventListener("mouseenter",function(){for(var l=0;l<=u.length;l++)u[l]!==n?gsap.to(u[l],{filter:"blur(4px)",opacity:.4,duration:.4}):gsap.to(n,{filter:"blur(0px)",opacity:1,duration:.4});n.getAttribute("data-index")!=="0"&&(gsap.to(c[0],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(c[n.getAttribute("data-index")],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})}),u.forEach(function(n,l){n.addEventListener("mouseleave",function(){gsap.to(u,{filter:"blur(0px)",opacity:1,duration:.4}),n.getAttribute("data-index")!=="0"&&(gsap.to(c[n.getAttribute("data-index")],{transform:"rotate(40deg) scale(0)",opacity:0,duration:.5,ease:"power4.out"}),gsap.to(c[0],{transform:"rotate(0deg) scale(1)",opacity:1,duration:.5,ease:"power4.out"}))})})}I();document.querySelector("#filter-btn").addEventListener("click",function(){gsap.set("#filterl",{top:"0%"}),gsap.to("#filterl",{opacity:1,duration:.3}),gsap.to("#filter-content",{bottom:"0%",duration:.5})});document.querySelector("#cross").addEventListener("click",function(){if(m.length===0){const e=p.filter((t,a)=>a!==i);P(e),k()}gsap.to("#filterl",{opacity:0,duration:.3}),gsap.to("#filter-content",{bottom:"-100%",duration:.6,onComplete:function(){gsap.set("#filterl",{top:"100%"})}})});const S=document.querySelectorAll(".fl-service h5"),q=document.querySelectorAll(".fl-industry h5"),w=document.querySelectorAll(".fl-year h5"),L=document.querySelector("#reset-btn");let f=[],h=[],v=[];function C(e){e.forEach(function(t){t.addEventListener("click",async function(){t.classList.add("active"),t.style.opacity=1;for(var a=0;a<e.length;a++)e[a].classList.contains("active")?e[a].style.opacity=1:e[a].style.opacity=.4;await W(),m=p.filter(r=>{const o=f.length>0?f.includes(r.service):!0,c=h.length>0?h.includes(r.industry):!0,u=v.length>0?v.includes(r.year):!0;return o&&c&&u}),console.log(m),m.length>0?(E.textContent=m.length,document.querySelector("#filter-view").style.display="block",document.querySelector("#notFound").style.display="none"):(document.querySelector("#filter-view").style.display="none",document.querySelector("#notFound").style.display="block"),L.style.display="block"})})}C(S);C(q);C(w);document.querySelector("#reset-btn").addEventListener("click",function(){document.querySelectorAll(".filter-by h5").forEach(function(e){j()})});function j(){document.querySelectorAll(".filter-by h5").forEach(function(e){e.classList.remove("active"),e.style.opacity=1,L.style.display="none",E.textContent=p.length,f=[],h=[],v=[],m=[]})}document.querySelector("#filter-view").addEventListener("click",function(e){if(m&&m.length>0)m.length===1?document.querySelector("#list-content").style.justifyContent="center":document.querySelector("#list-content").style.justifyContent="start",P(m,!1),k();else{const t=p.filter((a,r)=>r!==i);P(t),k()}gsap.to("#filterl",{opacity:0,duration:.3}),gsap.to("#filter-content",{bottom:"-100%",duration:.6,onComplete:function(){gsap.set("#filterl",{top:"100%"})}})});async function W(){S==null||S.forEach(function(e){e.classList.contains("active")&&(f!=null&&f.includes(e.textContent.trim())||f.push(e.textContent.trim()))}),q==null||q.forEach(function(e){e.classList.contains("active")&&(h!=null&&h.includes(e.textContent.trim())||h.push(e.textContent.trim()))}),w==null||w.forEach(function(e){e.classList.contains("active")&&(v!=null&&v.includes(Number(e.textContent.trim()))||v.push(Number(e.textContent.trim())))})}
//# sourceMappingURL=work-ixTPnEQk.js.map