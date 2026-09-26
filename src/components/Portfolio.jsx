import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/content.js'
import { IconArrow } from './icons.jsx'
import SlideText from './SlideText.jsx'
import ProjectModal from './ProjectModal.jsx'
import TicketStack from './TicketStack.jsx'
import ProjectTicket from './ProjectTicket.jsx'

/**
 * ProjectList for standalone pages (like /projects)
 * Renders the collectible project tickets in a grid or stack
 */
export function ProjectList({ items }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="collectible-tickets-grid">
        {items.map((item) => (
          <div key={item.name} className="ticket-grid-item">
            <ProjectTicket
              project={item}
              isPunched={true}
              onSelect={(p) => setSelected(p)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

/**
 * Portfolio (Work Section)
 * Scroll-driven physical collectible ticket experience with
 * mechanical ticket puncher entering from the left and punch collection dock.
 */
export default function Portfolio({ maxItems = 3 }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const displayItems = projects.items.slice(0, maxItems)

  return (
    <section id="work" className="section portfolio-ticket-experience">
      {/* Scroll-Driven Pinned Ticket Stack with Puncher and Collection Tray */}
      <TicketStack
        projects={displayItems}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Post-Runway Footer with See All Work link */}
      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '40px 0 20px' }}>
        <div className="see-all-wrap">
          <Link className="btn btn-accent" to={projects.seeAll.to}>
            <SlideText>See all work ({projects.items.length} projects)</SlideText> <IconArrow />
          </Link>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
