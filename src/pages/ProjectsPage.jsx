import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { projects, projectsPage } from '../data/content.js'
import { ProjectList } from '../components/Portfolio.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import PageHero from '../components/PageHero.jsx'

export default function ProjectsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Detect requested project from URL query (?open=id or ?project=id), hash (#id), or state
  const targetId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const fromQuery = searchParams.get('open') || searchParams.get('project')
    if (fromQuery) return fromQuery.toLowerCase()

    if (location.hash) {
      const cleanHash = location.hash.replace('#', '').toLowerCase()
      if (cleanHash) return cleanHash
    }

    if (location.state?.openProject) {
      return String(location.state.openProject).toLowerCase()
    }

    return null
  }, [location.search, location.hash, location.state])

  const initialMatchedProject = useMemo(() => {
    if (!targetId) return null
    return projects.items.find(
      (p) =>
        p.id.toLowerCase() === targetId ||
        p.name.toLowerCase() === targetId ||
        p.code?.toLowerCase() === targetId
    )
  }, [targetId])

  const [selectedProject, setSelectedProject] = useState(initialMatchedProject)

  // When targetId changes or user navigates from main, automatically open the ticket
  useEffect(() => {
    if (initialMatchedProject) {
      setSelectedProject(initialMatchedProject)
    }
  }, [initialMatchedProject])

  const handleCloseModal = () => {
    setSelectedProject(null)
    // Clean up query param from URL without triggering page reload
    if (location.search || location.hash) {
      navigate('/projects', { replace: true })
    }
  }

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
            initialTargetId={initialMatchedProject?.id}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  )
}
