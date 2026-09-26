import Hero from '../components/Hero.jsx'
import QuickLinks from '../components/QuickLinks.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Stats from '../components/Stats.jsx'
import Research from '../components/Research.jsx'
import About from '../components/About.jsx'
import SoftSkills from '../components/SoftSkills.jsx'
import Certifications from '../components/Certifications.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Portfolio />
      <Stats />
      <Research />
      <About />
      <SoftSkills />
      <Certifications />
    </>
  )
}
