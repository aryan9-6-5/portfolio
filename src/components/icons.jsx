// Minimal single-stroke icon set — matches the Meeko "1px dark outline, no fill"
// icon language (Section 16.2 / Elements/Info Badge, Header/Social Icon).
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function IconGithub(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

export function IconLinkedin(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4.5 7 12 12.5 19.5 7" />
    </svg>
  )
}

export function IconBrowser(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <line x1="3.5" y1="8.5" x2="20.5" y2="8.5" />
      <circle cx="6.3" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M12 12.2v4.4M9.8 14.4l2.2-2.2 2.2 2.2" />
    </svg>
  )
}

export function IconNotepad(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <path d="M6 4.5h9.5L18.5 7.5V19.5H6z" />
      <path d="M15.5 4.5V7.5h3" />
      <line x1="8.5" y1="11" x2="15" y2="11" />
      <line x1="8.5" y1="14" x2="15" y2="14" />
      <path d="M16.5 15.5 14 18l-2 .5.5-2 2.5-2.5z" />
    </svg>
  )
}

export function IconEnvelope(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M5 7.5 12 13l7-5.5" />
    </svg>
  )
}

export function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconHamburger(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

export function IconSpark(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  )
}

export function IconPen(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M12 3l7 7-6 6-4 1 1-4z" />
      <circle cx="12" cy="9" r="1.4" />
    </svg>
  )
}

export function IconCup(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M7 3h8l-1 13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
      <line x1="6" y1="8" x2="16.5" y2="8" />
    </svg>
  )
}

export function IconSquiggle(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M2 17c3-9 5 9 8 0s5 9 8 0s3-9 4-6" />
    </svg>
  )
}

export function IconFlask(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <path d="M9 3h6M10 3v6.5L5 19a1.5 1.5 0 0 0 1.3 2.2h11.4A1.5 1.5 0 0 0 19 19l-5-9.5V3" />
      <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
  )
}

export function IconBrain(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <path d="M9 4a2.5 2.5 0 0 0-2.5 2.5v.6A2.5 2.5 0 0 0 5 9.5v1a2.5 2.5 0 0 0 1 2 2.5 2.5 0 0 0 0 3 2.5 2.5 0 0 0 2.4 2.9H9V4z" />
      <path d="M15 4a2.5 2.5 0 0 1 2.5 2.5v.6a2.5 2.5 0 0 1 1.5 2.4v1a2.5 2.5 0 0 1-1 2 2.5 2.5 0 0 1 0 3 2.5 2.5 0 0 1-2.4 2.9H15V4z" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </svg>
  )
}

export function IconRainbow(props) {
  return (
    <svg viewBox="0 0 40 28" width="107" height="76" {...base} {...props}>
      <path d="M2 26a18 18 0 0 1 36 0" />
      <path d="M8 26a12 12 0 0 1 24 0" />
      <path d="M14 26a6 6 0 0 1 12 0" />
    </svg>
  )
}

export function IconPlane(props) {
  return (
    <svg viewBox="0 0 24 24" width="60" height="60" {...base} {...props}>
      <path d="M21 3 3 10.5l7 2.5m11-10L14 20l-2.5-7L21 3z" />
      <path d="M10 12.5 21 3" />
    </svg>
  )
}

export function IconChat(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="12" x2="13" y2="12" />
    </svg>
  )
}

export const ICONS = {
  browser: IconBrowser,
  notepad: IconNotepad,
  envelope: IconEnvelope,
  github: IconGithub,
  linkedin: IconLinkedin,
  mail: IconMail,
  flask: IconFlask,
  brain: IconBrain,
}
