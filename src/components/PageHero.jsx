import Reveal from './Reveal.jsx'
import HeroImageGrid from './HeroImageGrid.jsx'
import HeroCloud from './HeroCloud.jsx'

export default function PageHero({ theme, color = 'blue', eyebrow, heading, sub }) {
  const activeTheme = theme || (color === 'purple' ? 'purple' : color === 'emerald' ? 'emerald' : 'blue')

  return (
    <section className={`hero page-hero theme-${activeTheme}`}>
      <HeroImageGrid theme={activeTheme} />
      <HeroCloud theme={activeTheme} />

      <div className="hero-wrap page-hero-inner-wrap">
        <Reveal y={10}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="display-1 page-hero-headline">{heading}</h1>
          {sub && <p className="body-24 page-hero-sub">{sub}</p>}
        </Reveal>
      </div>
    </section>
  )
}
