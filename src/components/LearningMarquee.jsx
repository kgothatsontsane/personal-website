import { motion } from 'framer-motion'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Azure', 'AWS', 'MongoDB',
  'PostgreSQL', 'Docker', 'Git', 'REST APIs', 'GraphQL', 'CI/CD',
  'Agile', 'Figma', 'Tailwind', 'Next.js',
]

const marqueeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function LearningMarquee() {
  return (
    <div className="marquee-section">

      <div className="marquee-track">
        <motion.div
          className="marquee-content"
          variants={marqueeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[...skills, ...skills].map((skill, i) => (
            <motion.span key={i} className="marquee-tag" variants={tagVariants}>
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
