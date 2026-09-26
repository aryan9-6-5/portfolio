import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Inspired by Codrops' CrosshairDistortion (a reticle that tracks the cursor)
// — but no pixel distortion here. Hovering the name draws a small crosshair
// that follows the cursor and the letters gain a touch of tracking, like the
// name is being "targeted" rather than warped.
const SPRING = { stiffness: 400, damping: 30, mass: 0.4 }

export default function NameMark({ children }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <span
      ref={ref}
      className={`name-mark${active ? ' active' : ''}`}
      onMouseEnter={(e) => { onMove(e); setActive(true) }}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(false)}
    >
      <span className="name-mark-text">{children}</span>
      <motion.span
        className="name-mark-crosshair"
        style={{ left: sx, top: sy }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
      >
        <span className="name-mark-line h" />
        <span className="name-mark-line v" />
      </motion.span>
    </span>
  )
}
