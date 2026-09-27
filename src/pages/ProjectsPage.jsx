import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects, projectsPage } from '../data/content.js'
import { ProjectList } from '../components/Portfolio.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import PageHero from '../components/PageHero.jsx'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <PageHero
        theme="emerald"
        heading={projectsPage.heading}
        sub={projectsPage.sub}
      >
        <div className="page-hero-actions">
          <span className="page-hero-chip">AI / ML Systems</span>
          <span className="page-hero-chip">Production APIs</span>
          <span className="page-hero-chip">Data Lakehouse</span>
          <span className="page-hero-chip">Full-Stack</span>
        </div>
      </PageHero>

      {/* Standalone Vertical Projects List: tickets stay in place, puncher comes and clicks on scroll */}
      <section className="section projects-page-section" style={{ position: 'relative', minHeight: '80vh', paddingBottom: '160px' }}>
        <div className="container" style={{ position: 'relative' }}>
          <ProjectList
            items={projects.items}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
