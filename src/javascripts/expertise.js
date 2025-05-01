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

            var tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger:"#page3",
                    scroller: "body",
                    // markers: true,
                    start: "100% 60%",
                    end: "100% 0%",
                    scrub: 1,
                },
            })
            tl2
            .to(circleGroup, {
                y: "+=700", // or any value that makes it look like a fall
                ease: "bounce.out", // optional for a bounce effect
                duration: 1
            })
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

function page3NavSwitch() {

    var ftl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3",
            scroller: "body",
            start: "top 60%",
            end: "top 0%",
            scrub: 1,
        }
    })
    ftl
        .to("#navbar", {
            opacity: 0,
            pointerEvent: "none",
            duration: .5
        }, "a")
        .to("#navbar-black", {
            opacity: 1,
            pointerEvent: "all",
            duration: .5
        }, "a")


}
page3NavSwitch()



function approachAnimation() {

    var aptl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page4",
            scroller: "body",
            start: "top top",
            end: "top -350%",
            scrub: 1,
            // markers: true,
            pin: true
        }
    });

    aptl
        // STEP 1
        .fromTo(".apr-circle1", {
            backgroundColor: "var(--light-line)",
            borderColor: "var(--light-line)",
        }, {
            backgroundColor: "var(--secondary)",
            borderColor: "var(--secondary)",
            duration: 0.3
        }, "a")
        .fromTo(".approach1", {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, "a")

        // STEP 2
        .fromTo(".approach2", {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, "b")
        .fromTo(".step-loader-bar", {
            width: "0%",
        }, {
            width: "50%",
            duration: 0.5
        }, "b")
        .fromTo(".apr-circle2", {
            backgroundColor: "var(--light-line)",
            borderColor: "var(--light-line)",
        }, {
            backgroundColor: "var(--secondary)",
            borderColor: "var(--secondary)",
            duration: 0.2,
            delay: .5
        }, "b")

        // STEP 3
        .fromTo(".approach3", {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, "c")
        .fromTo(".step-loader-bar", {
            width: "50%",
        }, {
            width: "100%",
            duration: 0.5
        }, "c")
        .fromTo(".apr-circle3", {
            backgroundColor: "var(--light-line)",
            borderColor: "var(--light-line)",
        }, {
            backgroundColor: "var(--secondary)",
            borderColor: "var(--secondary)",
            duration: 0.2,
            delay: .5
        }, "c")

        // STEP 4

        .fromTo("#approach-content h5, #page4 >h2 , .step-loader-bar", {
            opacity: 1
        }, {
            opacity: 0,
            duration: .5
        }, "d")
        .fromTo("#step-three", {
            backgroundColor: "var(--light-line)",
        }, {
            backgroundColor: "transparent",
            duration: 0.5,
        }, "d")
    const page4 = document.querySelector("#page4");
    const circles = document.querySelectorAll(".aprCir");
    const h2s = document.querySelectorAll("#approach-content h2");

    // Get center of page4
    const page4Rect = page4.getBoundingClientRect();
    const centerX = page4Rect.left + page4Rect.width / 2 + window.scrollX;
    const centerY = page4Rect.top + page4Rect.height / 2 + window.scrollY;

    const offsets = [
        { x: -80, y: -40 },
        { x: 80, y: -40 },
        { x: 0, y: 80 }
    ];

    circles.forEach((circle, i) => {
        aptl.to(circle, {
            x: centerX - (circle.getBoundingClientRect().left + circle.offsetWidth / 2 + window.scrollX) + offsets[i].x,
            y: centerY - (circle.getBoundingClientRect().top + circle.offsetHeight / 2 + window.scrollY) + offsets[i].y,
            width: "30vw",
            height: "30vw",
            backgroundColor: "transparent",
            transform: "translate(-50%, -50%)",
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
        }, "d");
    });

    // Animate the h2 text stack
    // Animate the h2 elements
    h2s.forEach((h2, i) => {
        const rect = h2.getBoundingClientRect();
        const h2X = rect.left + rect.width / 2 + window.scrollX;
        const h2Y = rect.top + rect.height / 2 + window.scrollY;

        const deltaX = centerX - h2X;
        const deltaY = centerY - h2Y;

        aptl.to(h2, {
            x: deltaX,
            y: deltaY + i * 60,
            duration: 0.8,
            ease: "power2.out",
            delay: .5
        }, "d");
    });

}
approachAnimation()