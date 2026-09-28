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
      'TaskFlux is a vision-language-action framework built on OpenVLA for collaborative robots that get a new instruction while a product is already half-assembled. It separates three problems most VLA work conflates: resolving what an instruction refers to, reacting when the world drifts from plan, and handling the goal itself being withdrawn mid-execution; and builds intent classification, state reconciliation, and refusal paths specifically for the third case.',
    architecture: [
      { label: 'Base Model', desc: 'OpenVLA (7B, Prismatic-7B) fine-tuned with rank-32 LoRA adapters' },
      { label: 'State Reconciliation', desc: 'Tracks partial-assembly progress so a changeover reuses completed work instead of restarting' },
      { label: 'Refusal Paths', desc: 'Gated policy routing that declines unsafe or ambiguous replans rather than guessing' },
      { label: 'Evaluation Protocol', desc: '207 automated tests across a single-arm sim cell, scored on 5 custom changeover metrics' },
    ],
    challenge:
      "Undo turned out to be a harder manipulation problem than assembly itself: reversing partial work safely needed its own reconciliation logic, not just a re-run of the planner. It's simulation-only for now; the OpenVLA weights haven't been tested on real hardware yet, and the README says so plainly.",
    metrics: [
      { value: '~160s', label: 'Reconciliation vs 290–310s naive' },
      { value: '0', label: 'Unneeded undos' },
      { value: '207', label: 'Automated sim tests' },
    ],
  },
  rego: {
    tagline: 'Neuro-symbolic compliance gate that blocks non-compliant models before they ship',
    overview:
      'Rego treats regulatory compliance as a build gate instead of a post-deployment audit. An LLM (Claude 3.5 Sonnet, GPT-4o as backup) translates legal text into formal logic, and a Z3 SMT solver mathematically verifies a model satisfies it, producing a machine-checkable proof certificate instead of a 400-page audit report. Retraining triggers when the regulation changes, not only when the data drifts.',
    architecture: [
      { label: 'Formal Verification', desc: 'Z3 SMT solver proves compliance rather than approximating it' },
      { label: 'Legal NLP', desc: 'OpenRouter-routed Claude 3.5 Sonnet parses regulatory text into logic, GPT-4o as fallback' },
      { label: 'Compliance Lineage', desc: 'Neo4j Aura graph tracks which regulation gated which model version' },
      { label: 'Artifact Tracking', desc: 'MLflow + DVC version the models and data the proofs are checked against' },
    ],
    challenge:
      "Most MLOps tooling only watches for data drift. The harder problem was wiring a language model's legal interpretation into something a solver could actually verify: neuro-symbolic, not just an LLM's word for it.",
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
      'Keyword search alone missed paraphrased questions; pure semantic search missed exact terms. Fusing both and re-ranking the merged set before generation was the fix: every answer still has to point back to a real page, not just a plausible-sounding source.',
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
      "The pipeline and serving layer are complete and verified end-to-end, but this is listed as infrastructure, not a finished trading signal: there's no published accuracy number I'd stand behind yet, and I'd rather say that plainly than imply one.",
    metrics: [
      { value: '5', label: 'Baselines, naive → GARCH' },
      { value: 'ATM / OTM / Wings', label: 'Scored by market region' },
      { value: 'ConvLSTM / Transformer', label: 'Model architectures' },
    ],
  },
  multimodalrag: {
    tagline: 'Dual CLIP embeddings, cross-modal reranking, and grounded multimodal generation',
    overview:
      'Multimodal RAG is an advanced retrieval-augmented generation engine capable of ingesting complex PDF documents containing interleaved text, charts, diagrams, and photos. It bridges cross-modal semantics through contrastive vision-language embeddings and vector similarity indexing.',
    architecture: [
      { label: 'Vision-Language Model', desc: 'OpenAI CLIP ViT-B/32 producing joint 512-d text/image vector space' },
      { label: 'Vector Index', desc: 'Qdrant vector engine with HNSW indexing and payload filtering' },
      { label: 'Reranker', desc: 'Cross-modal scoring model boosting query-relevant visual documents' },
      { label: 'Synthesis', desc: 'FastAPI streaming backend feeding grounded multi-turn LLMs' },
    ],
    challenge:
      'Aligning fine-grained semantic intent across textual questions and dense charts. Naive embedding similarity often paired text questions with visually appealing but semantically irrelevant diagrams. I solved this by implementing a cross-modal verification layer that parses chart labels into structured tokens before computing cross-attention scores.',
    metrics: [
      { value: '< 180ms', label: 'Retrieval Latency' },
      { value: '92.4%', label: 'Visual Precision' },
      { value: 'Zero', label: 'Cross-Modal Drift' },
    ],
  },
  retailclassifier: {
    tagline: 'High-precision retail content classification engine optimizing advertisement relevance',
    overview:
      'An automated machine learning classification pipeline designed to score retail content relevance, classify multi-category merchandise, and optimize target ad placements with minimal false-positive mismatches.',
    architecture: [
      { label: 'Model Ensemble', desc: 'Gradient boosted trees (XGBoost) combined with Scikit-learn estimators' },
      { label: 'Feature Extraction', desc: 'Automated TF-IDF n-gram vectors, sentiment polarity, and metadata signals' },
      { label: 'Pipeline', desc: 'Modular Scikit-learn Pipeline with automated cross-validation loops' },
      { label: 'Inference', desc: 'Low-latency Python scoring service optimized for batch processing' },
    ],
    challenge:
      'Overcoming extreme class imbalance across niche retail product categories where standard cross-entropy loss overfit to dominant categories. Solved using synthetic SMOTE oversampling and cost-sensitive loss weighting.',
    metrics: [
      { value: '96.1%', label: 'Validation ROC-AUC' },
      { value: '< 25ms', label: 'Per-Item Scoring' },
      { value: '18+', label: 'Retail Categories' },
    ],
  },
  placementguard: {
    tagline: 'Automated Telegram moderation bot for college placement groups built on n8n & PostgreSQL',
    overview:
      'PlacementGuard is an automated Telegram moderation bot for college placement groups, built on n8n, PostgreSQL, and the Telegram Bot API. It monitors group messages and join requests, enforcing deterministic rules with no AI/LLM in the loop: content moderation (deleting student messages containing link + spam keywords while preserving admin messages) and identity format checks (enforcing RollNumber - Full Name before approval). Every decision is logged to PostgreSQL for a tamper-evident audit trail.',
    architecture: [
      { label: 'Workflow Engine', desc: 'n8n polling Telegram getUpdates on a schedule (local machine, zero public webhooks needed)' },
      { label: 'Database', desc: 'PostgreSQL audit schema logging moderation_events and join_requests with full reasons' },
      { label: 'Content Filter', desc: 'Deterministic scam/spam link detection; student messages purged, admin messages bypass completely' },
      { label: 'Identity Verification', desc: 'Enforces RollNumber - Full Name display name format; declines send automated instructional DMs' },
    ],
    challenge:
      'Eliminating false positives and high latency in active college recruitment chats without incurring recurring LLM API costs or hallucination hazards. Solved via deterministic regex heuristics, complete admin bypass, and transactional PostgreSQL event logging in Docker Compose.',
    metrics: [
      { value: '100%', label: 'Deterministic' },
      { value: '$0', label: 'LLM Cost' },
      { value: 'Full Audit', label: 'PostgreSQL Log' },
    ],
  },
  studysmart: {
    tagline: 'Comprehensive campus placement prep platform with algorithmic roadmaps & test analytics',
    overview:
      'StudySmart is a student engineering readiness portal designed to prepare undergraduates for rigorous technical software interviews. It bundles curriculum tracks, company-specific test simulations, and real-time skill radar charts.',
    architecture: [
      { label: 'Frontend', desc: 'React 18 single-page application with modular state containers' },
      { label: 'Styling', desc: 'Tailored responsive CSS3 architecture with fluid dark/light transitions' },
      { label: 'State & Storage', desc: 'Client-side state synchronization with persistent progress caching' },
      { label: 'Analytics', desc: 'Algorithmic performance grading with percentile score calculations' },
    ],
    challenge:
      'Structuring dynamic interview topic roadmaps with prerequisite dependencies while preserving responsive performance across low-end mobile devices commonly used by students. Solved via lazy-loaded module trees and lightweight SVG graph rendering.',
    metrics: [
      { value: '100%', label: 'Client-side Offline' },
      { value: '120+', label: 'Curated Problems' },
      { value: '60 FPS', label: 'Smooth Animation' },
    ],
  },
  neurocog: {
    tagline: 'Neuromorphic cognitive modeling using spiking neural networks and bio-inspired temporal dynamics',
    overview:
      'NeuroCog is a biologically plausible neuromorphic computing framework designed to model cognitive decision processes using Spiking Neural Networks (SNNs). By encoding continuous sensory signals into discrete event-driven spike trains and simulating Leaky Integrate-and-Fire (LIF) membrane dynamics via surrogate gradient backpropagation, it enables sparse, energy-efficient temporal cognition.',
    architecture: [
      { label: 'Spiking Dynamics', desc: 'Leaky Integrate-and-Fire (LIF) and adaptive threshold membrane potential models' },
      { label: 'Learning Mechanism', desc: 'Surrogate gradient backpropagation with Spike-Timing-Dependent Plasticity (STDP)' },
      { label: 'Framework Engine', desc: 'PyTorch + snnTorch / SpikingJelly for GPU-accelerated event-driven simulations' },
      { label: 'Spike Encoding', desc: 'Rate, latency, and delta modulation encoding for continuous temporal inputs' },
    ],
    challenge:
      'The non-differentiable Heaviside step function of biological spiking thresholds prevents standard gradient backpropagation. Solved by implementing smooth surrogate derivative approximations (fast sigmoid / arctan) during the backward pass while enforcing strict binary all-or-none spike propagation in forward time-steps.',
    metrics: [
      { value: '85%+', label: 'Spike Sparsity' },
      { value: '10x', label: 'Simulated Efficiency' },
      { value: 'Bio-Plausible', label: 'Temporal Dynamics' },
    ],
  },
  errorrecord: {
    tagline: 'Automated traceback diagnostic assistant synthesizing targeted diff fixes via Gemini API',
    overview:
      'CodeBase-Analyzer (Error Record) is an intelligent developer debugging assistant that parses raw Python stack traces, reads surrounding AST syntactical trees, identifies root cause regressions, and generates immediate copy-pasteable diff solutions via Google Gemini.',
    architecture: [
      { label: 'LLM Engine', desc: 'Google Gemini Pro / Flash API for multi-turn code synthesis' },
      { label: 'AST Engine', desc: 'Python native ast module extracting symbol scopes and caller traces' },
      { label: 'CLI Tooling', desc: 'Interactive terminal interface with formatted color-coded diff outputs' },
      { label: 'Safety Checks', desc: 'Pre-execution linting ensuring generated suggestions parse cleanly' },
    ],
    challenge:
      'Preventing the language model from hallucinating file edits when diagnosing nested framework tracebacks. Solved by binding AST extraction context to feed only the precise faulting functions and surrounding lexical lines into the prompt context window.',
    metrics: [
      { value: '3.2s', label: 'Mean Triage Time' },
      { value: '98%', label: 'Syntactic Valid Diffs' },
      { value: 'CLI Native', label: 'Terminal Workflow' },
    ],
  },
  pipelineautomation: {
    tagline: 'Enterprise ETL pipeline ingesting 11 Parquet sources with Airflow DAGs and Docker',
    overview:
      'Engineered during an industrial data engineering internship. Ingests, validates, cleans, and transforms fragmented insurance transaction datasets across 11 source partitions into analytics-ready PostgreSQL star-schema tables with automated quality checks.',
    architecture: [
      { label: 'Orchestration', desc: 'Apache Airflow DAG schedules running deterministic ETL tasks' },
      { label: 'Data Cleaning', desc: 'Pandas & NumPy vectorized pipelines with schema enforcement' },
      { label: 'Persistence', desc: 'PostgreSQL warehouse optimized with b-tree indexes and star schemas' },
      { label: 'Environment', desc: 'Docker & Docker Compose container staging with healthcheck guards' },
    ],
    challenge:
      'Handling schema drift and inconsistent date and currency formats across 11 disparate incoming data files without failing scheduled DAG batches. Built quarantine hooks that segregate malformed rows into error logs while continuing downstream transformations uninterrupted.',
    metrics: [
      { value: '11', label: 'Parquet Sources' },
      { value: '100%', label: 'Airflow Automated' },
      { value: 'Zero', label: 'Uncaught Schema Errors' },
    ],
  },
  nanocraft: {
    tagline: 'Cross-platform procedural Nonogram puzzle engine with deterministic board generation',
    overview:
      'NanoCraft is an elegant puzzle game application built on Flutter and Dart. It features mathematical grid generation algorithms that guarantee every procedural nonogram board has exactly one unique logical deduction path with zero guessing required.',
    architecture: [
      { label: 'Framework', desc: 'Flutter cross-platform SDK compiling natively to mobile & web' },
      { label: 'Language', desc: 'Dart with strict null-safety and reactive state streams' },
      { label: 'Solver Logic', desc: 'Constraint satisfaction and line-solving deterministic algorithm' },
      { label: 'Local Store', desc: 'Hive fast key-value storage for offline puzzle persistence' },
    ],
    challenge:
      'Procedurally generating random nonogram puzzles that are guaranteed to be solvable through pure human logic without backtracking. Implemented an automated line-solving validator that tests prospective boards and rejects ambiguous patterns in under 40 milliseconds.',
    metrics: [
      { value: '60 FPS', label: 'Native Rendering' },
      { value: '100%', label: 'Guaranteed Uniqueness' },
      { value: 'Offline', label: 'Local Persistence' },
    ],
  },
  smartevent: {
    tagline: 'Automated ticketing and participant verification with OCR payment receipt parsing',
    overview:
      'Smart Event Registration streamlines high-volume event ticketing. Participants upload payment transaction screenshots, which are processed via Tesseract OCR to verify payment reference IDs, generate encrypted dynamic QR badges, and dispatch personalized confirmation emails.',
    architecture: [
      { label: 'Backend', desc: 'Python Flask web framework with RESTful API endpoints' },
      { label: 'OCR Extraction', desc: 'Tesseract OCR engine with image preprocessing filters' },
      { label: 'Ticket Badging', desc: 'Automated QR code image generator with embedded crypto-hashes' },
      { label: 'Dispatch', desc: 'Asynchronous SMTP mail worker dispatching PDF entry placards' },
    ],
    challenge:
      'Processing diverse mobile payment screenshots with varying resolutions, dark mode themes, and crop angles. Engineered an OpenCV preprocessing pipeline (grayscale, adaptive thresholding, morphological opening) that boosted OCR transaction ID extraction accuracy to 95%.',
    metrics: [
      { value: '95%', label: 'OCR Read Rate' },
      { value: '< 2s', label: 'Turnaround Time' },
      { value: 'Automated', label: 'QR Badge Issuance' },
    ],
  },
  drowsinessdetector: {
    tagline: 'Safety-critical driver fatigue monitoring via MTCNN facial localization & custom CNNs',
    overview:
      'A real-time computer vision driver safety pipeline that continuously monitors facial keypoints from live webcam feeds, calculates eye aspect ratios and closed-eye probabilities using a custom convolutional neural network, and triggers immediate audio alarms upon detecting microsleeps.',
    architecture: [
      { label: 'Face Detection', desc: 'MTCNN multi-task cascaded convolutional network for robust face bounding' },
      { label: 'Eye State Net', desc: 'Custom PyTorch CNN trained on the Closed Eyes in the Wild (CEW) dataset' },
      { label: 'Vision Pipeline', desc: 'OpenCV video capture loop executing at 30+ frames per second' },
      { label: 'Alerting', desc: 'Sub-second auditory alert trigger when closure duration exceeds safety window' },
    ],
    challenge:
      'Distinguishing natural blinks (lasting 100-300ms) from dangerous microsleep events (lasting > 1.2s) under variable in-cabin lighting conditions. Implemented a sliding temporal window filter that tracks consecutive closed-state frame counts rather than isolated inferences.',
    metrics: [
      { value: '30+ FPS', label: 'Live Video Pipeline' },
      { value: '96.4%', label: 'CEW Test Accuracy' },
      { value: '< 100ms', label: 'Alert Dispatch' },
    ],
  },
  gesturexai: {
    tagline: 'Explainable contactless 3D spatial manipulation using MediaPipe and Three.js',
    overview:
      'GestureXAI merges touchless spatial computer vision with explainable AI. Using standard webcams, it tracks bimanual hand landmarks in 3D space to manipulate virtual Three.js objects (rotation, scaling, translation) while providing live visual heatmaps and saliency feedback explaining why a gesture was recognized.',
    architecture: [
      { label: 'Tracking Engine', desc: 'MediaPipe Hands tracking 21 3D hand landmarks in real time' },
      { label: '3D Graphics', desc: 'Three.js WebGL scene with interactive shaders and mesh lighting' },
      { label: 'Explainability', desc: 'Integrated Grad-CAM saliency visualizations for spatial gesture classes' },
      { label: 'UI Interface', desc: 'Zero-latency browser UI with glassmorphic spatial telemetry panels' },
    ],
    challenge:
      'Smoothing noisy webcam landmark tracking without introducing perceived input lag. Created an exponential moving average (EMA) landmark filter with adaptive alpha scaling that tightens during fast gestures and stabilizes during steady pinpoint manipulation.',
    metrics: [
      { value: '60 FPS', label: 'Three.js Render Loop' },
      { value: '21 Points', label: 'Per-Hand 3D Tracking' },
      { value: 'Real-Time', label: 'XAI Visual Saliency' },
    ],
  },
  dataqualityhealer: {
    tagline: 'Automated ML dataset drift detection, root cause classification, and algorithmic repair',
    overview:
      'Data Quality Healer is an MLOps integrity framework that monitors incoming continuous data streams, identifies statistical distribution shifts, classifies corruptions (missing data, schema violations, out-of-bound outliers), and automatically applies repair algorithms to heal datasets before model training.',
    architecture: [
      { label: 'Drift Detection', desc: 'Kolmogorov-Smirnov and Population Stability Index (PSI) statistical tests' },
      { label: 'Healer Engine', desc: 'Algorithmic KNN, iterative MICE, and median imputation strategies' },
      { label: 'Diagnostics', desc: 'Root cause classification trees categorizing pipeline failure origins' },
      { label: 'Reporting', desc: 'Comprehensive data health audits with before-and-after variance scores' },
    ],
    challenge:
      'Preventing naive imputation from biasing downstream machine learning models when data is missing not at random (MNAR). Architected an ensemble validator that flags missingness patterns and chooses between KNN, MICE, or row rejection based on feature correlation matrices.',
    metrics: [
      { value: '100%', label: 'Automated Profiling' },
      { value: '5+', label: 'Imputation Strategies' },
      { value: 'Zero', label: 'Downstream Model Crashes' },
    ],
  },
  repointel: {
    tagline: 'Server-side GitHub repository intelligence and automated architectural auditing',
    overview:
      'RepoIntel connects directly to the GitHub REST API to ingest repositories, extract directory structures, parse critical manifests and source files, and execute multi-prompt LLM evaluation chains that generate architectural diagrams, security reviews, and maintainability grades.',
    architecture: [
      { label: 'Runtime', desc: 'Node.js and TypeScript server with strict schema validation' },
      { label: 'GitHub API', desc: 'Octokit client handling rate limiting, recursive tree fetching, and blobs' },
      { label: 'AI Chains', desc: 'Structured prompts generating markdown dossiers and Mermaid diagrams' },
      { label: 'Security', desc: 'Server-side environment token shielding protecting developer credentials' },
    ],
    challenge:
      'Auditing large multi-gigabyte repositories within GitHub API rate limits and LLM context constraints. Built an intelligent file prioritizer that ignores minified binaries, node_modules, and locks while selecting high-signal architecture files (configs, controllers, core schemas).',
    metrics: [
      { value: '100%', label: 'Type-Safe TypeScript' },
      { value: '< 8s', label: 'Full Repo Audit' },
      { value: 'Zero', label: 'Exposed API Keys' },
    ],
  },
  trafficsigngpt: {
    tagline: 'Deep CNN traffic sign classifier paired with Gemini conversational traffic law dialog',
    overview:
      'TrafficSignGPT pairs visual deep learning with conversational AI for automotive education. A convolutional neural network trained on international traffic signs classifies captured images, and an integrated Google Gemini assistant provides immediate context regarding traffic laws, fines, and road safety protocols.',
    architecture: [
      { label: 'Classifier Net', desc: 'TensorFlow / Keras deep CNN trained on German Traffic Sign Benchmark' },
      { label: 'AI Tutor', desc: 'Google Gemini Pro API providing rich conversational domain explanations' },
      { label: 'Interactive UI', desc: 'Streamlit dashboard supporting drag-and-drop image uploads' },
      { label: 'Pre-processing', desc: 'Contrast-limited adaptive histogram equalization (CLAHE) on inputs' },
    ],
    challenge:
      'Overcoming image blur, motion artifacts, and low illumination on road camera captures. Applied CLAHE contrast normalization and test-time image augmentation, boosting CNN classification confidence on difficult night-time captures to over 94%.',
    metrics: [
      { value: '97.2%', label: 'CNN Test Accuracy' },
      { value: '43 Classes', label: 'Traffic Signs Identified' },
      { value: 'Instant', label: 'Gemini Dialog Explanations' },
    ],
  },
}

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  const [activeTab, setActiveTab] = useState('overview')

  // Background scroll lock without body displacement
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
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
