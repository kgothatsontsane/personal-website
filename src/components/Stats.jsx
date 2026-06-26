import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { specializations } from '../data'

const levels = ['NOVICE', 'OPERATIVE', 'SPECIALIST', 'ELITE']
function getLevel(pct) {
  if (pct >= 90) return 3
  if (pct >= 75) return 2
  if (pct >= 60) return 1
  return 0
}

const topSkills = specializations.slice(0, 6)
const restSkills = specializations.slice(6)

function RadarChart({ skills }) {
  const [hovered, setHovered] = useState(null)
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const maxR = 110
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
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', maxWidth: '320px' }}>
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
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
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

      {/* Tooltip */}
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
          {skills[hovered].name}: {skills[hovered].level}% — {levels[getLevel(skills[hovered].level)]}
        </div>
      )}
    </div>
  )
}

function CountUp({ target, suffix = '', delay = 0 }) {
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
  }, [target, delay])

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

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <RadarChart skills={topSkills} />
        </div>

        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {topSkills.map((s, i) => (
              <div key={s.name}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-secondary)', marginBottom: '4px' }}>
                  {s.name}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', lineHeight: 1 }}>
                  <CountUp target={s.level} suffix="%" delay={i * 150} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--fg-dim)', letterSpacing: '1px' }}>
                  {levels[getLevel(s.level)]}
                </div>
              </div>
            ))}
          </div>

          {restSkills.length > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--fg-dim)', letterSpacing: '2px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Additional Skills
              </div>
              {restSkills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 100} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
