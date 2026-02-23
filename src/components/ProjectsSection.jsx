import CardSwap, { Card } from './ui/CardSwap';

function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="container">
      <h2 className="section-title">My <span className="accent">Projects</span></h2>

      <div style={{ height: '600px', position: 'relative' }}>
        <CardSwap width={520} height={360} cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
          {projects.map((project) => {
            const statusClass = project.status === 'Done' ? 'status-done' : 'status-in-progress';
            const statusIcon = project.status === 'Done' ? '✓' : '◉';

            return (
              <Card key={project.title}>
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <span className={`status-badge ${statusClass}`}>
                    {statusIcon} {project.status}
                  </span>
                </div>
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={`${project.title}-${tag}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="card-links" style={{ marginTop: '15px' }}>
                    <a
                      href={project.links.code}
                      style={{ color: 'white', marginRight: '15px' }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github" /> Code
                    </a>
                    {project.links.live && (
                      <a href={project.links.live} style={{ color: 'white' }} target="_blank" rel="noreferrer">
                        <i className="fas fa-external-link-alt" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </CardSwap>
      </div>
    </section>
  );
}

export default ProjectsSection;