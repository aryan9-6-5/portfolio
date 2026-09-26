export const meta = {
  title: 'Aryan — AI/ML Engineer',
  description: "Hanumakonda Aryan — AI/ML engineer building end-to-end systems, with an open interpretability research project on the side.",
}

export const nav = {
  name: 'Aryan',
  links: [
    { label: 'Home', to: '/' },
    { label: 'Work', to: '/projects' },
    { label: 'Contact', to: '/contact' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/aryan9-6-5', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/aryan965', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:965aryanhanumakonda@gmail.com', icon: 'mail' },
  ],
}

export const footerNav = {
  links: [
    { label: 'Work', to: '/projects' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: '© 2026 Hanumakonda Aryan. Built with a mascot, some honest research, and no fabricated screenshots.',
}

export const hero = {
  badge: 'Open to work',
  headlinePre: 'Hi! ',
  headlineAccent: "I'm Aryan,",
  headlinePost: 'an AI/ML engineer.',
  sub: "I build AI/ML systems — deep learning, data engineering, MLOps — then make sure they're telling the truth. Currently running an open interpretability research project on the side.",
  primaryCta: { label: 'See my work', to: '/projects' },
  secondaryCta: { label: 'Get in touch', to: '/contact' },
  pose: 'standing-peace',
  floatingLeft: { text: 'AI/ML Engineer', color: 'blue' },
  floatingRight: { text: 'Runner-Up, Hackathon', color: 'pink' },
}

export const quickLinks = {
  items: [
    {
      title: 'My Work',
      desc: 'Four real, shipped projects — case studies, not screenshots.',
      icon: 'browser',
      color: 'blue',
      to: '/projects',
    },
    {
      title: 'About Me',
      desc: 'Background, the research I run, and how I think about building.',
      icon: 'notepad',
      color: 'yellow',
      to: '/#about',
    },
    {
      title: 'Get In Touch',
      desc: "Open to AI/ML and full-stack roles — let's talk.",
      icon: 'envelope',
      color: 'green',
      to: '/contact',
    },
  ],
}

export const projects = {
  eyebrow: 'Selected work',
  heading: 'My selected works',
  sub: 'Four real, shipped projects. Scroll to see them stack up.',
  note: 'Preview cards, not screenshots — case study pages with real screens are next.',
  seeAll: { label: 'See all work', to: '/projects' },
  items: [
    {
      name: 'VitalWatch',
      category: 'Healthcare AI',
      role: 'Multi-agent pipeline, risk modeling',
      desc: 'AI-powered post-discharge patient monitoring: a multi-agent pipeline (Groq / Llama-3.3) with XGBoost + LightGBM risk tiering.',
      tags: ['FastAPI', 'Groq', 'XGBoost'],
      accent: 'blue',
      link: 'https://github.com/aryan9-6-5',
    },
    {
      name: 'Plattr',
      category: 'B2B2C Platform',
      role: 'Full-stack, unified catalog',
      desc: 'B2B2C food supply platform unifying tiffin subscriptions, bulk ordering and event catering behind one polymorphic catalog.',
      tags: ['React', 'Supabase', 'TypeScript'],
      accent: 'yellow',
      link: 'https://github.com/aryan9-6-5',
    },
    {
      name: 'fintrack',
      category: 'Backend / API',
      role: 'Production REST API',
      desc: 'Production-grade personal finance REST API with JWT auth and fraud detection, deployed on AWS EC2.',
      tags: ['Java', 'Spring Boot', 'PostgreSQL'],
      accent: 'green',
      link: 'https://github.com/aryan9-6-5',
    },
    {
      name: 'NexusMart',
      category: 'Data Engineering',
      role: 'Analytics lakehouse',
      desc: 'Retail analytics lakehouse processing 31.8M+ transactions, 10x faster queries via DuckDB and Polars.',
      tags: ['DuckDB', 'Polars', 'XGBoost'],
      accent: 'pink',
      link: 'https://github.com/aryan9-6-5',
    },
  ],
}

export const projectsPage = {
  eyebrow: 'Work',
  heading: 'Everything I have shipped',
  sub: 'Four real, shipped projects — full stack, ML pipelines, and data engineering. No fabricated screenshots, no filler case studies.',
}

export const stats = {
  eyebrow: 'By the numbers',
  heading: 'My numbers say it all',
  sub: 'Real counts, updated as I go — nothing rounded up for effect.',
  items: [
    { value: '234+', label: 'LeetCode solved', color: 'pink' },
    { value: '230+', label: 'GeeksforGeeks solved', color: 'purple' },
    { value: '26', label: 'GitHub repos', color: 'blue' },
    { value: '2', label: 'Research threads', color: 'green' },
    { value: '6', label: 'Certifications & awards', color: 'yellow' },
  ],
}

export const research = {
  eyebrow: 'Research',
  heading: 'Two real research threads',
  sub: 'Negative and null results are reported here as plainly as wins.',
  pose: 'questioning-chin',
  cards: [
    {
      note: 'field note — 01',
      title: 'NeuroPlastic — EEG error-signal adaptation',
      desc: 'Cross-participant EEG error-related-potential decoding, and online adaptation of a spiking neural network. The honest result: adaptation did not beat the frozen baseline (0.717 vs 0.692 AUROC). Reported plainly, not buried.',
      link: 'Read the full story',
      color: 'purple',
    },
    {
      note: 'field note — 02',
      title: 'Does an AI know it is wrong?',
      desc: "A 7-day public interpretability project comparing the brain's error-related potential to a language model's internal activations. Day 1: no probed layer beat chance. In progress.",
      link: 'Follow along',
      color: 'blue',
    },
  ],
}

export const about = {
  eyebrow: "Inside Aryan's Mind",
  heading: 'What I Actually Think About',
  sub: 'Four thoughts on engineering, research, and what makes things tick — one cloud at a time.',
  pose: 'resting-chin',
  thoughts: [
    {
      step: '01',
      tag: 'The Core Driver',
      title: "What's actually hard here?",
      thought: "Before I start anything, I ask myself one question: what's actually hard here. That's why I chose computer science. This field gives you the closest thing to a blank check to turn whatever you're imagining into reality — you just need to know how to build it.",
      panel: '/about-thoughts/thought-1.jpg',
      direction: 'cloud-left',
      color: 'blue',
    },
    {
      step: '02',
      tag: 'Research & Explainability',
      title: 'The LAML Epiphany',
      thought: 'Curiosity led me straight into interpretability. My work on LAML — a retinal-disease classifier that grew into an explainability problem — became my first published research at IEEE ICNPCV 2026. If a model cannot explain itself, it is just guessing with confidence.',
      panel: '/about-thoughts/thought-2.jpg',
      direction: 'cloud-right',
      color: 'yellow',
    },
    {
      step: '03',
      tag: 'Engineering Philosophy',
      title: 'Building for Real Humans',
      thought: 'I build AI/ML systems that adapt to how someone actually wants to use them, instead of forcing one rigid, fragile workflow. Getting Groq, Llama, and two ML models to stop contradicting each other was the hard part — not drawing the architecture diagram.',
      panel: '/about-thoughts/thought-3.jpg',
      direction: 'cloud-left',
      color: 'green',
    },
    {
      step: '04',
      tag: 'Beyond the Terminal',
      title: 'Outside the Code',
      thought: 'When the laptop closes: unreasonably invested in Game of Thrones lore and discourse, and cricket is the one place my competitive streak shows up completely unfiltered.',
      panel: '/about-thoughts/thought-4.jpg',
      direction: 'cloud-right',
      color: 'pink',
    },
  ],
  skillsLabel: 'Tools & stack behind the thoughts',
  skills: [
    { label: 'Python / PyTorch', value: 90 },
    { label: 'Data Engineering', value: 85 },
    { label: 'Full-Stack (React)', value: 80 },
    { label: 'Cloud / MLOps', value: 70 },
  ],
}

export const coreStrengths = {
  eyebrow: 'Core strengths',
  heading: "Claims are cheap. Here's the proof.",
  sub: 'Hover a strength — every one of these is backed by something I actually shipped.',
  items: [
    {
      title: 'Shipping under pressure',
      story: "VitalWatch's agents had to agree with each other before the risk score ever reached a clinician. Getting Groq/Llama-3.3 reasoning and two separate ML models to stop contradicting each other was the actual hard part — not the pipeline diagram.",
      color: 'blue',
    },
    {
      title: 'Full-stack range',
      story: "The hard part of Plattr wasn't the schema — it was making a tiffin subscription, a bulk order, and a catered event feel like one app instead of three stitched together. That's a UX problem, not a database problem.",
      color: 'yellow',
    },
    {
      title: 'Data at real scale',
      story: "31.8M+ rows stops being an 'add an index' problem fast. Swapping NexusMart's query engine for DuckDB + Polars was the boring, correct fix most people skip because rewriting the pipeline is annoying.",
      color: 'pink',
    },
    {
      title: 'Reporting the truth, not the story',
      story: "NeuroPlastic's online adaptation lost to the frozen baseline (0.717 vs 0.692 AUROC). That result went in the writeup exactly as measured — no reframing it after the fact.",
      color: 'purple',
    },
    {
      title: 'Production discipline',
      story: "The gap between a fintrack demo and fintrack in production is auth, fraud detection, and an actual AWS EC2 deploy target. All three are live, not roadmap items.",
      color: 'green',
    },
    {
      title: 'Competitive by default',
      story: '234+ LeetCode, 230+ GeeksforGeeks, runner-up at the Salesforce Agentforce Hackathon 2026. Keeping score is half the motivation.',
      color: 'blue',
    },
  ],
}

export const coding = {
  eyebrow: 'Stack',
  heading: 'Tools I reach for',
  pose: 'wink-thumbsup',
  stack: ['Python', 'Java', 'TypeScript', 'React', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'DuckDB', 'Docker', 'AWS', 'Framer Motion', 'PyTorch'],
}

export const certifications = {
  eyebrow: 'Certifications & achievements',
  heading: 'Credentials, briefly',
  pose: 'fist-pump',
  items: [
    { title: 'Runner-Up', sub: 'Salesforce Agentforce Hackathon 2026', color: 'blue' },
    { title: 'Salesforce Agentforce Specialist', sub: 'Salesforce', color: 'yellow' },
    { title: 'Understanding Agentic AI', sub: 'Agent Academy', color: 'green' },
    { title: 'Discrete Mathematics', sub: 'NPTEL, IIT Ropar', color: 'pink' },
    { title: 'AWS Cloud Practitioner', sub: 'In progress', color: 'purple' },
    { title: 'VST Merit Scholarship', sub: '2023 — Present', color: 'blue' },
  ],
}

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Get in touch',
  sub: "Whether it's a role, a collaboration, or just a question about the research — here's how to reach me.",
}

export const contact = {
  pose: 'laugh-peace',
  eyebrow: "Let's talk",
  headline: "Let's build something.",
  sub: 'Open to AI/ML and full-stack roles. The fastest way to reach me:',
  handwritten: 'and make it real together',
  links: [
    { label: 'Email', value: '965aryanhanumakonda@gmail.com', href: 'mailto:965aryanhanumakonda@gmail.com', icon: 'mail' },
    { label: 'GitHub', value: 'github.com/aryan9-6-5', href: 'https://github.com/aryan9-6-5', icon: 'github' },
    { label: 'LinkedIn', value: 'linkedin.com/in/aryan965', href: 'https://linkedin.com/in/aryan965', icon: 'linkedin' },
  ],
  cta: { label: 'Get in Touch', href: 'mailto:965aryanhanumakonda@gmail.com' },
}
