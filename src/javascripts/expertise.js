var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page3",
        scroller: "body",
        // markers: true,
        start: "top 0%",
        end: "top -250%",
        scrub: 1, // Higher scrub value for smoother effect
        pin: true,
    },
});
tl
    .to("#svg-container", {
        x: "-100vw", // Horizontal movement
    })
    .to("#svg-container", {
        x: "-100vw",
        y: "-100vh", // Add vertical movement
    })
