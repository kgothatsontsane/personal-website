import { useRef, useEffect, useState } from 'react'
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

function TiltCard({ children }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setStyle({
        transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`,
      })
    }

    const onLeave = () => setStyle({ transform: 'perspective(800px) rotateY(0) rotateX(0)' })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="mission-card" style={{ ...style, transition: 'transform 0.2s ease-out' }}>
      {children}
    </div>
  )
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
          <TiltCard key={m.id}>
            <div className="mission-card-image">
              <div className="mission-card-image-placeholder">[ project screenshot ]</div>
            </div>
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
          </TiltCard>
        ))}
      </motion.div>
    </motion.section>
  )
}
