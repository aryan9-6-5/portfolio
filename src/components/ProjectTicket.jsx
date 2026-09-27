import { motion } from 'framer-motion'
import { IconArrow } from './icons.jsx'
import SlideText from './SlideText.jsx'
import { projects } from '../data/content.js'

/**
 * ProjectTicket
 * A large horizontal collectible ticket with perforated stub,
 * real circular punch hole cutout, metadata, and vibrant color identity.
 */
export default function ProjectTicket({
  project,
  total,
  isPunched = false,
  isCurrentlyPunching = false,
  onSelect,
  onManualPunch,
}) {
  const {
    ticketNo,
    code,
    name,
    category,
    role,
    desc,
    tags,
    accentColor,
    accentBg,
    admitType,
    gate,
    barcode,
    link,
  } = project

  return (
    <div
      className={`collectible-ticket ${isPunched ? 'ticket-is-punched' : ''} ${
        isCurrentlyPunching ? 'ticket-is-punching' : ''
      }`}
      style={{
        '--ticket-accent': accentColor,
        '--ticket-bg-accent': accentBg,
      }}
    >
      {/* Perforation Semi-Circle Notches on the Ticket Edge */}
      <div className="ticket-notch notch-top" aria-hidden="true" />
      <div className="ticket-notch notch-bottom" aria-hidden="true" />

      {/* ========================================================
          LEFT STUB: THE PUNCH & TEAR ZONE
          ======================================================== */}
      <div className="ticket-stub">
        <div className="stub-header">
          <span className="stub-code">{code}</span>
          <span className="stub-gate">{gate}</span>
        </div>

        {/* Large Ticket Serial Number */}
        <div className="stub-number" style={{ color: accentColor }}>
          #{ticketNo}
        </div>

        {/* PHYSICAL PUNCH HOLE TARGET */}
        <div
          className="punch-target-area"
          onClick={() => {
            if (!isPunched && onManualPunch) onManualPunch()
          }}
          role="button"
          tabIndex={0}
          title={isPunched ? 'Ticket punched' : 'Click to punch ticket'}
          style={{ cursor: isPunched ? 'default' : 'pointer' }}
        >
          {isCurrentlyPunching && <span className="punch-impact-shockwave" />}

          {isPunched ? (
            <motion.div
              className="punched-hole-cutout"
              initial={{ scale: 1.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 600, damping: 22 }}
            >
              <span className="hole-depth-rim" />
              <span className="hole-void" />
            </motion.div>
          ) : (
            <div className={`punch-crosshair ${isCurrentlyPunching ? 'crosshair-active' : ''}`}>
              <span className="crosshair-ring" />
              <span className="crosshair-label">PUNCH</span>
            </div>
          )}
        </div>

        {/* Validated / Punched Ink Stamp */}
        {isPunched && (
          <motion.div
            className="ticket-stamped-badge"
            initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 0.92, rotate: -12 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            PUNCHED
          </motion.div>
        )}

        {/* Stub Decorative Barcode */}
        <div className="stub-barcode-wrap" aria-hidden="true">
          <div className="stub-barcode-lines">{barcode}</div>
          <span className="stub-barcode-text">PASS-{ticketNo}-2026</span>
        </div>
      </div>

      {/* Perforated Dotted Divider Line */}
      <div className="ticket-perforation-divider" aria-hidden="true">
        <div className="perforation-dots" />
      </div>

      {/* ========================================================
          RIGHT BODY: PROJECT CONTENT & COLLECTIBLE DETAILS
          ======================================================== */}
      <div className="ticket-body">
        {/* Top Header Bar */}
        <div className="ticket-top-bar">
          <div className="ticket-badges-group">
            <span
              className="ticket-category-pill"
              style={{ backgroundColor: accentBg, color: accentColor, borderColor: accentColor }}
            >
              {category}
            </span>
            <span className="ticket-admit-text">{admitType}</span>
          </div>

          <div className="ticket-serial-badge">
            <span className="serial-dot" style={{ backgroundColor: accentColor }} />
            TICKET #{ticketNo} / {String(total || projects.items.length).padStart(2, '0')}
          </div>
        </div>

        {/* Project Name & Role */}
        <div className="ticket-headline">
          <h3 className="ticket-title">{name}</h3>
          <span className="ticket-role">{role}</span>
        </div>

        {/* Short Description */}
        <p className="ticket-desc">{desc}</p>

        {/* Technology Tag Chips */}
        <div className="ticket-tags-row">
          {tags.map((tag) => (
            <span key={tag} className="ticket-tag-chip">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Actions Bar */}
        <div className="ticket-footer-actions">
          <button
            type="button"
            className="ticket-btn-primary"
            style={{ backgroundColor: accentColor }}
            onClick={() => onSelect(project)}
            title={`Inspect ${name} project overview`}
          >
            <SlideText>Inspect Ticket</SlideText>
            <IconArrow />
          </button>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="ticket-btn-secondary"
              title="View on GitHub"
            >
              <SlideText>GitHub Repo</SlideText>
              <span className="btn-ext-icon">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Right Shimmer Security Foil Strip */}
      <div className="ticket-security-foil" aria-hidden="true">
        <span className="foil-text">ARYAN • PORTFOLIO • 2026 • VERIFIED</span>
      </div>
    </div>
  )
}
