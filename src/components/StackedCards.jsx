import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Hand-built equivalent of React Bits Pro's "Scroll Stack" (pinned cards that
// stack, turn and dissolve as the page scrolls) — the real component needs a
// Pro registry key we don't have, so this reproduces the behavior directly
// with Framer Motion scroll transforms instead.
function StackedCard({ index, total, baseTop, step, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 1 - (total - index) * 0.05])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.35])
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -28])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : (index % 2 ? 3 : -3)])

  return (
    <div ref={ref} className="stacked-card-slot" style={{ top: baseTop + index * step, zIndex: index + 1 }}>
      <motion.div style={{ scale, opacity, y, rotate }}>{children}</motion.div>
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
