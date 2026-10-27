import { motion } from 'framer-motion'
import { research } from '../researchData'

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Research() {
  return (
    <motion.section
      id="research"
      className="section"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="section-label" variants={child}>// PUBLISHED WORK</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Honours <span>Research</span>
      </motion.h2>

      <div className="research-grid">
        <motion.div className="research-main" variants={child}>
          <div className="research-card">
            <div className="research-meta-row">
              <span className="research-pill">{research.kind}</span>
              <span className="research-meta-txt">{research.school} · {research.year}</span>
            </div>
            <h3 className="research-title">{research.title}</h3>
            <p className="research-supervisor">Supervisor: <strong>{research.supervisor}</strong></p>

            <div className="research-callout">
              <span className="research-callout-label">THE CLAIM</span>
              <p>{research.thesis}</p>
            </div>
          </div>

          <div className="research-card">
            <div className="research-cards-grid">
              {research.facts.map((f) => (
                <div key={f.k} className="research-fact">
                  <span className="research-fact-k">{f.k}</span>
                  <span className="research-fact-v">{f.v}</span>
                </div>
              ))}
            </div>
          </div>

          {research.rqs.map((r) => (
            <div key={r.q} className="research-card research-rq">
              <h4 className="research-rq-q">{r.q}</h4>
              <p className="research-rq-a">{r.a}</p>
            </div>
          ))}

          <div className="research-card">
            <h4 className="research-rq-q">How it was validated</h4>
            <p className="research-rq-a">{research.validation}</p>
          </div>

          <div className="research-card research-refs">
            <span className="research-callout-label">CONTEXT</span>
            <p>{research.motivation}</p>
            <ul>
              {research.refs.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </motion.div>

        <motion.a
          className="research-poster"
          variants={child}
          href={research.poster}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View full-size research poster"
        >
          <img src={research.poster} alt={`Research poster — ${research.title}`} loading="lazy" decoding="async" />
          <span className="research-poster-hint">OPEN FULL RESOLUTION ↗</span>
        </motion.a>
      </div>

      <motion.div className="research-report" variants={child}>
        <div className="research-report-head">
          <span className="research-callout-label">REPORT DRAFT</span>
          <h4 className="research-report-title">{research.title}</h4>
          <div className="research-report-actions">
            <a className="research-report-btn" href={research.report} target="_blank" rel="noopener noreferrer">OPEN PDF ↗</a>
            <a className="research-report-btn research-report-btn--alt" href={research.report} download="kgothatso-ntsane-cos700-report-draft.pdf">DOWNLOAD ↓</a>
          </div>
        </div>
        <object
          className="research-report-frame"
          data={`${research.report}#view=FitH`}
          type="application/pdf"
          aria-label="COS700 research report draft (PDF)"
        >
          <a href={research.report} target="_blank" rel="noopener noreferrer">Open the report draft PDF</a>
        </object>
      </motion.div>
    </motion.section>
  )
}
