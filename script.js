// --- 1. DATA CONFIGURATION (Edit this to change content) ---

const skillsData = [
    { name: "HTML5", icon: "fa-html5" },
    { name: "CSS3", icon: "fa-css3-alt" },
    { name: "JavaScript", icon: "fa-js" },
    { name: "React", icon: "fa-react" },
    { name: "Node.js", icon: "fa-node" },
    { name: "Python", icon: "fa-python" }
];

const projectsData = [
    {
        title: "E-Commerce Dashboard",
        desc: "A responsive admin dashboard featuring real-time data charts and dark mode.",
        tags: ["React", "Chart.js", "Tailwind"],
        links: { code: "#", live: "#" }
    },
    {
        title: "AI Chat Interface",
        desc: "A sleek chat application integrating OpenAI's API with streaming responses.",
        tags: ["JavaScript", "API", "CSS"],
        links: { code: "#", live: "#" }
    },
    {
        title: "Task Master App",
        desc: "Productivity app with drag-and-drop functionality and local storage save.",
        tags: ["Vue.js", "Firebase"],
        links: { code: "#", live: "#" }
    }
];

const certsData = [
    { year: "2025", title: "AWS Solutions Architect", issuer: "Amazon Web Services" },
    { year: "2024", title: "Meta Front-End Developer", issuer: "Coursera" },
    { year: "2023", title: "Google UX Design", issuer: "Google" }
];


// --- 2. DOM GENERATION FUNCTIONS ---

function renderPortfolio() {
    // Render Skills
    const skillsContainer = document.getElementById('skills-container');
    skillsData.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-card hidden'; // Add 'hidden' for animation
        div.innerHTML = `<i class="fab ${skill.icon}"></i><h3>${skill.name}</h3>`;
        skillsContainer.appendChild(div);
    });

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    projectsData.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-card hidden';
        // Create tags HTML string
        const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
        
        div.innerHTML = `
            <div class="card-image"></div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="tags">${tagsHtml}</div>
                <div class="card-links" style="margin-top:15px">
                    <a href="${project.links.code}" style="color:white; margin-right:15px"><i class="fab fa-github"></i> Code</a>
                    <a href="${project.links.live}" style="color:white"><i class="fas fa-external-link-alt"></i> Live</a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(div);
    });

    // Render Certificates
    const certContainer = document.getElementById('cert-container');
    certsData.forEach(cert => {
        const div = document.createElement('div');
        div.className = 'cert-item hidden';
        div.innerHTML = `
            <div>
                <span style="color:var(--accent-color); font-weight:bold; margin-right:15px">${cert.year}</span>
                <strong>${cert.title}</strong>
            </div>
            <small style="color:#94a3b8">${cert.issuer}</small>
        `;
        certContainer.appendChild(div);
    });
}


// --- 3. ANIMATION LOGIC ---

// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 200;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});


// --- 4. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Content
    renderPortfolio();

    // 2. Init Typewriter
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);

    // 3. Init Scroll Animation
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // 4. Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Toggle Hamburger Icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});