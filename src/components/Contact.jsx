import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactInfo, personalInfo } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'api', label: 'API / Backend' },
  { value: 'fullstack', label: 'Full-Stack Build' },
  { value: 'consult', label: 'Consulting / Code Review' },
  { value: 'contract', label: 'Contract Role' },
  { value: 'other', label: 'Other' },
]

const budgets = [
  { value: '', label: 'Select budget range' },
  { value: '<5k', label: '< R50k' },
  { value: '5-15k', label: 'R50k - R150k' },
  { value: '15-50k', label: 'R150k - R500k' },
  { value: '50k+', label: 'R500k+' },
  { value: 'equity', label: 'Equity / Deferred' },
  { value: 'discuss', label: 'Open to discuss' },
]

const timelines = [
  { value: '', label: 'Select timeline' },
  { value: 'asap', label: 'ASAP' },
  { value: '1m', label: 'Within 1 month' },
  { value: '3m', label: '1-3 months' },
  { value: '6m', label: '3-6 months' },
  { value: 'flex', label: 'Flexible' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company: '', type: '', budget: '', timeline: '', message: ''
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', company: '', type: '', budget: '', timeline: '', message: '' })
    }, 4000)
  }

  return (
    <motion.section
      id="contact"
      className="section contact-section"
      variants={stagger}
      initial="visible"
    >
      <div className="contact-layout">
        <motion.div className="contact-left" variants={child}>
          <h2 className="contact-title">
            Let's <span>Talk</span>
          </h2>
          <p className="contact-intro">
            Open for contract work, full-time roles, and consulting. Tell me about the problem you're solving — I'll tell you if I can help.
          </p>

          <div className="contact-options">
            <a className="contact-option" href={`mailto:${contactInfo.email}`}>
              <span className="contact-option-num">01</span>
              <div className="contact-option-text">
                <div className="contact-option-title">Send Email</div>
                <div className="contact-option-sub">Direct, no form required</div>
              </div>
            </a>
            {contactInfo.linkedin && (
              <a className="contact-option" href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                <span className="contact-option-num">02</span>
                <div className="contact-option-text">
                  <div className="contact-option-title">LinkedIn</div>
                  <div className="contact-option-sub">Connect professionally</div>
                </div>
              </a>
            )}
            <a className="contact-option" href="/Kgothatso Ntsane Resume.pdf" download>
              <span className="contact-option-num">03</span>
              <div className="contact-option-text">
                <div className="contact-option-title">Download CV</div>
                <div className="contact-option-sub">PDF, last updated {new Date().getFullYear()}</div>
              </div>
            </a>
            <a className="contact-option" href={`tel:${contactInfo.phone}`}>
              <span className="contact-option-num">04</span>
              <div className="contact-option-text">
                <div className="contact-option-title">Schedule a Call</div>
                <div className="contact-option-sub">Phone or video, 30 min</div>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div className="contact-right" variants={child}>
          <div className="contact-terminal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-grid">
                <div className="contact-field">
                  <label htmlFor="name">Name <span className="contact-req">*</span></label>
                  <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email <span className="contact-req">*</span></label>
                  <input id="email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="company">Company / Organisation</label>
                <input id="company" name="company" type="text" placeholder="Optional" value={form.company} onChange={handleChange} />
              </div>

              <div className="contact-grid">
                <div className="contact-field">
                  <label htmlFor="type">Project Type</label>
                  <select id="type" name="type" value={form.type} onChange={handleChange}>
                    {projectTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div className="contact-field">
                  <label htmlFor="budget">Budget Range</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                    {budgets.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="timeline">Timeline</label>
                <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange}>
                  {timelines.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="message">Message <span className="contact-req">*</span></label>
                <textarea id="message" name="message" placeholder="Tell me about the project, the problem, the timeline, and what success looks like." rows={5} value={form.message} onChange={handleChange} required />
              </div>

              <button type="submit" className="contact-submit" disabled={submitted}>
                {submitted ? '✓ Message Sent — I\'ll respond within 24h' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
