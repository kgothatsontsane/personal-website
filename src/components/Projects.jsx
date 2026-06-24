import { motion } from 'framer-motion'
import { missions } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.12 } },
}

const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function stars(n) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? 'var(--accent)' : 'var(--border-light)' }}>★</span>
  ))
}

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="section-label" variants={child}>// MISSION DOSSIER</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Classified <span>Operations</span>
      </motion.h2>

      <motion.div className="projects-grid" variants={child}>
        {missions.map((m) => (
          <div key={m.id} className="mission-card">
            <div className="mission-tape" />
            <div className="mission-watermark">C</div>
            <div className="mission-header">
              <div className="mission-classified">
                <span className="mission-classified-badge">TOP SECRET</span>
                <span className="mission-id">/// MISSION_{m.id}</span>
              </div>
              <div className="mission-clearance">
                CLEARANCE: <span>LEVEL {m.difficulty + 1}</span>
              </div>
            </div>
            <div className="mission-body">
              <div className="mission-head">
                <div>
                  <div className="mission-title">{m.codename}</div>
                  <div className="mission-role">{m.role}</div>
                </div>
                <div className="mission-budget">
                  <div className="mission-budget-value">{m.budget}</div>
                  <div className="mission-budget-label">Budget</div>
                </div>
              </div>
              <div className="mission-brief">{m.description}</div>
              <div className="mission-equipment">
                {m.equipment.map(t => (
                  <span key={t} className="mission-tag">{t}</span>
                ))}
              </div>
              <div className="mission-footer">
                <div className="mission-status">
                  ▸ <span className="mission-status-dot">●</span> MISSION {m.status}
                </div>
                <button className="mission-cta">View Brief →</button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}
