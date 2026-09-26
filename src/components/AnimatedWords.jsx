import { motion } from 'framer-motion'

// Word-by-word masked rise reveal for the hero headline. See animations.md §2B.
const container = {
  hidden: { opacity: 1 },
  visible: (delayChildren) => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren },
  }),
}

const word = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { type: 'spring', duration: 0.8, bounce: 0.15 } },
}

export default function AnimatedWords({ text, delayChildren = 0.1, className }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      variants={container}
      custom={delayChildren}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => (
        <span key={i} className="word-mask">
          <motion.span variants={word} className="word-inner">{w}</motion.span>
        </span>
      )).reduce((acc, el, i) => (i === 0 ? [el] : [...acc, ' ', el]), [])}
    </motion.span>
  )
}
