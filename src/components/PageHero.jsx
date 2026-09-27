import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import HeroImageGrid from './HeroImageGrid.jsx'
import HeroCloud from './HeroCloud.jsx'
import { IconPen, IconCup, IconSquiggle } from './icons.jsx'

export default function PageHero({ theme, color = 'blue', eyebrow, heading, sub, badgeText, children }) {
  const activeTheme = theme || (color === 'purple' ? 'purple' : color === 'emerald' ? 'emerald' : 'blue')

  return (
    <section className={`hero page-hero theme-${activeTheme}`}>
      <HeroImageGrid theme={activeTheme} />
      <HeroCloud theme={activeTheme} />

      <span className="hero-doodle hero-doodle-pen"><IconPen /></span>
      <span className="hero-doodle hero-doodle-cup"><IconCup /></span>
      <span className="hero-doodle hero-doodle-squiggle"><IconSquiggle /></span>

      <div className="hero-wrap page-hero-inner-wrap">
        <Reveal y={12}>
          <h1 className="display-1 page-hero-headline">
            {heading}
          </h1>

          {sub && (
            <p className="body-24 page-hero-sub">
              {sub}
            </p>
          )}

          {children && (
            <div className="page-hero-children-wrap">
              {children}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
