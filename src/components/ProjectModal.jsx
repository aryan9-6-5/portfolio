import { motion } from 'framer-motion'
import { IconClose } from './icons.jsx'
import SlideText from './SlideText.jsx'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div className="project-modal-container">
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, scale: 0.88, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.18 }}
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Close">
          <IconClose />
        </button>

        <div className="project-modal-content">
          {/* Hero visual */}
          <div className={`project-modal-hero ${project.accent}`}>
            <span className="portfolio-visual-initials">{project.name.slice(0, 2).toUpperCase()}</span>
          </div>

          {/* Body */}
          <div className="project-modal-body">
            <span className="label">{project.category}</span>
            <h2 className="heading-2">{project.name}</h2>
            <span className="portfolio-role">{project.role}</span>
            <p className="body-text">{project.desc}</p>

            <div className="portfolio-tags">
              {project.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
            </div>

            {/* Placeholder sections — content to be filled later */}
            <div className="project-modal-sections">
              <div className="project-modal-section">
                <h3 className="heading-4">Overview</h3>
                <p className="body-text" style={{ color: 'rgba(29,29,29,0.45)' }}>
                  Detailed project overview coming soon.
                </p>
              </div>
              <div className="project-modal-section">
                <h3 className="heading-4">Technical Details</h3>
                <p className="body-text" style={{ color: 'rgba(29,29,29,0.45)' }}>
                  Architecture and implementation details coming soon.
                </p>
              </div>
              <div className="project-modal-section">
                <h3 className="heading-4">Results &amp; Impact</h3>
                <p className="body-text" style={{ color: 'rgba(29,29,29,0.45)' }}>
                  Metrics and outcomes coming soon.
                </p>
              </div>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent"
              style={{ alignSelf: 'flex-start', marginTop: 16 }}
            >
              <SlideText>View on GitHub</SlideText>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
