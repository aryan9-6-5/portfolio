import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics: tight spring for inner dot (near instantaneous, zero lag)
  const dotX = useSpring(mouseX, { stiffness: 1400, damping: 55, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 1400, damping: 55, mass: 0.1 })

  // Fluid spring for outer magnetic halo
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.5 })

  useEffect(() => {
    // Only disable if device is strictly touch-only without any fine pointer
    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches
    if (isTouchOnly) return

    function handleMouseMove(e) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Context detection: detect if hovering clickable / interactive target
      const target = e.target
      if (!target) return

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .btn, .arrow-btn, .clickable, .collectible-ticket, .cert-flip-container, .stats-score-card, .stage-card-motion, .ticket-punch-stamp, .scroll-fan-card, .showcase-item, .project-modal-close, .strengths-title-btn'
      )

      if (interactive) {
        setIsPointer(true)
        const customText = interactive.getAttribute('data-cursor')
        setCursorText(customText || '')
      } else {
        setIsPointer(false)
        setCursorText('')
      }
    }

    function handleMouseDown() {
      setIsClicking(true)
    }

    function handleMouseUp() {
      setIsClicking(false)
    }

    function handleMouseLeave() {
      setIsVisible(false)
    }

    function handleMouseEnter() {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Outer fluid follower ring */}
      <motion.div
        className={`custom-cursor-ring ${isPointer ? 'is-pointer' : ''} ${isClicking ? 'is-clicking' : ''} ${cursorText ? 'has-text' : ''}`}
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        {cursorText && <span className="cursor-label-text">{cursorText}</span>}
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className={`custom-cursor-dot ${isPointer ? 'is-pointer' : ''} ${isClicking ? 'is-clicking' : ''}`}
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </div>
  )
}
