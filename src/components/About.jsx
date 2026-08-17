import { motion } from 'framer-motion'
import { personalInfo } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const codeSnippet = `const developer = {
  name: "${personalInfo.name}",
  role: "${personalInfo.tagline}",
  location: "${personalInfo.location}",
  experience: "7+ years",
  stack: ["Frontend", "Backend", "Cloud", "AI"],
  superpower: "Making complex things simple",
  status: () => "OPEN TO WORK",
};`

const codeLines = codeSnippet.split('\n')

function CodeBlock() {
  return (
    <div style={{
      marginTop: '1.5rem',
      background: '#0c0c14',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '6px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        <span style={{
          marginLeft: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          color: 'var(--fg-dim)',
          letterSpacing: '1px',
        }}>
          developer.ts
        </span>
      </div>
      <pre style={{
        margin: 0,
        padding: '1rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        lineHeight: 1.7,
        overflowX: 'auto',
        color: 'var(--fg-secondary)',
      }}>
        {codeLines.map((line, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <span style={{
              width: '2rem',
              textAlign: 'right',
              paddingRight: '1rem',
              color: 'var(--fg-dim)',
              userSelect: 'none',
              flexShrink: 0,
            }}>
              {i + 1}
            </span>
            <span>
              {line
                .replace(/"([^"]+)"/g, '<span style="color:#ffcc00">"$1"</span>')
                .replace(/\b(const|let|var|return|function)\b/g, '<span style="color:#c678dd">$1</span>')
                .split(/(<span[^>]*>.*?<\/span>)/)
                .map((part, j) => {
                  if (part.startsWith('<span')) {
                    return <span key={j} dangerouslySetInnerHTML={{ __html: part }} />
                  }
                  return <span key={j}>{part}</span>
                })
              }
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}

export default function About() {
  return (
    <motion.section
      id="about"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 className="section-title" variants={child}>
        The <span>Engineer</span>
      </motion.h2>

      <div className="about-grid">
        <motion.div className="about-portrait-frame" variants={child}>
          <div className="about-portrait-inner">
            <div className="about-portrait-pattern" />
            <span className="about-badge" style={{ transform: 'rotate(-2deg)' }}>DOSSIER</span>
            <div className="about-portrait-id">
              <div className="about-portrait-id-row">
                <span>NAME</span>
                <span>{personalInfo.name}</span>
              </div>
              <div className="about-portrait-id-row">
                <span>CLEARANCE</span>
                <span>{personalInfo.clearance}</span>
              </div>
              <div className="about-portrait-id-row">
                <span>STATUS</span>
                <span className="about-portrait-status">
                  <span className="about-portrait-dot" />
                  {personalInfo.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={child}>
          <p className="about-bio">{personalInfo.bio}</p>

          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-label">Location</div>
              <div className="about-stat-value">{personalInfo.location}</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-label">Specialty</div>
              <div className="about-stat-value">{personalInfo.specialties}</div>
            </div>
          </div>

          <CodeBlock />
        </motion.div>
      </div>
    </motion.section>
  )
}
