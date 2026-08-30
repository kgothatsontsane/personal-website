import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillGroups } from '../data'

const levels = ['NOVICE', 'OPERATIVE', 'SPECIALIST', 'ELITE']
function getLevel(pct) {
  if (pct >= 90) return 3
  if (pct >= 75) return 2
  if (pct >= 60) return 1
  return 0
}

const groupKeys = ['engineering', 'cybersecurity', 'systems']

function RadarChart({ skills }) {
  const [hovered, setHovered] = useState(null)
  const size = 380
  const cx = size / 2
  const cy = size / 2
  const maxR = 150
  const n = skills.length
  const angleStep = (2 * Math.PI) / n
  const rings = [25, 50, 75, 100]

  const getPoint = (i, r) => {
    const angle = i * angleStep - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const dataPoints = skills.map((s, i) => getPoint(i, (s.level / 100) * maxR))

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`-30 -10 ${size + 60} ${size + 20}`} style={{ width: '100%', maxWidth: '520px', overflow: 'visible' }}>
        {rings.map((r) => (
          <polygon
            key={r}
            points={Array.from({ length: n }, (_, i) => {
              const p = getPoint(i, r)
              return `${p.x},${p.y}`
            }).join(' ')}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        {skills.map((_, i) => {
          const p = getPoint(i, maxR)
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth="0.5" opacity="0.3" />
        })}
        <polygon
          points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
          fill="rgba(255, 204, 0, 0.08)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hovered === i ? 6 : 4}
            fill={hovered === i ? 'var(--accent)' : 'var(--accent)'}
            stroke="var(--bg)"
            strokeWidth="1.5"
            style={{ cursor: 'pointer', transition: 'r 0.2s ease' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        {skills.map((s, i) => {
          const p = getPoint(i, maxR + 22)
          const angle = i * angleStep - Math.PI / 2
          const cosA = Math.cos(angle)
          let anchor = 'middle'
          if (cosA > 0.3) anchor = 'start'
          else if (cosA < -0.3) anchor = 'end'
          return (
            <text
              key={i}
              x={p.x + (cosA > 0.3 ? 4 : cosA < -0.3 ? -4 : 0)}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={hovered === i ? 'var(--accent)' : 'var(--fg-secondary)'}
              fontSize="9"
              fontFamily="var(--font-mono)"
              style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {s.name}
            </text>
          )
        })}
      </svg>

      {hovered !== null && (
        <div className="radar-tooltip" style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: '4px 10px',
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}>
          {skills[hovered].name}: {skills[hovered].level}% / {levels[getLevel(skills[hovered].level)]}
        </div>
      )}
    </div>
  )
}

function CountUp({ target, suffix = '', delay = 0, trigger }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now() + delay
          const tick = () => {
            const now = Date.now()
            if (now < startTime) { requestAnimationFrame(tick); return }
            const progress = Math.min((now - startTime) / 1500, 1)
            setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, delay, trigger])

  // reset when group changes
  useEffect(() => { setCount(0) }, [trigger])

  return <span ref={ref}>{count}{suffix}</span>
}

function SkillBar({ name, level, delay }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-secondary)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>{level}%</span>
      </div>
      <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: 'var(--accent)', borderRadius: '2px',
          width: animated ? `${level}%` : '0%', transition: 'width 1.2s var(--ease-out)',
        }} />
      </div>
    </div>
  )
}

export default function Stats() {
  const [active, setActive] = useState('engineering')
  const group = skillGroups[active]
  const skills = group.skills

  return (
    <motion.section
      id="stats"
      className="section"
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="section-label">// SKILLSET</div>
      <h2 className="section-title">
        What I <span>Work With</span>
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }} role="tablist" aria-label="Skill categories">
        {groupKeys.map(key => {
          const g = skillGroups[key]
          const isActive = active === key
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(key)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '8px 14px',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                background: isActive ? 'rgba(255,204,0,0.08)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderRadius: '4px',
                minHeight: '36px',
              }}
            >
              {g.label} · {g.short}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="stats-flex"
          style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}
        >
          <div className="radar-wrap" style={{ flex: '0 0 50%', minWidth: '320px' }}>
            <RadarChart skills={skills} />
          </div>

          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--fg-dim)', letterSpacing: '2px', marginBottom: '1rem', textTransform: 'uppercase' }}>
              {group.label} — {skills.length} skills
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-secondary)', marginBottom: '4px' }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', lineHeight: 1 }}>
                    <CountUp target={s.level} suffix="%" delay={i * 80} trigger={active} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--fg-dim)', letterSpacing: '1px' }}>
                    {levels[getLevel(s.level)]}
                  </div>
                </div>
              ))}
            </div>

            {active === 'cybersecurity' && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-muted)', lineHeight: 1.6, borderLeft: '2px solid var(--accent)', paddingLeft: '0.75rem' }}>
                Certified: Google Cybersecurity Professional. Focus on network defense, threat intel, and risk-based hardening.
              </div>
            )}
            {active === 'engineering' && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-muted)', lineHeight: 1.6, borderLeft: '2px solid var(--border)', paddingLeft: '0.75rem' }}>
                Ship type-safe systems. Frontend to API — the stack that compounds.
              </div>
            )}
            {active === 'systems' && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-muted)', lineHeight: 1.6, borderLeft: '2px solid var(--border)', paddingLeft: '0.75rem' }}>
                Cloud-native, infra as code, and the boring work that keeps things up.
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}
