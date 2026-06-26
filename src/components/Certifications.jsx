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

const issuerColors = {
  Google: '#4285f4',
  Microsoft: '#00a4ef',
  CompTIA: '#e60012',
  Asana: '#f06a6a',
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
      <motion.div className="section-label" variants={child}>// CREDENTIALS</motion.div>
      <motion.h2 className="section-title" variants={child} style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        Certified <span>& Verified</span>
      </motion.h2>

      <motion.div variants={child} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '0.75rem',
      }}>
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = issuerColors[cert.issuer] || 'rgba(255,204,0,0.3)'
              e.currentTarget.style.boxShadow = `0 0 20px ${issuerColors[cert.issuer] || 'rgba(255,204,0,0.1)'}22`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: issuerColors[cert.issuer] || 'var(--accent)',
              flexShrink: 0,
              boxShadow: `0 0 8px ${issuerColors[cert.issuer] || 'var(--accent)'}66`,
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
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: issuerColors[cert.issuer] || 'var(--accent)',
              letterSpacing: '1px',
              flexShrink: 0,
            }}>
              ✓
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
