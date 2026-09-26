import { motion } from 'framer-motion'

// The one repeated reveal pattern from the audit (context.md §15.2):
// opacity 0 -> 1, y 20 -> 0, spring duration 1.2s / bounce .2, no replay.
export default function Reveal({ children, delay = 0, y = 20, className, as: Tag = motion.div }) {
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', duration: 1.2, bounce: 0.2, delay }}
    >
      {children}
    </Tag>
  )
}
