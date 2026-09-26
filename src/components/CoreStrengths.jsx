import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { coreStrengths } from '../data/content.js'
import Reveal from './Reveal.jsx'

// Adapted from the Origin Kit "Hover Image Reveal" pattern — same cursor-follow
// mechanic, but the reveal is a proof-story card instead of a product photo
// (we have no project screenshots to show, and a story is more honest anyway).
const SPRING = { stiffness: 300, damping: 30, mass: 0.6 }

export default function CoreStrengths() {
  const containerRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [tapped, setTapped] = useState(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  function onMove(e) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  const active = hovered !== null ? coreStrengths.items[hovered] : null

  return (
    <section id="strengths" className="section strengths-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <div className="section-eyebrow">{coreStrengths.eyebrow}</div>
          <h2 className="heading-1">{coreStrengths.heading}</h2>
          <p className="body-text">{coreStrengths.sub}</p>
        </Reveal>

        <div
          ref={containerRef}
          className="strengths-list"
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {active && (
              <motion.div
                className={`strengths-follow-card ${active.color}`}
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
              >
                {active.story}
              </motion.div>
            )}
          </AnimatePresence>

          {coreStrengths.items.map((item, i) => (
            <div key={item.title} className="strengths-row">
              <button
                type="button"
                className={`strengths-title${hovered === i ? ' active' : hovered !== null ? ' dim' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onClick={() => setTapped(tapped === i ? null : i)}
              >
                {item.title}
              </button>
              <div className={`strengths-inline-story${tapped === i ? ' open' : ''}`}>
                <p>{item.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
