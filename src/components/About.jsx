import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { about, coding } from '../data/content.js'
import Reveal from './Reveal.jsx'
import SkillBar from './SkillBar.jsx'

function RayBursts({ position = 'top-left' }) {
  const isRight = position.includes('right')
  return (
    <div className={`cloud-rays ${isRight ? 'rays-right' : 'rays-left'}`} aria-hidden="true">
      <span className="ray ray-blue" />
      <span className="ray ray-yellow" />
      <span className="ray ray-pink" />
    </div>
  )
}

function ThoughtCloudTail({ position = 'bottom-right' }) {
  return (
    <div className={`thought-tail tail-${position}`} aria-hidden="true">
      <span className="tail-dot dot-lg" />
      <span className="tail-dot dot-md" />
      <span className="tail-dot dot-sm" />
    </div>
  )
}

function PinnedThoughtCloud({ item, index, scrollYProgress, isStacked }) {
  // Determine position in the 4-corner layout around the standing character
  // Index 0: Top-Left
  // Index 1: Top-Right
  // Index 2: Bottom-Left (below 0)
  // Index 3: Bottom-Right (below 1)
  const posClass =
    index === 0
      ? 'pos-top-left'
      : index === 1
      ? 'pos-top-right'
      : index === 2
      ? 'pos-bottom-left'
      : 'pos-bottom-right'

  const tailPos =
    index === 0
      ? 'bottom-right'
      : index === 1
      ? 'bottom-left'
      : index === 2
      ? 'top-right'
      : 'top-left'

  const rayPos = index % 2 === 0 ? 'top-left' : 'top-right'

  // Scroll appearance thresholds:
  // Clouds enter one-by-one and then STAY visible rather than vanishing!
  const enterStart = index * 0.22 + 0.04
  const enterEnd = enterStart + 0.12

  // Opacity: starts 0, fades in to 1, and STAYS at 1 all the way to 1.0
  const opacity = useTransform(scrollYProgress, [enterStart, enterEnd, 1.0], [0, 1, 1])

  // Scale: pops from 0.82 to 1.0 and STAYS at 1.0
  const scale = useTransform(scrollYProgress, [enterStart, enterEnd, 1.0], [0.82, 1, 1])

  // Gentle upward float on entrance
  const y = useTransform(scrollYProgress, [enterStart, enterEnd, 1.0], [28, 0, 0])

  // Only active/visible clouds receive pointer events
  const pointerEvents = useTransform(opacity, (val) => (val > 0.4 ? 'auto' : 'none'))

  const card = (
    <motion.div
      className={`pinned-thought-cloud-item ${posClass}`}
      style={{ opacity, scale, y, pointerEvents }}
    >
      <div className="thought-bubble-wrap">
        <RayBursts position={rayPos} />
        <div className={`card thought-cloud-bubble ${item.color}`}>
          <h3 className="thought-heading">{item.title}</h3>
          <p className="thought-text">{item.thought}</p>
        </div>
        <ThoughtCloudTail position={tailPos} />
      </div>
    </motion.div>
  )

  // On stacked mobile/tablet layout, give each card a lively spring pop-in
  // with full comic ray bursts, thought tail, and tactile interactive feedback
  if (isStacked) {
    return (
      <motion.div
        className="pinned-thought-cloud-item mobile-thought-cloud"
        id={`thought-card-${index}`}
        initial={{ opacity: 0, scale: 0.86, y: 36 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 26,
          delay: index * 0.04,
        }}
      >
        <div className="thought-bubble-wrap">
          <RayBursts position={rayPos} />
          <div className={`card thought-cloud-bubble ${item.color}`}>
            <span className="thought-step-badge">Thought 0{index + 1}</span>
            <h3 className="thought-heading">{item.title}</h3>
            <p className="thought-text">{item.thought}</p>
          </div>
          <ThoughtCloudTail position="top-center" />
        </div>
      </motion.div>
    )
  }

  return card
}

export default function About() {
  const containerRef = useRef(null)

  const [isStacked, setIsStacked] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 900 : false))

  useEffect(() => {
    function onResize() { setIsStacked(window.innerWidth <= 900) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {isStacked ? (
        <MobileAboutStage />
      ) : (
        <DesktopAboutStage />
      )}

      {/* Skills & Stack Summary following the thoughts experience */}
      <section className="section about-skills-section">
        <div className="container">
          <Reveal className="about-skills-footer" y={20}>
            <div className="card about-skills-card">
              <span className="label" style={{ marginBottom: 12 }}>
                {about.skillsLabel}
              </span>
              <div className="about-skills-grid">
                {about.skills.map((s, i) => (
                  <SkillBar key={s.label} label={s.label} value={s.value} delay={i * 0.1} />
                ))}
              </div>

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(29, 29, 29, 0.08)' }}>
                <span className="label" style={{ display: 'block', marginBottom: 12 }}>
                  Technologies & Frameworks
                </span>
                <div className="portfolio-tags">
                  {coding.stack.map((s) => (
                    <span key={s} className="tag-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/**
 * Desktop Pinned 4-Corner Stage (Preserved exactly as requested)
 */
function DesktopAboutStage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="about" ref={containerRef} className="about-pinned-section">
      <div className="about-pinned-stage">
        {/* Constant Background Artwork */}
        <div className="about-artwork-layer" aria-hidden="true">
          <img
            src="/about-mascot-standing.png"
            alt="Aryan standing with crossed arms thinking"
            className="about-artwork-img"
          />
        </div>

        {/* Thought Clouds popping one by one around the constant character */}
        <div className="about-clouds-stage">
          {about.thoughts.map((item, index) => (
            <PinnedThoughtCloud
              key={item.title}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Mobile Thought Cloud Stage:
 * Pinned scroll-synced interactive story where Aryan stands thinking at top,
 * and thought bubbles pop in dynamically with ray bursts, tails, and active tab steppers.
 */
function MobileAboutStage() {
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const total = about.thoughts.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const slot = Math.min(Math.floor(progress * total), total - 1)
    setActiveIdx(slot)
  })

  const currentThought = about.thoughts[activeIdx] || about.thoughts[0]

  const handleSelect = (idx) => {
    setActiveIdx(idx)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => Math.min(total - 1, prev + 1))
  }

  return (
    <section id="about" ref={containerRef} className="about-mobile-pinned-section">
      <div className="about-mobile-stage">
        {/* Top Header */}
        <div className="about-mobile-header">
          <span className="about-mobile-eyebrow">{about.eyebrow}</span>
          <h2 className="about-mobile-heading">{about.heading}</h2>
        </div>

        {/* Mascot Thinking Area */}
        <div className="about-mobile-mascot-wrap">
          <img
            src="/about-mascot-standing.png"
            alt="Aryan thinking with crossed arms"
            className="about-mobile-mascot-img"
          />
        </div>

        {/* Interactive Pill Stepper */}
        <div className="about-mobile-stepper" role="tablist" aria-label="Thought stepper">
          {about.thoughts.map((t, i) => (
            <button
              key={t.step}
              type="button"
              role="tab"
              aria-selected={activeIdx === i}
              className={`about-stepper-btn ${activeIdx === i ? 'is-active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <span className="stepper-num">{t.step}</span>
              <span className="stepper-label">{t.tag.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Thought Bubble with AnimatePresence Spring Pop */}
        <div className="about-mobile-cloud-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentThought.step}
              className="about-mobile-cloud-card"
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -12 }}
              transition={{ type: 'spring', stiffness: 440, damping: 26 }}
            >
              <RayBursts position={activeIdx % 2 === 0 ? 'top-left' : 'top-right'} />
              <div className={`card thought-cloud-bubble ${currentThought.color} mobile-thought-bubble`}>
                <div className="mobile-bubble-badge-row">
                  <span className="thought-step-badge">
                    Thought {currentThought.step} / 04 · {currentThought.tag}
                  </span>
                </div>
                <h3 className="thought-heading">{currentThought.title}</h3>
                <p className="thought-text">{currentThought.thought}</p>
              </div>
              <ThoughtCloudTail position="top-center" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination & Scroll Hint */}
        <div className="about-mobile-nav-bar">
          <button
            type="button"
            className="about-nav-arrow"
            onClick={handlePrev}
            disabled={activeIdx === 0}
            aria-label="Previous thought"
          >
            ←
          </button>
          <div className="about-nav-dots">
            {about.thoughts.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`about-nav-dot ${activeIdx === i ? 'dot-active' : ''}`}
                onClick={() => handleSelect(i)}
                aria-label={`Jump to thought ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="about-nav-arrow"
            onClick={handleNext}
            disabled={activeIdx === total - 1}
            aria-label="Next thought"
          >
            →
          </button>
        </div>

        <span className="about-mobile-scroll-hint">
          Scroll down or tap pills to reveal thoughts ↓
        </span>
      </div>
    </section>
  )
}
