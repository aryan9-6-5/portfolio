import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import ProjectTicket from './ProjectTicket.jsx'
import TicketPuncher from './TicketPuncher.jsx'
import PunchCollection from './PunchCollection.jsx'
import { playPunchSound } from '../utils/punchSound.js'

const STORAGE_KEY = 'portfolio_punched_projects_v3'

// Natural, realistic physical stack offsets for cards waiting in the deck behind
const STACK_PRESETS = [
  { rotate: 0, x: 0, y: 0, scale: 1.0 },
  { rotate: 2.4, x: 12, y: 18, scale: 0.96 },
  { rotate: -2.8, x: -10, y: 34, scale: 0.92 },
  { rotate: 1.8, x: 8, y: 48, scale: 0.88 },
]

/**
 * TicketStack
 * Scroll-driven physical ticket deck with:
 * - Natural overlapping card stack where waiting tickets peek out behind
 * - Precise mechanical puncher that enters from the left and clamps directly over the ticket stub
 * - Smooth physical stack transition (card lifts up/away, deck advances forward)
 * - Persistent collection of punched chits
 */
export default function TicketStack({ projects = [], onSelectProject }) {
  const containerRef = useRef(null)
  const total = projects.length

  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 900 : false))

  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth <= 900) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Active set of punched project IDs (starts clean on refresh, retained during session)
  const [punchedIds, setPunchedIds] = useState([])

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  // Dynamic state for mechanical puncher
  const ALIGNED_PUNCH_X = isMobile ? -170 : -188
  const OFFSCREEN_LEFT_X = isMobile ? -380 : -580
  const [puncherX, setPuncherX] = useState(OFFSCREEN_LEFT_X)
  const [isPunching, setIsPunching] = useState(false)
  const [activeTicketIndex, setActiveTicketIndex] = useState(0)
  const [fallingDisc, setFallingDisc] = useState(null)

  // Long pinned scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Track punched IDs with a ref so scroll callbacks always see latest values
  const punchedIdsRef = useRef(punchedIds)
  useEffect(() => {
    punchedIdsRef.current = punchedIds
  }, [punchedIds])

  const currentlyPunchingIdRef = useRef(null)
  const prevProgressRef = useRef(0)

  // Punch handler: callable on scroll clamp or manual tap
  const triggerPunch = useCallback((project, playSound = true) => {
    if (!project || punchedIdsRef.current.includes(project.id)) return
    const nextPunched = [...punchedIdsRef.current, project.id]
    punchedIdsRef.current = nextPunched
    setPunchedIds(nextPunched)

    // Play crisp physical mechanical sound effect
    if (playSound) {
      playPunchSound()
    }

    setFallingDisc({
      id: `${project.id}-${Date.now()}`,
      color: project.accentColor,
    })
  }, [])

  const handleManualPunch = useCallback((project) => {
    if (!project || punchedIdsRef.current.includes(project.id)) return
    setPuncherX(ALIGNED_PUNCH_X)
    setTimeout(() => {
      setIsPunching(true)
      triggerPunch(project, true)
      setTimeout(() => {
        setIsPunching(false)
        setTimeout(() => setPuncherX(OFFSCREEN_LEFT_X), 180)
      }, 220)
    }, 160)
  }, [ALIGNED_PUNCH_X, OFFSCREEN_LEFT_X, triggerPunch])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const isScrollingDown = progress >= (prevProgressRef.current || 0)
    prevProgressRef.current = progress

    const slotSize = 1 / total
    const rawSlot = progress / slotSize
    const currentIdx = Math.min(Math.floor(rawSlot), total - 1)
    setActiveTicketIndex(currentIdx)

    const currentProject = projects[currentIdx]
    const localProgress = rawSlot - currentIdx // 0.0 to 1.0 within current ticket

    // Mark any earlier tickets the user scrolled past silently without audio collisions
    if (isScrollingDown) {
      for (let i = 0; i < currentIdx; i++) {
        const p = projects[i]
        if (p && !punchedIdsRef.current.includes(p.id)) {
          triggerPunch(p, false)
        }
      }
    }

    // Reset active stroke state outside clamp zone
    if (localProgress < 0.36 || localProgress > 0.84) {
      currentlyPunchingIdRef.current = null
      setPuncherX(OFFSCREEN_LEFT_X)
      setIsPunching(false)
      return
    }

    const isAlreadyPunched =
      currentProject &&
      punchedIdsRef.current.includes(currentProject.id) &&
      currentlyPunchingIdRef.current !== currentProject.id

    // If already punched before entering or while scrolling backwards, do NOT re-punch or clamp!
    if (isAlreadyPunched || (!isScrollingDown && !currentlyPunchingIdRef.current)) {
      setPuncherX(OFFSCREEN_LEFT_X)
      setIsPunching(false)
      return
    }

    if (localProgress < 0.52) {
      const t = (localProgress - 0.36) / 0.16
      const eased = Math.sin((t * Math.PI) / 2)
      setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
      setIsPunching(false)
    } else if (localProgress < 0.74) {
      // CLAMP DOWN! FIRM PUNCH!
      setPuncherX(ALIGNED_PUNCH_X)
      setIsPunching(true)

      // Automatic punch on clamp
      if (currentProject && !punchedIdsRef.current.includes(currentProject.id)) {
        currentlyPunchingIdRef.current = currentProject.id
        triggerPunch(currentProject, true)
      }
    } else {
      const t = (localProgress - 0.74) / 0.10
      const eased = t * t
      setPuncherX(ALIGNED_PUNCH_X + eased * (OFFSCREEN_LEFT_X - ALIGNED_PUNCH_X))
      setIsPunching(false)
    }
  })

  // Clear falling chip after animation
  useEffect(() => {
    if (fallingDisc) {
      const timer = setTimeout(() => setFallingDisc(null), 700)
      return () => clearTimeout(timer)
    }
  }, [fallingDisc])

  const handleReset = () => {
    setPunchedIds([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <div
      ref={containerRef}
      className="ticket-stack-section"
      style={{ height: `${Math.max(380, total * 105)}vh` }}
    >
      {/* Pinned Stage during scroll */}
      <div className="ticket-stack-stage">
        {/* Stage Header */}
        <div className="ticket-stage-header">
          <h2 className="ticket-stage-title">Projects as Collectible Tickets</h2>
          <p className="ticket-stage-sub">
            Scroll down to inspect each pass. The mechanical puncher validates each ticket as you progress.
          </p>
        </div>

        {/* ========================================================
            CENTERED TICKET STACK WRAPPER
            ======================================================== */}
        <div className="ticket-deck-wrapper">
          <div className="ticket-deck-container">
            {projects.map((project, idx) => {
              const isPunched = punchedIds.includes(project.id)
              const isCurrentlyPunching = isPunching && activeTicketIndex === idx

              return (
                <TicketSlot
                  key={project.id}
                  project={project}
                  index={idx}
                  total={total}
                  isPunched={isPunched}
                  isCurrentlyPunching={isCurrentlyPunching}
                  scrollYProgress={scrollYProgress}
                  onSelect={onSelectProject}
                  onManualPunch={() => handleManualPunch(project)}
                />
              )
            })}
          </div>

          {/* MECHANICAL TICKET PUNCHER ALIGNED TO STACK */}
          <TicketPuncher
            x={puncherX}
            isPunching={isPunching}
            active={activeTicketIndex < total}
            isMobile={isMobile}
          />
        </div>

        {/* PUNCH COLLECTION TRAY (Bottom Right Dock) */}
        <PunchCollection
          projects={projects}
          punchedIds={punchedIds}
          activeFallingDisc={fallingDisc}
        />

        {/* Reset button */}
        {punchedIds.length > 0 && (
          <button
            type="button"
            className="ticket-reset-pill"
            onClick={handleReset}
            title="Reset collected tickets"
          >
            Reset Punches ({punchedIds.length}/{total})
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Individual Ticket with Stack Depth & Transition Physics
 */
function TicketSlot({
  project,
  index,
  total,
  isPunched,
  isCurrentlyPunching,
  scrollYProgress,
  onSelect,
  onManualPunch,
}) {
  const isLast = index === total - 1
  const slotSize = 1 / total
  const slotStart = index * slotSize
  const slotEnd = (index + 1) * slotSize

  // Transition phase when card lifts up and deck advances:
  // Starts at 85% of slot and finishes at slotEnd
  const transStart = slotEnd - slotSize * 0.15
  const transEnd = slotEnd

  // Opacity: Card remains visible in stack, and when punched & departing, fades smoothly
  const opacity = useTransform(
    scrollYProgress,
    isLast ? [0, 1] : [0, transStart, transEnd],
    isLast ? [1, 1] : [1, 1, 0]
  )

  // Scale: Transitions smoothly as the stack advances
  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, transStart, transEnd],
    isLast
      ? [0.94, 0.96, 1.0, 1.0]
      : [0.92, 0.96, 1.0, 1.0, 0.88]
  )

  // Y displacement: stacked cards peek out from underneath, then slide up to 0, then lift away
  const y = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, transStart, transEnd],
    isLast
      ? [index * 16, (index - 1) * 16, 0, 0]
      : [index * 16, (index - 1) * 16, 0, 0, -140]
  )

  const initialRotate = STACK_PRESETS[index % STACK_PRESETS.length].rotate
  const initialX = STACK_PRESETS[index % STACK_PRESETS.length].x

  const rotate = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, transStart, transEnd],
    isLast
      ? [initialRotate, initialRotate * 0.5, 0, 0]
      : [initialRotate, initialRotate * 0.5, 0, 0, -4]
  )

  const x = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.15), slotStart, transStart, transEnd],
    isLast
      ? [initialX, initialX * 0.5, 0, 0]
      : [initialX, initialX * 0.5, 0, 0, -10]
  )

  const zIndex = total - index

  return (
    <motion.div
      className="ticket-deck-slot"
      style={{
        zIndex,
        opacity,
        scale,
        x,
        y,
        rotate,
      }}
    >
      <ProjectTicket
        project={project}
        total={total}
        isPunched={isPunched}
        isCurrentlyPunching={isCurrentlyPunching}
        onSelect={onSelect}
        onManualPunch={onManualPunch}
      />
    </motion.div>
  )
}
