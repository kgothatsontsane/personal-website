import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechCorp',
    text: 'Delivered the platform 2 weeks ahead of schedule. The code quality was exceptional: clean, well-tested, and easy to maintain.',
    clearance: 'LEVEL 5',
  },
  {
    name: 'James Mokoena',
    role: 'Founder, StartupXYZ',
    text: 'Transformed our idea into a production-ready product. Deep React expertise and great communication throughout.',
    clearance: 'LEVEL 4',
  },
  {
    name: 'Priya Patel',
    role: 'Lead Engineer, AgencyCo',
    text: 'The best frontend developer I have worked with. Fast, reliable, and genuinely cares about the end user experience.',
    clearance: 'LEVEL 5',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="section-label" variants={child}>// TESTIMONIALS</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Mission <span>Evaluations</span>
      </motion.h2>

      <motion.div variants={child} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            padding: '1.5rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40px',
              height: '4px',
              background: 'var(--accent)',
              opacity: 0.4,
            }} />
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: 'var(--fg-dim)',
              letterSpacing: '1px',
              marginBottom: '0.75rem',
            }}>
              CLEARANCE: <span style={{ color: 'var(--accent)' }}>{t.clearance}</span>
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--fg-secondary)',
              lineHeight: 1.7,
              marginBottom: '1rem',
              fontStyle: 'italic',
            }}>
              "{t.text}"
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                letterSpacing: '1px',
                color: 'var(--fg)',
              }}>
                {t.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'var(--fg-muted)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {t.role}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}
