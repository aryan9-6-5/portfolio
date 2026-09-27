import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import ProjectTicket from './ProjectTicket.jsx'
import TicketPuncher from './TicketPuncher.jsx'
import PunchCollection from './PunchCollection.jsx'

const STORAGE_KEY = 'portfolio_punched_projects_v2'

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

  // Active set of punched project IDs (starts clean so no ticket is pre-punched before reaching it)
  const [punchedIds, setPunchedIds] = useState([])

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  // Dynamic state for mechanical puncher
  const defaultOffscreen = isMobile ? -420 : -650
  const [puncherX, setPuncherX] = useState(defaultOffscreen)
  const [isPunching, setIsPunching] = useState(false)
  const [activeTicketIndex, setActiveTicketIndex] = useState(0)
  const [fallingDisc, setFallingDisc] = useState(null)

  // Long pinned scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Punch handler — fires only on a deliberate click of the punch target.
  const triggerPunch = useCallback((project) => {
    if (!project || punchedIds.includes(project.id)) return
    const nextPunched = [...punchedIds, project.id]
    setPunchedIds(nextPunched)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPunched))
    } catch {
      // ignore
    }
    setFallingDisc({
      id: `${project.id}-${Date.now()}`,
      color: project.accentColor,
    })
    setIsPunching(true)
    setTimeout(() => setIsPunching(false), 380)
  }, [punchedIds])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const slotSize = 1 / total
    const rawSlot = progress / slotSize
    const currentIdx = Math.min(Math.floor(rawSlot), total - 1)
    setActiveTicketIndex(currentIdx)

    const currentProject = projects[currentIdx]
    const localProgress = rawSlot - currentIdx // 0.0 to 1.0 within current ticket

    // Alignment coordinate:
    // On desktop: -242px aligns the pin over the horizontal stub punch zone.
    // On mobile: -140px brings the jaws visibly onto the mobile stub.
    const ALIGNED_PUNCH_X = isMobile ? -140 : -242
    const OFFSCREEN_LEFT_X = isMobile ? -420 : -650

    // The puncher glides in and rests over the active ticket as it comes
    // into focus, and glides back out as the next ticket advances in. It
    // never punches on its own — punching only happens on a deliberate
    // click (see triggerPunch / onManualPunch), so nothing gets marked
    // "collected" before the user has actually looked at it.
    void currentProject

    if (localProgress < 0.35 || localProgress > 0.85) {
      setPuncherX(OFFSCREEN_LEFT_X)
    } else if (localProgress < 0.55) {
      const t = (localProgress - 0.35) / 0.20
      const eased = Math.sin((t * Math.PI) / 2)
      setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
    } else if (localProgress < 0.72) {
      setPuncherX(ALIGNED_PUNCH_X)
    } else {
      const t = (localProgress - 0.72) / 0.13
      const eased = t * t
      setPuncherX(ALIGNED_PUNCH_X + eased * (OFFSCREEN_LEFT_X - ALIGNED_PUNCH_X))
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
    <div ref={containerRef} className="ticket-stack-section">
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
                  onManualPunch={() => triggerPunch(project)}
                />
              )
            })}
          </div>

          {/* MECHANICAL TICKET PUNCHER ALIGNED TO STACK */}
          <TicketPuncher
            x={puncherX}
            isPunching={isPunching}
            active={activeTicketIndex < total}
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
