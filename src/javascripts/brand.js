const nameContainer = document.querySelector("#brands-name")
const defaultContainer = document.querySelector("#brands-default")
const serviceContainer = document.querySelector("#brands-service")
const industryContainer = document.querySelector("#brands-industry")
const yearContainer = document.querySelector("#brands-year")
const brandMobileyearContainer = document.querySelector("#brand-container")
const showcaseConatiner = document.querySelector("#project-showcase")
const data = [
    { projectName: "NovaSphere", service: "Web Development", industry: "Information Technology", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "PixelPulse", service: "Graphic Design", industry: "Media & Advertising", year: 2019, image: "https://images.unsplash.com/photo-1722619452730-acf4200bb818?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "CodeHaven", service: "Digital Marketing", industry: "E-commerce", year: 2020, image: "https://images.unsplash.com/photo-1726824766931-4bd8b59af37c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "QuantumQuest", service: "Cloud Solutions", industry: "Technology", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "AstroForge", service: "Cybersecurity", industry: "Banking & Finance", year: 2018, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "DataDock", service: "Mobile App Development", industry: "Healthcare", year: 2021, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "ZenithFlow", service: "AI Solutions", industry: "Artificial Intelligence", year: 2023, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "CloudWeaver", service: "Blockchain Development", industry: "Finance", year: 2020, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "HexaHue", service: "SEO Optimization", industry: "E-commerce", year: 2017, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "OmniLogic", service: "Data Analysis", industry: "Education", year: 2019, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "RapidArc", service: "Technical Support", industry: "Telecommunications", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "ScriptForge", service: "Network Installation", industry: "Manufacturing", year: 2016, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "NexusCore", service: "Video Editing", industry: "Entertainment", year: 2020, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "StellarSync", service: "Social Media Management", industry: "Hospitality", year: 2021, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "TurboTrack", service: "UI/UX Design", industry: "Software Development", year: 2023, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "InfiniMap", service: "Content Writing", industry: "Media", year: 2018, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "CircuitCrush", service: "Big Data Analytics", industry: "Research", year: 2020, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "GlitchGuard", service: "Event Management", industry: "Event Planning", year: 2019, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "ByteWave", service: "Supply Chain Optimization", industry: "Logistics", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "LunarLens", service: "Machine Learning Solutions", industry: "AI", year: 2023, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "VectorVault", service: "3D Modeling", industry: "Gaming", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "ProtoPixel", service: "E-learning Platform Development", industry: "Education", year: 2020, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "AgileAnchor", service: "CRM Implementation", industry: "Retail", year: 2019, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "CrystalCode", service: "SaaS Solutions", industry: "Software", year: 2023, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "OrbitOps", service: "AR/VR Development", industry: "Gaming", year: 2022, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "FluxFrame", service: "Online Advertising", industry: "Marketing", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "ChronoChain", service: "Database Management", industry: "Banking", year: 2020, image: "https://images.unsplash.com/photo-1721915003661-8cf35fdcece5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { projectName: "RadiantRoot", service: "Product Design", industry: "Consumer Goods", year: 2018, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "SolarStack", service: "Renewable Energy Consulting", industry: "Energy", year: 2021, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" },
    { projectName: "HyperHive", service: "Legal Advisory", industry: "Law", year: 2020, image: "https://images.unsplash.com/photo-1726824766948-422e1e34a2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" }
];
const serviceData = [
    {
        service: "SEO Optimization",
        projects: [
            {
                name: "E-commerce Website SEO",
                year: 2017,
                industry: "E-commerce",
                image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Network Installation",
        projects: [
            {
                name: "Manufacturing Facility Network Setup",
                year: 2017,
                industry: "Manufacturing",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
            },
            {
                name: "Tech Hub Network Setup",
                year: 2020,
                industry: "Technology",
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Content Writing",
        projects: [
            {
                name: "Product Descriptions for E-commerce",
                year: 2018,
                industry: "Media",
                image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60",
            },
            {
                name: "Educational Articles for Online Learning",
                year: 2021,
                industry: "Education",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de1ded8?w=500&auto=format&fit=crop&q=60",
            },
            {
                name: "Marketing Blog for Tech Startup",
                year: 2022,
                industry: "Publishing",
                image: "https://images.unsplash.com/photo-1559028012-d9cb8be0c2dc?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Cybersecurity",
        projects: [
            {
                name: "Banking Data Protection",
                year: 2018,
                industry: "Banking & Finance",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=60",
            },
            {
                name: "Tech Company Security Solutions",
                year: 2020,
                industry: "Technology",
                image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Data Analysis",
        projects: [
            {
                name: "Student Performance Analytics",
                year: 2019,
                industry: "Education",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de1ded8?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Event Management",
        projects: [
            {
                name: "Corporate Conference Organization",
                year: 2019,
                industry: "Event Planning",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "CRM Implementation",
        projects: [
            {
                name: "Retail CRM System Integration",
                year: 2019,
                industry: "Retail",
                image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60",
            },
            {
                name: "CRM for Healthcare Providers",
                year: 2021,
                industry: "Software Development",
                image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6c?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Digital Marketing",
        projects: [
            {
                name: "E-commerce Campaign Strategy",
                year: 2020,
                industry: "E-commerce",
                image: "https://images.unsplash.com/photo-1542225649-8a10f12e1f79?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Blockchain Development",
        projects: [
            {
                name: "Blockchain-based Payment System",
                year: 2020,
                industry: "Finance",
                image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=60",
            },
            {
                name: "Smart Contract Development for Real Estate",
                year: 2022,
                industry: "Technology",
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Web Development",
        projects: [
            {
                name: "Business Website Development",
                year: 2021,
                industry: "Information Technology",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Social Media Management",
        projects: [
            {
                name: "Social Media Campaign for Hotel Chain",
                year: 2021,
                industry: "Hospitality",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "AR/VR Development",
        projects: [
            {
                name: "VR Training Program for Healthcare",
                year: 2022,
                industry: "Gaming",
                image: "https://images.unsplash.com/photo-1573156668776-a6dc61bd23d4?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "AI Solutions",
        projects: [
            {
                name: "AI-Powered Virtual Assistant",
                year: 2023,
                industry: "Artificial Intelligence",
                image: "https://images.unsplash.com/photo-1518893064609-601b749043d3?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "Machine Learning Solutions",
        projects: [
            {
                name: "Predictive Analytics for Retail",
                year: 2023,
                industry: "AI",
                image: "https://images.unsplash.com/photo-1559028012-d9cb8be0c2dc?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
    {
        service: "UI/UX Design",
        projects: [
            {
                name: "UI/UX Design for Mobile App",
                year: 2023,
                industry: "Software Development",
                image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6c?w=500&auto=format&fit=crop&q=60",
            },
        ],
    },
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

function page1Animation() {
  gsap.to("#brand-hero-over", {
    opacity: 1,
    y: -200,
    duration:1, 
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top 0%", 
      end: "top -100%",   
      scrub: 1,         
    //   markers: true
    }
  });
}
page1Animation();



function numberIncreaseAnimtion() {



  document.fonts.ready.then(() => {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#counter-section",
            scroller: "body",
            start: "top 70%",
            end: "top 45%",
            scrub: 1,
            // markers:true
        }
    })
    // var tl = gsap.timeline()

    tl
        .to(".numbers4", {
            y: "-500%"
        }, "a")
        .to(".numbers44", {
            y: "-100%"
        }, "a")

        .to(".numbers3", {
            y: "-800%"
        }, "a")
        .to(".numbers2", {
            y: "-500%"
        }, "a")
        .to(".numbers22", {
            y: "-1200%"
        }, "a")
        .to(".numbers222", {
            y: "-2000%"
        }, "a")
        .to(".numbers1", {
            y: "-400%"
        }, "a")
        .to(".numbers11", {
            y: "-1000%"
        }, "a")
     


  const split = new SplitText("#line-split", {
    type: "lines words"
  });

  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#counter-section",
      scroller: "body",
      start: "top 0%",
      end: "+=100%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    }
  });

  tl2
    .to(".line-fill", {
      width: "100%",
      duration: 1
    }, "a") // labeled 'a'

    .from(split.lines, {
      x: 100,
      opacity: 0,
      stagger: {
        amount: 0.2
      },
      duration: 1
    },);


    document.querySelectorAll(".logo-brand").forEach((logo) => {
    var logotl = gsap.timeline({
        scrollTrigger: {
            trigger: logo,
            scroller: "body",
            start: "top 85%",
            end: "top 70%",
            scrub: 1,
        }
    })
        logotl.fromTo(logo, {
            opacity: 0
        }, {
            opacity: 1,
            duration: .3
        })
})

function page5Animation() {
  gsap.fromTo("#page5 .box", {
    opacity: 0,
    y: 50,
  }, {
    opacity: 1,
    y: 0,
    stagger:.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page5-cont",
      scroller: "body",
      start: "top 80%",
      end: "top 50%",
    //   scrub: true,
    //   markers:true
    }
  })
}
page5Animation()
});




}
numberIncreaseAnimtion()



//for rendering data of name data
data.forEach((d, index) => {
    // Create brand div
    const brandDiv = document.createElement("div");
    brandDiv.classList.add('brand', 'brand-hover');
    brandDiv.setAttribute("data-index", index);

    // Create service div
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "serv";
    const projectName = document.createElement("h5");
    const serviceHeading = document.createElement("h5");
    projectName.textContent = d.projectName;
    serviceHeading.textContent = d.service;
    serviceDiv.appendChild(projectName);
    // serviceDiv.appendChild(serviceHeading);

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
    nameContainer.appendChild(brandDiv);

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

//for rendering default data
data.forEach((d, index) => {
    // Create brand div
    const brandDiv = document.createElement("div");
    brandDiv.classList.add('brand', 'brand-hover');
    brandDiv.setAttribute("data-index", index);

    // Create service div
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "serv";
    const projectName = document.createElement("h5");
    const serviceHeading = document.createElement("h5");
    projectName.textContent = d.projectName;
    // serviceHeading.textContent = d.service;
    serviceDiv.appendChild(projectName);
    // serviceDiv.appendChild(serviceHeading);

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
    defaultContainer.appendChild(brandDiv);
});


//for rendering data of services data
serviceData.forEach(function (y, index) {
    // Create the main container for the year
    var brandYearDiv = document.createElement('div');
    brandYearDiv.classList.add('brand-year');

    // Create the year wrapper
    var yearWrapper = document.createElement('div');
    yearWrapper.classList.add('year-wrp');

    // Create the year number and append it to the year wrapper
    var yearNumber = document.createElement('h2');
    yearNumber.classList.add('service-s');
    yearNumber.textContent = y.service;
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
        servH5.textContent = p.name;
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
    serviceContainer.appendChild(brandYearDiv);
});

//for rendering data of industry data
data.forEach((d, index) => {
    // Create brand div
    const brandDiv = document.createElement("div");
    brandDiv.classList.add('brand', 'brand-hover');
    brandDiv.setAttribute("data-index", index);

    // Create service div
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "serv";
    const projectName = document.createElement("h5");
    const serviceHeading = document.createElement("h5");
    projectName.textContent = d.projectName;
    serviceHeading.textContent = d.service;
    serviceDiv.appendChild(projectName);
    // serviceDiv.appendChild(serviceHeading);

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

//for rendering data in mobile
var clutterm = ""
data.slice(0,12).forEach(function (data) {
    clutterm += `
     <div class="brand-m">
                <div class="location">
                    <h5>${data.projectName}</h5>
                    <h5>${data.year}</h5>
                </div>
                <h4>${data.service}</h4>
            </div>
    `
})

brandMobileyearContainer.innerHTML = clutterm


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
    const page4Height = window.innerHeight * 4
    capsule.forEach(function (c) {
        c.addEventListener("click", function () {
            // Initialize previousCategory to null for each click
            let previousCategory = null;
            let currentCategory = null;
            currentCategory = c.dataset.container;

            // Loop through all capsules to find the active one
            for (var i = 0; i < capsule.length; i++) {
                if (c.classList.contains("active")) {
                    previousCategory = c.dataset.container;
                    c.classList.remove("active");
                    c.querySelector("h6").textContent = 'Click to filter'
                    currentCategory = "#brands-default";
                    break
                }
                else if (capsule[i].classList.contains("active")) {
                    previousCategory = capsule[i].dataset.container;
                    capsule[i].classList.remove("active");
                    capsule[i].querySelector("h6").textContent = 'Click to filter'
                }
            }

            if (previousCategory === null) {
                previousCategory = "#brands-default";
            }


            // Now that previousCategory has been set, determine categoryToRemove
            let divToRemove = document.querySelector(previousCategory)
            let divToAdd = document.querySelector(currentCategory)
            // Add the active class to the clicked capsule
            if (currentCategory !== "#brands-default") {
                c.classList.add("active");
                c.querySelector("h6").textContent = 'Click to reset'
            }
            document.querySelector("#page4").scrollIntoView({ behavior: "smooth" })
            // Scroll animation using GSAP
            var tl = gsap.timeline();
            tl
                // .to(window, {
                //     scrollTo: { y: page4Height, duration: 0.8 },
                //     ease: Power3.easeInOut
                // })
                .to(divToRemove, {
                    paddingTop: "10vw",
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
                .to(divToAdd, {
                    paddingTop: "2vw",
                    opacity: 1,
                    duration: 0.3,
                    ease: Power3.easeInOut,
                })
        });
    });


}
filtering()







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
if(window.innerWidth > 600){
    footerNavSwitch()
}
