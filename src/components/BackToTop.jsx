import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let ticking = false
    let last = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const next = window.scrollY > 600
        if (next !== last) { last = next; setShow(next) }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollUp}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            zIndex: 8999,
            width: '40px',
            height: '40px',
            background: 'rgba(10, 10, 15, 0.9)',
            border: '1px solid rgba(255, 204, 0, 0.3)',
            color: 'var(--accent)',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            willChange: 'transform, opacity',
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
