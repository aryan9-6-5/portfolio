import { useEffect, useRef } from 'react'

/**
 * TechStackCarousel
 * High-speed single-row infinite scrolling carousel of technology logos.
 * Pure CSS animation, no JS tick loop. Duplicated track for seamless wrap.
 */

const TECH_LOGOS = [
  {
    name: 'Python',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#0277BD" d="M24.047 5c-1.555.005-2.633.142-3.936.367-3.848.67-4.549 2.077-4.549 4.67V14h9v2H15.22l.002.001H11.56c-2.607 0-4.89 1.567-5.604 4.547-.826 3.418-.863 5.55 0 9.12.639 2.656 2.162 4.547 4.77 4.547H13v-4.1c0-2.96 2.56-5.57 5.56-5.57h9c2.49 0 4.44-2.06 4.44-4.56v-8.5c0-2.42-2.05-4.24-4.44-4.67a23 23 0 00-3.51-.33zm-4.88 2.72a1.7 1.7 0 011.7 1.74 1.72 1.72 0 01-1.7 1.72 1.72 1.72 0 01-1.72-1.72c0-.96.77-1.74 1.72-1.74z"/><path fill="#FFC107" d="M35.05 16v3.96c0 3.09-2.63 5.67-5.56 5.67h-9c-2.45 0-4.44 2.09-4.44 4.56v8.5c0 2.42 1.82 3.84 4.44 4.56 3.13.86 6.14 1.02 9 0 1.9-.68 4.44-2.04 4.44-4.56V34h-9v-2h13.5c2.6 0 3.57-1.82 4.44-4.55.9-2.8.86-5.5 0-9.12C41.78 15.8 39.64 16 37.04 16zM28.88 37.3c.95 0 1.72.77 1.72 1.72a1.72 1.72 0 01-1.72 1.74 1.72 1.72 0 01-1.7-1.74c0-.95.76-1.72 1.7-1.72z"/></svg>`,
  },
  {
    name: 'PyTorch',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#EE4C2C" d="M33.4 14.6l-3.3 3.3c4.4 4.4 4.4 11.4 0 15.8-4.4 4.4-11.4 4.4-15.8 0s-4.4-11.4 0-15.8l7-7 1.6-1.6V3L15.3 10.6C8.2 17.7 8.2 29.3 15.3 36.4s18.7 7.1 25.8 0 7.1-18.7 0-25.8zm-6.1 4.2a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6z"/></svg>`,
  },
  {
    name: 'TensorFlow',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#FF6F00" d="M24 4L6 14v20l18 10 18-10V14L24 4zm0 3.46L38.08 15v6.92L24 29.38l-8.08-4.46V18l8.08 4.46V15L24 7.46z"/><path fill="#FF6F00" d="M24 15v7.46L15.92 18v6.92L24 29.38v7.16L9.92 28.08v-6.92L24 28.62v-6.16L15.92 18 24 22.46V15z"/></svg>`,
  },
  {
    name: 'React',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><circle cx="24" cy="24" r="4.2" fill="#61DAFB"/><path fill="none" stroke="#61DAFB" stroke-width="2" d="M24 14.5c6.5 0 12.3 1.7 15.4 4.3 1.6 1.3 2.6 3 2.6 5.2s-1 3.9-2.6 5.2c-3.1 2.6-8.9 4.3-15.4 4.3s-12.3-1.7-15.4-4.3C7 27.9 6 26.2 6 24s1-3.9 2.6-5.2C11.7 16.2 17.5 14.5 24 14.5z"/><path fill="none" stroke="#61DAFB" stroke-width="2" d="M17.1 18.7c3.3-5.6 7.6-9.5 11.3-10.7 1.9-.6 3.7-.4 5.2.8s2.3 3.2 2.3 5.5c-.1 4.1-2.6 9.2-5.8 14.7s-7.6 9.5-11.3 10.7c-1.9.6-3.7.4-5.2-.8s-2.3-3.2-2.3-5.5c.1-4.1 2.6-9.2 5.8-14.7z"/><path fill="none" stroke="#61DAFB" stroke-width="2" d="M17.1 29.3c-3.3-5.6-4.9-11-4.8-15.2.1-2.1.7-3.9 2.3-5.1 1.5-1.2 3.3-1.4 5.2-.8 3.7 1.2 8 5.1 11.3 10.7s4.9 11 4.8 15.2c-.1 2.1-.7 3.9-2.3 5.1-1.5 1.2-3.3 1.4-5.2.8-3.7-1.2-8-5.1-11.3-10.7z"/></svg>`,
  },
  {
    name: 'Docker',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#2196F3" d="M47.1 22.5c-.6-.5-2.5-1.2-4.7-1 0 0-.3-2.4-2.7-3.7l-.5-.3-.3.5c-.8 1.2-1.1 3.2-.4 4.5-.7-.3-2.1-.8-3.8-.7H1.5c-.5 2.8-.2 6.5 1.5 9.8C4.8 35.2 8.4 37 13.3 37c9 0 15.7-4.2 18.8-11.8 1.2 0 3.9.1 5.2-2.5l.4-.8-1.1-.6zM25.4 10h-3.9v3.5h3.9V10zm0 4.7h-3.9v3.5h3.9v-3.5zm-4.8 4.8h-3.9v3.5h3.9v-3.5zm4.8 0h-3.9v3.5h3.9v-3.5zm4.7 0h-3.9v3.5h3.9v-3.5zm-14.3 0H12v3.5h3.9v-3.5zm4.8 0h-3.9v3.5h3.9v-3.5zm-9.5 0H7.2v3.5h3.9v-3.5zm19.1 0h-3.9v3.5h3.9v-3.5z"/></svg>`,
  },
  {
    name: 'PostgreSQL',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#336791" d="M34.8 29.5c-1.6-.9-1.8-1-2.3-1.5.4-.7.9-1.8 1.2-3.1.9-3.4.3-6.3-.8-7.9 0 0-.1-.1-.1-.1.4-1.8.3-3.6-.1-4.6 0 0-1-2.8-7-2.4-1.5-1-3.2-1.6-5-1.9-.8-.1-1.8 0-2.7.1-.6-.3-1.7-.5-3.1-.4-2.1.2-3.6 1.2-4.6 2.2-.5 0-1 .1-1.5.3-2.4.8-4 2.7-4.7 5.6-.7 2.8-.2 6.5 1.7 10.5.9 1.9 1.9 3.3 3.1 4.2.7.5 1.6.9 2.4.9.3 0 .5 0 .8-.1.4-.1.7-.3 1-.5.3.4.7.7 1.2.9.8.3 1.7.2 2.5-.2.2.5.4.9.7 1.2.5.5 1.2.8 2 .8.3 0 .6 0 .9-.1 1.4-.4 2.5-1.4 3.1-2.9.2-.5.3-1 .4-1.5l.5-.1c.2 0 .5-.1.7-.1 1.2-.2 2.3-.6 3.3-1.1.6.4 1.3.7 2 .9.8.2 1.6.2 2.2-.1 1.5-.6 2.2-2 1.8-3.4-.2-.7-.7-1.2-1.5-1.6z"/><path fill="#fff" d="M14.6 13c-1.6 0-2.9 1.5-2.9 3.3s1.3 3.3 2.9 3.3 2.9-1.5 2.9-3.3-1.3-3.3-2.9-3.3zm10.9 0c-1.6 0-2.9 1.5-2.9 3.3s1.3 3.3 2.9 3.3 2.9-1.5 2.9-3.3-1.3-3.3-2.9-3.3z"/></svg>`,
  },
  {
    name: 'FastAPI',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="8" fill="#009688"/><path fill="#fff" d="M24 8L12 28h10l-2 12 14-20H24l2-12z"/></svg>`,
  },
  {
    name: 'Spring Boot',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#6DB33F" d="M42.2 7.2L39.1 4.1c-.4-.4-1-.4-1.4 0L24 17.8 10.3 4.1c-.4-.4-1-.4-1.4 0L5.8 7.2c-.4.4-.4 1 0 1.4L19.5 22.3 5.8 36c-.4.4-.4 1 0 1.4l3.1 3.1c.4.4 1 .4 1.4 0L24 26.8l13.7 13.7c.4.4 1 .4 1.4 0l3.1-3.1c.4-.4.4-1 0-1.4L28.5 22.3 42.2 8.6c.4-.4.4-1 0-1.4zM24 26a4 4 0 110-8 4 4 0 010 8z"/></svg>`,
  },
  {
    name: 'Node.js',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#388E3C" d="M24 4.2L6 14.6v20.8l18 10.4 18-10.4V14.6L24 4.2zm0 4l14.2 8.2v16.4L24 41 9.8 32.8V16.4L24 8.2z"/><path fill="#388E3C" d="M24 8.2v32.6l14.2-8.2V16.4L24 8.2z" opacity=".6"/></svg>`,
  },
  {
    name: 'TypeScript',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="4" fill="#3178C6"/><path fill="#fff" d="M11 25.5h5v14h4v-14h5v-3.5H11v3.5zm17.5-3.5v17.5h4V32h5c2.2 0 4-1.8 4-4v-2c0-2.2-1.8-4-4-4h-9zm4 3.5h4.5c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5H32.5V25.5z"/></svg>`,
  },
  {
    name: 'Flutter',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#40C4FF" d="M26 4L6 24l6.4 6.4L32.4 10.4z"/><path fill="#40C4FF" d="M26 22.4L16.4 32l6.4 6.4 3.2-3.2L36.4 24.8z"/><path fill="#29B6F6" d="M16.4 32l6.4 6.4 3.2-3.2-6.4-6.4z"/><path fill="#01579B" d="M16.4 32l5-1.6 1.4-5z"/></svg>`,
  },
  {
    name: 'OpenCV',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><circle cx="14" cy="30" r="8" fill="#FF0000" opacity=".9"/><circle cx="34" cy="30" r="8" fill="#00FF00" opacity=".8"/><circle cx="24" cy="16" r="8" fill="#0000FF" opacity=".9"/></svg>`,
  },
  {
    name: 'Airflow',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><path fill="#017CEE" d="M24 4L4 24l20 20 20-20L24 4zm0 8l12 12-12 12-12-12 12-12z"/><path fill="#017CEE" d="M24 16l8 8-8 8-8-8 8-8z" opacity=".5"/></svg>`,
  },
  {
    name: 'Three.js',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="4" fill="#000"/><path fill="#fff" d="M12 36L24 8l12 28H12zm6-4h12l-6-14-6 14z"/></svg>`,
  },
  {
    name: 'Scikit-learn',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><circle cx="16" cy="24" r="6" fill="#F7931E"/><circle cx="32" cy="16" r="5" fill="#3499CD"/><circle cx="32" cy="32" r="5" fill="#3499CD"/><line x1="22" y1="24" x2="27" y2="18" stroke="#999" stroke-width="2"/><line x1="22" y1="24" x2="27" y2="30" stroke="#999" stroke-width="2"/></svg>`,
  },
  {
    name: 'DuckDB',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="8" fill="#FFF100"/><path fill="#000" d="M34 22c0-5.5-4.5-10-10-10s-10 4.5-10 10v4c0 5.5 4.5 10 10 10s10-4.5 10-10v-4zm-14 0a4 4 0 118 0v4a4 4 0 11-8 0v-4z"/></svg>`,
  },
  {
    name: 'n8n',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="8" fill="#EA4B71"/><circle cx="15" cy="24" r="4.5" fill="#fff"/><circle cx="33" cy="16" r="4" fill="#fff"/><circle cx="33" cy="32" r="4" fill="#fff"/><path d="M15 24h18M33 16v16" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  },
  {
    name: 'Qdrant',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="8" fill="#DC2626"/><path fill="#fff" d="M24 10l12 7v14l-12 7-12-7V17l12-7zm0 4l-8.5 5v10L24 34l8.5-5V19L24 14z"/><circle cx="24" cy="24" r="4" fill="#fff"/></svg>`,
  },
  {
    name: 'AWS',
    svg: `<svg viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="8" fill="#232F3E"/><path fill="#FF9900" d="M14 26.5c3.5 2.2 8 3.5 13 3.5 5.5 0 10.5-1.5 14.5-4 .4-.3.9.1.6.5-4.2 3.8-9.8 5.5-15.1 5.5-5.5 0-10.8-1.8-14.8-4.8-.4-.3-.1-.9.4-.7zm27.8-1.7c-.5-.7-3.1-.3-4.3-.2-.4 0-.4-.4-.1-.6 1.8-1.3 4.8-1 5.3-.3.4.6-.2 3.6-1.9 5.1-.3.3-.6.1-.5-.2.5-1 1.6-3.1 1.5-3.8z"/><path fill="#fff" d="M19 14h2.5l3.5 9h-2.2l-.7-2h-3.7l-.7 2H15.5l3.5-9zm1.7 5.3l-1.1-3.2-1.1 3.2h2.2zM28 14h2.2l1.6 6.3 1.8-6.3h2l1.8 6.3 1.6-6.3H41l-2.4 9h-2.1l-1.8-6.1-1.8 6.1H30.4L28 14z"/></svg>`,
  },
]

export default function TechStackCarousel() {
  const trackRef = useRef(null)

  useEffect(() => {
    // Pause animation on hover
    const track = trackRef.current
    if (!track) return
    const pause = () => { track.style.animationPlayState = 'paused' }
    const play = () => { track.style.animationPlayState = 'running' }
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', play)
    return () => {
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', play)
    }
  }, [])

  // Duplicate items for seamless infinite scroll
  const items = [...TECH_LOGOS, ...TECH_LOGOS]

  return (
    <div className="tech-carousel-wrap">
      <div className="tech-carousel-track" ref={trackRef}>
        {items.map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="tech-carousel-item" title={tech.name}>
            <div className="tech-carousel-icon" dangerouslySetInnerHTML={{ __html: tech.svg }} />
            <span className="tech-carousel-label">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
