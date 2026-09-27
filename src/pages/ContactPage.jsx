import { contactPage } from '../data/content.js'
import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Contact from '../components/Contact.jsx'

export default function ContactPage() {
  return (
    <>
      <PageHero
        theme="purple"
        heading={contactPage.heading}
        sub={contactPage.sub}
      >
        <div className="page-hero-actions">
          <a href="mailto:965aryanhanumakonda@gmail.com" className="btn btn-accent" style={{ padding: '10px 18px', fontSize: '13px' }}>
            Email Aryan ↗
          </a>
          <a href="https://github.com/aryan9-6-5" target="_blank" rel="noreferrer" className="btn" style={{ padding: '10px 18px', fontSize: '13px' }}>
            GitHub ↗
          </a>
          <a href="https://linkedin.com/in/aryan965" target="_blank" rel="noreferrer" className="btn" style={{ padding: '10px 18px', fontSize: '13px' }}>
            LinkedIn ↗
          </a>
        </div>
      </PageHero>
      <section className="section contact-form-section">
        <div className="container">
          <ContactForm />
        </div>
      </section>
      <Contact />
    </>
  )
}
