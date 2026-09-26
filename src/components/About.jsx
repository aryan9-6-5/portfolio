import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

function PinnedThoughtCloud({ item, index, scrollYProgress }) {
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

  return (
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
}

export default function About() {
  const containerRef = useRef(null)

  // Track scroll through the pinned runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <>
      {/* 
        The Pinned Scroll Section:
        - Background image with Aryan standing remains constant throughout the scroll
        - As user scrolls, thoughts pop in one after another around him and stay
      */}
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
                  {coding.eyebrow}
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
