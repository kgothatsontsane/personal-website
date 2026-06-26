import { motion } from 'framer-motion'
import { personalInfo } from '../data'

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Manifesto() {
  return (
    <motion.section
      className="manifesto"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="manifesto-bg">
        <span>THINK</span>
        <span>BUILD</span>
        <span>SHIP</span>
      </div>
      <div className="manifesto-content">
        <motion.div className="manifesto-label" variants={child}>
          // PHILOSOPHY
        </motion.div>
        <motion.blockquote className="manifesto-quote" variants={child}>
          I don't build <span className="text-stroke">websites</span>.<br />
          I build systems that<br />
          outlast the hype cycle.
        </motion.blockquote>
        <motion.p className="manifesto-sub" variants={child}>
          {personalInfo.missionCount}+ years of shipping production software. From startup MVPs to enterprise platforms.
          I write code that other engineers can read, deploy, and sleep through the night after.
        </motion.p>
      </div>
    </motion.section>
  )
}
