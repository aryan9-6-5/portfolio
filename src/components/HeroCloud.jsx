export default function HeroCloud({ theme = 'blue' }) {
  const shadowColor = theme === 'emerald' ? '#059669' : theme === 'purple' ? '#7C3AED' : '#0a52f0'
  const filterId = `cloud-ambient-${theme}`

  return (
    <div className="hero-cloud-wrapper" aria-hidden="true">
      {/* Desktop Wide Cloud Shape */}
      <svg
        viewBox="0 0 1200 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-cloud-svg hero-cloud-desktop"
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

      {/* Mobile Vertical Puffy Cloud Shape - Envelops headline, avatar, subtitle, and buttons */}
      <svg
        viewBox="0 -30 540 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-cloud-svg hero-cloud-mobile"
      >
        <defs>
          <filter id={`${filterId}-mob`} x="-15%" y="-15%" width="130%" height="135%">
            <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor={shadowColor} floodOpacity="0.18" />
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1d1d1d" floodOpacity="0.04" />
          </filter>
        </defs>
        <g filter={`url(#${filterId}-mob)`} fill="#FFFFFF">
          {/* Central tall core */}
          <rect x="50" y="80" width="440" height="520" rx="60" />
          <ellipse cx="270" cy="340" rx="230" ry="270" />

          {/* Top puffy lobes */}
          <circle cx="270" cy="80" r="110" />
          <circle cx="150" cy="115" r="95" />
          <circle cx="390" cy="115" r="95" />
          <circle cx="65" cy="190" r="80" />
          <circle cx="475" cy="190" r="80" />

          {/* Left puffy lobes */}
          <circle cx="45" cy="290" r="85" />
          <circle cx="40" cy="390" r="85" />
          <circle cx="60" cy="490" r="85" />

          {/* Right puffy lobes */}
          <circle cx="495" cy="290" r="85" />
          <circle cx="500" cy="390" r="85" />
          <circle cx="480" cy="490" r="85" />

          {/* Bottom puffy lobes */}
          <circle cx="140" cy="580" r="90" />
          <circle cx="270" cy="600" r="105" />
          <circle cx="400" cy="580" r="90" />
        </g>
      </svg>
    </div>
  )
}
