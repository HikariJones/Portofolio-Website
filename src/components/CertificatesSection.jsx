import CardSwap, { Card } from './ui/CardSwap';

function CertificatesSection({ certificates }) {
  return (
    <section id="certificates" className="container">
      <h2 className="section-title">
        My <span className="accent">Certifications</span>
      </h2>
      <div style={{ height: '520px', position: 'relative' }}>
        <CardSwap width={500} height={320} cardDistance={52} verticalDistance={56} delay={4500} pauseOnHover={false}>
          {certificates.map((cert) => (
            <Card key={`${cert.title}-${cert.year}`}>
              <a className="cert-item" href={cert.image} target="_blank" rel="noopener noreferrer">
                <img src={cert.image} alt={`${cert.title} certificate`} className="cert-image" />
                <div className="cert-info">
                  <span className="cert-year">{cert.year}</span>
                  <strong>{cert.title}</strong>
                  <small className="cert-issuer">{cert.issuer}</small>
                </div>
              </a>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}

export default CertificatesSection;
