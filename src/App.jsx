import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import Grainient from './components/ui/Grainient';
import LogoLoop from './components/ui/LogoLoop';


const skillsData = [
  { name: 'HTML5', icon: 'fa-html5', prefix: 'fab' },
  { name: 'CSS3', icon: 'fa-css3-alt', prefix: 'fab' },
  { name: 'JavaScript', icon: 'fa-js', prefix: 'fab' },
  { name: 'React', icon: 'fa-react', prefix: 'fab' },
  { name: 'Node.js', icon: 'fa-node-js', prefix: 'fab' },
  { name: 'Python', icon: 'fa-python', prefix: 'fab' },
  { name: 'PostgreSQL', icon: 'fa-database', prefix: 'fas' },
  { name: 'PyTorch', icon: 'fa-brain', prefix: 'fas' },
  { name: 'Firebase', icon: 'fa-fire', prefix: 'fas' },
  { name: 'MariaDB', icon: 'fa-database', prefix: 'fas' },
  { name: 'Flutter', icon: 'fa-flutter', prefix: 'fab' }
];

const projectsData = [
  {
    title: 'ZACU',
    desc: 'A safe space for businesses to validate payment as well as a dashboard to track and manage transactions.',
    tags: ['React', 'Chart.js', 'Tailwind'],
    links: { code: 'https://github.com/HikariJones/Inclusive-AI-UMKM' },
    image: 'images/Project_Interface/ZACU.png',
    status: 'In Progress'
  },
  {
    title: 'Todo-List Website',
    desc: 'A sleek todo-list application with drag-and-drop functionality and local storage persistence.',
    tags: ['JavaScript', 'API', 'CSS'],
    links: { code: 'https://github.com/HikariJones/RevoUmini-project' },
    image: 'images/Project_Interface/TodoList.png',
    status: 'Done'
  },
  {
    title: 'COACHMIND - AI Football Player Detector',
    desc: 'An AI-powered football player detection system that identifies and tracks players on the field in real-time.',
    tags: ['Vue.js', 'Firebase'],
    links: { code: '#', live: '#' },
    image: 'images/Project_Interface/',
    status: 'Done'
  }
];

const certsData = [
  {
    year: '2025',
    title: 'Google Cybersecurity Professional',
    issuer: 'Google',
    image: 'images/Certs/Coursera_Cyber_Certificate.jpg'
  }
];

const words = ['Developer', 'Designer', 'Creator'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [text, setText] = useState('');

  const textConfig = useMemo(
    () => ({
      wordIndex: 0,
      letterIndex: 0,
      isDeleting: false
    }),
    []
  );

  useEffect(() => {
    let timeoutId;

    const tick = () => {
      const currentWord = words[textConfig.wordIndex % words.length];

      if (textConfig.isDeleting) {
        textConfig.letterIndex -= 1;
      } else {
        textConfig.letterIndex += 1;
      }

      const nextText = currentWord.substring(0, Math.max(0, textConfig.letterIndex));
      setText(nextText);

      let nextDelay = textConfig.isDeleting ? 100 : 200;

      if (!textConfig.isDeleting && nextText === currentWord) {
        textConfig.isDeleting = true;
        nextDelay = 3000;
      } else if (textConfig.isDeleting && nextText === '') {
        textConfig.isDeleting = false;
        textConfig.wordIndex += 1;
        textConfig.letterIndex = 0;
        nextDelay = 500;
      }

      timeoutId = window.setTimeout(tick, nextDelay);
    };

    tick();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [textConfig]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((element) => observer.observe(element));

    const fallbackReveal = window.setTimeout(() => {
      hiddenElements.forEach((element) => element.classList.add('show'));
    }, 1200);

    return () => {
      window.clearTimeout(fallbackReveal);
      hiddenElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Grainient
        colorBalance={-0.15}
        warpStrength={0.8}
        warpFrequency={4.1}
        blendAngle={-19}
        color1="#3f363f"
        color2="#1226ba"
        color3="#0c0c0d"
      />

      <div className="app-root">
        <Navbar
          menuOpen={menuOpen}
          onToggle={() => setMenuOpen((prev) => !prev)}
          onNavigate={() => setMenuOpen(false)}
        />

        <section id="home" className="hero">
          <div className="hero-content hidden">
            <h1>
              Hi, I&apos;m <span className="accent">Hikari</span>
            </h1>
            <h2>
              I am a <span className="txt-type"><span className="txt">{text}</span></span>
            </h2>
            <p>Building interactive digital experiences with code.</p>
            <div className="cta-buttons">
              <a href="#projects" className="btn primary">
                View My Work
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="container">
          <h2 className="section-title hidden">
            My <span className="accent">Skills</span>
          </h2>
          <div className="hidden" id="skills-container">
            <LogoLoop items={skillsData} duration={24} />
          </div>
        </section>

        <ProjectsSection projects={projectsData} />

        <CertificatesSection certificates={certsData} />

        <footer>
          <p>&copy; 2026 Hikari. Powered by React.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
