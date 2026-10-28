import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { blogPosts, MEMES } from '../researchData'
import BlogMeme from './BlogMeme'

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
}

function PostCard({ p, index, featured, open, setOpen }) {
  const isOpen = open === p.id
  return (
    <motion.article className={`blog-item${featured ? ' blog-featured' : ''}`} variants={child}>
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
      <BlogMeme meme={MEMES[p.id]} index={index} />
      {isOpen && (
        <div className="blog-body">
          {p.body.map((para, i) => <p key={i}>{para}</p>)}
          <div className="blog-end">— KG</div>
        </div>
      )}
    </motion.article>
  )
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

      <motion.div className="blog-board" variants={child}>
        <PostCard p={posts[0]} index={0} featured open={open} setOpen={setOpen} />
        <div className="blog-grid">
          {posts.slice(1).map((p, i) => (
            <PostCard key={p.id} p={p} index={i + 1} open={open} setOpen={setOpen} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
