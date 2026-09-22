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

const nowRows = [
  { k: 'BASED', v: personalInfo.location },
  { k: 'FOCUS', v: personalInfo.specialties },
  { k: 'CURRENTLY', v: 'BScHons @ UP — shipping Insight & CyberLaw Finder' },
]

const principles = [
  { num: '01', title: 'Systems over features', body: 'Every line of code is a liability. I write less, so the codebase carries more.' },
  { num: '02', title: 'Ship to learn', body: 'The fastest way to know if it works is to put it in front of real users. Then iterate.' },
  {
    num: '03',
    title: 'Readability wins',
    body: 'Code is read 10x more than it is written. Optimise for the next engineer, not the compiler.',
    note: 'In generic programming, the balance flips — you optimise for the compiler and type system to generate the right code. Abstraction earns its keep there.',
  },
  { num: '04', title: 'Compounding craft', body: 'Good systems get cheaper to extend over time. Bad systems compound technical debt.' },
]

export default function Manifesto() {
  return (
    <motion.section
      id="philosophy"
      className="manifesto"
      variants={stagger}
      initial="visible"
    >
      <div className="manifesto-bg">
        <span>THINK</span>
        <span>BUILD</span>
        <span>SHIP</span>
      </div>

      <div className="manifesto-inner">
        <div className="manifesto-hero">
          <motion.h2 className="manifesto-quote" variants={child}>
            I don't write <span className="text-stroke">code</span>.<br />
            I build systems<br />
            that <span className="text-fill">compound</span>.
          </motion.h2>

          <motion.div className="manifesto-now" variants={child}>
            {nowRows.map((r) => (
              <div key={r.k} className="manifesto-now-row">
                <span className="manifesto-now-key">{r.k}</span>
                <span className="manifesto-now-val">{r.v}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="manifesto-grid">
          {principles.map((p) => (
            <motion.div key={p.num} className="manifesto-principle" variants={child}>
              <div className="manifesto-principle-num">{p.num}</div>
              <div className="manifesto-principle-title">
                {p.title}
                {p.note && (
                  <span className="manifesto-note-wrap" tabIndex={0} aria-label="More info">
                    <span className="manifesto-note-trigger">ⓘ</span>
                    <span className="manifesto-note-popover" role="tooltip">{p.note}</span>
                  </span>
                )}
              </div>
              <div className="manifesto-principle-body">{p.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
