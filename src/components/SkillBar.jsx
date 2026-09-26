import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Loosely modeled on the audited `Workshop/LinearProgressBar.tsx` (context.md
// §12.12): fill animates on mount-into-view, gated by an in-view check like
// the source's IntersectionObserver(threshold 0.2); the % counts up in sync.
export default function SkillBar({ label, value, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 0.9,
      delay: 0.1 + delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div ref={ref} className="skill-bar">
      <div className="skill-bar-top">
        <span className="skill-bar-label">{label}</span>
        <span className="skill-bar-value">{display}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${value}%` : '0%' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 + delay }}
        />
      </div>
    </div>
  )
}
