import { useState, useEffect } from 'react'
import { personalInfo } from '../data'

const sections = ['hero', 'about', 'projects', 'stats', 'certifications', 'timeline', 'contact']

export default function Nav() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
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
        KGOTHATSO<span>.</span>
      </a>
      <button
        className={`nav-burger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>
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
