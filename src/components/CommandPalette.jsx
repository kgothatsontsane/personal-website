import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate, useRoute } from '../router'

const routes = [
  { path: '/', label: 'Home', shortcut: 'H' },
  { path: '/', label: 'Philosophy', shortcut: 'P', anchor: 'philosophy' },
  { path: '/', label: 'Skills', shortcut: 'S', anchor: 'stats' },
  { path: '/about', label: 'About', shortcut: 'A' },
  { path: '/about', label: 'Certs', shortcut: 'C', anchor: 'certifications' },
  { path: '/about', label: 'Timeline', shortcut: 'T', anchor: 'timeline' },
  { path: '/research', label: 'Research', shortcut: 'R' },
  { path: '/projects', label: 'Projects', shortcut: 'J' },
  { path: '/blog', label: 'Blog', shortcut: 'B' },
  { path: '/contact', label: 'Contact', shortcut: 'E' },
]

// After switching pages the target section may still be lazy-loading; poll briefly.
function scrollToAnchor(id, tries = 0) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (tries < 20) {
    setTimeout(() => scrollToAnchor(id, tries + 1), 100)
  }
}

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const route = useRoute()

  const filtered = routes.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase()) ||
    s.path.toLowerCase().includes(query.toLowerCase())
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

  const go = (r) => {
    setOpen(false)
    if (r.path !== route) navigate(r.path)
    if (r.anchor) scrollToAnchor(r.anchor)
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
                    go(filtered[0])
                  }
                }}
              />
              <span className="cmd-hint">ESC</span>
            </div>
            <div className="cmd-results">
              {filtered.map((s) => (
                <button
                  key={s.label}
                  className="cmd-result"
                  onClick={() => go(s)}
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
