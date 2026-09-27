import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SubmitButton from './SubmitButton.jsx'
import PostmarkStamp from './PostmarkStamp.jsx'
import { IconPlane } from './icons.jsx'
import { contact } from '../data/content.js'

const EMAIL_TO = contact.links.find((l) => l.icon === 'mail')?.value

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle')

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, email, message } = values
    if (!name.trim() || !email.trim() || !message.trim()) {
      setState('error')
      setTimeout(() => setState('idle'), 2200)
      return
    }

    setState('loading')
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)

    setTimeout(() => {
      window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`
      setState('success')
    }, 700)
  }

  return (
    <Reveal delay={0.2} className="airmail-card">
      <div className="airmail-edge" aria-hidden="true" />
      <span className="airmail-stamp" aria-hidden="true"><IconPlane width={20} height={20} /></span>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="airmail-to">To: Aryan's inbox</div>

        <div className="contact-form-row">
          <label className="contact-form-field">
            <span className="label">Name</span>
            <input type="text" value={values.name} onChange={update('name')} placeholder="Your name" />
          </label>
          <label className="contact-form-field">
            <span className="label">Email</span>
            <input type="email" value={values.email} onChange={update('email')} placeholder="you@email.com" />
          </label>
        </div>
        <label className="contact-form-field">
          <span className="label">Message</span>
          <textarea rows={5} value={values.message} onChange={update('message')} placeholder="What's the role, project, or question?" />
        </label>

        <div className="submit-btn-wrap">
          <AnimatePresence>{state === 'success' && <PostmarkStamp />}</AnimatePresence>
          <SubmitButton state={state} />
        </div>
      </form>
    </Reveal>
  )
}
