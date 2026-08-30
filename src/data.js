export const personalInfo = {
  name: 'KGOTHATSO NTSANE',
  tagline: 'Software Engineer',
  location: 'Johannesburg, South Africa',
  missionCount: 7,
  specialties: 'Frontend, Backend, Cloud, AI Systems',
  clearance: 'LEVEL 5',
  status: 'ACTIVE',
  phone: '076-792-2638',
  email: 'nvisionfactory@gmail.com',
  bio: 'I build things that work. 7 years shipping production software across fintech, e-commerce, and enterprise. From interfaces to infrastructure. I care about systems that scale without needing a rewrite. Currently focused on AI-augmented development, type-safe architectures, and shipping faster than the next quarterly review.',
  heroImage: null,
  aboutImage: null,
}

export const projects = [
  {
    id: '001',
    codename: 'Insight',
    role: 'AI-Powered Insider Threat Detection',
    budget: '2026',
    href: 'https://insight.kgothatso.me',
    description: 'Explainable AI for insider threat detection — part of UP DigiFors (COS720). Stacking ensemble (RF + XGBoost + LightGBM + CatBoost via logistic regression meta-learner), FGSM/PGD adversarial training, SHAP + LIME dual explainability, and MITRE ATT&CK technique mapping with forensic-ready audit trails.',
    equipment: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'LIME', 'React'],
    difficulty: 5,
    status: 'LIVE',
    image: null,
  },
  {
    id: '002',
    codename: 'CyberLaw Finder',
    role: 'AI-Powered Cybercrime Law Search',
    budget: '2026',
    href: 'https://cyberlaw.kgothatso.me',
    description: 'Semantic search for cybercrime statutes across South Africa, USA, and Germany/EU — COS783 Digital Forensics. Sentence-transformers NLP finds relevant laws from plain-language incident descriptions, even without keyword overlap. 96 statutes indexed, 3 jurisdictions.',
    equipment: ['Next.js', 'Python', 'NLP', 'sentence-transformers', 'AI Search'],
    difficulty: 5,
    status: 'LIVE',
    image: null,
  },
]

export const missions = projects

export const specializations = [
  { name: 'Frontend Architecture', level: 95 },
  { name: 'Type-Safe Systems', level: 92 },
  { name: 'API Engineering', level: 88 },
  { name: 'UI & Design Systems', level: 90 },
  { name: 'Data Modelling', level: 82 },
  { name: 'AI Integration', level: 85 },
  { name: 'Cloud & DevOps', level: 78 },
  { name: 'Database Design', level: 80 },
  { name: 'Infrastructure', level: 75 },
  { name: 'Technical Leadership', level: 85 },
]

export const skillGroups = {
  engineering: {
    label: 'Engineering',
    short: 'ENG',
    skills: [
      { name: 'Frontend Architecture', level: 95 },
      { name: 'Generic Programming', level: 92 },
      { name: 'Type-Safe Systems', level: 92 },
      { name: 'API Engineering', level: 88 },
      { name: 'UI & Design Systems', level: 90 },
      { name: 'Data Modelling', level: 82 },
    ],
  },
  cybersecurity: {
    label: 'Cybersecurity',
    short: 'SEC',
    skills: [
      { name: 'Network Security', level: 88 },
      { name: 'Threat Analysis', level: 85 },
      { name: 'Vuln. Management', level: 84 },
      { name: 'Incident Response', level: 80 },
      { name: 'Security Frameworks', level: 86 },
      { name: 'Risk Assessment', level: 82 },
    ],
  },
  systems: {
    label: 'Systems',
    short: 'SYS',
    skills: [
      { name: 'Cloud & DevOps', level: 78 },
      { name: 'Database Design', level: 80 },
      { name: 'Infrastructure', level: 75 },
      { name: 'Technical Leadership', level: 85 },
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
}

export const certifications = [
  { name: 'Google Cybersecurity Professional Certificate', issuer: 'Google', year: '2026' },
  { name: 'Microsoft Azure Developer Associate (AZ-204)', issuer: 'Microsoft', year: '2026' },
  { name: 'Microsoft AI Fundamentals (AI-900)', issuer: 'Microsoft', year: '2026' },
  { name: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft', year: '2025' },
  { name: 'CompTIA A+ (Mobile Engineering)', issuer: 'CompTIA', year: '2025' },
  { name: 'Asana Workflow Specialist', issuer: 'Asana', year: '2025' },
  { name: 'Google Analytics Certification', issuer: 'Google', year: '2024' },
]

export const serviceRecord = [
  {
    year: '2024-2025',
    company: 'ALX / Holberton',
    role: 'Full Stack Software Engineering',
    description: 'Intensive program focused on backend engineering and system design. Built production applications with Python, Docker, and modern JS frameworks. Learned to think in systems, not just features.',
  },
  {
    year: '2018-2024',
    company: 'Open Mic Productions',
    role: 'Software Engineer / Digital Marketing Manager',
    description: 'The longest chapter. Built full-stack apps from concept to deployment on AWS. Led the tech stack migration, optimized performance by 25%, and ran digital marketing campaigns that grew the brand across Southern Africa.',
  },
  {
    year: '2015-2017',
    company: 'Mancor Limited',
    role: 'Web Developer / IT Support Specialist',
    description: 'Where it started. Designed websites, fixed servers, and learned that good software is built by people who understand both the code and the humans using it.',
  },
]

export const contactInfo = {
  email: 'nvisionfactory@gmail.com',
  phone: '076-792-2638',
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
