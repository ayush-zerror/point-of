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



const accordions = document.querySelectorAll(".accordion")
accordions.forEach(accordion => {
    accordion.querySelector(".accordion-title").addEventListener("click", () => {
        for (var i = 0; i < accordions.length; i++) {
            if (accordions[i] !== accordion) {
                accordions[i].classList.remove("active");
            } else {
                if (accordion.classList.contains("active")) {
                    accordion.classList.remove("active");
                }
                else {
                    accordion.classList.add("active");

                }
            }
        }

    })
})


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


function clock() {

    const arrows = [...document.querySelectorAll('.arrow')];
    const hourV = document.querySelector('.digital .hour');
    const minuteV = document.querySelector('.digital .minute');
    setInterval(() => {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const milliSecond = date.getMilliseconds();
        arrows[0].style.setProperty('--rotate', `${hour * 30 + minute / 2}deg`);

        arrows[1].style.setProperty('--rotate', `${minute * 6 + second / 10}deg`);
        arrows[2].style.setProperty('--rotate', `${second * 6 + milliSecond / 180}deg`);
        hourV.textContent = `${('0' + hour).substr(-2)}`;
        minuteV.textContent = `${('0' + minute).substr(-2)}`;
    }, 50);

    const bigTicks = [...document.querySelectorAll('.tick.big')];
    const smallTicks = [...document.querySelectorAll('.tick.small')];
    const tinyTicks = [...document.querySelectorAll('.tick.tiny')];
    for (let i = 0; i < bigTicks.length; i++) {
        bigTicks[i].style.setProperty('--rotate', ['0deg', '90deg'][i]);
    }
    for (let i = 0; i < smallTicks.length; i++) {
        smallTicks[i].style.setProperty('--rotate', ['30deg', '60deg', '-30deg', '-60deg'][i]);
    }
    let j = 0;
    for (let i = 0; i < tinyTicks.length; i++) {
        if ((i) % 4 === 0) j++;
        tinyTicks[i].style.setProperty('--rotate', `${(i + j) * 6}deg`);
    }
}
clock()

// splide sliders
document.addEventListener("DOMContentLoaded", function () {
    const splide = new Splide('.splide', {
        type: 'loop',
        drag: true,  // Keep dragging enabled
        focus: 'center',
        perPage: 3,
        gap: "5px",
        autoScroll: {
            speed: 1,
            pauseOnHover: false,  // Prevent stopping on hover
            pauseOnFocus: false,  // Optional: also prevent stopping when focused
        },
    });

    splide.mount(window.splide.Extensions); // Only mount once
});

function contactNavSwitch() {

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
footerNavSwitch()

// dynamic country code
document.addEventListener("DOMContentLoaded", function () {
    var input = document.querySelector("#mobile_code");

    // Initialize intl-tel-input
    var iti = window.intlTelInput(input, {
        initialCountry: "in", // Set default country to India
        separateDialCode: true
    });

    // Optional: Get the selected country code on input change
    input.addEventListener("countrychange", function () {
        var countryCode = iti.getSelectedCountryData().dialCode;
        console.log("Selected Country Code: +" + countryCode);
    });

});

// custom dropdown
document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".custom-dropdown");

    dropdowns.forEach(dropdown => {
        const selectedWrap = dropdown.querySelector(".dropdown-selected-wrap");
        const selected = dropdown.querySelector(".dropdown-selected");
        const optionsContainer = dropdown.querySelector(".dropdown-options");
        const options = dropdown.querySelectorAll(".dropdown-item");
        const hiddenInput = dropdown.querySelector("input[type='hidden']");

        // Toggle dropdown
        selectedWrap.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent immediate closure
            const isOpen = optionsContainer.style.display === "block";

            closeAllDropdowns(); // Close others first

            if (!isOpen) {
                optionsContainer.style.display = "block";
                selectedWrap.classList.add("open");
            } else {
                optionsContainer.style.display = "none";
                selectedWrap.classList.remove("open");
            }
        });

        // Handle selection
        options.forEach(option => {
            option.addEventListener("click", (event) => {
                event.stopPropagation();
                selected.textContent = option.textContent;

                if (hiddenInput) {
                    hiddenInput.value = option.dataset.value;
                }

                optionsContainer.style.display = "none";
                selectedWrap.classList.remove("open");
            });
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener("click", () => {
        closeAllDropdowns();
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

