import { motion } from 'framer-motion'
import { serviceRecord } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } },
}

const child = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Timeline() {
  return (
    <motion.section
      id="timeline"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="section-label" variants={child}>// SERVICE RECORD</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Field <span>Deployments</span>
      </motion.h2>

      <div className="timeline">
        {serviceRecord.map((entry, i) => (
          <motion.div key={i} className="timeline-item" variants={child}>
            <div className="timeline-dot" />
            <div className="timeline-year">{entry.year}</div>
            <div className="timeline-company">{entry.company}</div>
            <div className="timeline-role">{entry.role}</div>
            <div className="timeline-desc">{entry.description}</div>
          </motion.div>
        ))}
        <motion.div className="timeline-item" variants={child}>
          <div className="timeline-dot" />
          <div className="timeline-redacted">[ REDACTED — PRIOR SERVICE ]</div>
        </motion.div>
      </div>
    </motion.section>
  )
}
