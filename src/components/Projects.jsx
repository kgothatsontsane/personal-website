import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { missions } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.12 } },
}

const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function TiltCard({ children, expanded, onToggle }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  useEffect(() => {
    const el = ref.current
    if (!el || expanded) return

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
  }, [expanded])

  return (
    <div ref={ref} className="mission-card" style={{ ...style, transition: 'transform 0.2s ease-out' }}>
      {children}
    </div>
  )
}

function MissionCard({ m }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <TiltCard expanded={expanded}>
      <div className="mission-card-image">
        <div className="mission-card-image-placeholder">[ project screenshot ]</div>
      </div>
      <div className="mission-tape" />
      <div className="mission-watermark">C</div>
      <div className="mission-header">
        <div className="mission-classified">
          <span className="mission-classified-badge" style={{ transform: `rotate(${-1 + Math.random() * 2}deg)` }}>TOP SECRET</span>
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
          <button className="mission-cta" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Close Brief −' : 'View Brief →'}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px dashed var(--border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                lineHeight: 1.8,
                color: 'var(--fg-secondary)',
              }}>
                <div style={{ color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                  ▸ CASE FILE — MISSION {m.id}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--fg-dim)' }}>ROLE:</span> {m.role}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--fg-dim)' }}>BUDGET:</span> {m.budget}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--fg-dim)' }}>STATUS:</span> <span style={{ color: 'var(--accent)' }}>{m.status}</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--fg-dim)' }}>CLEARANCE:</span> LEVEL {m.difficulty + 1}
                </div>
                <div>
                  <span style={{ color: 'var(--fg-dim)' }}>EQUIPMENT:</span> {m.equipment.join(' · ')}
                </div>
                <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--bg)', border: '1px solid var(--border)', fontSize: '0.6rem', color: 'var(--fg-dim)' }}>
                  This file is classified under directive 7.3.1. Unauthorized access is prohibited.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TiltCard>
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
          <MissionCard key={m.id} m={m} />
        ))}
      </motion.div>
    </motion.section>
  )
}
