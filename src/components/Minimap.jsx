import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'HQ' },
  { id: 'philosophy', label: 'PHILOSOPHY' },
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

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
      const mid = window.scrollY + window.innerHeight / 3
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const top = el.offsetTop
        const h = el.offsetHeight
        if (mid >= top && mid < top + h) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 8999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',
    }}>
      {/* Radar frame */}
      <div style={{
        width: '120px',
        background: 'rgba(10, 10, 15, 0.92)',
        border: '1px solid rgba(255, 204, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.45rem',
          color: 'var(--accent)',
          letterSpacing: '2px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,204,0,0.15)',
          paddingBottom: '4px',
          marginBottom: '2px',
        }}>
          SECTION RADAR
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              padding: '3px 0',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '1px',
              color: active === s.id ? 'var(--accent)' : 'var(--fg-dim)',
              transition: 'color 0.3s ease',
            }}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: active === s.id ? 'var(--accent)' : 'transparent',
              border: `1px solid ${active === s.id ? 'var(--accent)' : 'var(--border)'}`,
              boxShadow: active === s.id ? '0 0 8px rgba(255,204,0,0.5)' : 'none',
              transition: 'all 0.3s ease',
            }} />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
