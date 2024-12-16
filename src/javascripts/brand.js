const serviceContainer = document.querySelector("#brands-service")
const industryContainer = document.querySelector("#brands-industry")
const yearContainer = document.querySelector("#brands-year")
const showcaseConatiner = document.querySelector("#project-showcase")
const data = [
    { service: "Web Development", industry: "Information Technology", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Graphic Design", industry: "Media & Advertising", year: 2019, image: "https://images.unsplash.com/photo-1722619452730-acf4200bb818?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "Digital Marketing", industry: "E-commerce", year: 2020, image: "https://images.unsplash.com/photo-1726824766931-4bd8b59af37c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "Cloud Solutions", industry: "Technology", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Cybersecurity", industry: "Banking & Finance", year: 2018, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Mobile App Development", industry: "Healthcare", year: 2021, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "AI Solutions", industry: "Artificial Intelligence", year: 2023, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Blockchain Development", industry: "Finance", year: 2020, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "SEO Optimization", industry: "E-commerce", year: 2017, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Data Analysis", industry: "Education", year: 2019, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Technical Support", industry: "Telecommunications", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Network Installation", industry: "Manufacturing", year: 2016, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Video Editing", industry: "Entertainment", year: 2020, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Social Media Management", industry: "Hospitality", year: 2021, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "UI/UX Design", industry: "Software Development", year: 2023, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Content Writing", industry: "Media", year: 2018, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Big Data Analytics", industry: "Research", year: 2020, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "Event Management", industry: "Event Planning", year: 2019, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Supply Chain Optimization", industry: "Logistics", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Machine Learning Solutions", industry: "AI", year: 2023, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "3D Modeling", industry: "Gaming", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "E-learning Platform Development", industry: "Education", year: 2020, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "CRM Implementation", industry: "Retail", year: 2019, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "SaaS Solutions", industry: "Software", year: 2023, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "AR/VR Development", industry: "Gaming", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Online Advertising", industry: "Marketing", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Database Management", industry: "Banking", year: 2020, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { service: "Product Design", industry: "Consumer Goods", year: 2018, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Renewable Energy Consulting", industry: "Energy", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { service: "Legal Advisory", industry: "Law", year: 2020, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" }
];
const yearData = [
    {
        year: 2017,
        projects: [
            {
                service: "SEO Optimization",
                industry: "E-commerce",
                image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "Network Installation",
                industry: "Manufacturing",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        year: 2018,
        projects: [
            {
                service: "Content Writing",
                industry: "Media",
                image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "Cybersecurity",
                industry: "Banking & Finance",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        year: 2019,
        projects: [
            {
                service: "Data Analysis",
                industry: "Education",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de1ded8?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "Event Management",
                industry: "Event Planning",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "CRM Implementation",
                industry: "Retail",
                image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        year: 2020,
        projects: [
            {
                service: "Digital Marketing",
                industry: "E-commerce",
                image: "https://images.unsplash.com/photo-1542225649-8a10f12e1f79?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "Blockchain Development",
                industry: "Finance",
                image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "E-learning Platform Development",
                industry: "Education",
                image: "https://images.unsplash.com/photo-1554631242-79aa4f5e8531?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        year: 2021,
        projects: [
            {
                service: "Web Development",
                industry: "Information Technology",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "Social Media Management",
                industry: "Hospitality",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        year: 2022,
        projects: [
            {
                service: "Cloud Solutions",
                industry: "Technology",
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "AR/VR Development",
                industry: "Gaming",
                image: "https://images.unsplash.com/photo-1573156668776-a6dc61bd23d4?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        year: 2023,
        projects: [
            {
                service: "AI Solutions",
                industry: "Artificial Intelligence",
                image: "https://images.unsplash.com/photo-1518893064609-601b749043d3?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "Machine Learning Solutions",
                industry: "AI",
                image: "https://images.unsplash.com/photo-1559028012-d9cb8be0c2dc?w=500&auto=format&fit=crop&q=60",
            },
            {
                service: "UI/UX Design",
                industry: "Software Development",
                image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6c?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
];


//for rendering data of services data
data.forEach((d, index) => {
    // Create brand div
    const brandDiv = document.createElement("div");
    brandDiv.classList.add('brand', 'brand-hover');
    brandDiv.setAttribute("data-index", index);

    // Create service div
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "serv";
    const serviceHeading = document.createElement("h5");
    serviceHeading.textContent = d.service;
    serviceDiv.appendChild(serviceHeading);

    // Create rit div
    const ritDiv = document.createElement("div");
    ritDiv.className = "rit";

    // Create industry div
    const industryDiv = document.createElement("div");
    industryDiv.className = "industry";
    const industryHeading = document.createElement("h5");
    industryHeading.textContent = d.industry;
    industryDiv.appendChild(industryHeading);

    // Create year div
    const yearDiv = document.createElement("div");
    yearDiv.className = "year";
    const yearHeading = document.createElement("h5");
    yearHeading.textContent = d.year;
    yearDiv.appendChild(yearHeading);

    // Append industry and year to rit div
    ritDiv.appendChild(industryDiv);
    ritDiv.appendChild(yearDiv);

    // Append service and rit to brand div
    brandDiv.appendChild(serviceDiv);
    brandDiv.appendChild(ritDiv);

    // Add brand div to container
    serviceContainer.appendChild(brandDiv);

    // Create show div for image
    const showDiv = document.createElement("div");
    showDiv.className = "show";
    const img = document.createElement("img");
    img.src = d.image;
    img.alt = `${d.service} image`;
    showDiv.appendChild(img);

    // Add show div to container
    showcaseConatiner.appendChild(showDiv);
});

data.forEach((d, index) => {
    // Create brand div
    const brandDiv = document.createElement("div");
    brandDiv.classList.add('brand', 'brand-hover');
    brandDiv.setAttribute("data-index", index);

    // Create service div
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "serv";
    const serviceHeading = document.createElement("h5");
    serviceHeading.textContent = d.service;
    serviceDiv.appendChild(serviceHeading);

    // Create rit div
    const ritDiv = document.createElement("div");
    ritDiv.className = "rit";

    // Create industry div
    const industryDiv = document.createElement("div");
    industryDiv.className = "industry";
    const industryHeading = document.createElement("h5");
    industryHeading.textContent = d.industry;
    industryDiv.appendChild(industryHeading);

    // Create year div
    const yearDiv = document.createElement("div");
    yearDiv.className = "year";
    const yearHeading = document.createElement("h5");
    yearHeading.textContent = d.year;
    yearDiv.appendChild(yearHeading);

    // Append industry and year to rit div
    ritDiv.appendChild(industryDiv);
    ritDiv.appendChild(yearDiv);

    // Append service and rit to brand div
    brandDiv.appendChild(serviceDiv);
    brandDiv.appendChild(ritDiv);

    // Add brand div to container
    industryContainer.appendChild(brandDiv);

});

//for rendering data of years data
yearData.reverse().forEach(function (y, index) {
    // Create the main container for the year
    var brandYearDiv = document.createElement('div');
    brandYearDiv.classList.add('brand-year');

    // Create the year wrapper
    var yearWrapper = document.createElement('div');
    yearWrapper.classList.add('year-wrp');

    // Create the year number and append it to the year wrapper
    var yearNumber = document.createElement('h2');
    yearNumber.classList.add('year-number');
    yearNumber.textContent = y.year;
    yearWrapper.appendChild(yearNumber);

    // Append the year wrapper to the brand year div
    brandYearDiv.appendChild(yearWrapper);

    // Loop through the projects
    y.projects.forEach(function (p, idx) {
        // Create the brand div for each project
        var brandDiv = document.createElement('div');
        brandDiv.classList.add('brand', 'brand-hover');
        brandDiv.setAttribute("data-index", idx);


        // Create the service div and append service name
        var servDiv = document.createElement('div');
        servDiv.classList.add('serv');
        var servH5 = document.createElement('h5');
        servH5.textContent = p.service;
        servDiv.appendChild(servH5);

        // Create the right div (rit) with industry and year
        var ritDiv = document.createElement('div');
        ritDiv.classList.add('rit');

        // Create industry div
        var industryDiv = document.createElement('div');
        industryDiv.classList.add('industry');
        var industryH5 = document.createElement('h5');
        industryH5.textContent = p.industry;
        industryDiv.appendChild(industryH5);

        // Create year div
        var yearDiv = document.createElement('div');
        yearDiv.classList.add('year');
        var yearH5 = document.createElement('h5');
        yearH5.textContent = p.year;
        yearDiv.appendChild(yearH5);

        // Append industry and year divs to the rit div
        ritDiv.appendChild(industryDiv);
        ritDiv.appendChild(yearDiv);

        // Append the serv and rit divs to the brand div
        brandDiv.appendChild(servDiv);
        brandDiv.appendChild(ritDiv);

        // Append the brand div to the brand year div
        brandYearDiv.appendChild(brandDiv);
    });

    // Append the completed brand year div to the container
    yearContainer.appendChild(brandYearDiv);
});


function brandHoverAnimation() {
    document.querySelectorAll(".brand-hover").forEach(function (b) {
        b.addEventListener("mouseenter", function (e) {
            const slides = showcaseConatiner.querySelectorAll(".show")
            const slideIndex = e.target.dataset.index
            gsap.to(slides[slideIndex], {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                duration: .6
            })
        })
    })
    document.querySelectorAll(".brand-hover").forEach(function (b) {
        b.addEventListener("mouseleave", function (e) {
            const slides = showcaseConatiner.querySelectorAll(".show")
            const slideIndex = e.target.dataset.index
            gsap.to(slides[slideIndex], {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                scale: .9,
                opacity: 0,
                duration: .6,
                onComplete: function () {
                    gsap.set(slides[slideIndex], {
                        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                        opacity: 1,
                        scale: 1
                    })
                }
            })
        })
    })
}
brandHoverAnimation()

//giving active class to current category and removing from others
function filtering() {
    const capsule = document.querySelectorAll(".capsule")
    const page4Height = window.innerHeight * 3 + (window.innerHeight/3) 
    capsule.forEach(function (c) {
        c.addEventListener("click", function () {
            // Initialize previousCategory to null for each click
            let previousCategory = null;
            let currentCategory = null;

            // Loop through all capsules to find the active one
            for (var i = 0; i < capsule.length; i++) {
                if (capsule[i].classList.contains("active")) {
                    previousCategory = capsule[i].dataset.container;
                    capsule[i].classList.remove("active");
                }
            }

            currentCategory = c.dataset.container;
            // Now that previousCategory has been set, determine categoryToRemove
            let divToRemove = document.querySelector(previousCategory)
            let divToAdd = document.querySelector(currentCategory)
            // Add the active class to the clicked capsule
            c.classList.add("active");

            // Scroll animation using GSAP
            var tl = gsap.timeline();
            tl
            .to(window, {
                scrollTo: { y: page4Height, duration: 0.8 },
                ease: Power3.easeInOut
            })
            .to(divToRemove,{
                paddingTop:"10vw",
                opacity: 0,
                duration: 0.3,
                ease: Power3.easeInOut,
                onComplete: function () {
                    divToRemove.style.display = "none";
                    divToAdd.style.display = "block";
                    divToAdd.style.opacity = 0;
                    divToAdd.style.paddingTop = "10vw";
                }
            })
            .to(divToAdd,{
                paddingTop:"2vw",
                opacity: 1,
                duration: 0.3,
                ease: Power3.easeInOut,
            })
        });
    });


}
filtering()
