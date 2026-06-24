import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
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
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 204, 0, 0.6)'
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 204, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 204, 0, 0.3)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
