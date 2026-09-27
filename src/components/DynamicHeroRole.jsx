import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// The 5 cyclical disciplines
const ROLES = [
  { role: 'AI/ML Engineer', article: 'an' },
  { role: 'Full-Stack Developer', article: 'a' },
  { role: 'Data Engineer', article: 'a' },
  { role: 'ML Systems Builder', article: 'an' },
  { role: 'Researcher', article: 'a' },
]

/**
 * DynamicHeroRole
 * A translucent yellow highlighter strip that smoothly sweeps across the role,
 * highlights the text, transitions to the next role underneath, and sweeps away.
 * Warm yellow tint matching the 'See my work' button.
 */
export default function DynamicHeroRole() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('idle') // 'idle' | 'covering' | 'revealing'

  useEffect(() => {
    let timer

    if (phase === 'idle') {
      // 1. Current role is visible: pause for 2.4s so user comfortably reads
      timer = setTimeout(() => {
        setPhase('covering')
      }, 2400)
    } else if (phase === 'covering') {
      // 2. Translucent yellow highlighter sweeps in from left to right (340ms)
      timer = setTimeout(() => {
        // 3. Swap to the next role underneath
        setIndex((prev) => (prev + 1) % ROLES.length)
        setPhase('revealing')
      }, 340)
    } else if (phase === 'revealing') {
      // 4. Highlighter sweeps away to the right (340ms)
      timer = setTimeout(() => {
        // 5. Back to idle
        setPhase('idle')
      }, 340)
    }

    return () => clearTimeout(timer)
  }, [phase])

  const current = ROLES[index]

  return (
    <span className="hero-role-block">
      <span className="hero-role-article">{current.article}</span>{' '}
      <span className="hero-role-tag-wrap">
        {/* Dynamic Role Text */}
        <AnimatePresence mode="wait">
          <motion.span
            key={current.role}
            className="hero-role-text"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.85 }}
            transition={{ duration: 0.18 }}
          >
            {current.role}
          </motion.span>
        </AnimatePresence>

        {/* Physical Glossy Yellow Acrylic / Gel Sticker Cover */}
        <motion.span
          className="hero-role-acrylic-cover"
          initial={false}
          animate={{
            scaleX: phase === 'covering' ? 1 : 0,
            transformOrigin: phase === 'covering' ? 'left center' : 'right center',
          }}
          transition={{
            duration: 0.38,
            ease: [0.65, 0, 0.35, 1],
          }}
          aria-hidden="true"
        >
          {/* Bright specular reflection streak */}
          <span className="hero-role-cover-gloss" />
        </motion.span>
      </span>
    </span>
  )
}
