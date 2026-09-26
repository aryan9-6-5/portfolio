import { motion } from 'framer-motion'
import { useState } from 'react'
import { hero } from '../data/content.js'
import { IconSpark, IconPen } from './icons.jsx'

// Hand-built equivalent of React Bits Pro's "Card Spread" (a fanned deck that
// opens on hover) — the real component lives behind a Pro registry we don't
// have a key for, so this reproduces the interaction with plain Framer Motion.
// Rest state is already a legible fan (not a tight stack) — hover just
// pulls the cards further apart and levels them out for emphasis.
const CARDS = [
  { text: hero.badge, color: 'status', status: true, rest: { x: -150, y: 18, rotate: -10 }, spread: { x: -210, y: 4, rotate: -4 } },
  { text: hero.floatingLeft.text, color: hero.floatingLeft.color, icon: 'spark', rest: { x: 0, y: -6, rotate: 0 }, spread: { x: 0, y: -30, rotate: 0 } },
  { text: hero.floatingRight.text, color: hero.floatingRight.color, icon: 'pen', rest: { x: 150, y: 18, rotate: 10 }, spread: { x: 210, y: 4, rotate: 4 } },
]

export default function HeroCardSpread() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="hero-card-spread"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {CARDS.map((c, i) => {
        const state = hovered ? c.spread : c.rest
        return (
          <motion.div
            key={c.text}
            className={`hero-spread-card pill-badge ${c.color}`}
            style={{ zIndex: CARDS.length - i }}
            animate={{ x: state.x, y: state.y, rotate: state.rotate }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: hovered ? i * 0.06 : (CARDS.length - i) * 0.03 }}
          >
            {c.status && <span className="status-dot" />}
            {c.icon === 'spark' && <IconSpark width={14} height={14} />}
            {c.icon === 'pen' && <IconPen width={14} height={14} />}
            {c.text}
          </motion.div>
        )
      })}
    </div>
  )
}
