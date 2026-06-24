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

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // ponytail: form submits to nowhere, add a service (EmailJS, etc.) when real traffic comes
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
    >
      <motion.div className="section-label" variants={child}>// SECURE CHANNEL</motion.div>
      <motion.h2 className="section-title" variants={child}>
        Establish <span>Contact</span>
      </motion.h2>

      <motion.div className="contact-terminal" variants={child}>
        <div className="contact-prompt">
          <span>agent@portfol.io</span>:~$ contact --encrypt
          <span className="contact-cursor" />
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
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
        </form>

        <div className="contact-socials">
          <a className="contact-social" href={`mailto:${contactInfo.email}`}>
            [Email]
          </a>
          <a className="contact-social" href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer">
            [GitHub]
          </a>
          <a className="contact-social" href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
            [LinkedIn]
          </a>
          <a className="contact-social" href={`https://twitter.com/${contactInfo.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
            [X]
          </a>
        </div>
      </motion.div>
    </motion.section>
  )
}
