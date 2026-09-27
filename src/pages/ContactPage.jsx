import { contactPage } from '../data/content.js'
import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Contact from '../components/Contact.jsx'

export default function ContactPage() {
  return (
    <>
      <PageHero theme="purple" heading={contactPage.heading} sub={contactPage.sub} />
      <section className="section contact-form-section">
        <div className="container">
          <ContactForm />
        </div>
      </section>
      <Contact />
    </>
  )
}
