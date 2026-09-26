import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { coreStrengths } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function CoreStrengths() {
  // Lock on strength index 0 by default so the right-side space is utilized immediately
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [tapped, setTapped] = useState(null)

  // Active item to display in the right-hand showcase layer:
  // If user is hovering a row, preview it; otherwise show the selected (clicked) strength
  const activeIndex = hovered !== null ? hovered : (selected !== null ? selected : 0)
  const activeItem = coreStrengths.items[activeIndex]

  return (
    <section id="strengths" className="section strengths-section">
      <div className="container">
        <Reveal className="section-head" y={10}>
          <span className="eyebrow">{coreStrengths.eyebrow}</span>
          <h2 className="heading-1">{coreStrengths.heading}</h2>
          <p className="body-text">{coreStrengths.sub}</p>
        </Reveal>

        {/* 2-Column Grid Layout: List on left, Rich Proof Showcase Layer on right */}
        <div className="strengths-interactive-layout">
          {/* Left Column: List of Strengths */}
          <div className="strengths-list-col">
            {coreStrengths.items.map((item, i) => {
              const isSelected = selected === i
              const isHovered = hovered === i
              const isDimmed = (hovered !== null && !isHovered) || (hovered === null && selected !== null && !isSelected)

              return (
                <div key={item.title} className="strengths-row">
                  <button
                    type="button"
                    className={`strengths-title-btn ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      setSelected(selected === i ? null : i)
                      setTapped(tapped === i ? null : i)
                    }}
                    aria-label={`Strength: ${item.title}. Click to view proof story.`}
                  >
                    <div className="strengths-btn-left">
                      <span className={`strengths-num-badge badge-${item.color}`}>
                        {item.index}
                      </span>
                      <span className="strengths-title-text">{item.title}</span>
                    </div>

                    <div className="strengths-btn-right">
                      <span className="strengths-metric-pill">{item.metric}</span>
                      <span className="strengths-select-arrow">
                        {isSelected ? '●' : '→'}
                      </span>
                    </div>
                  </button>

                  {/* Mobile Accordion */}
                  <div className={`strengths-inline-story ${tapped === i ? 'open' : ''}`}>
                    <div className="mobile-story-inner">
                      <span className="mobile-story-tag">{item.tag}</span>
                      <p>{item.story}</p>
                      <Link to={item.link} className="mobile-story-link">
                        VIEW PROOF ARTIFACT →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Dedicated Brief Story Layer (Utilizing the space to the right) */}
          <div className="strengths-story-showcase-col">
            <div className="strengths-sticky-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.title}
                  className={`strengths-showcase-layer theme-${activeItem.color}`}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="showcase-top-row">
                    <span className="showcase-tag-chip">{activeItem.tag}</span>
                    <span className="showcase-index-chip">PROOF {activeItem.index} / 06</span>
                  </div>

                  <h3 className="showcase-heading">{activeItem.title}</h3>

                  <div className="showcase-story-box">
                    <p className="showcase-story-body">
                      "{activeItem.story}"
                    </p>
                  </div>

                  <div className="showcase-footer-row">
                    <div className="showcase-metric-box">
                      <span className="showcase-metric-label">VERIFIED PROOF</span>
                      <strong className="showcase-metric-val">{activeItem.metric}</strong>
                    </div>

                    <Link to={activeItem.link} className="showcase-cta-btn">
                      EXPLORE EVIDENCE →
                    </Link>
                  </div>

                  <div className="showcase-watermark" aria-hidden="true">
                    {activeItem.index}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
