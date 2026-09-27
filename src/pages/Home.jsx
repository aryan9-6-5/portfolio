import Hero from '../components/Hero.jsx'
import ScrollFanCards from '../components/ScrollFanCards.jsx'
import About from '../components/About.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Research from '../components/Research.jsx'
import CoreStrengths from '../components/CoreStrengths.jsx'
import Stats from '../components/Stats.jsx'
import Certifications from '../components/Certifications.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollFanCards />
      <About />
      <Portfolio />
      <Research />
      <CoreStrengths />
      <Stats />
      <Certifications />
      <Contact />
    </>
  )
}
