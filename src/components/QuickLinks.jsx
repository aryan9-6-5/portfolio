import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { quickLinks } from '../data/content.js'
import { ICONS, IconArrow } from './icons.jsx'

const deckConfig = [
  { xStart: 340,  yStart: 50, rotateStart: -9, zIndex: 1 },
  { xStart: 0,    yStart: 25, rotateStart: 3,  zIndex: 2 },
  { xStart: -340, yStart: 0,  rotateStart: 7,  zIndex: 3 },
]

// Accent colours per card slot — matches the portfolio palette
const ACCENTS = [
  { border: '#0A52F0', bg: 'var(--blue-soft)',   hover: 'var(--blue-hover)',   num: 'rgba(10,82,240,0.07)'  },
  { border: '#C98A00', bg: 'var(--yellow-soft)', hover: 'var(--yellow-hover)', num: 'rgba(201,138,0,0.07)' },
  { border: '#00A99D', bg: 'var(--green-soft)',  hover: 'var(--green-hover)',  num: 'rgba(0,169,157,0.07)' },
]

function QuickCard({ item, index, scrollYProgress, isWide }) {
  const [hovered, setHovered] = useState(false)
  const config = deckConfig[index] || deckConfig[0]
  const accent = ACCENTS[index] || ACCENTS[0]
  const Icon = ICONS[item.icon]

  const xVal = isWide ? config.xStart : 0
  const x = useTransform(scrollYProgress, [0, 1], [xVal, 0])
  const y = useTransform(scrollYProgress, [0, 1], [config.yStart, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [config.rotateStart, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1])

  const arrowX = useSpring(hovered ? 6 : 0, { stiffness: 300, damping: 22 })

  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      style={{ x, y, rotate, opacity, zIndex: config.zIndex, position: 'relative', willChange: 'transform' }}
    >
      <Link
        to={item.to}
        className="ql-card"
        style={{ '--ql-border': accent.border, '--ql-bg': accent.bg, '--ql-hover': accent.hover, '--ql-num': accent.num }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={item.title}
      >
        {/* Large watermark number */}
        <span className="ql-num" aria-hidden="true">{num}</span>

        {/* Top row — stamp tag + icon */}
        <div className="ql-top">
          <span className="ql-stamp">{item.tag || `DESTINATION · ${num}`}</span>
          <div className="ql-icon-wrap">
            {Icon && <Icon />}
          </div>
        </div>

        {/* Title */}
        <h3 className="ql-title">{item.title}</h3>

        {/* Handwritten annotation */}
        <span className="ql-hand">{item.hand}</span>

        {/* Description */}
        <p className="ql-desc">{item.desc}</p>

        {/* Footer row — arrow */}
        <div className="ql-footer">
          <span className="ql-go">Go there</span>
          <motion.span className="ql-arrow" style={{ x: arrowX }}>
            <IconArrow />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function QuickLinks() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.35'],
  })

  const [isWide, setIsWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 640)
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 640)
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section className="ql-section" ref={sectionRef}>
      <div className="container">
        <div className="ql-grid">
          {quickLinks.items.map((item, i) => (
            <QuickCard
              key={item.title}
              item={item}
              index={i}
              scrollYProgress={scrollYProgress}
              isWide={isWide}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
