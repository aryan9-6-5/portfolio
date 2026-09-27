import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/content.js'
import { IconArrow } from './icons.jsx'
import SlideText from './SlideText.jsx'
import ProjectModal from './ProjectModal.jsx'
import TicketStack from './TicketStack.jsx'
import ProjectTicket from './ProjectTicket.jsx'
import TicketPuncher from './TicketPuncher.jsx'
import PunchCollection from './PunchCollection.jsx'
import { playPunchSound } from '../utils/punchSound.js'

const STORAGE_KEY = 'portfolio_punched_projects_v3'

/**
 * ScrollPunchTicket
 * An individual project ticket in standard document flow.
 * As the user scrolls down, the mechanical puncher glides into view from the left,
 * clamps and punches the ticket with realistic sound and recoil, stamps it PUNCHED,
 * and retracts offscreen. The ticket permanently retains its punched state!
 */
function ScrollPunchTicket({
  project,
  index,
  total,
  isPunched,
  isCurrentlyPunching,
  onPunch,
  onSelect,
  isMobile,
}) {
  const itemRef = useRef(null)
  const isPunchedRef = useRef(isPunched)
  useEffect(() => {
    isPunchedRef.current = isPunched
  }, [isPunched])

  const ALIGNED_PUNCH_X = isMobile ? -170 : -188
  const OFFSCREEN_LEFT_X = isMobile ? -380 : -580

  const [puncherX, setPuncherX] = useState(OFFSCREEN_LEFT_X)
  const [isPunching, setIsPunching] = useState(false)
  const manualPunchingRef = useRef(false)
  const hasTriggeredRef = useRef(isPunched)
  const isReadyRef = useRef(false)

  useEffect(() => {
    // Grace period on route change/mount to prevent auto-punching during navigation scroll
    const timer = setTimeout(() => {
      isReadyRef.current = true
    }, 450)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isPunched) {
      hasTriggeredRef.current = false
    }
  }, [isPunched])

  // Track scroll progress through this specific ticket container
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!isReadyRef.current) return
    if (manualPunchingRef.current) return

    // If ticket is already punched, puncher stays offscreen
    if (isPunchedRef.current) {
      if (puncherX !== OFFSCREEN_LEFT_X) {
        setPuncherX(OFFSCREEN_LEFT_X)
        setIsPunching(false)
      }
      return
    }

    // Scroll trigger zone:
    // progress = 0: entering bottom of screen
    // progress = 0.5: perfectly centered in screen
    // progress = 1: leaving top of screen
    if (progress < 0.32 || progress > 0.68) {
      setPuncherX(OFFSCREEN_LEFT_X)
      setIsPunching(false)
      // If user quickly scrolled past this ticket without stopping, ensure it gets marked punched
      if (progress >= 0.50 && !hasTriggeredRef.current && !isPunchedRef.current) {
        hasTriggeredRef.current = true
        onPunch(project)
      }
    } else if (progress < 0.46) {
      // Gliding in smoothly from left margin toward the ticket stub
      const t = (progress - 0.32) / 0.14
      const eased = Math.sin((t * Math.PI) / 2)
      setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
      setIsPunching(false)
    } else if (progress <= 0.56) {
      // CLAMP DOWN! FIRM PUNCH!
      setPuncherX(ALIGNED_PUNCH_X)
      setIsPunching(true)

      if (!hasTriggeredRef.current && !isPunchedRef.current) {
        hasTriggeredRef.current = true
        onPunch(project)
      }
    } else {
      // Retracting smoothly back to the left
      const t = (progress - 0.56) / 0.12
      const eased = t * t
      setPuncherX(ALIGNED_PUNCH_X + eased * (OFFSCREEN_LEFT_X - ALIGNED_PUNCH_X))
      setIsPunching(false)

      if (!hasTriggeredRef.current && !isPunchedRef.current) {
        hasTriggeredRef.current = true
        onPunch(project)
      }
    }
  })

  // Manual click: puncher glides in, clicks/punches, and glides back out
  const handleManualPunch = () => {
    if (isPunchedRef.current) return
    manualPunchingRef.current = true
    setPuncherX(ALIGNED_PUNCH_X)
    setTimeout(() => {
      setIsPunching(true)
      onPunch(project)
      setTimeout(() => {
        setIsPunching(false)
        setTimeout(() => {
          setPuncherX(OFFSCREEN_LEFT_X)
          manualPunchingRef.current = false
        }, 160)
      }, 220)
    }, 200)
  }

  return (
    <div ref={itemRef} id={project.id} className="ticket-grid-item">
      <ProjectTicket
        project={project}
        total={total}
        isPunched={isPunched}
        isCurrentlyPunching={isCurrentlyPunching || isPunching}
        onSelect={onSelect}
        onManualPunch={handleManualPunch}
      />

      {/* Mechanical Puncher tool arriving from the left to punch this ticket */}
      <TicketPuncher
        x={puncherX}
        isPunching={isPunching}
        active={!isPunched}
        isMobile={isMobile}
      />
    </div>
  )
}

/**
 * ProjectList for standalone pages (like /projects)
 * Renders all project tickets in normal document flow (no stack).
 * The mechanical puncher comes in and punches each project as you scroll down.
 * Punched state is retained during the session and resets on refresh.
 */
export function ProjectList({ items, onSelectProject }) {
  const [selected, setSelected] = useState(null)
  // Starts fresh on every page load / refresh
  const [punchedIds, setPunchedIds] = useState([])
  const [punchingId, setPunchingId] = useState(null)
  const [fallingDisc, setFallingDisc] = useState(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  )

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 900)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Clear legacy storage on mount so every refresh starts with clean tickets
  useEffect(() => {
    try {
      localStorage.removeItem('portfolio_punched_projects_v2')
      localStorage.removeItem('portfolio_punched_projects_v3')
      localStorage.removeItem('portfolio_punched_projects')
    } catch {
      // ignore
    }
  }, [])

  const handlePunch = useCallback((project) => {
    if (!project) return
    setPunchedIds((prev) => (prev.includes(project.id) ? prev : [...prev, project.id]))

    playPunchSound()
    setPunchingId(project.id)
    setFallingDisc({
      id: `${project.id}-${Date.now()}`,
      color: project.accentColor,
    })
    setTimeout(() => setPunchingId(null), 450)
  }, [])

  // Clear falling disc after animation
  useEffect(() => {
    if (fallingDisc) {
      const timer = setTimeout(() => setFallingDisc(null), 700)
      return () => clearTimeout(timer)
    }
  }, [fallingDisc])

  const handleReset = () => {
    setPunchedIds([])
  }

  const handleSelect = onSelectProject || setSelected

  return (
    <>
      <div className="collectible-tickets-grid">
        {items.map((item, idx) => (
          <ScrollPunchTicket
            key={item.id || item.name}
            project={item}
            index={idx}
            total={items.length}
            isPunched={punchedIds.includes(item.id)}
            isCurrentlyPunching={punchingId === item.id}
            onPunch={handlePunch}
            onSelect={handleSelect}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Floating Punch Tray Dock on Projects Page */}
      <div className="projects-floating-dock">
        <PunchCollection
          projects={items}
          punchedIds={punchedIds}
          activeFallingDisc={fallingDisc}
        />
        {punchedIds.length > 0 && (
          <button
            type="button"
            className="ticket-reset-pill fixed-reset-btn"
            onClick={handleReset}
            title="Reset collected tickets"
          >
            Reset Punches ({punchedIds.length}/{items.length})
          </button>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

/**
 * Portfolio (Work Section)
 * Scroll-driven physical collectible ticket experience with
 * mechanical ticket puncher entering from the left and punch collection dock.
 */
export default function Portfolio({ maxItems = 3 }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const displayItems = projects.items.slice(0, maxItems)

  return (
    <section id="work" className="section portfolio-ticket-experience">
      {/* Scroll-Driven Pinned Ticket Stack with Puncher and Collection Tray */}
      <TicketStack
        projects={displayItems}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Post-Runway Footer with See All Work link */}
      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '40px 0 20px' }}>
        <div className="see-all-wrap">
          <Link className="btn btn-accent" to={projects.seeAll.to}>
            <SlideText>See all work ({projects.items.length} projects)</SlideText> <IconArrow />
          </Link>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
