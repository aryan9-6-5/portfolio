import { useState, useCallback } from 'react'
import { certifications } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Certifications() {
  const [tappedIndex, setTappedIndex] = useState(null)

  const handleTap = useCallback((index) => {
    setTappedIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section id="certifications" className="section certs-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <h2 className="heading-1">{certifications.heading}</h2>
        </Reveal>

        <div className="certs-grid">
          {certifications.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div
                className={`cert-flip-container ${tappedIndex === i ? 'is-tapped' : ''}`}
                onClick={() => handleTap(i)}
                role="button"
                tabIndex={0}
                aria-label={`Certificate: ${item.title}. Click or hover to flip.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTap(i)
                  }
                }}
              >
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
