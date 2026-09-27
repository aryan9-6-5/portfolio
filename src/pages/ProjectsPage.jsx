import { projects, projectsPage } from '../data/content.js'
import { ProjectList } from '../components/Portfolio.jsx'
import PageHero from '../components/PageHero.jsx'

export default function ProjectsPage() {
  return (
    <>
      <PageHero theme="emerald" heading={projectsPage.heading} sub={projectsPage.sub} />
      <section className="section portfolio-section">
        <div className="container">
          <ProjectList items={projects.items} />
        </div>
      </section>
    </>
  )
}
