import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { internship } from '../data/content.js'
import ProjectTicket from './ProjectTicket.jsx'
import ProjectModal from './ProjectModal.jsx'
import TicketPuncher from './TicketPuncher.jsx'
import { playPunchSound } from '../utils/punchSound.js'

export default function InternshipSection({ onSelectProject }) {
  const { item } = internship
  const [selected, setSelected] = useState(null)
  const [isPunched, setIsPunched] = useState(false)
  const [isCurrentlyPunching, setIsCurrentlyPunching] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  )

  const showcaseRef = useRef(null)
  const isManualRef = useRef(false)
  const isReadyRef = useRef(false)
  const isPunchedRef = useRef(false)

  const ALIGNED_PUNCH_X = isMobile ? -170 : -188
  const OFFSCREEN_LEFT_X = isMobile ? -380 : -580

  const [puncherX, setPuncherX] = useState(OFFSCREEN_LEFT_X)
  const [puncherY, setPuncherY] = useState(250)
  const [isPunching, setIsPunching] = useState(false)

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 900)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    isPunchedRef.current = isPunched
  }, [isPunched])

  // Grace period on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      isReadyRef.current = true
    }, 450)
    return () => clearTimeout(timer)
  }, [])

  const isPunchingRef = useRef(false)

  const triggerSinglePunch = useCallback((playSound = true) => {
    if (isPunchedRef.current || isPunchingRef.current) return
    isPunchingRef.current = true
    isPunchedRef.current = true

    // 1. Align to stub target
    const showcaseRect = showcaseRef.current?.getBoundingClientRect()
    const targetSpot = showcaseRef.current?.querySelector('.punch-target-area')
    if (showcaseRect && targetSpot) {
      const spotRect = targetSpot.getBoundingClientRect()
      setPuncherY(spotRect.top - showcaseRect.top + spotRect.height * 0.5 - 15)
    }

    setPuncherX(ALIGNED_PUNCH_X)

    // 2. Clamp down once
    setTimeout(() => {
      setIsPunching(true)
      setIsPunched(true)
      if (playSound) playPunchSound()
      setIsCurrentlyPunching(true)

      // 3. Unclamp after 220ms
      setTimeout(() => {
        setIsPunching(false)
        setIsCurrentlyPunching(false)

        // 4. Retract back offscreen
        setTimeout(() => {
          setPuncherX(OFFSCREEN_LEFT_X)
          setTimeout(() => {
            isPunchingRef.current = false
          }, 180)
        }, 160)
      }, 220)
    }, 160)
  }, [ALIGNED_PUNCH_X, OFFSCREEN_LEFT_X])

  const handleManualPunch = useCallback(() => {
    triggerSinglePunch(true)
  }, [triggerSinglePunch])

  // Scroll tracking to punch cleanly when centered in viewport
  useEffect(() => {
    let ticking = false

    const updateStapler = () => {
      ticking = false
      if (!isReadyRef.current || isPunchingRef.current || !showcaseRef.current) return

      const showcaseRect = showcaseRef.current.getBoundingClientRect()
      const vhCenter = window.innerHeight * 0.5

      // Target the punch hole spot accurately
      const targetSpot = showcaseRef.current.querySelector('.punch-target-area')
      let targetCenter = showcaseRect.top + showcaseRect.height * 0.62
      if (targetSpot) {
        const spotRect = targetSpot.getBoundingClientRect()
        targetCenter = spotRect.top + spotRect.height * 0.5
        const targetY = spotRect.top - showcaseRect.top + spotRect.height * 0.5 - 15
        setPuncherY(targetY)
      } else {
        setPuncherY(showcaseRect.height * 0.62 - 15)
      }

      const dist = Math.abs(targetCenter - vhCenter)
      const isPastCenter = targetCenter < vhCenter - 60

      if (isPunchedRef.current) {
        setPuncherX(OFFSCREEN_LEFT_X)
        setIsPunching(false)
        return
      }

      // If user scrolled past the card rapidly, ensure it gets marked punched
      if (isPastCenter) {
        triggerSinglePunch(true)
        return
      }

      // Glide zone: between 240px and 80px from center
      if (dist > 240) {
        setPuncherX(OFFSCREEN_LEFT_X)
        setIsPunching(false)
      } else if (dist > 80) {
        const t = (240 - dist) / 160
        const eased = Math.sin((t * Math.PI) / 2)
        setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
        setIsPunching(false)
      } else {
        triggerSinglePunch(true)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateStapler)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateStapler()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ALIGNED_PUNCH_X, OFFSCREEN_LEFT_X, triggerSinglePunch])

  const handleSelect = (proj) => {
    if (onSelectProject) {
      onSelectProject(proj)
    } else {
      setSelected(proj)
    }
  }

  return (
    <section id="experience" className="internship-ticket-section">
      <div className="container">
        {/* Section Header - Clean typography, strictly without avatar */}
        <div className="section-head" style={{ marginBottom: '28px' }}>
          <span className="eyebrow">{internship.eyebrow}</span>
          <h2 className="heading-lg">{internship.heading}</h2>
          <p className="sub">{internship.sub}</p>
        </div>

        {/* Physical Collectible Internship Ticket */}
        <div
          ref={showcaseRef}
          className="internship-ticket-showcase"
          style={{ position: 'relative' }}
        >
          <ProjectTicket
            project={item}
            total={1}
            isPunched={isPunched}
            isCurrentlyPunching={isCurrentlyPunching}
            onManualPunch={handleManualPunch}
            onSelect={handleSelect}
          />

          {/* Mechanical Ticket Puncher */}
          <div
            className="single-project-puncher-wrap"
            style={{
              position: 'absolute',
              top: `${puncherY}px`,
              left: 0,
              zIndex: 65,
              pointerEvents: 'none',
              transition: isManualRef.current ? 'top 0.22s cubic-bezier(0.2, 1.4, 0.4, 1)' : 'none',
            }}
          >
            <TicketPuncher
              x={puncherX}
              isPunching={isPunching}
              active={true}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>

      {!onSelectProject && (
        <AnimatePresence>
          {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      )}
    </section>
  )
}
