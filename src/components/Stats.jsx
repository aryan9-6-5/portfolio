import { motion } from 'framer-motion'
import { stats } from '../data/content.js'
import Reveal from './Reveal.jsx'
import AnimatedCounter from './AnimatedCounter.jsx'
import { IconGithub, IconFlask } from './icons.jsx'

function CardIcon({ type }) {
  if (type === 'leetcode') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
  if (type === 'gfg') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 9l3 3-3 3" />
        <line x1="12" y1="15" x2="16" y2="15" />
      </svg>
    )
  }
  if (type === 'github') {
    return <IconGithub width={18} height={18} />
  }
  if (type === 'research') {
    return <IconFlask width={18} height={18} />
  }
  if (type === 'certifications') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <polyline points="8.21 13.89 7 22 12 18.5 17 22 15.79 13.88" />
      </svg>
    )
  }
  return null
}

export default function Stats() {
  return (
    <section id="stats" className="section stats-cards-section">
      <div className="container">
        <Reveal className="section-head stats-cards-head" y={10}>
          <h2 className="heading-1">{stats.heading}</h2>
          <p className="body-text">{stats.sub}</p>
        </Reveal>

        <div className="stats-scorecard-grid">
          {stats.items.map((s, i) => {
            const tiltAngle = (i % 2 === 0 ? 1.5 : -1.5)
            return (
              <Reveal key={s.id || s.label} delay={i * 0.06} className="stats-card-slot">
                <motion.div
                  className={`stats-score-card card-${s.color}`}
                  whileHover={{ y: -6, rotate: tiltAngle }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  <div className="stats-card-top">
                    <span className={`stats-tag-pill tag-${s.color}`}>{s.tag}</span>
                    <span className="stats-icon-wrap" aria-hidden="true">
                      <CardIcon type={s.id} />
                    </span>
                  </div>

                  <div className="stats-number-row">
                    <AnimatedCounter value={s.value} className={`stats-number-val val-${s.color}`} />
                  </div>

                  <h3 className="stats-card-label">{s.label}</h3>

                  <div className="stats-card-footer">
                    <span className="stats-note-handwritten">{s.note}</span>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
