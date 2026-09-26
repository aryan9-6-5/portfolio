import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { nav } from '../data/content.js'
import { ICONS, IconHamburger, IconClose } from './icons.jsx'

export default function Nav() {
  const [sticky, setSticky] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setSticky(window.scrollY > 40) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`site-header${sticky ? ' sticky' : ''}`}>
        <motion.div
          className="header-inner"
          animate={{ paddingTop: sticky ? 12 : 28, paddingBottom: sticky ? 12 : 28 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.2 }}
        >
          <Link to="/" className="header-logo" onClick={() => setOpen(false)}>{nav.name}</Link>

          <ul className="header-nav">
            {nav.links.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to} end={l.to === '/'}>{l.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="header-socials">
            {nav.socials.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <a key={s.label} className="icon-btn" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon />
                </a>
              )
            })}
          </div>

          <button className="icon-btn header-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <IconClose /> : <IconHamburger />}
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="mobile-menu"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: '0%' }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.2 }}
            >
              {nav.links.map((l) => (
                <Link key={l.label} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
