import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { projects, projectsPage, internship } from '../data/content.js'
import ProjectTicket from '../components/ProjectTicket.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import PageHero from '../components/PageHero.jsx'
import TechStackCarousel from '../components/TechStackCarousel.jsx'
import TicketPuncher from '../components/TicketPuncher.jsx'
import PunchCollection from '../components/PunchCollection.jsx'
import { IconArrow } from '../components/icons.jsx'
import SlideText from '../components/SlideText.jsx'
import { playPunchSound } from '../utils/punchSound.js'

// 5 featured project IDs for the Work page (DIFFERENT from homepage featured)
const FEATURED_WORK_IDS = ['taskflux', 'nexusmart', 'neurocog', 'volforecaster', 'gesturexai']

export default function ProjectsPage() {
  const location = useLocation()

  // Detect requested project from URL query, hash, or state
  const targetId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const fromQuery = searchParams.get('open') || searchParams.get('project')
    if (fromQuery) return fromQuery.toLowerCase()
    if (location.hash) {
      const cleanHash = location.hash.replace('#', '').toLowerCase()
      if (cleanHash) return cleanHash
    }
    if (location.state?.openProject) {
      return String(location.state.openProject).toLowerCase()
    }
    return null
  }, [location.search, location.hash, location.state])

  const allCards = useMemo(() => {
    const internItem = internship.item
    const featuredProjects = FEATURED_WORK_IDS
      .map((id, idx) => {
        const p = projects.items.find(item => item.id === id)
        if (!p) return null
        const num = `0${idx + 1}`
        return {
          ...p,
          ticketNo: num,
          gate: `GATE P-${num}`,
        }
      })
      .filter(Boolean)
    return [internItem, ...featuredProjects]
  }, [])

  const initialMatchedProject = useMemo(() => {
    if (!targetId) return null
    return allCards.find(
      p =>
        p.id.toLowerCase() === targetId ||
        p.name.toLowerCase() === targetId ||
        p.code?.toLowerCase() === targetId
    )
  }, [targetId, allCards])

  const [selectedProject, setSelectedProject] = useState(initialMatchedProject)

  useEffect(() => {
    if (initialMatchedProject) {
      setSelectedProject(initialMatchedProject)
    }
  }, [initialMatchedProject])

  // --- Punch state ---
  const [punchedIds, setPunchedIds] = useState(() =>
    initialMatchedProject ? [initialMatchedProject.id] : []
  )
  const punchedIdsRef = useRef(punchedIds)
  useEffect(() => {
    punchedIdsRef.current = punchedIds
  }, [punchedIds])

  const [punchingId, setPunchingId] = useState(null)
  const [fallingDisc, setFallingDisc] = useState(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  )

  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth <= 900) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Clear falling disc after animation
  useEffect(() => {
    if (fallingDisc) {
      const timer = setTimeout(() => setFallingDisc(null), 700)
      return () => clearTimeout(timer)
    }
  }, [fallingDisc])

  // --- Puncher position tracking ---
  const gridRef = useRef(null)
  const ticketRefs = useRef([])
  const isManualRef = useRef(false)
  const isReadyRef = useRef(false)

  const ALIGNED_PUNCH_X = isMobile ? -170 : -188
  const OFFSCREEN_LEFT_X = isMobile ? -380 : -580

  const [puncherX, setPuncherX] = useState(OFFSCREEN_LEFT_X)
  const [puncherY, setPuncherY] = useState(250)
  const [isPunching, setIsPunching] = useState(false)

  // Grace period on route mount
  useEffect(() => {
    const delay = initialMatchedProject ? 1100 : 450
    const timer = setTimeout(() => { isReadyRef.current = true }, delay)
    return () => clearTimeout(timer)
  }, [initialMatchedProject])

  const handlePunch = useCallback((project, playSound = true) => {
    if (!project || punchedIdsRef.current.includes(project.id)) return
    const next = [...punchedIdsRef.current, project.id]
    punchedIdsRef.current = next
    setPunchedIds(next)
    if (playSound) {
      playPunchSound()
    }
    setPunchingId(project.id)
    setFallingDisc({
      id: `${project.id}-${Date.now()}`,
      color: project.accentColor,
    })
    setTimeout(() => setPunchingId(null), 450)
  }, [])

  const isPunchingRef = useRef(false)

  const triggerSinglePunch = useCallback((project, index, playSound = true) => {
    if (!project || punchedIdsRef.current.includes(project.id) || isPunchingRef.current) return
    isPunchingRef.current = true

    const el = ticketRefs.current[index]
    if (el && gridRef.current) {
      const targetSpot = el.querySelector('.punch-target-area')
      if (targetSpot) {
        const spotRect = targetSpot.getBoundingClientRect()
        const gridRect = gridRef.current.getBoundingClientRect()
        setPuncherY(spotRect.top - gridRect.top + spotRect.height * 0.5 - 15)
      }
    }

    setPuncherX(ALIGNED_PUNCH_X)

    // Clamp once
    setTimeout(() => {
      setIsPunching(true)
      handlePunch(project, playSound)

      // Unclamp after 220ms
      setTimeout(() => {
        setIsPunching(false)

        // Retract back offscreen
        setTimeout(() => {
          setPuncherX(OFFSCREEN_LEFT_X)
          setTimeout(() => {
            isPunchingRef.current = false
          }, 180)
        }, 160)
      }, 220)
    }, 160)
  }, [ALIGNED_PUNCH_X, OFFSCREEN_LEFT_X, handlePunch])

  const handleManualPunch = useCallback((project, index) => {
    triggerSinglePunch(project, index, true)
  }, [triggerSinglePunch])

  // Scroll-based puncher tracking with pixel-perfect alignment and smooth easing
  useEffect(() => {
    let ticking = false

    const updateStapler = () => {
      ticking = false
      if (!isReadyRef.current || isPunchingRef.current || !gridRef.current) return

      const vhCenter = window.innerHeight * 0.5
      let closestEl = null
      let closestDist = Infinity
      let closestIndex = -1
      let closestSpotCenter = 0
      let closestTargetY = 250

      ticketRefs.current.forEach((el, i) => {
        if (!el) return
        const targetSpot = el.querySelector('.punch-target-area')
        const gridRect = gridRef.current.getBoundingClientRect()
        let spotCenter = 0
        let targetY = 250

        if (targetSpot) {
          const spotRect = targetSpot.getBoundingClientRect()
          spotCenter = spotRect.top + spotRect.height * 0.5
          targetY = spotRect.top - gridRect.top + spotRect.height * 0.5 - 15
        } else {
          const rect = el.getBoundingClientRect()
          spotCenter = rect.top + rect.height * 0.62
          targetY = rect.top - gridRect.top + rect.height * 0.62 - 15
        }

        const dist = Math.abs(spotCenter - vhCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestEl = el
          closestIndex = i
          closestSpotCenter = spotCenter
          closestTargetY = targetY
        }
      })

      if (!closestEl || closestDist > window.innerHeight * 0.6) {
        setPuncherX(OFFSCREEN_LEFT_X)
        setIsPunching(false)
        return
      }

      setPuncherY(closestTargetY)

      // Catch-up: Mark any preceding cards scrolled past as punched
      for (let i = 0; i < closestIndex; i++) {
        const prevProj = allCards[i]
        if (prevProj && !punchedIdsRef.current.includes(prevProj.id)) {
          handlePunch(prevProj, false)
        }
      }

      const project = allCards[closestIndex]
      if (!project) return

      const isAlreadyPunched = punchedIdsRef.current.includes(project.id)
      const isPastCenter = closestSpotCenter < vhCenter - 60

      if (isAlreadyPunched) {
        setPuncherX(OFFSCREEN_LEFT_X)
        setIsPunching(false)
        return
      }

      if (isPastCenter) {
        triggerSinglePunch(project, closestIndex, true)
        return
      }

      // Smooth approach
      if (closestDist > 240) {
        setPuncherX(OFFSCREEN_LEFT_X)
        setIsPunching(false)
      } else if (closestDist > 80) {
        const t = (240 - closestDist) / 160
        const eased = Math.sin((t * Math.PI) / 2)
        setPuncherX(OFFSCREEN_LEFT_X + eased * (ALIGNED_PUNCH_X - OFFSCREEN_LEFT_X))
        setIsPunching(false)
      } else {
        triggerSinglePunch(project, closestIndex, true)
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
  }, [allCards, handlePunch, ALIGNED_PUNCH_X, OFFSCREEN_LEFT_X])

  const handleReset = useCallback(() => {
    punchedIdsRef.current = []
    setPunchedIds([])
  }, [])

  const handleCloseModal = () => {
    setSelectedProject(null)
    if (window.location.search || window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <>
      <PageHero
        theme="emerald"
        heading={projectsPage.heading}
        sub={projectsPage.sub}
      >
        <div className="page-hero-actions">
          <span className="page-hero-chip">AI / ML Systems</span>
          <span className="page-hero-chip">Production APIs</span>
          <span className="page-hero-chip">Data Lakehouse</span>
          <span className="page-hero-chip">Full-Stack</span>
        </div>
      </PageHero>

      {/* Tech Stack Carousel */}
      <section className="tech-carousel-section">
        <TechStackCarousel />
      </section>

      {/* Featured Cards Grid: 1 Internship + 5 Projects */}
      <section className="work-featured-section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-head" style={{ marginBottom: '36px' }}>
            <span className="eyebrow">Work & Experience</span>
            <h2 className="heading-lg">Industrial Internship & Projects</h2>
            <p className="sub">Industrial production data engineering followed by five standout systems.</p>
          </div>

          <div className="work-featured-grid" ref={gridRef}>
            {allCards.map((project, idx) => (
              <div
                key={project.id}
                ref={el => { ticketRefs.current[idx] = el }}
                className="ticket-grid-item"
              >
                <ProjectTicket
                  project={project}
                  total={allCards.length}
                  isPunched={punchedIds.includes(project.id)}
                  isCurrentlyPunching={punchingId === project.id}
                  onSelect={proj => setSelectedProject(proj)}
                  onManualPunch={() => handleManualPunch(project, idx)}
                />
              </div>
            ))}

            {/* GitHub CTA Card */}
            <div className="github-cta-item">
              <a
                href="https://github.com/aryan9-6-5"
                target="_blank"
                rel="noreferrer"
                className="github-cta-card"
              >
                <div className="github-cta-inner">
                  <svg viewBox="0 0 98 96" className="github-cta-logo" aria-label="GitHub">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
                  </svg>
                  <div className="github-cta-text">
                    <span className="github-cta-heading">View More on GitHub</span>
                    <span className="github-cta-sub">Explore 30+ repositories, research code, and open-source contributions</span>
                  </div>
                  <div className="github-cta-arrow">
                    <IconArrow />
                  </div>
                </div>
              </a>
            </div>

            {/* Single Mechanical Puncher */}
            <div
              className="single-project-puncher-wrap"
              style={{
                position: 'absolute',
                top: `${puncherY}px`,
                left: 0,
                zIndex: 65,
                pointerEvents: 'none',
                opacity: puncherX > OFFSCREEN_LEFT_X + 20 ? 1 : 0,
                visibility: puncherX > OFFSCREEN_LEFT_X + 20 ? 'visible' : 'hidden',
                transition: isManualRef.current
                  ? 'top 0.22s cubic-bezier(0.2, 1.4, 0.4, 1), opacity 0.15s ease'
                  : 'opacity 0.15s ease',
              }}
            >
              <TicketPuncher
                x={puncherX}
                isPunching={isPunching}
                active={puncherX > OFFSCREEN_LEFT_X + 20}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Punch Tray Dock on Work / Projects Page */}
      <div className="projects-floating-dock">
        <PunchCollection
          projects={allCards}
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
            Reset Punches ({punchedIds.length}/{allCards.length})
          </button>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  )
}
