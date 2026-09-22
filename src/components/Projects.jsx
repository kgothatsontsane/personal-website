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

function TiltCard({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({})

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ transform: `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)` })
    }
    const onLeave = () => setTilt({})
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div ref={ref} className={className} style={{ ...style, ...tilt, transition: 'transform 0.2s ease-out' }}>
      {children}
    </div>
  )
}

function MissionCard({ m, large = false }) {
  const CardInner = (
    <TiltCard
      className={`mission-card group${large ? ' mission-card-large' : ''}`}
      style={{ gridRow: large ? 'span 2' : undefined }}
    >
      <div className="mission-header">
        <div className="mission-classified">
          <span className="mission-classified-badge" style={{ transform: `rotate(${[-1, 1, -0.5, 1.5][Number(m.id) % 4]}deg)` }}>TOP SECRET // REDACTED</span>
          <span className="mission-id">/// PROJECT_{m.id}</span>
        </div>
      </div>
      {m.image && (
        <div className="mission-card-image">
          <img
            src={m.image}
            alt={`${m.codename} — ${m.role}`}
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}
      <div className="mission-body">
        <div className="mission-head">
          <div>
            <div className="mission-title">{m.codename}</div>
            <div className="mission-role">{m.role}</div>
          </div>
          <div className="mission-budget">
            <div className="mission-budget-value">{m.budget}</div>
          </div>
        </div>

        <div className="mission-expand-wrap">
          <div className="mission-expand-inner">
            <div className="mission-brief"><span className="mission-brief-text">{m.description}</span></div>
            <div className="mission-equipment">
              {m.equipment.map(t => (
                <span key={t} className="mission-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mission-footer">
          <div className="mission-status">
            ▸ <span className="mission-status-dot">●</span> {m.status}
          </div>
          <div className="mission-cta-hint">{m.href ? 'Hover to unredact · Click to open →' : 'Hover to unredact →'}</div>
        </div>
      </div>
    </TiltCard>
  )

  return m.href ? (
    <a href={m.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} aria-label={`Open ${m.codename}`}>
      {CardInner}
    </a>
  ) : CardInner
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
      <motion.div className="section-label" variants={child}>// PORTFOLIO</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Selected <span>Projects</span>
      </motion.h2>

      <motion.div className="projects-grid-bento" variants={child}>
        {missions.map((m, i) => (
          <MissionCard key={m.id} m={m} large={i === 0} />
        ))}
      </motion.div>
    </motion.section>
  )
}
