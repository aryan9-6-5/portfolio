import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { IconRainbow, IconPlane } from './icons.jsx'

export default function PageHero({ color = 'blue', eyebrow, heading, sub, decor = false }) {
  return (
    <section className={`page-hero ${color}`}>
      {decor && (
        <>
          <motion.span
            className="page-hero-decor rainbow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 1.2, bounce: 0.2, delay: 0.5 }}
          >
            <IconRainbow />
          </motion.span>
          <motion.span
            className="page-hero-decor plane"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 1.2, bounce: 0.2, delay: 0.8 }}
          >
            <IconPlane />
          </motion.span>
        </>
      )}
      <Reveal className="page-hero-wrap" y={10}>
        <h1 className="heading-1">{heading}</h1>
        {sub && <p className="body-24">{sub}</p>}
      </Reveal>
    </section>
  )
}
