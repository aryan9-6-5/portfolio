import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Meeko's signature "sticky card deck" (animations.md §4A): each card pins,
// and as the next one scrolls over it, the pinned card scales down, lifts
// up slightly, and dims — driven by real scroll progress, not a fixed reveal.
function StackedCard({ index, total, baseTop, step, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.03])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const y = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <div ref={ref} className="stacked-card-slot" style={{ top: baseTop + index * step, zIndex: index + 1 }}>
      <motion.div style={{ scale, opacity, y }}>{children}</motion.div>
    </div>
  )
}

export default function StackedCards({ children, baseTop = 110, step = 18 }) {
  const total = children.length
  return (
    <div className="stacked-cards">
      {children.map((child, i) => (
        <StackedCard key={i} index={i} total={total} baseTop={baseTop} step={step}>
          {child}
        </StackedCard>
      ))}
    </div>
  )
}
