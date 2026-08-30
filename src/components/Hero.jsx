import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo, specializations, certifications, missions, loadingMessages } from '../data'

const roles = [
  'Full-Stack Developer',
  'AI Integrator',
  'Systems Architect',
  'API Engineer',
  'Problem Solver',
]

function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 2000)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDeleting(false)
          setRoleIdx((roleIdx + 1) % roles.length)
        }
      }
    }, deleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx])

  return (
    <span className="hero-typing">
      {text}
      <span className="contact-cursor" />
    </span>
  )
}

export default function Hero() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [glitchDone, setGlitchDone] = useState(false)
  const intervalRef = useRef(null)
  const readyRef = useRef(false)
  const loadingRef = useRef(true)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 24 + 12, 100))
      setMsgIndex(i => (i + 1) % loadingMessages.length)
    }, 160)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(intervalRef.current)
      setReady(true)
      readyRef.current = true
      const timer = setTimeout(() => {
        if (readyRef.current && loadingRef.current) doTransition()
      }, 220)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const doTransition = () => {
    if (!readyRef.current) return
    loadingRef.current = false
    setLoading(false)
    setGlitchDone(true)
    setTimeout(() => setShowContent(true), 80)
  }

  useEffect(() => {
    if (!loading) return
    const onKey = () => readyRef.current && doTransition()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [loading])

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  }

  const nameFirst = personalInfo.name.split(' ')[0]
  const nameRest = personalInfo.name.split(' ').slice(1).join(' ')

const heroStats = [
  { value: missions.length, label: 'Projects Completed' },
  { value: specializations.length, label: 'Skills Mastered' },
  { value: certifications.length, label: 'Certifications' },
  { value: 7, suffix: '+', label: 'Years Experience' },
]

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-screen"
            onClick={() => readyRef.current && doTransition()}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="loading-spinner" />
            <div className="loading-text">ESTABLISHING SECURE CONNECTION</div>
            <div className="loading-bar-track">
              <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="loading-messages">{loadingMessages[msgIndex]}</div>
            {ready && <div className="loading-prompt">▸ PRESS ANY KEY TO CONTINUE</div>}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        id="hero"
        className="hero hero-full"
        variants={heroVariants}
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
      >
        <div className="hero-edge" />
        <motion.div
          className="hero-monogram"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 0.04, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          KN
        </motion.div>

        <div className="hero-content">
          <motion.div className="hero-label" variants={childVariants}>
            {personalInfo.tagline}
          </motion.div>
          <motion.div className="hero-name-block" variants={childVariants}>
            <div className="hero-name hero-name-first">{nameFirst}</div>
            <div className="hero-name hero-name-last">
              <span className="text-stroke-hero" data-text={nameRest}>
                {nameRest}
              </span>
            </div>
          </motion.div>
          <motion.div className="hero-meta" variants={childVariants}>
            <div className="hero-meta-line"><span className="hero-typing-wrap"><TypingRole /></span></div>
            <div className="hero-meta-line">{personalInfo.location}</div>
            <div className="hero-meta-line">{personalInfo.missionCount}+ Years of Experience</div>
          </motion.div>

          <motion.div className="hero-cta" variants={childVariants}>
            <a className="btn-primary" href="#projects">View Projects</a>
            <a className="btn-secondary" href="#contact">Contact</a>
            <a
              className="hero-cv-link"
              href="/kgothatso-ntsane-resume.pdf"
              download
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 1v8M3 6l3 3 3-3M2 10h8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </a>
          </motion.div>
        </div>
        <div className="hero-edge-bottom" />
      </motion.section>
    </>
  )
}
