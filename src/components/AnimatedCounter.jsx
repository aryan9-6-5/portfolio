import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export default function AnimatedCounter({ value, className }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const num = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, num, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, num])

  return <span ref={ref} className={className}>{display}{suffix}</span>
}
