import"./modulepreload-polyfill-B5Qt9EMX.js";const t=document.querySelectorAll(".slide"),r=document.querySelectorAll(".inner-slide");let a=0,c=!1;document.addEventListener("wheel",function(s){if(c)return;c=!0,(window.scrollY===0&&event.deltaY<0||window.innerHeight+window.scrollY>=document.body.offsetHeight&&event.deltaY>0)&&event.preventDefault();const o=s.deltaY>0?1:-1,e=(a+o+t.length)%t.length,l=gsap.timeline({onComplete:()=>{a=e,c=!1}});o>0?(gsap.set(t[e],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(t[e].querySelector("img"),{objectPosition:"50% -20%",scale:1.5}),gsap.set(r[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(r[e].querySelector("img"),{objectPosition:"50% 1000%"}),l.to(t[a],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(t[a].querySelector("img"),{objectPosition:"50% 20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -20%",scale:1.5})}},"a").to(t[a].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(5deg) translateY(100%)"},"a")}},"a").to(r[a],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(r[a].querySelector("img"),{objectPosition:"50% -1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 1000%"})}},"a").to(t[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(t[e].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(t[e].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(r[e],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(r[e].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a")):(gsap.set(t[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}),gsap.set(t[e].querySelector("img"),{objectPosition:"50% 20%",scale:1.5}),gsap.set(r[e],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}),gsap.set(r[e].querySelector("img"),{objectPosition:"50% -1000%"}),l.to(t[a],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})}},"a").to(t[a].querySelector("img"),{objectPosition:"50% -20%",scale:1.5,duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% 20%",scale:1.5})}},"a").to(t[a].querySelectorAll(".slide-text h1"),{transform:"rotate(5deg) translateY(100%)",opacity:0,duration:.8,onComplete:function(){gsap.set(this._targets[0],{transform:"rotate(-5deg) translateY(-100%)"},"a")}},"a").to(r[a],{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"a").to(r[a].querySelector("img"),{objectPosition:"50% 1000%",duration:1.5,ease:"expo.out",onComplete:function(){gsap.set(this._targets[0],{objectPosition:"50% -1000%"})}},"a").to(t[e],{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(t[e].querySelector("img"),{objectPosition:"50% 0%",scale:1,duration:1.5,ease:"expo.out"},"a").fromTo(t[e].querySelectorAll(".slide-text h1"),{transform:"rotate(-5deg) translateY(-100%)",opacity:0},{transform:"rotate(0deg) translateY(0%)",opacity:1,duration:.8},"a").to(r[e],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.5,ease:"expo.out"},"a").to(r[e].querySelector("img"),{objectPosition:"50% 0%",duration:1.5,ease:"expo.out"},"a"))},{passive:!1});const y=["https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png","https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png","https://a.storyblok.com/f/133769/2409x3000/cfd16e1a58/cambium-carbon-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/fab67b71d9/plugged-live-shows-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/13b1c95334/ali-ali-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/dd4fa8bc81/stock-dutch-design-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/e4828e1c81/st-regis-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/3e8f8d08f7/aebele-interiors-hero.jpg/m/2400x2990/filters:quality(80)","https://a.storyblok.com/f/133769/2400x2990/0afea0107c/ottografie-hero.jpg/m/2400x2990/filters:quality(80)"];document.querySelector("#allproject").addEventListener("click",async function(){if(c)return;document.querySelectorAll(".project").forEach(l=>l.remove());const s=y.filter((l,n)=>n!==a);function o(l){const n=document.createElement("video");return n.autoplay=!0,n.muted=!0,n.loop=!0,n.playsInline=!0,n.src=l,n}s.forEach(async function(l,n){const p=document.createDocumentFragment(),i=document.createElement("a");i.href="/work-detail",i.classList.add("project","animate");const m=document.createElement("img");m.src=l,i.appendChild(m);const g=o("https://download-video-ak.vimeocdn.com/v3-1/playback/be1179ab-5aaa-4f63-a9a7-f40c70ae895e/96953878?__token__=st=1733133641~exp=1733148041~acl=%2Fv3-1%2Fplayback%2Fbe1179ab-5aaa-4f63-a9a7-f40c70ae895e%2F96953878%2A~hmac=b8559cc5bf566e60f350a09823c494a82161d7212eef5c4adf6b1f00686ba024&r=dXMtZWFzdDE%3D");if(i.appendChild(g),n===0){const d=document.createElement("a");d.classList.add("project");const u=document.createElement("img");u.src=y[a],u.style.objectPosition="50% 0%",d.appendChild(u);const f=o("https://download-video-ak.vimeocdn.com/v3-1/playback/be1179ab-5aaa-4f63-a9a7-f40c70ae895e/96953878?__token__=st=1733133641~exp=1733148041~acl=%2Fv3-1%2Fplayback%2Fbe1179ab-5aaa-4f63-a9a7-f40c70ae895e%2F96953878%2A~hmac=b8559cc5bf566e60f350a09823c494a82161d7212eef5c4adf6b1f00686ba024&r=dXMtZWFzdDE%3D");d.appendChild(f),p.appendChild(i),p.appendChild(d)}else p.appendChild(i);document.querySelector("#list").appendChild(p)}),c=!0;const e=document.querySelectorAll(".animate");gsap.to(t[a].querySelector("img"),{scale:1.5,rotate:"-5deg",duration:.3}),gsap.to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:.5}),gsap.set(e,{y:200}),gsap.to(e,{y:0,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set("#inner-container",{zIndex:-1})}})});document.querySelector("#close-btn").addEventListener("click",function(){const s=document.querySelectorAll(".animate");var o=gsap.timeline();o.to("#list",{scrollTo:{y:0,x:0,duration:1},ease:"power2.inOut"}).to("#list",{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration:.5,onComplete:()=>{gsap.set("#list",{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"})}},"s").to(s,{y:-200,stagger:{amount:.3},duration:.5,onComplete:()=>{gsap.set(s,{y:200})}},"s").to(t[a].querySelector("img"),{scale:1,rotate:"0deg",duration:.5},"s"),gsap.set("#inner-container",{zIndex:3,delay:.5}),c=!1});function h(){var s=localStorage.getItem("mode")==="true";const o=document.documentElement;s?(o.style.setProperty("--primary","#000"),o.style.setProperty("--secondary","#fff"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line")):(o.style.setProperty("--primary","#F2F2EE"),o.style.setProperty("--secondary","#000"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line")),document.querySelector("#mode").addEventListener("click",function(){console.log("click"),s?(o.style.setProperty("--primary","#F2F2EE"),o.style.setProperty("--secondary","#000"),document.querySelector("#mode").classList.remove("ri-moon-line"),document.querySelector("#mode").classList.add("ri-sun-line"),s=!1):(o.style.setProperty("--primary","#000"),o.style.setProperty("--secondary","#fff"),document.querySelector("#mode").classList.remove("ri-sun-line"),document.querySelector("#mode").classList.add("ri-moon-line"),s=!0),localStorage.setItem("mode",s)})}h();
//# sourceMappingURL=work-CRcU3RIM.js.map