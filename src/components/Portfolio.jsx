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
 * Displays punched state, sound, and triggers the single global stapler on scroll/click.
 */
function ScrollPunchTicket({
  project,
  index,
  total,
  isPunched,
  isCurrentlyPunching,
  onManualPunch,
  onSelect,
  setRef,
}) {
  return (
    <div ref={setRef} id={project.id} className="ticket-grid-item">
      <ProjectTicket
        project={project}
        total={total}
        isPunched={isPunched}
        isCurrentlyPunching={isCurrentlyPunching}
        onSelect={onSelect}
        onManualPunch={() => onManualPunch(project, index)}
      />
    </div>
  )
}

/**
 * ProjectList for standalone pages (like /projects)
 * Uses exactly ONE single mechanical stapler/puncher across the entire page.
 * The single stapler aligns dynamically to whichever ticket is currently in view,
 * glides in from the left to punch the stub, and retracts offscreen.
 */
export function ProjectList({ items, onSelectProject, initialTargetId }) {
  const [selected, setSelected] = useState(null)
  const [punchedIds, setPunchedIds] = useState(() => (initialTargetId ? [initialTargetId] : []))
  const [punchingId, setPunchingId] = useState(null)
  const [fallingDisc, setFallingDisc] = useState(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  )

  const gridRef = useRef(null)
  const ticketRefs = useRef([])
  const isManualRef = useRef(false)
  const isReadyRef = useRef(false)

  const ALIGNED_PUNCH_X = isMobile ? -170 : -188
  const OFFSCREEN_LEFT_X = isMobile ? -380 : -580

  const [puncherX, setPuncherX] = useState(OFFSCREEN_LEFT_X)
  const [puncherY, setPuncherY] = useState(140)
  const [isPunching, setIsPunching] = useState(false)

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 900)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // If opening directly to a ticket, ensure it is added to punchedIds
  useEffect(() => {
    if (initialTargetId) {
      setPunchedIds((prev) => (prev.includes(initialTargetId) ? prev : [...prev, initialTargetId]))
    }
  }, [initialTargetId])

  // Grace period on route mount to avoid auto-punching during navigation scroll
  useEffect(() => {
    const delay = initialTargetId ? 1100 : 450
    const timer = setTimeout(() => {
      isReadyRef.current = true
    }, delay)
    return () => clearTimeout(timer)
  }, [initialTargetId])

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

  // Single stapler scroll coordinator
  useEffect(() => {
    let ticking = false

    const updateStapler = () => {
      ticking = false
      if (!isReadyRef.current || isManualRef.current || !gridRef.current) return

      const vhCenter = window.innerHeight * 0.5
      let closest = null
      let closestDist = Infinity
      let closestIndex = -1

      items.forEach((item, idx) => {
        const el = ticketRefs.current[idx]
        if (!el) return
        const rect = el.getBoundingClientRect()
        const itemCenter = rect.top + rect.height * 0.5
        const dist = Math.abs(itemCenter - vhCenter)
        if (dist < closestDist) {
          closestDist = dist
          closest = item
          closestIndex = idx
        }
      })

      if (closest && closestIndex >= 0) {
        const el = ticketRefs.current[closestIndex]
        const gridRect = gridRef.current.getBoundingClientRect()
        const rect = el.getBoundingClientRect()
        const targetY = rect.top - gridRect.top + rect.height * 0.5

        setPuncherY(targetY)

        // Normalized progress through the viewport trigger zone
        const progress = 1 - (rect.top - (vhCenter - rect.height * 0.6)) / (rect.height * 1.6)
        const isPunched = punchedIds.includes(closest.id)

        if (isPunched) {
          setPuncherX(OFFSCREEN_LEFT_X)
          setIsPunching(false)
        } else if (progress < 0.32 || progress > 0.68) {
          setPuncherX(OFFSCREEN_LEFT_X)
          setIsPunching(false)
          if (progress >= 0.50) {
            handlePunch(closest)
          }
        } else if (progress < 0.46) {
          const t = (progress - 0.32) / 0.14
          const eased = Math.sin((t * Math.PI) / 2)
          setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
          setIsPunching(false)
        } else if (progress <= 0.56) {
          setPuncherX(ALIGNED_PUNCH_X)
          setIsPunching(true)
          handlePunch(closest)
        } else {
          const t = (progress - 0.56) / 0.12
          const eased = t * t
          setPuncherX(ALIGNED_PUNCH_X + eased * (OFFSCREEN_LEFT_X - ALIGNED_PUNCH_X))
          setIsPunching(false)
        }
      }
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateStapler)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateStapler()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items, punchedIds, isMobile, handlePunch, ALIGNED_PUNCH_X, OFFSCREEN_LEFT_X])

  // Manual click on ticket stub
  const handleManualPunch = (project, idx) => {
    if (punchedIds.includes(project.id) || !gridRef.current) return
    const el = ticketRefs.current[idx]
    if (!el) return

    isManualRef.current = true
    const gridRect = gridRef.current.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    const targetY = rect.top - gridRect.top + rect.height * 0.5

    setPuncherY(targetY)
    setPuncherX(ALIGNED_PUNCH_X)

    setTimeout(() => {
      setIsPunching(true)
      handlePunch(project)
      setTimeout(() => {
        setIsPunching(false)
        setTimeout(() => {
          setPuncherX(OFFSCREEN_LEFT_X)
          isManualRef.current = false
        }, 160)
      }, 220)
    }, 200)
  }

  const handleReset = () => {
    setPunchedIds([])
  }

  const handleSelect = onSelectProject || setSelected

  return (
    <>
      <div ref={gridRef} className="collectible-tickets-grid" style={{ position: 'relative' }}>
        {items.map((item, idx) => (
          <ScrollPunchTicket
            key={item.id || item.name}
            setRef={(el) => (ticketRefs.current[idx] = el)}
            project={item}
            index={idx}
            total={items.length}
            isPunched={punchedIds.includes(item.id)}
            isCurrentlyPunching={punchingId === item.id}
            onManualPunch={handleManualPunch}
            onSelect={handleSelect}
            isMobile={isMobile}
          />
        ))}

        {/* EXACTLY ONE SINGLE MECHANICAL STAPLER / PUNCHER FOR THE ENTIRE PROJECTS PAGE */}
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
  // "Inspect Ticket" on the homepage opens the dossier right here as an
  // overlay: it must NOT navigate to /projects. Routing there and back
  // was clearing the URL hash on close, which made ScrollManager reset
  // the scroll position, so closing the dossier looked like it dropped
  // you on a different page instead of leaving you exactly where you
  // were on the homepage.
  const [selectedProject, setSelectedProject] = useState(null)
  const FEATURED_HOME_IDS = ['multimodalrag', 'retailclassifier', 'studysmart']
  const displayItems = FEATURED_HOME_IDS
    .map((id, idx) => {
      const p = projects.items.find((item) => item.id === id)
      if (!p) return null
      const num = `0${idx + 1}`
      return {
        ...p,
        ticketNo: num,
        gate: `GATE H-${num}`,
      }
    })
    .filter(Boolean)

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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
