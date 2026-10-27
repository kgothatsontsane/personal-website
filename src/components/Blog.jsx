import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { blogPosts } from '../researchData'

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function Blog() {
  const [open, setOpen] = useState(null)
  const posts = useMemo(() => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)), [])

  return (
    <motion.section
      id="blog"
      className="section"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div className="section-label" variants={child}>// DISPATCHES</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Field <span>Notes</span>
      </motion.h2>

      <motion.p className="blog-intro" variants={child}>
        Opinions earned the hard way, on production systems — backend, devops, security,
        forensics and the occasional heresy. I change my mind when the logs do.
      </motion.p>

      <div className="blog-list">
        {posts.map((p) => {
          const isOpen = open === p.id
          return (
            <motion.article key={p.id} className="blog-item" variants={child}>
              <button
                className="blog-head"
                onClick={() => setOpen(isOpen ? null : p.id)}
                aria-expanded={isOpen}
              >
                <div className="blog-head-main">
                  <div className="blog-head-meta">
                    <span className="blog-tag">{p.tag}</span>
                    <span className="blog-date">{fmtDate(p.date)}</span>
                    <span className="blog-mins">{p.readMins} min</span>
                  </div>
                  <h3 className="blog-title">{p.title}</h3>
                  <p className="blog-excerpt">{p.excerpt}</p>
                </div>
                <span className={`blog-chevron${isOpen ? ' open' : ''}`} aria-hidden="true" />
              </button>

              {isOpen && (
                <div className="blog-body">
                  {p.body.map((para, i) => <p key={i}>{para}</p>)}
                  <div className="blog-end">— KG</div>
                </div>
              )}
            </motion.article>
          )
        })}
      </div>
    </motion.section>
  )
}
