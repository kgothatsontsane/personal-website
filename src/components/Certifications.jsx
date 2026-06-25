import { motion } from 'framer-motion'
import { certifications } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.06 } },
}

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function Certifications() {
  return (
    <motion.section
      id="certifications"
      className="section"
      style={{ minHeight: 'auto', padding: '4rem 2rem' }}
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="section-label" variants={child}>// CLEARANCE DOCUMENTS</motion.div>
      <motion.h2 className="section-title" variants={child} style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        Certifications <span>& Licenses</span>
      </motion.h2>

      <motion.div variants={child} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.75rem',
      }}>
        {certifications.map((cert, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,204,0,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
              flexShrink: 0,
              boxShadow: '0 0 6px rgba(255,204,0,0.4)',
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--fg)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {cert.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'var(--fg-dim)',
                letterSpacing: '0.5px',
              }}>
                {cert.issuer} · {cert.year}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}
