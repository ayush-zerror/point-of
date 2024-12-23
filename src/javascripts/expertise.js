const service1 = document.querySelectorAll(".service1 h5")
const service2 = document.querySelectorAll(".service2 h5")
const service3 = document.querySelectorAll(".service3 h5")
const service4 = document.querySelectorAll(".service4 h5")
const service5 = document.querySelectorAll(".service5 h5")
const service6 = document.querySelectorAll(".service6 h5")
gsap.registerPlugin(
    ScrollTrigger,
    MotionPathPlugin,
);

function serviceBlurAnime(services) {
    services.forEach(function (l) {
        l.addEventListener("mouseenter", function () {
            for (var i = 0; i <= services.length; i++) {
                if (services[i] !== l) {
                    gsap.to(services[i], {
                        filter: "blur(2px)",
                        opacity: .6,
                        duration: .4
                    })
                }
                else {
                    gsap.to(l, {
                        filter: "blur(0px)",
                        opacity: 1,
                        duration: .4
                    })
                }
            }
        })
    })

    services.forEach(function (l, idx) {
        l.addEventListener("mouseleave", function () {
            gsap.to(services, {
                filter: "blur(0px)",
                opacity: 1,
                duration: .4
            })
        })
    })


}

serviceBlurAnime(service1)
serviceBlurAnime(service2)
serviceBlurAnime(service3)
serviceBlurAnime(service4)
serviceBlurAnime(service5)
serviceBlurAnime(service6)


function page3svgAnimation() {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    if (window.innerWidth > 600) {

        const pathScroller = document.querySelector("#page3");
        const panel = pathScroller.querySelector("#svg-container");
        const circle = document.querySelector(".theCircle");
        const circleShadow = document.querySelector(".theCircleShadow");
        const path = document.querySelector(".theLine");
        const circleGroup = [circle, circleShadow];
        const textElements = panel.querySelectorAll("text");

        gsap.set(textElements, { opacity: 0.2 });
        gsap.set(textElements[0], { opacity: 1 });

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: pathScroller,
                scroller: "body",
                // markers: true,
                start: "top 0%",
                end: "top -350%",
                scrub: 1,
                pin: true,
            },
        });

        tl.to(circleGroup, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 1,
            },
            duration: 4,
            ease: "none",
            onUpdate: () => {
                let circleX =
                    circle.getBoundingClientRect().left +
                    circle.getBoundingClientRect().width / 2;
                textElements.forEach((text) => {
                    let textX =
                        text.getBoundingClientRect().left +
                        text.getBoundingClientRect().width / 2;
                    let distanceX = Math.abs(circleX - textX);
                    let opacity = Math.max(
                        0.2,
                        1 - distanceX / (window.innerWidth / 2.2)
                    );
                    gsap.to(text, { opacity: opacity, immediateRender: false });
                });
            },
        }, "a")
            .to(panel, {
                x: "-100vw",
                duration: 3,
            }, "a")
            .to(panel, {
                y: "-100vh",
                duration: 1.5,
                delay: 2.5
            }, "a")
    } else {

        const pathScrollerMobile = document.querySelector("#page3-mobile");
        const circleMobile = document.querySelector("#page3-mobile .theCircle");
        const circleShadowMobile = document.querySelector("#page3-mobile .theCircleShadow");
        const pathMobile = document.querySelector("#page3-mobile .theLine");
        const circleGroupMobile = [circleMobile, circleShadowMobile];
        const textElementsMobile = document.querySelectorAll("#svg-mobile text");
        gsap.set(textElementsMobile, { opacity: 0.2 });
        gsap.set(textElementsMobile[0], { opacity: 1 });

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: pathScrollerMobile,
                scroller: "body",
                markers: true,
                start: "top 20%",
                end: "top -50%",
                scrub: 1,
                markers: false
            },
        });

        tl
            .to(circleGroupMobile, {
                motionPath: {
                    path: pathMobile,
                    align: pathMobile,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: 1,
                    onUpdate: (self) => {
                        let circleX =
                            circleMobile.getBoundingClientRect().top +
                            circleMobile.getBoundingClientRect().height / 2;
                        textElementsMobile.forEach((text) => {
                            let textX =
                                text.getBoundingClientRect().top +
                                text.getBoundingClientRect().height / 2;
                            let distanceX = Math.abs(circleX - textX);
                            let opacity = Math.max(
                                0.2,
                                1 - distanceX / (window.innerHeight / 2.2)
                            );
                            gsap.set(text, { opacity: opacity, immediateRender: !1 });
                        });
                    }
                }
            });
    }

}
page3svgAnimation();



// function horizonSlider() {
//     let pathScroller;
//     let pathScrollerMobile;
//     let panel;
//     let panelMobile;
//     let totalWidth;
//     let totalHeight;
//     let scrollTriggerOptions;

//     // Query selectors for desktop
//     pathScroller = document.querySelector("#page3");
//     panel = pathScroller.querySelector("#svg-container");
//     const circle = document.querySelector(".theCircle");
//     const circleShadow = document.querySelector(".theCircleShadow");
//     const path = document.querySelector(".theLine");
//     const circleGroup = [circle, circleShadow];
//     const textElements = panel.querySelectorAll("text");

//     // Set initial opacity of text elements
//     gsap.set(textElements, { opacity: 0.2 });
//     gsap.set(textElements[0], { opacity: 1 });

//     // Query selectors for mobile
//     // pathScrollerMobile = document.querySelector(
//     //   ".horizon-slider-wrap--mobile"
//     // );
//     // panelMobile = pathScrollerMobile.querySelector(".panel");
//     // const circleMobile = pathScrollerMobile.querySelector(".theCircle");
//     // const circleShadowMobile =
//     //   pathScrollerMobile.querySelector(".theCircleShadow");
//     // const pathMobile = pathScrollerMobile.querySelector(".theLine");
//     // const circleGroupMobile = [circleMobile, circleShadowMobile];
//     // const textElementsMobile = panelMobile.querySelectorAll(".text");

//     // gsap.set(textElementsMobile, { opacity: 0.2 });
//     // gsap.set(textElementsMobile[0], { opacity: 1 });

//     function init() {
//         gsap.to(circleGroup, {
//             motionPath: {
//                 path: path,
//                 align: path,
//                 alignOrigin: [0.5, 0.5],
//                 start: 0,
//                 end: 1,
//             },
//             ease: "none",
//             scrollTrigger: {
//                 trigger: pathScroller,
//                 start: "top 20%",
//                 end: () => `${totalWidth * 0.7} 70vw`,
//                 scrub: 1.2,
//                 onUpdate: (self) => {
//                     let circleX =
//                         circle.getBoundingClientRect().left +
//                         circle.getBoundingClientRect().width / 2;
//                     textElements.forEach((text) => {
//                         let textX =
//                             text.getBoundingClientRect().left +
//                             text.getBoundingClientRect().width / 2;
//                         let distanceX = Math.abs(circleX - textX);
//                         let opacity = Math.max(
//                             0.2,
//                             1 - distanceX / (window.innerWidth / 2.2)
//                         );
//                         gsap.to(text, { opacity: opacity, immediateRender: !1 });
//                     });
//                 },
//                 markers: !1,
//             },
//         });
//         totalWidth = panel.offsetWidth;
//         scrollTriggerOptions = {
//             trigger: pathScroller,
//             start: "top 10%",
//             end: () => `${totalWidth * 0.45} 70vw`,
//             pin: !0,
//             pinSpacing: !0,
//             scrub: !0,
//             invalidateOnRefresh: !0,
//         };
//         gsap.to(pathScroller, {
//             scrollTrigger: scrollTriggerOptions,
//             x: () => (totalWidth - document.documentElement.clientWidth) * -1,
//             ease: "none",
//         });

//         //mobile
//   totalHeight = panelMobile.offsetHeight;
//   gsap.to(circleGroupMobile, {
//     motionPath: {
//       path: pathMobile,
//       align: pathMobile,
//       alignOrigin: [0.5, 0.5],
//       start: 0,
//       end: 1,
//     },
//     ease: "none",
//     scrollTrigger: {
//       trigger: pathScrollerMobile,
//       start: "top 20%",
//       end: () => "${totalHeight * 0.7} 70vw",
//       scrub: 1.2,
//       onUpdate: (self) => {
//         let circleX =
//           circleMobile.getBoundingClientRect().top +
//           circleMobile.getBoundingClientRect().height / 2;
//         textElementsMobile.forEach((text) => {
//           let textX =
//             text.getBoundingClientRect().top +
//             text.getBoundingClientRect().height / 2;
//           let distanceX = Math.abs(circleX - textX);
//           let opacity = Math.max(
//             0.2,
//             1 - distanceX / (window.innerHeight / 2.2)
//           );
//           gsap.to(text, { opacity: opacity, immediateRender: !1 });
//         });
//       },
//       markers: !1,
//     },
//   });
//    }
//     function reinit() {
//         gsap.set([pathScroller, panel, pathScrollerMobile, panelMobile], {
//             clearProps: "all",
//         });
//         totalWidth = panel.offsetWidth;
//         //   totalHeight = panelMobile.offsetHeight;
//         init();
//     }

//     function handleResize() {
//         reinit();
//         ScrollTrigger.refresh(true);
//     }

//     const debouncedResize = debounce(handleResize, 300);

//     if (pathScroller) {
//         init();

//         if (window.matchMedia("(min-width: 80em)").matches) {
//             window.addEventListener("resize", debouncedResize);
//         }
//     }

//     function debounce(func, delay) {
//         let timeoutId;
//         return function (...args) {
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(this, args), delay);
//         };
//     }
// }

// // horizonSlider();