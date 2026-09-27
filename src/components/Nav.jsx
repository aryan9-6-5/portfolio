import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { nav } from '../data/content.js'
import { ICONS, IconArrow } from './icons.jsx'
import NameMark from './NameMark.jsx'
import SlideText from './SlideText.jsx'
import DrawUnderline from './DrawUnderline.jsx'

export default function Nav() {
  const [sticky, setSticky] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setSticky(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const isLinkActive = (to) => {
    if (to === '/') {
      return location.pathname === '/' && !location.hash
    }
    if (to.startsWith('/#')) {
      const targetHash = to.replace('/', '')
      return location.pathname === '/' && location.hash === targetHash
    }
    return location.pathname === to
  }

  return (
    <>
      <header className={`site-header-dock ${sticky ? 'is-sticky' : ''}`}>
        <div className="nav-capsule">
          {/* Left Brand Monogram & Name */}
          <Link to="/" className="nav-brand-anchor" aria-label="Aryan - Home">
            <div className="nav-brand-badge" title="Aryan Hanumakonda">
              <span className="nav-brand-glyph">A</span>
              <span className="nav-brand-reticle" aria-hidden="true" />
            </div>
            <NameMark>{nav.name}</NameMark>
          </Link>

          {/* Center Links Segment with Magnetic Pill (Desktop) */}
          <nav className="nav-links-segment" aria-label="Main Navigation">
            {nav.links.map((link) => {
              const active = isLinkActive(link.to)
              const isHovered = hoveredLink === link.label

              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`nav-link-item ${active ? 'is-active' : ''}`}
                >
                  <DrawUnderline>{link.label}</DrawUnderline>
                </Link>
              )
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="nav-action-cluster">
            <div className="nav-social-group">
              {nav.socials.map((s) => {
                const Icon = ICONS[s.icon]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`nav-social-btn nav-social-${s.icon}`}
                    aria-label={s.label}
                    title={s.label}
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>

            <Link to={nav.cta.to} className="nav-cta-btn">
              <SlideText>{nav.cta.label}</SlideText>
              <IconArrow width={14} height={14} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className={`nav-burger-btn ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
            >
              <span className="burger-bar bar-1" />
              <span className="burger-bar bar-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Modern Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <div className="nav-mobile-layer">
            <motion.div
              className="nav-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            <motion.nav
              className="nav-mobile-sheet"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              aria-label="Mobile Navigation"
            >

              <ul className="nav-mobile-menu">
                {nav.links.map((link, idx) => {
                  const active = isLinkActive(link.to)
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className={`nav-mobile-link ${active ? 'is-active' : ''}`}
                        onClick={() => setOpen(false)}
                      >
                        <span className="nav-mobile-num">0{idx + 1}</span>
                        <span className="nav-mobile-text">{link.label}</span>
                        <span className="nav-mobile-arrow" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="nav-mobile-bottom">
                <Link
                  to={nav.cta.to}
                  className="nav-mobile-cta"
                  onClick={() => setOpen(false)}
                >
                  <SlideText>{nav.cta.label} with Aryan</SlideText>
                  <IconArrow />
                </Link>

                <div className="nav-mobile-socials">
                  {nav.socials.map((s) => {
                    const Icon = ICONS[s.icon]
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`nav-mobile-social-chip nav-mobile-social-${s.icon}`}
                      >
                        <Icon />
                        <span>{s.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
