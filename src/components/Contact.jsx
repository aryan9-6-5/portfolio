import { contact } from '../data/content.js'
import { ICONS } from './icons.jsx'
import Reveal from './Reveal.jsx'
import SlideText from './SlideText.jsx'

const TAG_COLORS = ['blue', 'pink', 'green']
const TAG_ROTATE = [-4, 3, -5]

function HandArrow() {
  return (
    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M36 4c-2 10-12 16-24 14" />
      <path d="M18 14 12 18l1 7" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="airmail-edge airmail-edge-sm" aria-hidden="true" />

        <Reveal delay={0}>
          <div className="contact-portrait">
            <img src={`/mascot/${contact.pose}.png`} alt="Aryan mascot" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="heading-1 contact-headline">{contact.headline}</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="body-24 contact-sub" style={{ margin: '0 auto', maxWidth: 520 }}>{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="contact-cta-wrap contact-cta">
            <a className="btn contact-cta-btn" href={contact.cta.href}>
              <SlideText>{contact.cta.label}</SlideText>
            </a>
            <span className="contact-cta-hand">
              <HandArrow />
              <span>{contact.handwritten}</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="contact-links">
            {contact.links.map((l, i) => {
              const Icon = ICONS[l.icon]
              return (
                <a
                  key={l.label}
                  className={`contact-link contact-link-tag ${TAG_COLORS[i % TAG_COLORS.length]}`}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ '--tag-rotate': `${TAG_ROTATE[i % TAG_ROTATE.length]}deg` }}
                >
                  <span className="contact-tag-hole" aria-hidden="true" />
                  <Icon />
                  <span className="contact-link-label">{l.label}</span>
                  <span className="contact-link-value">{l.value}</span>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
