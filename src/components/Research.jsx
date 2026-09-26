import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

const EASE = [0.23, 1, 0.32, 1]
const CARD_W = 345
const CARD_H = 495
const SPACING = 365

// ── FRONT & BACK FACES FOR CARD 1 ─────────────────────────────
function RetinalCardFaces() {
  return (
    <>
      {/* ── FRONT FACE ── */}
      <div className="torn-note-paper torn-paper-1 card-theme-retinal note-face-front">
        <div className="tape-strip" aria-hidden="true" />

        <div className="note-top-row">
          <span className="note-editorial-pill pill-retinal">CLINICAL VISION • 01</span>
          <svg className="doodle-eye" viewBox="0 0 44 26" fill="none" aria-hidden="true">
            <path d="M 4 13 C 12 5, 32 5, 40 13 C 32 21, 12 21, 4 13 Z" stroke="#0284C7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="22" cy="13" r="4.5" stroke="#0284C7" strokeWidth="1.5" fill="rgba(2, 132, 199, 0.08)" />
            <circle cx="22" cy="13" r="2" fill="#0369A1" />
            <line x1="16" y1="5" x2="14" y2="2" stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="22" y1="4" x2="22" y2="1" stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="28" y1="5" x2="30" y2="2" stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="10" y1="8" x2="7" y2="6" stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="34" y1="8" x2="37" y2="6" stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>

        <h3 className="note-title">Retinal Disease AI</h3>
        <p className="note-desc">Explainable vision with clinician-verified saliency maps.</p>

        <div className="fundus-visual-row">
          <div className="fundus-photo-frame with-tape">
            <div className="photo-tape" aria-hidden="true" />
            <img src="/research/fundus-real.jpg" alt="Clinical Fundus photo" className="fundus-img" loading="lazy" />
          </div>
          <div className="fundus-arrow-divider" aria-hidden="true">
            <svg viewBox="0 0 24 16" fill="none" className="connector-arrow-svg">
              <path d="M 2 8 L 20 8 M 14 3 L 20 8 L 14 13" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="fundus-photo-frame">
            <img src="/research/fundus-saliency.jpg" alt="Clinician saliency map" className="fundus-img" loading="lazy" />
          </div>
        </div>

        <div className="handwritten-annotation-block">
          <svg className="curved-arrow-svg" viewBox="0 0 24 32" fill="none" aria-hidden="true">
            <path d="M 12 30 C 4 22, 6 12, 18 4 M 11 4 L 18 4 L 17 11" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="handwritten-caption">
            Model explanations highlight clinically relevant regions.
          </span>
        </div>

        <div className="note-bottom-bar">
          <Link to="/contact" className="note-action-link" onClick={(e) => e.stopPropagation()}>
            READ PAPER →
          </Link>
          <div className="stamp-published">
            <div className="stamp-text-col">
              <span className="stamp-sub">IEEE 2026</span>
              <span className="stamp-main">PUBLISHED</span>
            </div>
            <div className="stamp-check-icon">
              <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8" stroke="#16A34A" strokeWidth="1.4" />
                <path d="M 5.5 9 L 8 11.5 L 12.5 6.5" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── BACK FACE ── */}
      <div className="torn-note-paper torn-paper-1 card-theme-retinal note-face-back">
        <div className="tape-strip" aria-hidden="true" />

        <div className="note-top-row">
          <span className="note-editorial-pill pill-retinal">FIELD NOTE — 01</span>
          <span className="handwritten-label-retinal">CLINICAL AUDIT</span>
        </div>

        <h3 className="note-title">Clinician-Verified Saliency</h3>
        <p className="note-desc">Audit of multi-class fundus scans with certified ophthalmologists.</p>

        <div className="back-findings-box">
          <div className="back-finding-item">
            <span className="finding-num-tag">01</span>
            <div className="finding-text-group">
              <strong className="finding-title">94.2% Diagnostic Accuracy</strong>
              <p className="finding-desc">Multi-class precision across diabetic retinopathy & glaucoma.</p>
            </div>
          </div>

          <div className="back-finding-item">
            <span className="finding-num-tag">02</span>
            <div className="finding-text-group">
              <strong className="finding-title">Zero Saliency Drift</strong>
              <p className="finding-desc">Integrated gradients anchor on real pathology with zero phantom attention.</p>
            </div>
          </div>
        </div>

        <div className="back-handwritten-note">
          <span className="handwritten-caption">
            "Clinicians reported high trust when heatmaps bounded microaneurysms without background artifact bleed."
          </span>
        </div>

        <div className="note-bottom-bar">
          <Link to="/contact" className="note-action-link" onClick={(e) => e.stopPropagation()}>
            READ FULL PAPER →
          </Link>
          <span className="flip-cue-btn">← FLIP BACK</span>
        </div>
      </div>
    </>
  )
}

// ── FRONT & BACK FACES FOR CARD 2 ─────────────────────────────
function BrainWavesCardFaces() {
  return (
    <>
      {/* ── FRONT FACE ── */}
      <div className="torn-note-paper torn-paper-2 card-theme-brain note-face-front">
        <div className="tape-strip" aria-hidden="true" />

        <div className="note-top-row">
          <span className="note-editorial-pill pill-brain">NEURO DYNAMICS • 02</span>
          <svg className="doodle-brain" viewBox="0 0 44 32" fill="none" aria-hidden="true">
            <path d="M 14 30 C 8 30, 3 26, 3 18 C 3 12, 7 8, 13 7 C 13 4, 17 2, 22 2 C 27 2, 30 4, 32 7 C 37 7, 41 11, 41 16 C 41 21, 38 25, 34 27 C 33 29, 30 31, 26 31 C 23 31, 21 29, 20 27 C 18 29, 16 30, 14 30 Z" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 22 2 C 22 10, 21 20, 20 27" stroke="#7C3AED" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M 13 7 C 17 11, 17 16, 11 20" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 32 7 C 29 13, 29 18, 35 22" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        <h3 className="note-title">Adaptive Brain Waves</h3>
        <p className="note-desc">Testing spiking neural nets on live human error potentials.</p>

        <div className="eeg-chart-card">
          <div className="eeg-chart-header">
            <div className="eeg-annotation">
              <span className="handwritten-label-brain">ErrP peak (~300 ms)</span>
              <svg className="eeg-pointer-arrow" viewBox="0 0 28 20" fill="none" aria-hidden="true">
                <path d="M 24 2 C 16 3, 8 9, 3 17 M 2 10 L 3 17 L 10 15" stroke="#7C3AED" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="eeg-svg-wrap">
            <svg viewBox="0 0 300 80" className="eeg-svg" preserveAspectRatio="none">
              <path d="M 6 44 Q 26 40, 44 46 T 84 43 T 124 45 C 136 47, 146 26, 154 24 C 164 22, 172 50, 186 46 T 234 44 T 294 45" fill="none" stroke="#DDD6FE" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 6 48 Q 28 52, 48 47 T 88 51 T 128 44 C 140 40, 149 34, 157 31 C 166 28, 174 54, 188 50 T 238 48 T 294 47" fill="none" stroke="#EDE9FE" strokeWidth="1" strokeLinecap="round" />
              <path d="M 6 46 Q 24 44, 40 52 T 74 42 C 88 40, 100 58, 114 62 C 126 66, 138 54, 148 38 C 154 28, 157 12, 160 10 C 163 8, 168 36, 176 42 C 186 50, 198 44, 210 42 T 256 46 T 294 46" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="160" cy="10" r="3.8" fill="#DC2626" />
            </svg>
          </div>
        </div>

        <div className="metrics-split-row">
          <div className="metric-box">
            <span className="metric-big-num" style={{ color: '#5B21B6' }}>0.717</span>
            <span className="metric-small-lbl">AUROC (frozen)</span>
          </div>
          <div className="metric-vertical-rule" />
          <div className="metric-box">
            <span className="metric-big-num" style={{ color: '#5B21B6' }}>0.692</span>
            <span className="metric-small-lbl">AUROC (adaptive)</span>
          </div>
          <div className="metric-handwritten-note">
            <svg className="metric-curved-arrow" viewBox="0 0 20 26" fill="none" aria-hidden="true">
              <path d="M 3 3 C 16 10, 12 20, 3 24 M 3 24 L 9 22 M 3 24 L 7 17" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="handwritten-caption">Adaptation didn't beat baseline.</span>
          </div>
        </div>

        <div className="note-bottom-bar">
          <Link to="/contact" className="note-action-link" onClick={(e) => e.stopPropagation()}>
            READ FIELD NOTE →
          </Link>
          <div className="stamp-progress-violet">
            <span>IN PROGRESS</span>
          </div>
        </div>
      </div>

      {/* ── BACK FACE ── */}
      <div className="torn-note-paper torn-paper-2 card-theme-brain note-face-back">
        <div className="tape-strip" aria-hidden="true" />

        <div className="note-top-row">
          <span className="note-editorial-pill pill-brain">FIELD NOTE — 02</span>
          <span className="handwritten-label-brain">EMPIRICAL NULL</span>
        </div>

        <h3 className="note-title">Honest Empirical Null</h3>
        <p className="note-desc">Testing online STDP spike plasticity on 14 EEG error-potential subjects.</p>

        <div className="back-findings-box">
          <div className="back-finding-item">
            <span className="finding-num-tag" style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7C3AED' }}>01</span>
            <div className="finding-text-group">
              <strong className="finding-title">0.717 AUROC — Frozen Baseline</strong>
              <p className="finding-desc">Standard deep baseline generalized stably without parameter churn.</p>
            </div>
          </div>

          <div className="back-finding-item">
            <span className="finding-num-tag" style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7C3AED' }}>02</span>
            <div className="finding-text-group">
              <strong className="finding-title">0.692 AUROC — Adaptive SNN</strong>
              <p className="finding-desc">Online weight plasticity tracked scalp electrode noise faster than task dynamics.</p>
            </div>
          </div>
        </div>

        <div className="back-handwritten-note">
          <span className="handwritten-caption">
            "Reporting nulls openly: online adaptation requires strict confidence gating to survive EEG non-stationarity."
          </span>
        </div>

        <div className="note-bottom-bar">
          <Link to="/contact" className="note-action-link" onClick={(e) => e.stopPropagation()}>
            READ FIELD NOTE →
          </Link>
          <span className="flip-cue-btn">← FLIP BACK</span>
        </div>
      </div>
    </>
  )
}

// ── FRONT & BACK FACES FOR CARD 3 ─────────────────────────────
function ResidualProbeCardFaces() {
  return (
    <>
      {/* ── FRONT FACE ── */}
      <div className="torn-note-paper torn-paper-3 card-theme-probe note-face-front">
        <div className="paperclip-clip" aria-hidden="true">
          <svg viewBox="0 0 24 54" className="paperclip-svg" fill="none">
            <path
              d="M 12 4 C 18 4, 21 8, 21 14 L 21 42 C 21 48, 17 52, 10 52 C 4 52, 2 48, 2 42 L 2 16 C 2 11, 5 7, 9 7 C 14 7, 17 11, 17 16 L 17 38 C 17 42, 14 44, 11 44 C 8 44, 6 42, 6 38 L 6 18"
              stroke="#D97706"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M 11 5 C 16 5, 20 9, 20 14 L 20 41 C 20 47, 16 51, 10 51" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        <div className="note-top-row">
          <span className="note-editorial-pill pill-probe">SAFETY & PROBING • 03</span>
        </div>

        <h3 className="note-title">Does AI Know It Lies?</h3>
        <p className="note-desc">Probing transformer residual streams for internal doubt.</p>

        <div className="layer-chart-card">
          <div className="layer-chart-top">
            <div className="layer-arrow-tag">
              <span className="handwritten-label-probe">L1 → L32</span>
              <svg className="layer-pointer-arrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M 3 2 C 8 4, 12 10, 14 15 M 8 15 L 14 15 L 13 9" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="layer-bars-grid">
            {Array.from({ length: 32 }, (_, i) => {
              const h = i < 18 ? 30 + Math.sin(i * 1.3) * 8 : 48 + Math.sin(i * 0.9) * 26 + (i - 18) * 2.4
              return (
                <div key={i} className="layer-bar-unit">
                  <div
                    className="layer-bar-fill"
                    style={{
                      height: `${Math.min(94, Math.max(18, h))}%`,
                      background: i < 18 ? '#FBBF24' : '#EA580C',
                      opacity: i < 18 ? 0.75 : 0.95,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="layer-notes-row">
          <div className="handwritten-probe-note">
            <svg className="probe-curved-arrow" viewBox="0 0 20 28" fill="none" aria-hidden="true">
              <path d="M 4 26 C 12 24, 16 14, 10 4 M 5 7 L 10 3 L 14 8" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="handwritten-caption">
              Layer-wise activation probe (can't see clear signal yet)
            </span>
          </div>

          <div className="day-exploring-stamp">
            <svg viewBox="0 0 114 44" className="exploring-oval-svg" fill="none" aria-hidden="true">
              <ellipse cx="57" cy="22" rx="52" ry="18" stroke="#D97706" strokeWidth="1.5" strokeDasharray="140 6" transform="rotate(-2 57 22)" />
            </svg>
            <span className="exploring-text" style={{ color: '#D97706' }}>DAY 1 EXPLORING</span>
          </div>
        </div>

        <div className="note-bottom-bar">
          <Link to="/contact" className="note-action-link" onClick={(e) => e.stopPropagation()}>
            READ FIELD NOTE →
          </Link>
          <div className="stamp-progress-amber">
            <span>IN PROGRESS</span>
          </div>
        </div>
      </div>

      {/* ── BACK FACE ── */}
      <div className="torn-note-paper torn-paper-3 card-theme-probe note-face-back">
        <div className="paperclip-clip" aria-hidden="true">
          <svg viewBox="0 0 24 54" className="paperclip-svg" fill="none">
            <path
              d="M 12 4 C 18 4, 21 8, 21 14 L 21 42 C 21 48, 17 52, 10 52 C 4 52, 2 48, 2 42 L 2 16 C 2 11, 5 7, 9 7 C 14 7, 17 11, 17 16 L 17 38 C 17 42, 14 44, 11 44 C 8 44, 6 42, 6 38 L 6 18"
              stroke="#D97706"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="note-top-row">
          <span className="note-editorial-pill pill-probe">FIELD NOTE — 03</span>
          <span className="handwritten-label-probe">ACTIVE PROBE</span>
        </div>

        <h3 className="note-title">Residual Stream Dynamics</h3>
        <p className="note-desc">Linear truth probes trained across 32 transformer residual stream layers.</p>

        <div className="back-findings-box">
          <div className="back-finding-item">
            <span className="finding-num-tag" style={{ background: 'rgba(217, 119, 6, 0.08)', color: '#D97706' }}>01</span>
            <div className="finding-text-group">
              <strong className="finding-title">Layers 1–20: Pure Chance (~50%)</strong>
              <p className="finding-desc">No linear subspace separates factual statements from falsehoods in early MLP blocks.</p>
            </div>
          </div>

          <div className="back-finding-item">
            <span className="finding-num-tag" style={{ background: 'rgba(217, 119, 6, 0.08)', color: '#D97706' }}>02</span>
            <div className="finding-text-group">
              <strong className="finding-title">Layers 24–32: Sharp Emergence</strong>
              <p className="finding-desc">Probing accuracy rises to 83.4% in late layers directly preceding token emission.</p>
            </div>
          </div>
        </div>

        <div className="back-handwritten-note">
          <span className="handwritten-caption">
            "Open inquiry: is this internal confidence signal causally steerable before hallucinated tokens are sampled?"
          </span>
        </div>

        <div className="note-bottom-bar">
          <Link to="/contact" className="note-action-link" onClick={(e) => e.stopPropagation()}>
            FOLLOW INVESTIGATION →
          </Link>
          <span className="flip-cue-btn">← FLIP BACK</span>
        </div>
      </div>
    </>
  )
}

const CARDS_DATA = [
  { id: 'laml', title: 'Retinal Disease AI', Component: RetinalCardFaces },
  { id: 'neuroplastic', title: 'Adaptive Brain Waves', Component: BrainWavesCardFaces },
  { id: 'error', title: 'Does AI Know It Lies?', Component: ResidualProbeCardFaces },
]

const SPREAD_X = 395

function getCardPlacement(index, selected) {
  // Resting default state: 3 cards side by side on desk
  if (selected === null) {
    if (index === 0) return { x: -SPREAD_X, y: 0, scale: 1, isFlipped: false, zIndex: 10, opacity: 1, isActive: false }
    if (index === 1) return { x: 0, y: 0, scale: 1, isFlipped: false, zIndex: 12, opacity: 1, isActive: false }
    if (index === 2) return { x: SPREAD_X, y: 0, scale: 1, isFlipped: false, zIndex: 10, opacity: 1, isActive: false }
  }

  // Active card: Centers itself (x = 0), lifts up (y = -16), scales up (scale = 1.07), flips, stays on top
  if (selected === index) {
    return {
      x: 0,
      y: -16,
      scale: 1.07,
      isFlipped: true,
      zIndex: 50,
      opacity: 1,
      isActive: true,
    }
  }

  // Non-selected cards: Symmetrically push to flanks (±SPREAD_X), drop downward (y = 22), scale down (scale = 0.82), dim (opacity = 0.45)
  if (selected === 0) {
    if (index === 1) return { x: SPREAD_X, y: 22, scale: 0.82, isFlipped: false, zIndex: 10, opacity: 0.45, isActive: false }
    if (index === 2) return { x: -SPREAD_X, y: 22, scale: 0.82, isFlipped: false, zIndex: 10, opacity: 0.45, isActive: false }
  }
  if (selected === 1) {
    if (index === 0) return { x: -SPREAD_X, y: 22, scale: 0.82, isFlipped: false, zIndex: 10, opacity: 0.45, isActive: false }
    if (index === 2) return { x: SPREAD_X, y: 22, scale: 0.82, isFlipped: false, zIndex: 10, opacity: 0.45, isActive: false }
  }
  if (selected === 2) {
    if (index === 0) return { x: -SPREAD_X, y: 22, scale: 0.82, isFlipped: false, zIndex: 10, opacity: 0.45, isActive: false }
    if (index === 1) return { x: SPREAD_X, y: 22, scale: 0.82, isFlipped: false, zIndex: 10, opacity: 0.45, isActive: false }
  }

  return { x: 0, y: 0, scale: 1, isFlipped: false, zIndex: 10, opacity: 1, isActive: false }
}

// ── MAIN RESEARCH COMPONENT ───────────────────────────────────
export default function Research() {
  const [selected, setSelected] = useState(null)
  const [mobileFlipped, setMobileFlipped] = useState({ 0: false, 1: false, 2: false })

  const handleCardClick = (index) => {
    if (selected === index) {
      setSelected(null) // unflip / reset back to 3-card desk view
    } else {
      setSelected(index) // center and flip
    }
  }

  const toggleMobileFlip = (index) => {
    setMobileFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section id="research" className="section research-section pink-stage-section">
      <div className="container desk-container">
        {/* Section Heading */}
        <Reveal className="section-head desk-head" y={10}>
          <h2 className="heading-1 research-heading-dark">Three real research threads</h2>
          <p className="body-text research-sub-dark">
            One peer-reviewed publication and two active inquiries — where null results are shared as plainly as wins.
          </p>
        </Reveal>

        {/* ── DESKTOP 3D SWAP & FLIP STAGE ── */}
        <div className="desktop-torn-stage-container" aria-label="Interactive research notes desk">
          {CARDS_DATA.map((card, index) => {
            const placement = getCardPlacement(index, selected)
            const CardFaces = card.Component

            return (
              <motion.div
                key={card.id}
                className={`stage-card-motion ${placement.isActive ? 'is-active' : ''} ${selected !== null && !placement.isActive ? 'is-flanked' : ''}`}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: `calc(50% - ${CARD_W / 2}px)`,
                  top: 14,
                  position: 'absolute',
                  zIndex: placement.zIndex,
                }}
                animate={{
                  x: placement.x,
                  y: placement.y,
                  scale: placement.scale,
                  opacity: placement.opacity,
                }}
                transition={{
                  x: { duration: 0.52, ease: EASE },
                  y: { duration: 0.45, ease: EASE },
                  scale: { duration: 0.45, ease: EASE },
                  opacity: { duration: 0.35, ease: EASE },
                }}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(index)
                  }
                }}
                aria-label={`${card.title}. Click to ${placement.isFlipped ? 'unflip' : 'bring to center and flip'}.`}
              >
                {/* Inactive Flanked Card Overlay with Swap Cue */}
                {selected !== null && !placement.isActive && (
                  <div className="inactive-card-veil" aria-hidden="true">
                    <span className="swap-hint-chip">CLICK TO SWAP ⇄</span>
                  </div>
                )}

                {/* 3D Flipper that rotates 180° when card is active in center */}
                <motion.div
                  className="torn-note-flipper"
                  animate={{ rotateY: placement.isFlipped ? 180 : 0 }}
                  transition={{
                    duration: 0.55,
                    delay: placement.isFlipped ? 0.12 : 0,
                    ease: EASE,
                  }}
                >
                  <CardFaces />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* ── MOBILE SNAP CAROUSEL WITH IN-PLACE FLIP ── */}
        <div className="mobile-torn-stage">
          <div className="mobile-snap-track">
            {CARDS_DATA.map((card, index) => {
              const isFlipped = !!mobileFlipped[index]
              const CardFaces = card.Component

              return (
                <div
                  key={`mobile-${card.id}`}
                  className={`mobile-snap-item ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => toggleMobileFlip(index)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="torn-note-flipper">
                    <CardFaces />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
