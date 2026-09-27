import { motion } from 'framer-motion'
import { IconPlane } from './icons.jsx'

// Purely decorative flourish for the "sent" state — never states or implies
// the message reached anyone. The honest claim lives on SubmitButton's own
// label ("Opened in your email app"); this just dresses that moment up.
export default function PostmarkStamp() {
  return (
    <motion.div
      className="postmark-stamp"
      initial={{ opacity: 0, scale: 1.7, rotate: -26 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      exit={{ opacity: 0, scale: 1.3, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', duration: 0.55, bounce: 0.35 }}
    >
      <span className="postmark-ring" aria-hidden="true" />
      <span className="postmark-text">
        <strong>Airmail</strong>
        <IconPlane width={16} height={16} />
      </span>
    </motion.div>
  )
}
