import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { contactInfo } from '../data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const promptText = 'agent@portfol.io:~$ contact --encrypt'
const cmdText = 'agent@portfol.io:~$ '

function Typewriter({ text, speed = 40, delay = 0, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      onComplete?.()
      return
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [displayed, started, text, speed, onComplete])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && <span className="contact-cursor" />}
    </span>
  )
}

export default function Contact() {
  const [showForm, setShowForm] = useState(false)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent. (Demo — no backend connected.)')
  }

  return (
    <motion.section
      id="contact"
      className="section"
      variants={stagger}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      ref={ref}
    >
      <motion.div className="section-label" variants={child}>// SECURE CHANNEL</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Establish <span>Contact</span>
      </motion.h2>

      <motion.div className="contact-terminal" variants={child}>
        <div className="contact-prompt">
          <span>{inView ? <Typewriter text={promptText} speed={35} delay={300} onComplete={() => setShowForm(true)} /> : cmdText}</span>
          {!showForm && inView && <span className="contact-cursor" />}
        </div>

        {showForm && (
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-field">
              <label htmlFor="name">Codename</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="contact-field">
              <label htmlFor="email">Secure Address</label>
              <input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="contact-field">
              <label htmlFor="message">Encrypted Message</label>
              <textarea id="message" placeholder="Type your message..." required />
            </div>
            <button type="submit" className="contact-submit">
              Transmit →
            </button>
          </motion.form>
        )}

        <div className="contact-socials">
          <a className="contact-social" href={`mailto:${contactInfo.email}`}>[Email]</a>
          <a className="contact-social" href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer">[GitHub]</a>
          <a className="contact-social" href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer">[LinkedIn]</a>
          <a className="contact-social" href={`https://twitter.com/${contactInfo.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">[X]</a>
        </div>
      </motion.div>
    </motion.section>
  )
}
