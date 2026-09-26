import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { hero } from '../data/content.js'
import { IconSpark, IconPen, IconCup, IconSquiggle } from './icons.jsx'
import AnimatedWords from './AnimatedWords.jsx'
import SlideText from './SlideText.jsx'

function Sparkle({ style }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={style}>
      <path d="M7 0l1.5 5.5L14 7l-5.5 1.5L7 14 5.5 8.5 0 7l5.5-1.5z" />
    </svg>
  )
}

function PeaceHand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11V5a2 2 0 0 1 4 0v6" />
      <path d="M13 10V4a2 2 0 0 1 4 0v8" />
      <path d="M9 10a2 2 0 0 0-4 0v5a7 7 0 0 0 14 0v-5" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <span className="hero-doodle hero-doodle-pen"><IconPen /></span>
      <span className="hero-doodle hero-doodle-cup"><IconCup /></span>
      <span className="hero-doodle hero-doodle-squiggle"><IconSquiggle /></span>

      {/* Left floating badge — tilted CCW with sparkle doodles */}
      <motion.div
        className={`hero-float hero-float-left pill-badge ${hero.floatingLeft.color}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.2, delay: 0.05 }}
      >
        <Sparkle style={{ color: '#F59E0B', position: 'absolute', top: -6, left: -4 }} />
        <Sparkle style={{ color: '#F59E0B', position: 'absolute', top: -2, left: 6, width: 9, height: 9 }} />
        <IconSpark width={16} height={16} /> {hero.floatingLeft.text}
        <span className="hero-badge-lines hero-badge-lines-right" />
      </motion.div>

      {/* Right floating badge — tilted CW with peace hand */}
      <motion.div
        className={`hero-float right hero-float-right pill-badge ${hero.floatingRight.color}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.2, delay: 0.15 }}
      >
        <span className="hero-badge-peace"><PeaceHand /></span>
        <IconPen width={16} height={16} /> {hero.floatingRight.text}
        <span className="hero-badge-lines hero-badge-lines-top" />
      </motion.div>

      <div className="hero-wrap">

        <h1 className="display-1 hero-headline">
          <AnimatedWords text={hero.headlinePre.trim()} delayChildren={0.1} />
          <motion.span
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, delay: 0.25 }}
          >
            <img src={`/mascot/${hero.pose}.png`} alt="Aryan mascot" />
          </motion.span>
          <AnimatedWords text={`${hero.headlineAccent} ${hero.headlinePost}`} delayChildren={0.32} />
        </h1>

        <motion.p
          className="body-24 hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.2, delay: 0.7 }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.2, delay: 0.85 }}
        >
          <Link className="btn btn-accent" to={hero.primaryCta.to}><SlideText>{hero.primaryCta.label}</SlideText></Link>
          <Link className="btn" to={hero.secondaryCta.to}><SlideText>{hero.secondaryCta.label}</SlideText></Link>
        </motion.div>
      </div>
    </section>
  )
}
