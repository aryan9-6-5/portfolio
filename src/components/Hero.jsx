import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { hero } from '../data/content.js'
import { IconPen, IconCup, IconSquiggle } from './icons.jsx'
import AnimatedWords from './AnimatedWords.jsx'
import SlideText from './SlideText.jsx'
import HeroImageGrid from './HeroImageGrid.jsx'
import HeroCloud from './HeroCloud.jsx'
import DynamicHeroRole from './DynamicHeroRole.jsx'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <HeroImageGrid />
      <HeroCloud />

      <span className="hero-doodle hero-doodle-pen"><IconPen /></span>
      <span className="hero-doodle hero-doodle-cup"><IconCup /></span>
      <span className="hero-doodle hero-doodle-squiggle"><IconSquiggle /></span>

      <div className="hero-wrap">

        <h1 className="display-1 hero-headline">
          <span className="hero-headline-top">
            <AnimatedWords text={hero.headlinePre.trim()} delayChildren={0.1} />
            <motion.span
              className="hero-avatar"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.3, delay: 0.25 }}
              whileHover={{ scale: 1.15, rotate: 6 }}
            >
              <img src="/mascot/hero-avatar.png" alt="Aryan avatar" />
            </motion.span>
            <AnimatedWords text={hero.headlineAccent} delayChildren={0.28} />
          </span>
          <span className="hero-headline-bottom">
            <DynamicHeroRole />
          </span>
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
