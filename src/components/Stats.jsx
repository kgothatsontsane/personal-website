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

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08 } },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const CIRCLE_RADIUS = 42
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

function StatCircle({ name, level, index }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), index * 120)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  const offset = CIRCLE_CIRCUMFERENCE - (level / 100) * CIRCLE_CIRCUMFERENCE

  return (
    <div className="stat-circle-item" ref={ref}>
      <div className="stat-circle">
        <svg viewBox="0 0 100 100">
          <circle className="stat-circle-bg" cx="50" cy="50" r={CIRCLE_RADIUS} />
          <circle
            className="stat-circle-fill"
            cx="50" cy="50" r={CIRCLE_RADIUS}
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={animated ? offset : CIRCLE_CIRCUMFERENCE}
          />
        </svg>
        <div className="stat-circle-value">{animated ? level : 0}%</div>
      </div>
      <div className="stat-circle-name">{name}</div>
      <div className="stat-circle-level">{levels[getLevel(level)]}</div>
    </div>
  )
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

      <motion.div className="stats-grid" variants={child}>
        {specializations.map((s, i) => (
          <StatCircle key={s.name} name={s.name} level={s.level} index={i} />
        ))}
      </motion.div>
    </motion.section>
  )
}
