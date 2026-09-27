import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top on a plain route change, or to the hash target on this page
// (waiting a tick for the new page's DOM to mount first).
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Without this, the browser's own scroll restoration on reload/back-nav
    // can silently override the scrollTo(0) below after it runs.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      let attempts = 0
      let timeoutId = null

      // Heavy pinned/scroll-jacked sections above the target can still be
      // laying out (images, fonts) right after a route change, so a single
      // rAF scrollIntoView can land short. Retry briefly until the element
      // is actually present and stops moving before giving up.
      const tryScroll = () => {
        const el = document.getElementById(id)
        attempts += 1
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          if (attempts < 6) {
            timeoutId = setTimeout(tryScroll, 150)
          }
          return
        }
        if (attempts < 10) {
          timeoutId = setTimeout(tryScroll, 100)
        }
      }

      timeoutId = setTimeout(tryScroll, 0)
      return () => clearTimeout(timeoutId)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
