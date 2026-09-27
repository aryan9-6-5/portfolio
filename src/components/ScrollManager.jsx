import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top instantly on a route change between different pages,
// or to the hash target on this page when a hash anchor is requested.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    // Prevent the browser's own scroll restoration from overriding scrollTo(0)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    const isNewPage = prevPathnameRef.current !== pathname
    prevPathnameRef.current = pathname

    if (hash) {
      const id = hash.slice(1)
      let attempts = 0
      let timeoutId = null

      const tryScroll = () => {
        const el = document.getElementById(id)
        attempts += 1
        if (el) {
          el.scrollIntoView({ behavior: isNewPage ? 'instant' : 'smooth', block: 'center' })
          return
        }
        if (attempts < 10) {
          timeoutId = setTimeout(tryScroll, 80)
        }
      }

      timeoutId = setTimeout(tryScroll, 30)
      return () => clearTimeout(timeoutId)
    }

    // Only jump to top (0, 0) if user navigated to a completely different page
    if (isNewPage) {
      const html = document.documentElement
      const prevScrollBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      if (document.body) document.body.scrollTop = 0
      html.scrollTop = 0

      const timer = setTimeout(() => {
        html.style.scrollBehavior = prevScrollBehavior
      }, 60)

      return () => clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
