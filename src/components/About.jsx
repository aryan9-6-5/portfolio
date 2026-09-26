import { about, coding } from '../data/content.js'
import { IconSquiggle, IconChat } from './icons.jsx'
import Reveal from './Reveal.jsx'
import SkillBar from './SkillBar.jsx'

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-eyebrow">{about.eyebrow}</div>
        <h2 className="heading-1" style={{ textAlign: 'left', maxWidth: 560 }}>{about.heading}</h2>

        <div className="about-grid">
          <Reveal className="about-copy" delay={0.1}>
            {about.paragraphs.map((p, i) => <p key={i} className="body-26">{p}</p>)}

            <div className="skills-block">
              <span className="label">{about.skillsLabel}</span>
              {about.skills.map((s, i) => <SkillBar key={s.label} label={s.label} value={s.value} delay={i * 0.15} />)}
            </div>

            <div style={{ marginTop: 12 }}>
              <span className="label" style={{ display: 'block', marginBottom: 12 }}>{coding.eyebrow}</span>
              <div className="portfolio-tags">
                {coding.stack.map((s) => <span key={s} className="tag-chip">{s}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal className="about-portrait" delay={0.2}>
            <div className="card">
              <img src={`/mascot/${about.pose}.png`} alt="Aryan mascot" />
            </div>
            <span className="about-portrait-dots"><IconSquiggle /></span>
            <span className="about-portrait-badge"><IconChat width={18} height={18} /></span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
