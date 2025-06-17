gsap.to(".line-container", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
        trigger: "#page1",
        scroller: "body",
        start: "bottom 90%",
        end: "bottom 40%",
        scrub: 1
    }
})

document.querySelectorAll("#right form .input").forEach(function (i) {
    i.querySelector("input").addEventListener("focus", function () {
        i.classList.add("active")
    })
    i.querySelector("input").addEventListener("blur", function () {
        if (this.value == "") {
            i.classList.remove("active")
        }
    })
})

document.querySelectorAll("#right form .textarea").forEach(function (i) {
    i.querySelector("textarea").addEventListener("focus", function () {
        i.classList.add("active")
    })
    i.querySelector("textarea").addEventListener("blur", function () {
        if (this.value == "") {
            i.classList.remove("active")
        }
    })

})

document.querySelectorAll("#from-right form .pop-input").forEach(function (i) {
    i.querySelector("input").addEventListener("focus", function () {
        i.classList.add("active")
    })
    i.querySelector("input").addEventListener("blur", function () {
        if (this.value == "") {
            i.classList.remove("active")
        }
    })
})

document.querySelector("#Uplaod").addEventListener("click", function () {
    document.querySelector("#file input").click()
})

document.querySelectorAll(".lineanime").forEach(function (i) {
    i.addEventListener("mouseenter", function () {
        gsap.to(i.querySelector(".linei"), {
            scaleX: 1, // Use scaleX directly
            duration: 0.3, // Add duration for smooth animation
            ease: "power1.out", // Optional easing
        });
    });

    i.addEventListener("mouseleave", function () {
        gsap.set(i.querySelector(".linei"), {
            transformOrigin: "right", // Retract towards left
        })
        gsap.to(i.querySelector(".linei"), {
            scaleX: 0, // Revert to scaleX(0) on mouse leave
            duration: 0.3,
            ease: "power1.in", // Optional easing,
            onComplete: () => {
                gsap.set(i.querySelector(".linei"), {
                    transformOrigin: "left", // Retract towards left
                })

            }
        });
    });
});



const accordions = document.querySelectorAll(".accordion");

accordions.forEach(accordion => {
    accordion.querySelector(".accordion-title").addEventListener("click", () => {
        for (var i = 0; i < accordions.length; i++) {
            if (accordions[i] !== accordion) {
                accordions[i].classList.remove("active");
            } else {
                if (accordion.classList.contains("active")) {
                    accordion.classList.remove("active");
                } else {
                    accordion.classList.add("active");
                }
            }
        }

        // ✅ Refresh ScrollTrigger after layout change
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300); // Delay slightly to wait for animation/height transition
    });
});



const popup = document.querySelector("#popup-apply")
const jobTitle = document.querySelector("#job-title")
document.querySelectorAll(".apply-job").forEach(function (btn) {

    btn.addEventListener("click", function (e) {
        var jobType = btn.dataset.job
        console.log(jobType);
        jobTitle.textContent = jobType
        gsap.set(popup, { display: "block" })
        gsap.to(popup, {
            opacity: 1,
            duration: .4
        })
        gsap.to("#apply-form", {
            bottom: "0%",
            duration: .4
        })
    })
})

function closeJobPopup() {
    var tl = gsap.timeline()
    gsap.set(popup, { display: "block" })
    tl
        .to("#apply-form", {
            bottom: "-100%",
            duration: .4
        }, "a")
        .to(popup, {
            opacity: 1,
            duration: .2,
            onComplete: () => {
                gsap.set(popup, { display: "none" })
            }
        }, "a")
}


const popupApply = document.querySelector("#popup-apply");
const applyForm = document.querySelector("#apply-form");
const popupClose = document.querySelector(".popup-close");

popupClose.addEventListener("click", function (e) {
    closeJobPopup();
});

popupApply.addEventListener("click", function (e) {
    // Only close if the click is outside of #apply-form
    if (!applyForm.contains(e.target)) {
        closeJobPopup();
    }
});



// splide sliders
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Splide slider
    const splide = new Splide(".splide", {
        type: "loop",
        drag: true,
        focus: "center",
        perPage: 3,
        gap: "20px",
        autoScroll: {
            speed: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
        },
    });

    // Mount with autoScroll extension
    splide.mount(window.splide.Extensions);

    // Move slider further left on scroll (xPercent negative)
    gsap.to(".splide__list", {
        xPercent: -150, // move further left
        ease: "none",
        scrollTrigger: {
            trigger: "#image-slider",
            start: "top 90%",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            immediateRender: false,
            // markers: true,
        },
    });
});

function contactPin() {
    var ntl = gsap.timeline({
        scrollTrigger: {
            trigger: "#image-slider",
            scroller: "body",
            start: "top 0%",
            end: "top -100%",
            scrub: 1,
            pin: true,
        }
    })
    ntl
        .to("#contact-form", {
            top: "0%",
        }, "a")
        .to("#navbar", {
            opacity: 0,
            pointerEvent: "none",
            duration: .2
        }, "a")
        .to("#navbar-black", {
            opacity: 1,
            pointerEvent: "all",
            duration: .2
        }, "a")

}




function contactNavSwitch() {



    var tl22 = gsap.timeline({
        scrollTrigger: {
            trigger: "#career",
            scroller: "body",
            start: "top 0%",
            end: "top -100%",
            scrub: 1,
        }
    })
    tl22
        .to("#navbar-black", {
            opacity: 0,
            pointerEvent: "none",
            duration: .2
        }, "b")
        .to("#navbar", {
            opacity: 1,
            pointerEvent: "all",
            duration: .2
        }, "b")
}
contactNavSwitch()


function footerNavSwitch() {

    var ftl = gsap.timeline({
        scrollTrigger: {
            trigger: "#footer",
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

// dynamic country code
document.addEventListener("DOMContentLoaded", function () {
    const inputPhone = document.querySelector("#mobile_code_phone");

    if (inputPhone) {
        const itiPhone = window.intlTelInput(inputPhone, {
            initialCountry: "in",
            separateDialCode: true,
            dropdownContainer: document.querySelector(".phone-input-mobile")
        });

        inputPhone.addEventListener("countrychange", function () {
            const code = itiPhone.getSelectedCountryData().dialCode;
            console.log("Selected Country Code: +" + code);
        });
    }

    const input = document.querySelector("#mobile_code");
    if (input) {
        const iti = window.intlTelInput(input, {
            initialCountry: "in"
        });

        input.addEventListener("countrychange", function () {
            const code = iti.getSelectedCountryData().dialCode;
            console.log("Selected Country Code (mobile_code): +" + code);
        });
    }
});




// custom dropdown
document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".custom-dropdown");

    dropdowns.forEach(dropdown => {
        const selectedWrap = dropdown.querySelector(".dropdown-selected-wrap");
        const selected = dropdown.querySelector(".dropdown-selected");
        const optionsContainer = dropdown.querySelector(".dropdown-options");
        const options = dropdown.querySelectorAll(".dropdown-item");
        const hiddenInput = dropdown.parentElement.querySelector("input[type='hidden']");

        let otherInput = null; // Will be created dynamically if needed

        // Toggle dropdown
        selectedWrap.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = optionsContainer.style.display === "block";
            closeAllDropdowns();

            if (!isOpen) {
                optionsContainer.style.display = "block";
                selectedWrap.classList.add("open");
            } else {
                optionsContainer.style.display = "none";
                selectedWrap.classList.remove("open");
            }
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener("click", (event) => {
                event.stopPropagation();
                const value = option.dataset.value;

                // Remove existing inline input if any
                if (otherInput) {
                    otherInput.remove();
                    otherInput = null;
                    selected.textContent = ""; // Clear the div so new value can be set
                }

                if (option.textContent.trim().toLowerCase() === "other") {
                    selected.textContent = "";
                    otherInput = document.createElement("input");
                    otherInput.type = "text";
                    otherInput.placeholder = "Please specify...";
                    otherInput.className = "inline-other-input";
                    otherInput.style.border = "none";
                    otherInput.style.background = "transparent";
                    otherInput.style.outline = "none";
                    otherInput.style.color = "var(--primary)";
                    otherInput.style.opacity = "0.8";


                    selected.appendChild(otherInput);
                    selected.style.opacity = "1"; // <-- Make sure it's fully visible
                    dropdown.style.padding = "0";
                    otherInput.focus();

                    otherInput.addEventListener("input", () => {
                        hiddenInput.value = otherInput.value;
                    });

                } else {
                    dropdown.style.padding = "1vw 0";
                    selected.textContent = option.textContent;
                    selected.style.opacity = "1"; // <-- Ensure opacity for selected option
                    hiddenInput.value = value;
                }


                optionsContainer.style.display = "none";
                selectedWrap.classList.remove("open");
            });
        });
    });

    // Prevent dropdown from closing when typing in inline input
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".custom-dropdown")) {
            closeAllDropdowns();
        }
    });

    function closeAllDropdowns() {
        document.querySelectorAll(".dropdown-options").forEach(container => {
            container.style.display = "none";
        });
        document.querySelectorAll(".dropdown-selected-wrap").forEach(wrap => {
            wrap.classList.remove("open");
        });
    }
});


if (window.innerWidth > 600) {
    contactPin()
    footerNavSwitch()
}

gsap.to(".border-line", {
    width: "100%",
    duration: 1,
    stagger: .3,
    scrollTrigger: {
        trigger: "#page3",
        scroller: "body",
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
    }
})



function page4Animation() {
    gsap.fromTo("#page4 .work", {
        opacity: 0,
        y: 80,
    }, {
        opacity: 1,
        y: 0,
        stagger: {
            amount: 1,
        },
        duration: 2.5,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "body",
            start: "top 60%",
            end: "top 10%",
            scrub: 2,
            //   markers: true
        }
    });
}
page4Animation();
