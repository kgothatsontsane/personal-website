import { motion } from 'framer-motion'
import { personalInfo } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    <motion.section
      id="about"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="section-label" variants={child}>// AGENT PROFILE</motion.div>
      <motion.h2 className="section-title" variants={child}>
        About <span>the Agent</span>
      </motion.h2>

      <div className="about-grid">
        <motion.div className="about-portrait-frame" variants={child}>
          <span className="about-badge">CLASSIFIED</span>
          <span className="hero-portrait-placeholder">[ portrait ]</span>
        </motion.div>

        <motion.div variants={child}>
          <p className="about-bio">{personalInfo.bio}</p>

          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-label">Location</div>
              <div className="about-stat-value">{personalInfo.location}</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-label">Clearance</div>
              <div className="about-stat-value">{personalInfo.clearance}</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-label">Status</div>
              <div className="about-stat-value">{personalInfo.status}</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-label">Specialty</div>
              <div className="about-stat-value">{personalInfo.specialties}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
