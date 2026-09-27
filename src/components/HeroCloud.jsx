export default function HeroCloud({ theme = 'blue' }) {
  const shadowColor = theme === 'emerald' ? '#059669' : theme === 'purple' ? '#7C3AED' : '#0a52f0'
  const filterId = `cloud-ambient-${theme}`

  return (
    <div className="hero-cloud-wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 1200 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-cloud-svg"
      >
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="24" stdDeviation="30" floodColor={shadowColor} floodOpacity="0.16" />
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#1d1d1d" floodOpacity="0.04" />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`} fill="#FFFFFF">
          {/* Main solid core */}
          <rect x="220" y="190" width="760" height="320" rx="160" />
          <ellipse cx="600" cy="350" rx="400" ry="190" />

          {/* Top arch puffy domes */}
          <circle cx="600" cy="170" r="145" />
          <circle cx="430" cy="190" r="130" />
          <circle cx="770" cy="190" r="130" />
          <circle cx="290" cy="245" r="115" />
          <circle cx="910" cy="245" r="115" />

          {/* Left side puffy lobes */}
          <circle cx="180" cy="330" r="115" />
          <circle cx="140" cy="410" r="100" />
          <circle cx="180" cy="480" r="105" />

          {/* Right side puffy lobes */}
          <circle cx="1020" cy="330" r="115" />
          <circle cx="1060" cy="410" r="100" />
          <circle cx="1020" cy="480" r="105" />

          {/* Bottom gentle billows */}
          <circle cx="280" cy="530" r="105" />
          <circle cx="430" cy="550" r="110" />
          <circle cx="600" cy="560" r="115" />
          <circle cx="770" cy="550" r="110" />
          <circle cx="920" cy="530" r="105" />
        </g>
      </svg>
    </div>
  )
}
