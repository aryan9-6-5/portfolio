import { motion } from 'framer-motion'

/**
 * Handheld Mechanical Ticket Punch Tool
 * Realistically styled with brushed chrome steel, pivot bolt,
 * grip knurls, dual-jaw plier body, and punch rod mechanism.
 * Originates strictly from outside the left edge of the viewport.
 */
export default function TicketPuncher({ x = -380, isPunching = false, active = false, isMobile = false }) {
  const transform = isMobile
    ? `translate3d(${x}px, -45%, 0) scale(0.68)`
    : `translate3d(${x}px, -50%, 0) scale(1)`

  return (
    <motion.div
      className="ticket-puncher-rig"
      style={{
        transform,
      }}
      aria-hidden="true"
    >
      <div className={`puncher-tool ${isPunching ? 'is-punching' : ''}`}>
        <svg
          width="360"
          height="190"
          viewBox="0 0 360 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="puncher-svg"
        >
          <defs>
            {/* Brushed Chrome / Steel Gradients */}
            <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="25%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="75%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <linearGradient id="metalJaw" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#CBD5E1" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="metalHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="rubberGrip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <filter id="punchShadow" x="-15%" y="-15%" width="140%" height="140%">
              <feDropShadow dx="-6" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.35" />
            </filter>
          </defs>

          <g filter="url(#punchShadow)">
            {/* LOWER FIXED HANDLE & ANVIL JAW */}
            <g className="puncher-lower-arm">
              {/* Lower handle arm extending back toward left */}
              <path
                d="M 15 130 C 50 134, 110 135, 160 118 L 195 108 L 260 108 C 285 108, 305 114, 320 118 L 320 128 C 300 132, 280 132, 250 130 L 160 148 C 100 160, 40 155, 10 142 Z"
                fill="url(#metalBody)"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Lower handle grip sleeve */}
              <path
                d="M 12 131 C 45 135, 95 136, 140 124 L 140 148 C 95 158, 45 153, 10 141 Z"
                fill="url(#rubberGrip)"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              {/* Grip ridges */}
              <line x1="35" y1="134" x2="35" y2="148" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="60" y1="135" x2="60" y2="150" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="85" y1="134" x2="85" y2="148" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="130" x2="110" y2="143" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

              {/* Lower anvil die mouth */}
              <rect x="280" y="104" width="46" height="12" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              {/* Die hole where punch pin passes */}
              <circle cx="304" cy="110" r="7" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            </g>

            {/* UPPER COMPRESSION LEVER (rotates down on punch with heavy clamp) */}
            <g
              className="puncher-upper-lever"
              style={{
                transformOrigin: '195px 105px',
                transition: 'transform 0.08s cubic-bezier(0.2, 1.4, 0.4, 1)',
                transform: isPunching ? 'rotate(14deg)' : 'rotate(0deg)',
              }}
            >
              {/* Upper handle arm */}
              <path
                d="M 15 62 C 50 56, 110 58, 160 82 L 195 98 L 260 98 C 285 98, 305 92, 320 86 L 320 74 C 300 70, 280 70, 250 72 L 160 52 C 100 38, 40 44, 10 56 Z"
                fill="url(#metalBody)"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Upper handle grip sleeve */}
              <path
                d="M 12 61 C 45 57, 95 58, 140 76 L 140 52 C 95 42, 45 46, 10 57 Z"
                fill="url(#rubberGrip)"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              {/* Grip ridges */}
              <line x1="35" y1="46" x2="35" y2="60" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="60" y1="44" x2="60" y2="59" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="85" y1="46" x2="85" y2="62" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="52" x2="110" y2="68" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

              {/* Upper punch cylinder pin house */}
              <rect x="294" y="86" width="20" height="22" rx="3" fill="url(#metalJaw)" stroke="#1E293B" strokeWidth="1.5" />
              {/* Solid steel cutting pin (plunges deep through card into die mouth) */}
              <rect
                x="298"
                y={isPunching ? 108 : 92}
                width="12"
                height="18"
                rx="2"
                fill="#F8FAFC"
                stroke="#0F172A"
                strokeWidth="1.5"
                style={{ transition: 'y 0.08s cubic-bezier(0.2, 1.4, 0.4, 1)' }}
              />
            </g>

            {/* HEAVY STEEL PIVOT HINGE BOLT */}
            <circle cx="195" cy="105" r="16" fill="url(#metalJaw)" stroke="#1E293B" strokeWidth="2" />
            <circle cx="195" cy="105" r="9" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
            <polygon
              points="195,99 200,102 200,108 195,111 190,108 190,102"
              fill="#64748B"
              stroke="#1E293B"
              strokeWidth="1"
            />
          </g>
        </svg>

        {/* Tactile Stamp Flash Spark */}
        {isPunching && <span className="punch-spark-pulse" />}
      </div>
    </motion.div>
  )
}
