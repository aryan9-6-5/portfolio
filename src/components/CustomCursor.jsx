import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const isFirstMove = useRef(true)

  // Direct motion coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Fast inner dot with high stiffness for instant tracking
  const dotX = useSpring(mouseX, { stiffness: 2400, damping: 60, mass: 0.04 })
  const dotY = useSpring(mouseY, { stiffness: 2400, damping: 60, mass: 0.04 })

  // Fluid follower halo ring
  const ringX = useSpring(mouseX, { stiffness: 500, damping: 34, mass: 0.28 })
  const ringY = useSpring(mouseY, { stiffness: 500, damping: 34, mass: 0.28 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse) and (hover: none)').matches) return

    const handleMouseMove = (e) => {
      if (isFirstMove.current) {
        // Jump directly to cursor location on first move to prevent flying in from off-screen
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        if (typeof dotX.jump === 'function') dotX.jump(e.clientX)
        if (typeof dotY.jump === 'function') dotY.jump(e.clientY)
        if (typeof ringX.jump === 'function') ringX.jump(e.clientX)
        if (typeof ringY.jump === 'function') ringY.jump(e.clientY)
        isFirstMove.current = false
      } else {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }

      setIsVisible(true)

      try {
        const target = e.target instanceof Element ? e.target : e.target?.parentElement
        if (target && typeof target.closest === 'function') {
          const interactive = target.closest(
            'a, button, input, textarea, select, [role="button"], .btn, .arrow-btn, .clickable, .collectible-ticket, .cert-card, .stage-card-motion, .ticket-punch-stamp, .scroll-fan-card, .showcase-item, .project-modal-close, .strengths-title-btn, .nav-link-item, .nav-social-btn, .nav-cta-btn, .nav-brand-anchor'
          )
          setIsPointer(!!interactive)
        }
      } catch (_) {}
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

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
  }, [mouseX, mouseY, dotX, dotY, ringX, ringY])

  if (!isVisible) return null

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <motion.div
        className={`custom-cursor-ring ${isPointer ? 'is-pointer' : ''} ${isClicking ? 'is-clicking' : ''}`}
        style={{ x: ringX, y: ringY }}
      />
      <motion.div
        className={`custom-cursor-dot ${isPointer ? 'is-pointer' : ''} ${isClicking ? 'is-clicking' : ''}`}
        style={{ x: dotX, y: dotY }}
      />
    </div>
  )
}
