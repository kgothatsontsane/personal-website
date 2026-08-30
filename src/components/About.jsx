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
              {(() => {
                const tokens = []
                let last = 0
                const re = /("[^"]*")|\b(const|let|var|return|function)\b/g
                let m
                while ((m = re.exec(line)) !== null) {
                  if (m.index > last) tokens.push({ text: line.slice(last, m.index), color: null })
                  if (m[1]) tokens.push({ text: m[1], color: '#ffcc00' })
                  else if (m[2]) tokens.push({ text: m[2], color: '#c678dd' })
                  last = re.lastIndex
                }
                if (last < line.length) tokens.push({ text: line.slice(last), color: null })
                if (tokens.length === 0) tokens.push({ text: line, color: null })
                return tokens.map((t, j) =>
                  t.color ? <span key={j} style={{ color: t.color }}>{t.text}</span> : <span key={j}>{t.text}</span>
                )
              })()}
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
        <motion.div className="about-portrait-frame" variants={child} style={{ position: 'relative', overflow: 'hidden', minHeight: '340px' }}>
          {personalInfo.aboutImage && (
            <img
              src={personalInfo.aboutImage}
              alt=""
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14, filter: 'grayscale(0.2) contrast(1.05)' }}
            />
          )}
          <div className="about-portrait-inner" style={{ position: 'relative', zIndex: 1 }}>
            <div className="about-portrait-pattern" style={{ opacity: 0.12 }} />
            <span className="about-badge" style={{ transform: 'rotate(-2deg)' }}>DOSSIER</span>
            <div className="about-portrait-id" style={{ opacity: 0, pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1.25rem' }}>
            {[
              { src: '/images/gallery-1005.jpg', alt: 'City panorama — Johannesburg' },
              { src: '/images/gallery-1006.jpg', alt: 'Portrait — smiling' },
              { src: '/images/gallery-1017.jpg', alt: 'Mandela statue — Union Buildings' },
            ].map(img => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                width="400"
                height="500"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block', border: '1px solid var(--border)', borderRadius: '4px', filter: 'grayscale(0.15)' }}
              />
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--fg-dim)', letterSpacing: '1px', marginTop: '0.4rem', textAlign: 'right' }}>Union Buildings · Pretoria — personal · Ntsakosi Snaps</div>
        </motion.div>
      </div>
    </motion.section>
  )
}
