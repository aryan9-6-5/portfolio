import { motion } from 'framer-motion'

/**
 * PunchCollection
 * Physical tray area where punched circular paper chits collect.
 * Preserves the project's bright energetic colors, stacks with subtle
 * physical rotation/depth, and updates with a clean counter.
 */
export default function PunchCollection({
  projects = [],
  punchedIds = [],
  activeFallingDisc = null,
}) {
  const total = projects.length
  const count = punchedIds.length

  // Pre-calculated fixed offsets & rotations for realistic, non-chaotic physical stacking
  const STACK_OFFSETS = [
    { x: -8, y: 3, rotate: -16, zIndex: 1 },
    { x: 10, y: -2, rotate: 22, zIndex: 2 },
    { x: -2, y: -8, rotate: -6, zIndex: 3 },
    { x: 8, y: -14, rotate: 28, zIndex: 4 },
  ]

  return (
    <div className="punch-collection-dock" aria-label={`Projects Collected: ${count} of ${total}`}>
      {/* Flying / Falling Paper Disc (visible during punch drop) */}
      {activeFallingDisc && (
        <motion.div
          key={activeFallingDisc.id}
          className="falling-punch-disc"
          style={{ background: activeFallingDisc.color }}
          initial={{
            opacity: 1,
            scale: 1,
            top: activeFallingDisc.startY || '42%',
            left: activeFallingDisc.startX || '18%',
          }}
          animate={{
            opacity: [1, 1, 0.9],
            scale: [1, 0.9, 0.85],
            top: '84%',
            left: 'calc(100% - 140px)',
            rotate: 180,
          }}
          transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
        />
      )}

      {/* Physical Acrylic / Metallic Tray */}
      <div className="punch-tray-box">
        <div className="punch-tray-well">
          {/* Stacked Confetti / Punched Discs */}
          <div className="punch-tray-stack">
            {projects.map((proj, idx) => {
              const isPunched = punchedIds.includes(proj.id)
              const offset = STACK_OFFSETS[idx % STACK_OFFSETS.length]

              if (!isPunched) return null

              return (
                <motion.div
                  key={proj.id}
                  className="collected-punch-disc"
                  style={{
                    backgroundColor: proj.accentColor,
                    zIndex: offset.zIndex,
                  }}
                  initial={{ scale: 0, opacity: 0, y: -20 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: offset.x,
                    y: offset.y,
                    rotate: offset.rotate,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  title={`${proj.name} punched chit`}
                >
                  <span className="punch-disc-label">{proj.isInternship ? 'INT' : proj.ticketNo}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Minimalist physical metadata label */}
        <div className="punch-tray-meta">
          <div className="punch-tray-label">PROJECTS COLLECTED</div>
          <div className="punch-tray-counter">
            <span className="counter-num">0{count}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">0{total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
