console.log("Portfolio Loaded");

// ===================
// REUSABLE FUNCTION
// ===================
function showMessage(el, msg, color) {
    el.textContent = msg;
    el.style.color = color;
}

// ===================
// FORM VALIDATION
// ===================
const form = document.getElementById("contactForm");
const email = document.getElementById("email");
const message = document.getElementById("message");

const feedback = document.createElement("p");
form.appendChild(feedback);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!email.value.includes("@")) {
        showMessage(feedback, "Invalid email address", "red");
        return;
    }

    if (message.value.length < 10) {
        showMessage(feedback, "Message must be at least 10 characters", "red");
        return;
    }

    showMessage(feedback, "Message sent successfully!", "green");
    form.reset();
});

// ===================
// DARK MODE + STORAGE
// ===================
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode"));
});

if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark-mode");
}

// ===================
// SHOW / HIDE ABOUT
// ===================
const aboutSection = document.getElementById("about");
const toggleAboutBtn = document.getElementById("toggleAbout");
const aboutNavLink = document.querySelector(".navbar a[data-section='about']");

toggleAboutBtn.addEventListener("click", () => {
    aboutSection.style.display = "none";
});

aboutNavLink.addEventListener("click", () => {
    aboutSection.style.display = "block";
});

// ===================
// IMAGE SLIDER
// ===================
const images = [
    "images/project1.jpg",
    "images/project2.jpg",
    "images/project3.jpg"
];

let index = 0;
const slider = document.getElementById("sliderImage");

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    slider.src = images[index];
});

document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    slider.src = images[index];
});

// ===================
// NAVIGATION HIGHLIGHT & SMOOTH SCROLL
// ===================
const navLinks = document.querySelectorAll(".navbar a");

function setActiveLink() {
    let currentSection = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.section === currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveLink);

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute("href"));
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});
