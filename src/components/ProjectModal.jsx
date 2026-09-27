import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconClose, IconArrow } from './icons.jsx'
import SlideText from './SlideText.jsx'

const PROJECT_DETAILS = {
  vitalwatch: {
    tagline: 'Autonomous multi-agent clinical monitoring with deterministic risk arbitration',
    overview:
      'VitalWatch is an AI-powered post-discharge patient monitoring engine designed to reduce preventable hospital readmissions. It continuously ingests vital sign telemetry streams, identifies dangerous multi-signal drifts, and uses autonomous reasoning agents to synthesize actionable clinical notes for medical staff.',
    architecture: [
      { label: 'LLM Reasoning', desc: 'Groq-accelerated Llama-3.3 70B for near-instant clinical inference' },
      { label: 'Risk Modeling', desc: 'Dual XGBoost + LightGBM ensemble for deterministic readmission tiering' },
      { label: 'Backend API', desc: 'FastAPI asynchronous streaming endpoints with WebSocket alerts' },
      { label: 'Safety Layer', desc: 'Medical constraint verification ensuring agents never hallucinate dosages' },
    ],
    challenge:
      'Getting separate reasoning agents and ML scoring models to agree without deadlocks. If a language agent flagged severe sepsis risk while the numeric gradient-boosted tree reported low probability due to missing lab values, naive voting resulted in erratic alerts. I implemented an arbitration protocol where ML confidence thresholds gate LLM alerts before any risk escalation is dispatched to clinicians.',
    metrics: [
      { value: '94.2%', label: 'Drift Sensitivity' },
      { value: '< 420ms', label: 'Consensus Latency' },
      { value: '0', label: 'Dosing Contradictions' },
    ],
  },
  plattr: {
    tagline: 'Unified B2B2C multi-tier food ordering & event catering logistics platform',
    overview:
      'Plattr is a food supply platform that unifies corporate catering contracts, daily employee tiffin subscriptions, and large-scale event banquet orders into a single cohesive marketplace. Rather than forcing three separate portals, both vendors and consumers interact through a unified polymorphic catalog.',
    architecture: [
      { label: 'Frontend', desc: 'React 18, TypeScript, custom design tokens, and optimistic UI mutations' },
      { label: 'Backend & Data', desc: 'Supabase PostgreSQL with granular Row-Level Security (RLS) policies' },
      { label: 'Realtime Sync', desc: 'PostgreSQL change-data-capture channels updating live kitchen boards' },
      { label: 'State Model', desc: 'Zustand store managing multi-vendor cart transitions and scheduling' },
    ],
    challenge:
      'Handling order lifecycles across fundamentally incompatible fulfillment models. Daily tiffins require recurring billing with cutoff pause mechanics; corporate bulk orders require split invoices; event catering requires custom modular quote negotiations. I architected a polymorphic order state machine that normalizes billing while preserving model-specific workflows.',
    metrics: [
      { value: '100%', label: 'Unified Catalog' },
      { value: '80ms', label: 'Sync Latency' },
      { value: '3-in-1', label: 'Fulfillment Modes' },
    ],
  },
  fintrack: {
    tagline: 'High-throughput enterprise financial transaction ledger and anomaly detector',
    overview:
      'FinTrack is a secure, high-concurrency personal finance API built to track multi-account transaction flows, detect spending anomalies, and generate real-time fiscal telemetry. Engineered with strict financial ACID guarantees and stateless security.',
    architecture: [
      { label: 'Core Framework', desc: 'Java 17, Spring Boot 3, and Spring Data JPA with HikariCP pooling' },
      { label: 'Security', desc: 'Spring Security with stateless HMAC-SHA256 JWT tokens and granular RBAC' },
      { label: 'Persistence', desc: 'PostgreSQL relational database with indexed double-entry transaction ledgers' },
      { label: 'Deployment', desc: 'Dockerized multi-stage container deployment on AWS EC2 behind Nginx' },
    ],
    challenge:
      'Preventing race conditions and ledger drift under concurrent transfer requests. In high-frequency transactions, simultaneous debit/credit calls could cause phantom balances. I solved this by implementing pessimistic row locking with strict serializable isolation levels on ledger balances, verified through automated JMeter stress tests.',
    metrics: [
      { value: '120+', label: 'Req / sec Sustained' },
      { value: '< 45ms', label: 'P95 Latency' },
      { value: '0', label: 'Ledger Discrepancies' },
    ],
  },
  nexusmart: {
    tagline: 'Ultra-low latency retail analytics lakehouse querying 31.8M+ rows on a single node',
    overview:
      'NexusMart is an embedded retail analytics lakehouse engineered to process and query millions of transaction records with interactive, sub-second query execution times. Eliminates the operational overhead of heavy distributed clusters for mid-scale analytics.',
    architecture: [
      { label: 'OLAP Engine', desc: 'DuckDB vectorized columnar database running in-process' },
      { label: 'Data Processing', desc: 'Polars multi-threaded SIMD dataframe execution in Python' },
      { label: 'Storage Format', desc: 'Snappy-compressed Apache Parquet with column-level dictionary encoding' },
      { label: 'Forecasting', desc: 'XGBoost regression models for SKU velocity and inventory reordering' },
    ],
    challenge:
      'Traditional PostgreSQL row-based analytical queries took 12+ seconds to execute complex multi-table aggregations over 30 million rows. By migrating to a vectorized columnar architecture with DuckDB and Polars, query execution dropped to under 1.2 seconds, achieving a 10x performance leap on standard laptop hardware without spinning up Spark clusters.',
    metrics: [
      { value: '31.8M+', label: 'Records Queried' },
      { value: '10x', label: 'Query Speedup' },
      { value: '65%', label: 'Storage Reduction' },
    ],
  },
  taskflux: {
    tagline: 'Vision-language-action changeover handling for collaborative robots mid-assembly',
    overview:
      'TaskFlux is a vision-language-action framework built on OpenVLA for collaborative robots that get a new instruction while a product is already half-assembled. It separates three problems most VLA work conflates — resolving what an instruction refers to, reacting when the world drifts from plan, and handling the goal itself being withdrawn mid-execution — and builds intent classification, state reconciliation, and refusal paths specifically for the third case.',
    architecture: [
      { label: 'Base Model', desc: 'OpenVLA (7B, Prismatic-7B) fine-tuned with rank-32 LoRA adapters' },
      { label: 'State Reconciliation', desc: 'Tracks partial-assembly progress so a changeover reuses completed work instead of restarting' },
      { label: 'Refusal Paths', desc: 'Gated policy routing that declines unsafe or ambiguous replans rather than guessing' },
      { label: 'Evaluation Protocol', desc: '207 automated tests across a single-arm sim cell, scored on 5 custom changeover metrics' },
    ],
    challenge:
      "Undo turned out to be a harder manipulation problem than assembly itself — reversing partial work safely needed its own reconciliation logic, not just a re-run of the planner. It's simulation-only for now; the OpenVLA weights haven't been tested on real hardware yet, and the README says so plainly.",
    metrics: [
      { value: '~160s', label: 'Reconciliation vs 290–310s naive' },
      { value: '0', label: 'Unneeded undos' },
      { value: '207', label: 'Automated sim tests' },
    ],
  },
  rego: {
    tagline: 'Neuro-symbolic compliance gate that blocks non-compliant models before they ship',
    overview:
      'Rego treats regulatory compliance as a build gate instead of a post-deployment audit. An LLM (Claude 3.5 Sonnet, GPT-4o as backup) translates legal text into formal logic, and a Z3 SMT solver mathematically verifies a model satisfies it — producing a machine-checkable proof certificate instead of a 400-page audit report. Retraining triggers when the regulation changes, not only when the data drifts.',
    architecture: [
      { label: 'Formal Verification', desc: 'Z3 SMT solver proves compliance rather than approximating it' },
      { label: 'Legal NLP', desc: 'OpenRouter-routed Claude 3.5 Sonnet parses regulatory text into logic, GPT-4o as fallback' },
      { label: 'Compliance Lineage', desc: 'Neo4j Aura graph tracks which regulation gated which model version' },
      { label: 'Artifact Tracking', desc: 'MLflow + DVC version the models and data the proofs are checked against' },
    ],
    challenge:
      "Most MLOps tooling only watches for data drift. The harder problem was wiring a language model's legal interpretation into something a solver could actually verify — neuro-symbolic, not just an LLM's word for it.",
    metrics: [
      { value: 'Z3 SMT', label: 'Formal proof, not audit' },
      { value: 'Seconds', label: 'Proof certificate generation' },
      { value: 'Neo4j', label: 'Regulation → model lineage' },
    ],
  },
  knowledgeassistant: {
    tagline: 'Hybrid-retrieval RAG assistant that cites its sources by page',
    overview:
      'Upload documents, ask questions, get answers with citations back to the exact source page. Retrieval combines BM25 keyword search and semantic embeddings via Reciprocal Rank Fusion, then a cross-encoder re-ranks the results before Groq-served Llama-3.3 70B streams the answer token by token.',
    architecture: [
      { label: 'Hybrid Retrieval', desc: 'Cosine similarity + BM25 combined with Reciprocal Rank Fusion' },
      { label: 'Re-ranking', desc: 'Cross-encoder re-scores the fused candidates before generation' },
      { label: 'Vector Store', desc: 'ChromaDB with local all-MiniLM-L6-v2 embeddings' },
      { label: 'Generation', desc: 'Groq-served Llama-3.3 70B, streamed token by token' },
    ],
    challenge:
      'Keyword search alone missed paraphrased questions; pure semantic search missed exact terms. Fusing both and re-ranking the merged set before generation was the fix — every answer still has to point back to a real page, not just a plausible-sounding source.',
    metrics: [
      { value: 'BM25 + Cosine', label: 'Hybrid retrieval, RRF-fused' },
      { value: 'Cross-encoder', label: 'Re-ranked before generation' },
      { value: 'Page-level', label: 'Source citations' },
    ],
  },
  volforecaster: {
    tagline: 'Forecasting how implied volatility surfaces move across an options chain',
    overview:
      'A full pipeline for multi-step-ahead forecasting of implied volatility surfaces: pulling options chain data on a schedule, interpolating it onto a standardized grid, training financially-constrained neural nets, and serving predictions through an API with MLflow tracking.',
    architecture: [
      { label: 'Data Collection', desc: 'yfinance + APScheduler pulling options chains on a schedule' },
      { label: 'Grid Interpolation', desc: 'SciPy RBF interpolation onto a standardized vol-surface grid' },
      { label: 'Forecasting Models', desc: 'PyTorch ConvLSTM, LSTM and Transformer models with financial constraints' },
      { label: 'Baselines', desc: 'Five econometric baselines from naive to GARCH, scored by market region' },
    ],
    challenge:
      "The pipeline and serving layer are complete and verified end-to-end, but this is listed as infrastructure, not a finished trading signal — there's no published accuracy number I'd stand behind yet, and I'd rather say that plainly than imply one.",
    metrics: [
      { value: '5', label: 'Baselines, naive → GARCH' },
      { value: 'ATM / OTM / Wings', label: 'Scored by market region' },
      { value: 'ConvLSTM / Transformer', label: 'Model architectures' },
    ],
  },
}

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  const [activeTab, setActiveTab] = useState('overview')

  // Bulletproof fixed position background scroll lock
  useEffect(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0

    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevLeft = document.body.style.left
    const prevRight = document.body.style.right
    const prevWidth = document.body.style.width
    const prevOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.left = prevLeft
      document.body.style.right = prevRight
      document.body.style.width = prevWidth
      document.body.style.overflow = prevOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const key = project.id || project.name.toLowerCase()
  const detail = PROJECT_DETAILS[key] || {
    tagline: project.desc,
    overview: project.desc,
    architecture: project.tags.map((t) => ({ label: t, desc: 'Production stack component' })),
    challenge: 'Architected for reliability, low latency, and maintainable modular workflows.',
    metrics: [{ value: '100%', label: 'Shipped' }],
  }

  const accentColor = project.accentColor || '#0A52F0'
  const accentBg = project.accentBg || '#EBF3FF'

  return (
    <div
      className="project-modal-container"
      role="dialog"
      aria-modal="true"
      onTouchMove={(e) => {
        // Prevent background rubber-banding if dragging outside the scroll body
        if (e.target.classList.contains('project-modal-container') || e.target.classList.contains('project-modal-overlay')) {
          e.preventDefault()
        }
      }}
    >
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.div
        className="project-modal-card"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.16 }}
        style={{
          '--modal-accent': accentColor,
          '--modal-accent-bg': accentBg,
        }}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          className="project-modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <IconClose />
        </button>

        {/* HERO BANNER (Dossier Ticket Header) */}
        <div className="modal-hero-banner" style={{ backgroundColor: accentBg }}>
          {/* Decorative Ticket Edge Notch */}
          <div className="modal-ticket-notch notch-left" aria-hidden="true" />
          <div className="modal-ticket-notch notch-right" aria-hidden="true" />

          <div className="modal-hero-content">
            <div className="modal-meta-row">
              <span
                className="modal-badge-category"
                style={{ backgroundColor: accentColor, color: '#FFFFFF' }}
              >
                {project.category}
              </span>
              <span className="modal-badge-admit">{project.admitType || 'PROJECT DOSSIER'}</span>
              <span className="modal-badge-code">PASS #{project.ticketNo || '01'}</span>
            </div>

            <h2 className="modal-hero-title">{project.name}</h2>
            <p className="modal-hero-tagline">{detail.tagline}</p>

            {/* Quick Metrics Bar */}
            <div className="modal-metrics-bar">
              {detail.metrics.map((m) => (
                <div key={m.label} className="modal-metric-chip">
                  <span className="metric-val" style={{ color: accentColor }}>
                    {m.value}
                  </span>
                  <span className="metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <div className="modal-tabs-bar">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            Architecture &amp; Stack
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenge')}
          >
            The Hard Problem
          </button>
        </div>

        {/* SCROLLABLE BODY CONTENT */}
        <div className="modal-scroll-body">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="modal-tab-pane"
            >
              <h3 className="modal-section-title">The Problem &amp; Core Purpose</h3>
              <p className="modal-body-paragraph">{detail.overview}</p>

              <h4 className="modal-subsection-title">Role &amp; Responsibilities</h4>
              <p className="modal-body-paragraph">{project.role}</p>

              <h4 className="modal-subsection-title">Technologies Used</h4>
              <div className="modal-tags-list">
                {project.tags.map((tag) => (
                  <span key={tag} className="modal-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'architecture' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="modal-tab-pane"
            >
              <h3 className="modal-section-title">System Architecture &amp; Implementation</h3>
              <div className="modal-arch-grid">
                {detail.architecture.map((item) => (
                  <div key={item.label} className="modal-arch-card">
                    <div className="arch-label" style={{ color: accentColor }}>
                      {item.label}
                    </div>
                    <div className="arch-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="modal-tab-pane"
            >
              <h3 className="modal-section-title">What Was Actually Hard Here?</h3>
              <div className="modal-challenge-box" style={{ borderColor: accentColor }}>
                <p className="modal-body-paragraph">{detail.challenge}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="modal-footer-bar">
          <div className="modal-footer-links">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="modal-action-btn primary"
                style={{ backgroundColor: accentColor }}
              >
                <SlideText>View on GitHub</SlideText>
                <IconArrow />
              </a>
            )}
            <button
              type="button"
              className="modal-action-btn secondary"
              onClick={onClose}
            >
              Close Dossier
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
