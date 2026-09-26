import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { research } from '../data/content.js'
import { IconArrow } from './icons.jsx'
import Reveal from './Reveal.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Research() {
  return (
    <section id="research" className="section research-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <div className="section-eyebrow">{research.eyebrow}</div>
          <h2 className="heading-1">{research.heading}</h2>
          <p className="body-text">{research.sub}</p>
        </Reveal>

        <motion.div
          className="research-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {research.cards.map((rc, i) => (
            <motion.div
              key={rc.title}
              className={`research-card card ${rc.color}${i % 2 ? ' tilt-right' : ' tilt-left'}`}
              variants={card}
              transition={{ type: 'spring', duration: 1, bounce: 0.2 }}
              whileHover={{ rotate: 0, y: -4, transition: { duration: 0.3 } }}
            >
              <span className="research-note-tag">{rc.note}</span>
              <h3>{rc.title}</h3>
              <p>{rc.desc}</p>
              <Link to="/contact">
                {rc.link} <IconArrow />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
