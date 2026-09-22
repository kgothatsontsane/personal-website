export const personalInfo = {
  name: 'KGOTHATSO NTSANE',
  tagline: 'Software Engineer',
  location: 'Pretoria, South Africa',
  missionCount: 7,
  specialties: 'Security, FullStack, Cloud & AI Systems',
  status: 'ACTIVE',
  phone: '082-844-7650',
  email: 'nvisionfactory@gmail.com',
  bio: 'Self-taught developer turned software engineer. I take pride in building things that work. 7 years shipping production software across media and entertainment, e-commerce, and enterprise — from interfaces to infrastructure, secured by design, for clients including property developers, urban planners, property valuers, the mining industry, architects, and engineers. I threat-model before I code, and build systems designed to scale cleanly and stand up to real-world attack. Currently focused on AI-augmented and security-hardened development, type-safe and generic architectures, and shipping faster — and safer — than the next quarterly review. Comfortable owning work end-to-end solo or delivering inside a team.',
  heroImage: '/images/hero.jpg',
  aboutImage: '/images/portrait.jpg',
}

export const projects = [
  {
    id: '001',
    codename: 'Insight',
    role: 'AI-Powered Insider Threat Detection',
    budget: '2026',
    href: 'https://insight.kgothatso.me',
    description: 'Explainable AI for insider threat detection. Stacking ensemble (RF + XGBoost + LightGBM + CatBoost via logistic regression meta-learner), FGSM/PGD adversarial training, SHAP + LIME dual explainability, and MITRE ATT&CK technique mapping with forensic-ready audit trails.',
    equipment: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'LIME', 'React'],
    difficulty: 5,
    status: 'LIVE',
    image: '/images/insight.jpg',
  },
  {
    id: '002',
    codename: 'CyberLaw Finder',
    role: 'AI-Powered Cybercrime Law Search',
    budget: '2026',
    href: 'https://cyberlaw.kgothatso.me',
    description: 'Semantic search for cybercrime statutes across South Africa, USA, and Germany/EU. Sentence-transformers NLP finds relevant laws from plain-language incident descriptions, even without keyword overlap. 96 statutes indexed, 3 jurisdictions.',
    equipment: ['Next.js', 'Python', 'NLP', 'sentence-transformers', 'AI Search'],
    difficulty: 5,
    status: 'LIVE',
    image: '/images/cyberlaw.jpg',
  },
]

export const missions = projects

export const specializations = [
  { name: 'Frontend Architecture', level: 97 },
  { name: 'Type-Safe Systems', level: 95 },
  { name: 'API Engineering', level: 92 },
  { name: 'UI & Design Systems', level: 94 },
  { name: 'Data Modelling', level: 88 },
  { name: 'AI Integration', level: 85 },
  { name: 'Cloud', level: 95 },
  { name: 'Database Design', level: 96 },
  { name: 'Infrastructure', level: 94 },
  { name: 'Technical Leadership', level: 97 },
]

export const skillGroups = {
  engineering: {
    label: 'Engineering',
    short: 'ENG',
    skills: [
      { name: 'Frontend Architecture', level: 97 },
      { name: 'Generic Programming', level: 95 },
      { name: 'Type-Safe Systems', level: 95 },
      { name: 'API Engineering', level: 92 },
      { name: 'UI & Design Systems', level: 94 },
      { name: 'Data Modelling', level: 88 },
      { name: 'Performance Optimization', level: 90 },
      { name: 'Testing & QA', level: 87 },
      { name: 'Microservices', level: 89 },
      { name: 'Backend Development', level: 90 },
      { name: 'DevOps', level: 88 },
    ],
  },
  cybersecurity: {
    label: 'Cybersecurity',
    short: 'SEC',
    skills: [
      { name: 'Network Security', level: 93 },
      { name: 'Threat Analysis', level: 90 },
      { name: 'Vuln. Management', level: 89 },
      { name: 'Incident Response', level: 86 },
      { name: 'Security Frameworks', level: 91 },
      { name: 'Risk Assessment', level: 88 },
      { name: 'Digital Forensics', level: 88 },
      { name: 'Penetration Testing', level: 82 },
      { name: 'Security Auditing', level: 86 },
    ],
  },
  systems: {
    label: 'Systems',
    short: 'SYS',
    skills: [
      { name: 'Cloud', level: 95 },
      { name: 'Database Design', level: 96 },
      { name: 'Infrastructure', level: 94 },
      { name: 'Technical Leadership', level: 97 },
      { name: 'Container Orchestration', level: 90 },
      { name: 'Monitoring & Observability', level: 88 },
      { name: 'System Architecture', level: 94 },
    ],
  },
  ai: {
    label: 'AI Systems',
    short: 'AI',
    skills: [
      { name: 'Loop Engineering', level: 90 },
      { name: 'Agentic Systems', level: 88 },
      { name: 'AI Integration', level: 85 },
      { name: 'LLM Architecture', level: 82 },
      { name: 'Prompt Engineering', level: 88 },
      { name: 'Generative AI', level: 84 },
    ],
  },
  meta: {
    label: 'Meta Skills',
    short: 'META',
    skills: [
      { name: 'Leading Self', level: 90 },
      { name: 'Leading Others', level: 84 },
      { name: 'Critical Thinking', level: 88 },
      { name: 'Entrepreneurial Thinking', level: 85 },
      { name: 'Quantitative Reasoning', level: 82 },
      { name: 'Communicating for Impact', level: 89 },
      { name: 'Managing Complex Tasks', level: 86 },
      { name: 'Navigating Tech Ecosystems', level: 84 },
    ],
  },
}

export const certifications = [
  { name: 'Google Cybersecurity Professional Certificate', issuer: 'Google', year: '2026' },
  { name: 'Microsoft Azure Developer Associate (AZ-204)', issuer: 'Microsoft', year: '2026' },
  { name: 'Microsoft AI Fundamentals (AI-900)', issuer: 'Microsoft', year: '2026' },
  { name: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft', year: '2025' },
  { name: 'CompTIA A+ (Mobile Engineering)', issuer: 'CompTIA', year: '2025' },
  { name: 'Asana Workflow Specialist', issuer: 'Asana', year: '2025' },
  { name: 'Google Analytics Certification', issuer: 'Google', year: '2024' },
  { name: 'Full Stack Software Engineering (Back End)', issuer: 'ALX | Holberton', year: '2025' },
]

export const education = [
  { name: "BScHons in Computer Science (currently completing)", issuer: 'University of Pretoria', year: '2026' },
  { name: "Bachelor's Degree in Computing", issuer: 'University of South Africa', year: '2024' },
]

export const serviceRecord = [
  {
    year: '2024 — 2025',
    company: 'Nazwo Digital',
    role: 'Full Stack Software Engineer — Backend Focus',
    location: 'Remote · Johannesburg',
    description: 'Backend-focused engineering role on a delivery team. Shipped production-grade apps with Python, Docker, and modern JavaScript — going through design reviews, standups, and shared ownership the way real teams work.',
    highlights: ['Shipped 5+ production apps', 'Design reviews & agile delivery', 'System design & API architecture'],
    stack: ['Python', 'JavaScript', 'React', 'Node.js', 'Docker', 'PostgreSQL'],
    status: 'COMPLETE',
  },
  {
    year: '2018 — 2024',
    company: 'Open Mic Productions',
    role: 'Full-Stack Engineer / DevOps',
    location: 'Southern Africa',
    description: 'The longest chapter. Built and maintained full-stack apps serving the media and entertainment industry across Southern Africa. Moved a monolith to microservices on AWS, cut API response times 25% via query optimization + caching, and helped junior engineers find their footing through pairing and reviews.',
    highlights: ['Monolith → microservices on AWS', 'API latency −25%', 'Paired with & mentored juniors'],
    stack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Git', 'CI/CD'],
    status: 'COMPLETE',
  },
  {
    year: '2015 — 2017',
    company: 'SubbieNet (Pty) Ltd.',
    role: 'System Admin',
    location: 'Pretoria',
    description: 'First IT role. Kept servers and office networks running, helped staff across departments with day-to-day tech issues (−40% resolution time through ticketing), and rebuilt the company site — this is where I learnt that great software = people + code.',
    highlights: ['Day-to-day support across departments', 'Server & network admin (Windows/Linux)', 'Ticketing −40% resolution time'],
    stack: ['Windows Server', 'Linux', 'Networking', 'IT Support', 'Ticketing Systems'],
    status: 'COMPLETE',
  },
]

export const contactInfo = {
  email: 'nvisionfactory@gmail.com',
  phone: '082-844-7650',
  github: null,
  linkedin: 'linkedin.com/in/kgothatsontsane',
  twitter: null,
}

export const loadingMessages = [
  'Compiling portfolio assets...',
  'Initializing dev environment...',
  'Loading project data...',
  'Establishing connection...',
  'Calibrating display...',
  'Syncing experience...',
  'Ready to ship.',
]
