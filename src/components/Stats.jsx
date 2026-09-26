import { motion } from 'framer-motion'
import { stats } from '../data/content.js'
import Reveal from './Reveal.jsx'
import AnimatedCounter from './AnimatedCounter.jsx'

export default function Stats() {
  return (
    <section className="section stats-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <div className="section-eyebrow">{stats.eyebrow}</div>
          <h2 className="heading-1">{stats.heading}</h2>
          <p className="body-text">{stats.sub}</p>
        </Reveal>

        <div className="stats-grid">
          {stats.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <motion.div
                className={`stat-pill ${s.color}`}
                whileHover={{ rotate: 3, scale: 1.02 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
              >
                <AnimatedCounter value={s.value} className={`stat-value ${s.color}`} />
                <span className="stat-label">{s.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
