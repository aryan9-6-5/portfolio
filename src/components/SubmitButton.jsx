import { motion, AnimatePresence } from 'framer-motion'
import SlideText from './SlideText.jsx'

// State machine per animations.md §9C: Default -> Loading -> Success | Error,
// plus a Disabled state. No backend exists, so "success" means the mailto
// link opened — never a fabricated "message sent to a server" claim.
const LABELS = {
  idle: 'Send message',
  loading: 'Sending…',
  success: 'Opened in your email app',
  error: 'Fill in every field',
}

export default function SubmitButton({ state = 'idle' }) {
  const disabled = state === 'loading' || state === 'disabled'
  return (
    <button
      type="submit"
      className={`btn submit-btn ${state}`}
      disabled={disabled}
      style={state === 'error' ? { background: 'var(--red)' } : undefined}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === 'loading' ? (
          <motion.span
            key="spinner"
            className="submit-spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
          />
        ) : (
          <motion.span
            key={state}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SlideText>{LABELS[state] || LABELS.idle}</SlideText>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
