import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const skills = [
  { label: 'Problem Solving', desc: 'Breaking complex problems into tractable sub-problems', color: 'blue', emoji: '🧩' },
  { label: 'Critical Thinking', desc: 'Questioning assumptions before writing a single line', color: 'purple', emoji: '🔍' },
  { label: 'Communication', desc: 'Explaining technical decisions to non-technical stakeholders', color: 'green', emoji: '💬' },
  { label: 'Adaptability', desc: 'Switching stacks and domains without losing momentum', color: 'yellow', emoji: '🔄' },
  { label: 'Team Collaboration', desc: 'Pair programming, code reviews, and async coordination', color: 'pink', emoji: '🤝' },
  { label: 'Time Management', desc: 'Shipping on deadline while maintaining quality', color: 'blue', emoji: '⏱️' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function SoftSkills() {
  return (
    <section className="section soft-skills-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <div className="section-eyebrow">Core strengths</div>
          <h2 className="heading-1">Beyond the tech stack</h2>
          <p className="body-text">The non-technical skills that make the technical ones useful.</p>
        </Reveal>

        <motion.div
          className="soft-skills-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skills.map((s) => (
            <motion.div
              key={s.label}
              className={`card soft-skill-card ${s.color}`}
              variants={card}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <span className="soft-skill-emoji">{s.emoji}</span>
              <h4>{s.label}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
