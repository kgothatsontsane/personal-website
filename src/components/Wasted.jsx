import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = [38,38,40,40,37,39,37,39,66,65]

export default function Wasted() {
  const [show, setShow] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.keyCode === KONAMI[idx]) {
        const next = idx + 1
        if (next === KONAMI.length) {
          setShow(true)
          setTimeout(() => setShow(false), 3000)
          setIdx(0)
        } else {
          setIdx(next)
        }
      } else {
        setIdx(0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '12rem',
            color: '#cc0000',
            letterSpacing: '0.1em',
            textShadow: '0 0 40px rgba(204,0,0,0.6)',
            lineHeight: 1,
          }}>
            WASTED
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--fg-muted)',
            letterSpacing: '2px',
            marginTop: '1rem',
          }}>
            KONAMI CODE ACTIVATED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
