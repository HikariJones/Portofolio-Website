function Navbar({ menuOpen, onToggle, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="logo">
        kai<span className="accent">verse.site</span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
        <li>
          <a href="#home" onClick={onNavigate}>
            Home
          </a>
        </li>
        <li>
          <a href="#skills" onClick={onNavigate}>
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" onClick={onNavigate}>
            Projects
          </a>
        </li>
        <li>
          <a href="#certificates" onClick={onNavigate}>
            Certificates
          </a>
        </li>
      </ul>
      <div className="hamburger" onClick={onToggle}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
      </div>
    </nav>
  );
}

export default Navbar;
