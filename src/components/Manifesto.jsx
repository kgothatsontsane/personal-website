import { motion } from 'framer-motion'

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
          I build software that <span className="text-stroke">works</span>,<br />
          scales when it matters,<br />
          and doesn't need a rewrite<br />
          six months later.
        </motion.blockquote>
        <motion.p className="manifesto-sub" variants={child}>
          7+ years of shipping production systems across fintech, e-commerce, and enterprise.
          From React frontends to Azure cloud architectures — I turn complex problems into clean, reliable solutions.
        </motion.p>
      </div>
    </motion.section>
  )
}
