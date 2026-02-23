// --- 1. DATA CONFIGURATION (Edit this to change content) ---

const skillsData = [
    { name: "HTML5", icon: "fa-html5" },
    { name: "CSS3", icon: "fa-css3-alt" },
    { name: "JavaScript", icon: "fa-js" },
    { name: "React", icon: "fa-react" },
    { name: "Node.js", icon: "fa-server" },
    { name: "Python", icon: "fa-python" },
    { name: "PostgreSQL", icon: "fa-database" },
    { name: "PyTorch", icon: "fa-flask" },
    { name: "Firebase", icon: "fa-fire" },
    { name: "MariaDB", icon: "fa-database" },
    { name: "Flutter", icon: "fa-phone" }
];

const projectsData = [
    {
        title: "ZACU",
        desc: "A safe space for businesses to validate payment as well as a dashboard to track and manage transactions.",
        tags: ["React", "Chart.js", "Tailwind"],
        links: { code: "https://github.com/HikariJones/Inclusive-AI-UMKM"},
        image: "images/Project_Interface/ZACU.png",
        status: "In Progress"
    },
    {
        title: "Todo-List Website",
        desc: "A sleek todo-list application with drag-and-drop functionality and local storage persistence.",
        tags: ["JavaScript", "API", "CSS"],
        links: { code: "https://github.com/HikariJones/RevoUmini-project"},
        image: "images/Project_Interface/TodoList.png",
        status: "Done"
    },
    {
        title: "COACHMIND - AI Football Player Detector",
        desc: "An AI-powered football player detection system that identifies and tracks players on the field in real-time.",
        tags: ["Vue.js", "Firebase"],
        links: { code: "#", live: "#" },
        image: "images/Project_Interface/task-master.jpg",
        status: "Done"
    }
];

const certsData = [
    { year: "2025", title: "Google Cybersecurity Professional", issuer: "Google", image: "images/Certs/Coursera_Cyber_Certificate.jpg"},
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
        
        // Determine status badge color and icon
        const statusClass = project.status === 'Done' ? 'status-done' : 'status-in-progress';
        const statusIcon = project.status === 'Done' ? '✓' : '◉';
        
        div.innerHTML = `
            <div class="card-image" style="background-image: url('${project.image}'); background-size: cover; background-position: center;">
                <span class="status-badge ${statusClass}">${statusIcon} ${project.status}</span>
            </div>
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
        const link = document.createElement('a');
        link.className = 'cert-item hidden';
        link.href = cert.image;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `
            <img src="${cert.image}" alt="${cert.title} certificate" class="cert-image" />
            <div class="cert-info">
                <span class="cert-year">${cert.year}</span>
                <strong>${cert.title}</strong>
                <small class="cert-issuer">${cert.issuer}</small>
            </div>
        `;
        certContainer.appendChild(link);
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
