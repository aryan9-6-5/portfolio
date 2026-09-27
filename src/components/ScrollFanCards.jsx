import { useRef, useState, useEffect, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { quickLinks } from '../data/content.js'
import { ICONS, IconArrow } from './icons.jsx'
import Reveal from './Reveal.jsx'

/**
 * ScrollFanCards
 * 
 * Animation Model:
 * 1. Before entering the screen: cards are completely closed in a stacked deck (progress = 0).
 * 2. As the section scrolls into the viewport: cards gradually and smoothly fan open.
 * 3. When the section reaches the center of the viewport: cards reach 100% fully-open spread (progress = 1).
 * 4. Hover state: hovering a card enlarges it, while neighboring cards actively move aside to create physical space.
 * 
 * Transforms combine multiplicatively:
 * finalTransform = scrollTransform (outer slot) × hoverTransform (inner card)
 */

export default function ScrollFanCards() {
  const containerRef = useRef(null)
  const cardRefs = [useRef(null), useRef(null), useRef(null)]
  const [hoveredCard, setHoveredCard] = useState(null)
  // Below tablet width the fan deck collapses to a plain stacked column
  // (see the final responsive pass in styles.css) — the scroll-linked fan
  // transform no longer applies there, so give the stack its own simple
  // scroll-reveal instead of leaving the cards static.
  const [isStacked, setIsStacked] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 900 : false))

  useEffect(() => {
    function onResize() { setIsStacked(window.innerWidth <= 900) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Track responsive fan targets
  const configRef = useRef({
    spreadX: 340,
    spreadRot: 7,
    spreadY: 12,
  })

  const updateResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') return
    const w = window.innerWidth
    if (w >= 1024) {
      configRef.current = { spreadX: 350, spreadRot: 7, spreadY: 10 }
    } else if (w >= 768) {
      configRef.current = { spreadX: 260, spreadRot: 8, spreadY: 14 }
    } else if (w >= 540) {
      configRef.current = { spreadX: 170, spreadRot: 10, spreadY: 14 }
    } else {
      configRef.current = { spreadX: 65, spreadRot: 12, spreadY: 10 }
    }
  }, [])

  useEffect(() => {
    updateResponsiveConfig()
    window.addEventListener('resize', updateResponsiveConfig, { passive: true })
    return () => window.removeEventListener('resize', updateResponsiveConfig)
  }, [updateResponsiveConfig])

  // Scroll calculation and smooth rAF lerp loop
  useEffect(() => {
    let rafId = null
    let isIntersecting = false
    let currentProgress = 0
    let targetProgress = 0

    function calculateTargetProgress() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const vh = window.innerHeight

      const sectionCenter = rect.top + rect.height / 2
      const viewportCenter = vh / 2

      // Start opening: when the top edge of the section begins entering the viewport (rect.top <= vh)
      // Fully open: when the section center reaches the viewport center (sectionCenter <= viewportCenter)
      const startDistance = vh + rect.height * 0.15
      const endDistance = viewportCenter

      const rawProgress = (startDistance - sectionCenter) / (startDistance - endDistance)
      const clamped = Math.min(Math.max(rawProgress, 0), 1)

      // Hermite smoothstep curve: smooth start, continuous acceleration, smooth arrival
      targetProgress = clamped * clamped * (3 - 2 * clamped)
    }

    function renderLoop() {
      // Smooth exponential decay lerp: 14% toward target per frame
      currentProgress += (targetProgress - currentProgress) * 0.14

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress
      }

      const p = currentProgress
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
      const { spreadX, spreadRot, spreadY } = configRef.current

      let closed, open
      if (isMobile) {
        // Mobile: cards start gathered in a tactile deck and smoothly deal/unfurl down
        closed = [
          { x: 0, y: 12, rot: -3 },
          { x: 0, y: -140, rot: 2.8 },
          { x: 0, y: -270, rot: -2.2 },
        ]
        open = [
          { x: 0, y: 0, rot: 0 },
          { x: 0, y: 0, rot: 0 },
          { x: 0, y: 0, rot: 0 },
        ]
      } else {
        // Desktop: cards fan out horizontally into 3-card spread
        closed = [
          { x: -4, y: 4, rot: -2.5 },
          { x: 0, y: 2, rot: 0.5 },
          { x: 4, y: 0, rot: 3 },
        ]
        open = [
          { x: -spreadX, y: spreadY, rot: -spreadRot },
          { x: 0, y: 0, rot: 0 },
          { x: spreadX, y: spreadY, rot: spreadRot },
        ]
      }

      // Interpolate between closed and open states based on progress
      const offsets = [0, 1, 2].map((i) => ({
        x: closed[i].x + (open[i].x - closed[i].x) * p,
        y: closed[i].y + (open[i].y - closed[i].y) * p,
        rot: closed[i].rot + (open[i].rot - closed[i].rot) * p,
      }))

      // Directly update CSS custom properties without triggering React re-renders during scroll
      for (let i = 0; i < 3; i++) {
        const el = cardRefs[i]?.current
        if (el) {
          el.style.setProperty('--scroll-x', `${offsets[i].x.toFixed(2)}px`)
          el.style.setProperty('--scroll-y', `${offsets[i].y.toFixed(2)}px`)
          el.style.setProperty('--scroll-rot', `${offsets[i].rot.toFixed(2)}deg`)
          el.style.setProperty('--scroll-p', p.toFixed(3))
        }
      }

      if (isIntersecting || Math.abs(targetProgress - currentProgress) > 0.001) {
        rafId = requestAnimationFrame(renderLoop)
      } else {
        rafId = null
      }
    }

    function onScroll() {
      calculateTargetProgress()
      if (!rafId) {
        rafId = requestAnimationFrame(renderLoop)
      }
    }

    // IntersectionObserver monitors 350px around the viewport so animation smoothly prepares
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting
        if (isIntersecting) {
          calculateTargetProgress()
          if (!rafId) rafId = requestAnimationFrame(renderLoop)
        }
      },
      { rootMargin: '350px 0px 350px 0px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    calculateTargetProgress()
    currentProgress = targetProgress // initialize to current scroll position immediately
    rafId = requestAnimationFrame(renderLoop)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Calculate hover styles for each card based on hoveredCard
  // When card N is hovered, neighboring cards actively move away to make physical room
  function getHoverStyle(cardIndex) {
    if (hoveredCard === null) {
      return {
        '--hover-x': '0px',
        '--hover-y': '0px',
        '--hover-scale': '1',
        '--hover-rot': '0deg',
        zIndex: cardIndex === 1 ? 2 : cardIndex === 2 ? 3 : 1,
      }
    }

    if (hoveredCard === cardIndex) {
      // Selected card: lifts up -22px, expands 1.09x, straightens to 0deg, highest z-index
      return {
        '--hover-x': '0px',
        '--hover-y': '-22px',
        '--hover-scale': '1.09',
        '--hover-rot': '0deg',
        zIndex: 10,
      }
    }

    // Neighboring cards: actively move away to prevent overlapping
    if (hoveredCard === 1) {
      // Center card hovered: left card moves left -120px, right card moves right +120px
      if (cardIndex === 0) {
        return {
          '--hover-x': '-120px',
          '--hover-y': '4px',
          '--hover-scale': '0.96',
          '--hover-rot': '-4deg',
          zIndex: 1,
        }
      }
      if (cardIndex === 2) {
        return {
          '--hover-x': '120px',
          '--hover-y': '4px',
          '--hover-scale': '0.96',
          '--hover-rot': '4deg',
          zIndex: 1,
        }
      }
    }

    if (hoveredCard === 0) {
      // Left card hovered: center and right cards shift right
      if (cardIndex === 1) {
        return {
          '--hover-x': '90px',
          '--hover-y': '2px',
          '--hover-scale': '0.97',
          '--hover-rot': '3deg',
          zIndex: 2,
        }
      }
      if (cardIndex === 2) {
        return {
          '--hover-x': '135px',
          '--hover-y': '4px',
          '--hover-scale': '0.95',
          '--hover-rot': '5deg',
          zIndex: 1,
        }
      }
    }

    if (hoveredCard === 2) {
      // Right card hovered: left and center cards shift left
      if (cardIndex === 0) {
        return {
          '--hover-x': '-135px',
          '--hover-y': '4px',
          '--hover-scale': '0.95',
          '--hover-rot': '-5deg',
          zIndex: 1,
        }
      }
      if (cardIndex === 1) {
        return {
          '--hover-x': '-90px',
          '--hover-y': '2px',
          '--hover-scale': '0.97',
          '--hover-rot': '-3deg',
          zIndex: 2,
        }
      }
    }

    return {
      '--hover-x': '0px',
      '--hover-y': '0px',
      '--hover-scale': '1',
      '--hover-rot': '0deg',
      zIndex: 1,
    }
  }

  return (
    <section className="scroll-fan-section" ref={containerRef}>
      <div className="container scroll-fan-container">
        <div
          className="scroll-fan-deck"
          aria-label="Interactive quick link cards"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {quickLinks.items.map((item, i) => {
            const Icon = ICONS[item.icon]
            const hoverStyle = getHoverStyle(i)
            const isHovered = hoveredCard === i

            const slot = (
              <div
                ref={cardRefs[i]}
                className={`scroll-fan-slot slot-${i} ${isHovered ? 'is-hovered' : ''}`}
                style={{ zIndex: hoverStyle.zIndex }}
              >
                {/*
                  Outer slot carries scrollTransform (--scroll-x, --scroll-y, --scroll-rot).
                  Inner card carries hoverTransform (--hover-x, --hover-y, --hover-scale, --hover-rot).
                  Combined via CSS: finalTransform = scrollTransform × hoverTransform.
                */}
                <div
                  className={`card scroll-fan-card ${isHovered ? 'is-selected' : ''}`}
                  style={{
                    '--hover-x': hoverStyle['--hover-x'],
                    '--hover-y': hoverStyle['--hover-y'],
                    '--hover-scale': hoverStyle['--hover-scale'],
                    '--hover-rot': hoverStyle['--hover-rot'],
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                >
                  <div className={`quicklink-icon ${item.color}`}>
                    {Icon && <Icon />}
                  </div>
                  <h3 className="heading-4">{item.title}</h3>
                  <p className="body-text">{item.desc}</p>
                  <Link
                    className={`arrow-btn ${item.color}`}
                    to={item.to}
                    aria-label={`Navigate to ${item.title}`}
                  >
                    <IconArrow />
                  </Link>
                </div>
              </div>
            )

            return (
              <Fragment key={item.title}>
                {slot}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
