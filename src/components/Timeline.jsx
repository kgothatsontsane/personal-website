import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { serviceRecord } from '../data'

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.section
      id="timeline"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      ref={containerRef}
    >
      <motion.div className="section-label" variants={child}>// EXPERIENCE</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Where I've <span>Worked</span>
      </motion.h2>

      <div className="timeline-h" ref={containerRef}>
        {/* Animated progress line */}
        <motion.div className="timeline-h-progress" style={{ width: lineWidth }} />

        <div className="timeline-h-track">
          {serviceRecord.map((entry, i) => (
            <motion.div
              key={i}
              className="timeline-h-card"
              variants={child}
            >
              <div className="timeline-h-dot" />
              <div className="timeline-h-year">{entry.year}</div>
              <div className="timeline-h-company">{entry.company}</div>
              <div className="timeline-h-role">{entry.role}</div>
              <div className="timeline-h-desc">{entry.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
