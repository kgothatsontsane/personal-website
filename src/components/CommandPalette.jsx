import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Home', shortcut: 'H' },
  { id: 'philosophy', label: 'Philosophy', shortcut: 'P' },
  { id: 'about', label: 'About', shortcut: 'A' },
  { id: 'projects', label: 'Projects', shortcut: 'P' },
  { id: 'stats', label: 'Skills', shortcut: 'S' },
  { id: 'certifications', label: 'Certs', shortcut: 'C' },
  { id: 'timeline', label: 'Timeline', shortcut: 'T' },
  { id: 'contact', label: 'Contact', shortcut: 'E' },
]

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const filtered = sections.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase()) ||
    s.id.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const navigate = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="cmd-panel"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-input-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--fg-dim)" strokeWidth="1.5">
                <circle cx="6" cy="6" r="5" />
                <line x1="10" y1="10" x2="13" y2="13" />
              </svg>
              <input
                ref={inputRef}
                className="cmd-input"
                placeholder="Navigate to..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filtered.length > 0) {
                    navigate(filtered[0].id)
                  }
                }}
              />
              <span className="cmd-hint">ESC</span>
            </div>
            <div className="cmd-results">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  className="cmd-result"
                  onClick={() => navigate(s.id)}
                >
                  <span className="cmd-result-label">{s.label}</span>
                  <span className="cmd-result-shortcut">{s.shortcut}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="cmd-empty">No results found</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
