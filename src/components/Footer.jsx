import { Link } from 'react-router-dom'
import { footerNav, nav } from '../data/content.js'
import { ICONS } from './icons.jsx'
import Reveal from './Reveal.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <Reveal y={15}>
        <div className="site-footer-inner">
          <Link to="/" className="site-footer-logo">{nav.name}</Link>

          <ul className="site-footer-links">
            {footerNav.links.map((l) => (
              <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>

          <div className="site-footer-socials">
            {nav.socials.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <a key={s.label} className="icon-btn" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
        <p className="site-footer-legal">{footerNav.legal}</p>
      </Reveal>
    </footer>
  )
}
