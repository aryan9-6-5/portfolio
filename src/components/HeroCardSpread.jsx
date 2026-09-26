import { motion } from 'framer-motion'
import { useState } from 'react'
import { hero } from '../data/content.js'
import { IconSpark, IconPen } from './icons.jsx'

// Fanned deck of interactive badges that expands gracefully on hover.
// "Open to work" is removed per request; only Aryan's verified highlights are presented.
const CARDS = [
  {
    text: hero.floatingLeft.text,
    color: hero.floatingLeft.color,
    icon: 'spark',
    rest: { x: -90, y: 4, rotate: -5 },
    spread: { x: -140, y: -6, rotate: -8 },
  },
  {
    text: hero.floatingRight.text,
    color: hero.floatingRight.color,
    icon: 'pen',
    rest: { x: 90, y: 4, rotate: 5 },
    spread: { x: 140, y: -6, rotate: 8 },
  },
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
            {c.icon === 'spark' && <IconSpark width={14} height={14} />}
            {c.icon === 'pen' && <IconPen width={14} height={14} />}
            {c.text}
          </motion.div>
        )
      })}
    </div>
  )
}
