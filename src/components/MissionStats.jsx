import { motion } from 'framer-motion'
import { missions, certifications, specializations } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const stats = [
  { label: 'Projects Completed', value: missions.filter(m => m.status === 'COMPLETE').length, suffix: '' },
  { label: 'Skills Mastered', value: specializations.length, suffix: '' },
  { label: 'Certifications', value: certifications.length, suffix: '' },
  { label: 'Years Experience', value: 7, suffix: '+' },
]

function AnimatedNumber({ value, suffix = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {value}{suffix}
    </motion.span>
  )
}

export default function MissionStats() {
  return (
    <motion.section
      className="section"
      style={{ minHeight: 'auto', padding: '3rem 2rem' }}
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={child} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={child}
            style={{
              textAlign: 'center',
              padding: '1.5rem 1rem',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,204,0,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              color: 'var(--accent)',
              lineHeight: 1,
            }}>
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--fg-muted)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
