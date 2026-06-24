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
  visible: { transition: { staggerChildren: 0.1 } },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function StatBar({ name, level, index }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), index * 100)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-head">
        <span className="stat-name">{name}</span>
        <span className="stat-level">{levels[getLevel(level)]}</span>
      </div>
      <div className="stat-bar-track">
        <div
          className={`stat-bar-fill${animated ? ' animated' : ''}`}
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
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

      <motion.div className="stats-list" variants={child}>
        {specializations.map((s, i) => (
          <StatBar key={s.name} name={s.name} level={s.level} index={i} />
        ))}
      </motion.div>
    </motion.section>
  )
}
