import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { serviceRecord } from '../data'

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 30%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.section
      id="timeline"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      ref={ref}
    >
      <motion.div className="section-label" variants={child}>// EXPERIENCE</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Where I've <span>Worked</span>
      </motion.h2>
      <motion.p variants={child} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', maxWidth: '640px', lineHeight: 1.7, marginBottom: '3rem' }}>
        Three chapters. Each one shipped work that people actually used — from fixing servers to scaling platforms.
      </motion.p>

      <div className="timeline-v-wrap" ref={ref}>
        <div className="timeline-v-line" aria-hidden="true">
          <motion.div className="timeline-v-progress" style={{ height }} />
        </div>

        <div className="timeline-v-track">
          {serviceRecord.map((e, i) => (
            <motion.div key={i} className="timeline-v-card" variants={child}>
              <div className="timeline-v-dot" aria-hidden="true">
                <span className="timeline-v-dot-core" />
                <span className="timeline-v-dot-ring" />
              </div>

              <div className="timeline-v-year">{e.year}</div>
              <div className="timeline-v-company">{e.company}</div>
              <div className="timeline-v-role">{e.role}</div>
              {e.location && <div className="timeline-v-loc">{e.location}</div>}
              <p className="timeline-v-desc">{e.description}</p>

              {e.highlights && (
                <ul className="timeline-v-highlights">
                  {e.highlights.map(h => (
                    <li key={h}><span className="timeline-v-check">✓</span> {h}</li>
                  ))}
                </ul>
              )}

              {e.stack && (
                <div className="timeline-v-stack">
                  {e.stack.map(t => (
                    <span key={t} className="timeline-v-tag">{t}</span>
                  ))}
                </div>
              )}

              <div className="timeline-v-foot">
                <span className="timeline-v-status"><span className="timeline-v-status-dot" /> {e.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
