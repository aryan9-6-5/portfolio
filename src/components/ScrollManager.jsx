import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top on a plain route change, or to the hash target on this page
// (waiting a tick for the new page's DOM to mount first).
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
