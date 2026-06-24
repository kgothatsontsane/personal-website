import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { specializations } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08 } },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const levels = ['NOVICE', 'OPERATIVE', 'SPECIALIST', 'ELITE']
function getLevel(pct) {
  if (pct >= 90) return 3
  if (pct >= 75) return 2
  if (pct >= 60) return 1
  return 0
}

function RadarChart({ skills }) {
  const size = 260
  const cx = size / 2
  const cy = size / 2
  const maxR = 100
  const n = skills.length
  const angleStep = (2 * Math.PI) / n
  const rings = [25, 50, 75, 100]

  const getPoint = (i, r) => {
    const angle = i * angleStep - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const dataPoints = skills.map((s, i) => getPoint(i, (s.level / 100) * maxR))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', maxWidth: '320px' }}>
      {/* Rings */}
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

      {/* Axes */}
      {skills.map((_, i) => {
        const p = getPoint(i, maxR)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth="0.5" opacity="0.3" />
      })}

      {/* Data polygon */}
      <polygon
        points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="rgba(255, 204, 0, 0.08)"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)" stroke="var(--bg)" strokeWidth="1" />
      ))}

      {/* Labels */}
      {skills.map((s, i) => {
        const p = getPoint(i, maxR + 20)
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--fg-secondary)"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            {s.name}
          </text>
        )
      })}
    </svg>
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
          let start = 0
          const duration = 1500
          const startTime = Date.now() + delay
          const tick = () => {
            const now = Date.now()
            if (now < startTime) { requestAnimationFrame(tick); return }
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
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

export default function Stats() {
  return (
    <motion.section
      id="stats"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="section-label" variants={child}>// SPECIALIZATIONS</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Agent <span>Competencies</span>
      </motion.h2>

      <motion.div variants={child} style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <RadarChart skills={specializations} />

        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {specializations.map((s, i) => (
              <div key={s.name}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--fg-secondary)',
                  marginBottom: '4px',
                }}>
                  {s.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}>
                  <CountUp target={s.level} suffix="%" delay={i * 150} />
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--fg-dim)',
                  letterSpacing: '1px',
                }}>
                  {levels[getLevel(s.level)]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
