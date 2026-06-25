import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo, loadingMessages } from '../data'

const photos = [
  '/images/hero-portrait.jpg',
  '/images/about-portrait.jpg',
  '/images/project-1.jpg',
  '/images/project-2.jpg',
]

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={photos[current]}
          alt="Kgothatso Ntsane"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AnimatePresence>
      {/* Photo indicators */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '6px',
        zIndex: 2,
      }}>
        {photos.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const intervalRef = useRef(null)
  const readyRef = useRef(false)
  const loadingRef = useRef(true)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 20 + 8, 100))
      setMsgIndex(i => (i + 1) % loadingMessages.length)
    }, 250)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(intervalRef.current)
      setReady(true)
      readyRef.current = true
      const timer = setTimeout(() => {
        if (readyRef.current && loadingRef.current) doTransition()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const doTransition = () => {
    if (!readyRef.current) return
    loadingRef.current = false
    setLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  useEffect(() => {
    if (!loading) return
    const onKey = () => readyRef.current && doTransition()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [loading])

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  const nameFirst = personalInfo.name.split(' ')[0]
  const nameRest = personalInfo.name.split(' ').slice(1).join(' ')

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
        className="hero"
        variants={heroVariants}
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
      >
        <div className="hero-edge" />
        <div className="hero-left">
          <motion.div className="hero-label" variants={childVariants}>
            — Developer Profile —
          </motion.div>
          <motion.div className="hero-name" variants={childVariants}>
            {nameFirst}<br />
            <span className="hero-name-accent glitch" data-text={nameRest}>
              {nameRest}
            </span>
          </motion.div>
          <motion.div className="hero-meta" variants={childVariants}>
            <span>{personalInfo.tagline}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
            <span>•</span>
            <span>{personalInfo.missionCount} Projects</span>
          </motion.div>
          <motion.div className="hero-cta" variants={childVariants}>
            <a className="btn-primary" href="#projects">View Projects →</a>
            <a className="btn-secondary" href="#contact">Contact</a>
          </motion.div>
        </div>
        <motion.div className="hero-right" variants={childVariants}>
          <PhotoSlideshow />
          <div className="hero-right-overlay" />
        </motion.div>
        <div className="hero-edge-bottom" />
        <div className="hero-scroll-indicator">Scroll to navigate</div>
      </motion.section>
    </>
  )
}
