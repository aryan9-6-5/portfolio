import { certifications } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Certifications() {
  return (
    <section id="certifications" className="section certs-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <div className="section-eyebrow">{certifications.eyebrow}</div>
          <h2 className="heading-1">{certifications.heading}</h2>
        </Reveal>

        <div className="certs-grid">
          {certifications.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="cert-flip-container">
                <div className="cert-flip-inner">
                  {/* Front face */}
                  <div className="card cert-card cert-flip-front">
                    <span className={`cert-dot ${item.color}`} />
                    <h4>{item.title}</h4>
                    <p>{item.sub}</p>
                  </div>
                  {/* Back face */}
                  <div className={`card cert-card cert-flip-back ${item.color}`}>
                    <span className="cert-back-check">✓</span>
                    <h4>{item.title}</h4>
                    <p>{item.sub}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
