import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/content.js'
import { IconArrow } from './icons.jsx'
import Reveal from './Reveal.jsx'
import StackedCards from './StackedCards.jsx'
import SlideText from './SlideText.jsx'
import ProjectModal from './ProjectModal.jsx'

const SHAPES = {
  blue: ['#D1E8FD', '#EEF7FF'],
  yellow: ['#FEDE8D', '#FFF2D0'],
  green: ['#C8F0E8', '#E9F9F6'],
  pink: ['#F9D4F4', '#FFF1FD'],
}

function ProjectVisual({ item }) {
  const [c1, c2] = SHAPES[item.accent] || SHAPES.blue
  return (
    <div className={`portfolio-visual ${item.accent}`}>
      <div className="portfolio-visual-inner">
        <span className="portfolio-visual-shape" style={{ width: 140, height: 140, background: c1, top: -30, right: -30 }} />
        <span className="portfolio-visual-shape" style={{ width: 90, height: 90, background: c2, bottom: -20, left: -10 }} />
        <span className="portfolio-visual-initials">{item.name.slice(0, 2).toUpperCase()}</span>
        <span className="portfolio-visual-view">View project</span>
        <span className="portfolio-visual-badge">{item.category}</span>
      </div>
    </div>
  )
}

function ProjectCard({ item, reverse, onClick }) {
  return (
    <div className={`card portfolio-card${reverse ? ' reverse' : ''}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <ProjectVisual item={item} />
      <div className="portfolio-body">
        <span className="label">{item.category}</span>
        <h3 className="heading-2">{item.name}</h3>
        <span className="portfolio-role">{item.role}</span>
        <p className="body-text">{item.desc}</p>
        <div className="portfolio-tags">
          {item.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
        </div>
        <span className="btn" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
          <SlideText>View Project</SlideText> <IconArrow />
        </span>
      </div>
    </div>
  )
}

export function ProjectList({ items }) {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <StackedCards>
        {items.map((item, i) => (
          <ProjectCard key={item.name} item={item} reverse={i % 2 === 1} onClick={() => setSelected(item)} />
        ))}
      </StackedCards>
      <p className="portfolio-note">{projects.note}</p>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

export default function Portfolio() {
  const preview = projects.items.slice(0, 2)
  return (
    <section id="work" className="section portfolio-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <div className="section-eyebrow">{projects.eyebrow}</div>
          <h2 className="heading-1">{projects.heading}</h2>
          <p className="body-text">{projects.sub}</p>
        </Reveal>

        <ProjectList items={preview} />

        <div className="see-all-wrap">
          <Link className="btn btn-accent" to={projects.seeAll.to}><SlideText>{projects.seeAll.label}</SlideText> <IconArrow /></Link>
        </div>
      </div>
    </section>
  )
}
