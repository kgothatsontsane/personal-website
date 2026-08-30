import { useState, useEffect, useRef } from 'react'

const sections = [
  { id: 'hero', label: 'HQ' },
  { id: 'philosophy', label: 'PHIL' },
  { id: 'about', label: 'PROFILE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'stats', label: 'SKILLS' },
  { id: 'certifications', label: 'CERTS' },
  { id: 'timeline', label: 'RECORD' },
  { id: 'contact', label: 'COMMS' },
]

export default function Minimap() {
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [offsets, setOffsets] = useState({})
  const cacheRef = useRef({ tops: {}, max: 1 })

  useEffect(() => {
    const cache = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const tops = {}
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) tops[s.id] = el.offsetTop / max
      }
      cacheRef.current = { tops, max }
      setOffsets(tops)
    }
    cache()

    let ticking = false
    let lastActive = 'hero'
    let lastVis = false
    let lastProg = -1

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const y = window.scrollY
        const vis = y > 300
        if (vis !== lastVis) { lastVis = vis; setVisible(vis) }

        const { max, tops } = cacheRef.current
        const prog = Math.min(1, y / max)
        if (Math.abs(prog - lastProg) > 0.005) { lastProg = prog; setProgress(prog) }

        const mid = y + window.innerHeight / 3
        for (const s of sections) {
          const el = document.getElementById(s.id)
          if (!el) continue
          const top = el.offsetTop
          const h = el.offsetHeight
          if (mid >= top && mid < top + h) {
            if (s.id !== lastActive) { lastActive = s.id; setActive(s.id) }
            break
          }
        }
        void tops
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', cache)
    // re-cache after fonts/lazy sections load
    const t = setTimeout(cache, 800)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', cache)
      clearTimeout(t)
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!visible) return null

  const activeLabel = sections.find((s) => s.id === active)?.label

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: 'calc(1.5rem + 52px)',
      right: '1.5rem',
      zIndex: 8999,
      background: 'rgba(10, 10, 15, 0.94)',
      border: '1px solid rgba(255, 204, 0, 0.3)',
      borderLeft: 'none',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
      padding: '8px 14px 10px',
      borderRadius: '0 4px 4px 0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '6px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--accent)',
          letterSpacing: '2px',
        }}>
          SECTION RADAR
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          color: 'var(--fg-dim)',
          letterSpacing: '1px',
        }}>
          {activeLabel}
        </span>
      </div>
      <div style={{
        position: 'relative',
        height: '14px',
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 204, 0, 0.25)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, rgba(255,204,0,0.5), var(--accent))',
          boxShadow: '0 0 14px rgba(255,204,0,0.4)',
          willChange: 'width',
        }} />
        {sections.map((s) => {
          const raw = (offsets[s.id] ?? 0) * 100
          const pos = Math.max(3, Math.min(97, raw))
          const isActive = s.id === active
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              aria-label={`Go to ${s.label}`}
              title={s.label}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${pos}%`,
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                padding: 0,
                background: isActive ? 'var(--accent)' : 'rgba(10, 10, 15, 0.9)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'rgba(255,204,0,0.5)'}`,
                boxShadow: isActive ? '0 0 10px rgba(255,204,0,0.8)' : '0 0 4px rgba(0,0,0,0.6)',
                cursor: 'pointer',
                zIndex: 2,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
