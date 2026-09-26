import { useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

// Adapted from Osmo's "Draw Random Underline" recipe: a hand-drawn squiggle
// draws itself in on hover and draws back out on leave, instead of a flat
// line snapping on/off. Same DrawSVG mechanic, our own ink color and paths.
const PATHS = [
  'M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999',
  'M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998',
  'M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892',
]

let nextIndex = 0

export default function DrawUnderline({ children, className = '' }) {
  const boxRef = useRef(null)
  const tweenRef = useRef(null)

  const handleEnter = useCallback(() => {
    const box = boxRef.current
    if (!box || tweenRef.current?.isActive()) return
    const d = PATHS[nextIndex % PATHS.length]
    nextIndex += 1
    box.innerHTML = `<svg viewBox="0 0 310 40" preserveAspectRatio="none" class="draw-underline-svg"><path d="${d}" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/></svg>`
    const path = box.querySelector('path')
    gsap.set(path, { drawSVG: '0%' })
    tweenRef.current = gsap.to(path, { drawSVG: '100%', duration: 0.5, ease: 'power2.inOut' })
  }, [])

  const handleLeave = useCallback(() => {
    const box = boxRef.current
    const path = box?.querySelector('path')
    if (!path) return
    const playOut = () => {
      gsap.to(path, {
        drawSVG: '100% 100%',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => { box.innerHTML = '' },
      })
    }
    if (tweenRef.current?.isActive()) tweenRef.current.eventCallback('onComplete', playOut)
    else playOut()
  }, [])

  return (
    <span className={`draw-underline ${className}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <span className="draw-underline-text">{children}</span>
      <span ref={boxRef} className="draw-underline-box" />
    </span>
  )
}
