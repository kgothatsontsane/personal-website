import { useState, useEffect } from 'react'
import { personalInfo } from '../data'

const sections = ['hero', 'about', 'projects', 'stats', 'certifications', 'timeline', 'contact']

function ThemeToggleInline() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      className="nav-icon-btn"
      onClick={() => setDark(!dark)}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      title={`Switch to ${dark ? 'light' : 'dark'} mode`}
    >
      {dark ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="3" />
          <line x1="8" y1="1" x2="8" y2="3" />
          <line x1="8" y1="13" x2="8" y2="15" />
          <line x1="1" y1="8" x2="3" y2="8" />
          <line x1="13" y1="8" x2="15" y2="8" />
          <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" />
          <line x1="11.54" y1="11.54" x2="12.95" y2="12.95" />
          <line x1="3.05" y1="12.95" x2="4.46" y2="11.54" />
          <line x1="11.54" y1="4.46" x2="12.95" y2="3.05" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13.5 8.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7z" />
        </svg>
      )}
    </button>
  )
}

function SearchTrigger({ onClick }) {
  return (
    <button className="nav-icon-btn" onClick={onClick} aria-label="Open search">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="6" r="5" />
        <line x1="10" y1="10" x2="13" y2="13" />
      </svg>
    </button>
  )
}

export default function Nav({ onSearchOpen }) {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0)
      const offsets = sections.map(id => {
        const el = document.getElementById(id)
        return { id, top: el?.offsetTop ?? 0, height: el?.offsetHeight ?? 0 }
      })
      const mid = window.scrollY + window.innerHeight / 3
      for (const s of offsets) {
        if (mid >= s.top && mid < s.top + s.height) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
        <span className="nav-logo-k">K</span>
        <span className="nav-logo-text">GOTHATSO</span>
        <span className="nav-logo-dot">.</span>
        <div className="nav-logo-progress" style={{ width: `${scrollPct}%` }} />
      </a>

      <div className="nav-right">
        <ThemeToggleInline />
        <SearchTrigger onClick={onSearchOpen} />
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`} role="list">
        {sections.map(s => (
          <li key={s}>
            <button
              className={`nav-link${active === s ? ' active' : ''}`}
              onClick={() => scrollTo(s)}
              aria-current={active === s ? 'true' : undefined}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
