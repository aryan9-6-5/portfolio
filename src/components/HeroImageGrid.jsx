import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Full-hero interactive image/color grid
// Tiles near the cursor magnify, brighten, and gently shift; tiles further away settle back.
// Generates enough rows & columns to completely cover the entire hero section on all viewports.
const PALETTES = {
  blue: [
    '#E3F2FF', '#C7D9FC', '#A9C2FB', '#8CAAF5',
    '#BFD3FA', '#6F92EE', '#D6E4FD', '#5A82E0',
    '#B2CEFA', '#7FA2F0', '#CFDFFC', '#4D78DE'
  ],
  emerald: [
    '#E6FDF4', '#CCFBEF', '#A7F3D0', '#6EE7B7',
    '#99F6E4', '#34D399', '#D1FAE5', '#10B981',
    '#5EEAD4', '#2DD4BF', '#BBF7D0', '#059669'
  ],
  purple: [
    '#F5F3FF', '#EDE9FE', '#DDD6FE', '#C4B5FD',
    '#E0E7FF', '#A78BFA', '#EEF2FF', '#8B5CF6',
    '#C7D2FE', '#818CF8', '#E9D5FF', '#7C3AED'
  ],
}
const RADIUS = 220
const PUSH = 14

function Tile({ tileData, index, registerRef }) {
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
      ref={(el) => registerRef(index, el, scale, bright, offsetX, offsetY)}
      className="hero-grid-tile"
      style={{
        background: tileData.shade,
        scale: springScale,
        filter,
        x: springX,
        y: springY,
        borderRadius: `${tileData.borderRadius}px`,
        rotate: tileData.rotate,
      }}
    />
  )
}

export default function HeroImageGrid({ theme = 'blue' }) {
  const containerRef = useRef(null)
  const entriesRef = useRef([])
  const centersRef = useRef([])

  // Dynamically compute enough tiles so all columns and rows are completely filled
  const [tileCount, setTileCount] = useState(() => {
    if (typeof window === 'undefined') return 240
    const w = window.innerWidth || 1440
    const h = window.innerHeight || 850
    const size = w >= 810 ? 92 : 72
    const cols = Math.ceil(w / size) + 2
    const rows = Math.ceil(h / size) + 2
    return cols * rows
  })

  const shades = PALETTES[theme] || PALETTES.blue

  // Organically and randomly arrange the tiles
  const tiles = useMemo(() => {
    let seed = theme === 'emerald' ? 777 : theme === 'purple' ? 999 : 42
    function rnd() {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    return Array.from({ length: tileCount }, () => ({
      shade: shades[Math.floor(rnd() * shades.length)],
      rotate: (rnd() - 0.5) * 4,
      borderRadius: Math.floor(rnd() * 6) + 4,
    }))
  }, [tileCount, shades, theme])

  function registerRef(index, el, scale, bright, offsetX, offsetY) {
    if (!el) {
      entriesRef.current[index] = null
      return
    }
    entriesRef.current[index] = { el, scale, bright, offsetX, offsetY }
  }

  // Pre-calculate centers on mount, resize, and scroll to avoid layout thrashing during mouse movement
  function updateCenters() {
    centersRef.current = entriesRef.current.map((item) => {
      if (!item?.el) return null
      const rect = item.el.getBoundingClientRect()
      return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 }
    })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function computeGrid() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const size = window.innerWidth >= 810 ? 92 : 72
      const cols = Math.ceil(rect.width / size) + 2
      const rows = Math.ceil(rect.height / size) + 2
      const needed = cols * rows
      setTileCount((prev) => (needed > prev ? needed : prev))
      setTimeout(updateCenters, 100)
    }

    computeGrid()
    const ro = new ResizeObserver(computeGrid)
    ro.observe(el)
    window.addEventListener('resize', computeGrid)
    window.addEventListener('scroll', updateCenters, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', computeGrid)
      window.removeEventListener('scroll', updateCenters)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(updateCenters, 150)
    return () => clearTimeout(t)
  }, [tileCount])

  useEffect(() => {
    let raf = null
    function onMove(e) {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        if (!centersRef.current.length) {
          updateCenters()
        }
        const centers = centersRef.current
        const entries = entriesRef.current
        const len = Math.min(entries.length, centers.length)

        for (let i = 0; i < len; i++) {
          const item = entries[i]
          const center = centers[i]
          if (!item || !center) continue

          const dx = center.cx - e.clientX
          const dy = center.cy - e.clientY
          const dist = Math.hypot(dx, dy)
          if (dist < RADIUS) {
            const push = 1 - dist / RADIUS
            item.scale.set(1 + push * 0.5)
            item.bright.set(1 + push * 0.35)
            if (dist > 0.01) {
              item.offsetX.set((dx / dist) * push * PUSH)
              item.offsetY.set((dy / dist) * push * PUSH)
            }
          } else {
            item.scale.set(1)
            item.bright.set(1)
            item.offsetX.set(0)
            item.offsetY.set(0)
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
    <div ref={containerRef} className="hero-grid" aria-hidden="true">
      {tiles.map((tile, i) => (
        <Tile key={i} tileData={tile} index={i} registerRef={registerRef} />
      ))}
    </div>
  )
}
