import { useState, useEffect } from 'react'
import { Link, useRoute } from '../router'
import useTheme from '../useTheme'

const NAV_LINKS = [
  { label: 'home', path: '/' },
  { label: 'about', path: '/about' },
  { label: 'research', path: '/research' },
  { label: 'projects', path: '/projects' },
  { label: 'blog', path: '/blog' },
  { label: 'contact', path: '/contact' },
]

export default function Nav({ onSearchOpen }) {
  const route = useRoute()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    setMenuOpen(false)
  }, [route])

  useEffect(() => {
    let ticking = false
    let lastScrolled = false
    let lastPct = -1

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const y = window.scrollY
        const isScrolled = y > 50
        if (isScrolled !== lastScrolled) { lastScrolled = isScrolled; setScrolled(isScrolled) }

        const docH = document.documentElement.scrollHeight - window.innerHeight
        const pct = docH > 0 ? (y / docH) * 100 : 0
        if (Math.abs(pct - lastPct) > 0.5) { lastPct = pct; setScrollPct(pct) }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <Link className="nav-logo" href="/">
        <span className="nav-logo-k">K</span>
        <span className="nav-logo-text">GOTHATSO</span>
        <span className="nav-logo-dot">.</span>
        <div className="nav-logo-progress" style={{ width: `${scrollPct}%` }} />
      </Link>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`} role="list">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={path}>
            <Link
              className={`nav-link${route === path ? ' active' : ''}`}
              href={path}
              aria-current={route === path ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button
          className="nav-pill"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="3" />
              <line x1="8" y1="1" x2="8" y2="3" /><line x1="8" y1="13" x2="8" y2="15" />
              <line x1="1" y1="8" x2="3" y2="8" /><line x1="13" y1="8" x2="15" y2="8" />
              <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" /><line x1="11.54" y1="11.54" x2="12.95" y2="12.95" />
              <line x1="3.05" y1="12.95" x2="4.46" y2="11.54" /><line x1="11.54" y1="4.46" x2="12.95" y2="3.05" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13.5 8.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7z" />
            </svg>
          )}
        </button>

        <button
          className="nav-pill"
          onClick={onSearchOpen}
          aria-label="Search pages"
          title="Search pages (⌘K)"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6" cy="6" r="5" />
            <line x1="10" y1="10" x2="13" y2="13" />
          </svg>
          <span className="nav-pill-label">⌘K</span>
        </button>

        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
