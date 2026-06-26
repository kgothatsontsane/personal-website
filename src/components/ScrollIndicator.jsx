import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const dotY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="scroll-indicator-line" />
      <motion.div
        className="scroll-indicator-dot"
        style={{ top: useSpring(scrollYProgress, { stiffness: 100, damping: 30, transform: (v) => `${v * 100}%` }) }}
      />
    </motion.div>
  )
}
