import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { quickLinks } from '../data/content.js'
import { ICONS, IconArrow } from './icons.jsx'

// Deck configuration: how each card is offset when in the "stacked" state.
// Card 1 (left in grid) shifts right to center, Card 3 (right) shifts left.
const deckConfig = [
  { xStart: 320,  yStart: 40, rotateStart: -8, zIndex: 1 },   // bottom of deck
  { xStart: 0,    yStart: 20, rotateStart: 3,  zIndex: 2 },   // middle
  { xStart: -320, yStart: 0,  rotateStart: 6,  zIndex: 3 },   // top of deck
]

function UnstackingCard({ index, scrollYProgress, isWide, children }) {
  const config = deckConfig[index]
  const xVal = isWide ? config.xStart : 0
  const x = useTransform(scrollYProgress, [0, 1], [xVal, 0])
  const y = useTransform(scrollYProgress, [0, 1], [config.yStart, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [config.rotateStart, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1])

  return (
    <motion.div
      style={{ x, y, rotate, opacity, zIndex: config.zIndex, position: 'relative', willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

export default function QuickLinks() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.35'],
  })

  // Detect 3-column layout (unstack only makes sense in multi-column grid)
  const [isWide, setIsWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 640)
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 640)
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section className="quicklinks-section" ref={sectionRef}>
      <div className="container">
        <div className="quicklinks-grid">
          {quickLinks.items.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <UnstackingCard key={item.title} index={i} scrollYProgress={scrollYProgress} isWide={isWide}>
                <div className="card quicklink-card">
                  <div className={`quicklink-icon ${item.color}`}><Icon /></div>
                  <h3 className="heading-4">{item.title}</h3>
                  <p className="body-text">{item.desc}</p>
                  <Link className={`arrow-btn ${item.color}`} to={item.to} aria-label={item.title}>
                    <IconArrow />
                  </Link>
                </div>
              </UnstackingCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
