import { useEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Full-hero version of the Codrops "Interactive Image Grid" demo
// (tympanus.net/Tutorials/InteractiveImageGrid) — tiles near the cursor
// magnify, brighten, and nudge away from it; tiles further away settle back
// down. No photos to tile here, so each cell is a flat shade of blue instead
// of an image. One rAF-throttled window listener updates every tile — not
// one listener per tile, which would mean 60+ separate layout reads per move.
const SHADES = ['#E3F2FF', '#C7D9FC', '#A9C2FB', '#8CAAF5', '#BFD3FA', '#6F92EE', '#D6E4FD', '#5A82E0']
const TILE_COUNT = 64
const RADIUS = 240
const PUSH = 16

function Tile({ shade, registerRef }) {
  const scale = useMotionValue(1)
  const bright = useMotionValue(1)
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const springScale = useSpring(scale, { stiffness: 260, damping: 22 })
  const springBright = useSpring(bright, { stiffness: 260, damping: 22 })
  const springX = useSpring(offsetX, { stiffness: 200, damping: 20 })
  const springY = useSpring(offsetY, { stiffness: 200, damping: 20 })
  const filter = useTransform(springBright, (b) => `brightness(${b}) saturate(${0.7 + b * 0.5})`)

  return (
    <motion.div
      ref={(el) => registerRef(el, scale, bright, offsetX, offsetY)}
      className="hero-grid-tile"
      style={{ background: shade, scale: springScale, filter, x: springX, y: springY }}
    />
  )
}

export default function HeroImageGrid() {
  const tiles = useMemo(() => Array.from({ length: TILE_COUNT }, (_, i) => SHADES[i % SHADES.length]), [])
  const entriesRef = useRef([])

  function registerRef(el, scale, bright, offsetX, offsetY) {
    if (!el) return
    entriesRef.current.push({ el, scale, bright, offsetX, offsetY })
  }

  useEffect(() => {
    let raf = null
    function onMove(e) {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        for (const { el, scale, bright, offsetX, offsetY } of entriesRef.current) {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = cx - e.clientX
          const dy = cy - e.clientY
          const dist = Math.hypot(dx, dy)
          const t = Math.min(dist / RADIUS, 1)
          const push = 1 - t
          scale.set(1 + push * 0.55)
          bright.set(1 + push * 0.4)
          if (dist > 0.01) {
            offsetX.set((dx / dist) * push * PUSH)
            offsetY.set((dy / dist) * push * PUSH)
          }
        }
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="hero-grid" aria-hidden="true">
      {tiles.map((shade, i) => <Tile key={i} shade={shade} registerRef={registerRef} />)}
    </div>
  )
}
