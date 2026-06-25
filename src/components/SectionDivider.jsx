import { motion } from 'framer-motion'

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function SectionDivider() {
  return (
    <motion.div
      className="section-divider-animated"
      variants={dividerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="divider-line" />
      <div className="divider-diamond" />
      <div className="divider-line" />
    </motion.div>
  )
}
