import { useState, useEffect, useRef } from 'react'
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

  // Persisted set of punched project IDs
  const [punchedIds, setPunchedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Dynamic state for mechanical puncher
  const [puncherX, setPuncherX] = useState(-650)
  const [isPunching, setIsPunching] = useState(false)
  const [activeTicketIndex, setActiveTicketIndex] = useState(0)
  const [fallingDisc, setFallingDisc] = useState(null)

  // Long pinned scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const slotSize = 1 / total
    const rawSlot = progress / slotSize
    const currentIdx = Math.min(Math.floor(rawSlot), total - 1)
    setActiveTicketIndex(currentIdx)

    const currentProject = projects[currentIdx]
    const localProgress = rawSlot - currentIdx // 0.0 to 1.0 within current ticket

    // Alignment coordinate:
    // With puncher viewBox width 360 and punch pin at x=304,
    // positioning puncher at x = -242px aligns the pin over the ticket's stub punch zone!
    const ALIGNED_PUNCH_X = -242
    const OFFSCREEN_LEFT_X = -650

    // Punch sequence timeline within current ticket slot:
    // 0.00 - 0.38: Ticket active, puncher rests off-screen left
    // 0.38 - 0.58: Puncher enters from left smoothly and aligns jaws on ticket
    // 0.58 - 0.72: Puncher clamps down firmly! Hole punches through! Paper disc drops!
    // 0.72 - 0.84: Puncher unclamps and retracts back toward left
    // 0.84 - 1.00: Ticket lifts up and slides back, next card advances forward into focus

    if (localProgress < 0.38) {
      setPuncherX(OFFSCREEN_LEFT_X)
      setIsPunching(false)
    } else if (localProgress >= 0.38 && localProgress < 0.58) {
      // Entering from left
      const t = (localProgress - 0.38) / 0.20
      const eased = Math.sin((t * Math.PI) / 2) // smooth deceleration
      setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
      setIsPunching(false)
    } else if (localProgress >= 0.58 && localProgress < 0.72) {
      // Clamping firmly over the punch target!
      setPuncherX(ALIGNED_PUNCH_X)
      setIsPunching(true)

      // Record punch once
      if (currentProject && !punchedIds.includes(currentProject.id)) {
        const nextPunched = [...punchedIds, currentProject.id]
        setPunchedIds(nextPunched)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPunched))
        } catch {
          // ignore
        }

        // Trigger paper circle falling animation
        setFallingDisc({
          id: `${currentProject.id}-${Date.now()}`,
          color: currentProject.accentColor,
        })
      }
    } else if (localProgress >= 0.72 && localProgress < 0.84) {
      // Retracting back to off-screen left
      const t = (localProgress - 0.72) / 0.12
      const eased = t * t // smooth acceleration away
      setPuncherX(ALIGNED_PUNCH_X + eased * (OFFSCREEN_LEFT_X - ALIGNED_PUNCH_X))
      setIsPunching(false)
    } else {
      setPuncherX(OFFSCREEN_LEFT_X)
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
}) {
  const isLast = index === total - 1
  const slotSize = 1 / total
  const slotStart = index * slotSize
  const slotEnd = (index + 1) * slotSize

  // Transition phase when card lifts up and deck advances:
  // Starts at 82% of slot and finishes at slotEnd
  const transStart = slotEnd - slotSize * 0.18
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
      ? [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, transStart, transEnd],
    isLast
      ? [0.94, 0.96, 1.0, 1.0]
      : [0.92, 0.96, 1.0, 1.0, 0.88]
  )

  // Y displacement: stacked cards peek out from underneath, then slide up to 0, then lift away
  const y = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, transStart, transEnd],
    isLast
      ? [index * 18, (index - 1) * 18, 0, 0]
      : [index * 18, (index - 1) * 18, 0, 0, -150]
  )

  // Natural tilt / rotation:
  // Waiting cards have realistic natural tilt (+2.4deg, -2.8deg), then straighten to 0deg when active,
  // then lift away with slight reverse tilt
  const initialRotate = STACK_PRESETS[index % STACK_PRESETS.length].rotate
  const initialX = STACK_PRESETS[index % STACK_PRESETS.length].x

  const rotate = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, transStart, transEnd],
    isLast
      ? [initialRotate, initialRotate * 0.5, 0, 0]
      : [initialRotate, initialRotate * 0.5, 0, 0, -4]
  )

  const x = useTransform(
    scrollYProgress,
    isLast
      ? [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, 1.0]
      : [0, Math.max(0, slotStart - slotSize * 0.18), slotStart, transStart, transEnd],
    isLast
      ? [initialX, initialX * 0.5, 0, 0]
      : [initialX, initialX * 0.5, 0, 0, -10]
  )

  // Dynamic z-index layering so active ticket sits on top, waiting tickets beneath
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
        isPunched={isPunched}
        isCurrentlyPunching={isCurrentlyPunching}
        onSelect={onSelect}
      />
    </motion.div>
  )
}
