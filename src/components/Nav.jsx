import { useState, useEffect } from 'react'
import { personalInfo } from '../data'

const sections = ['hero', 'about', 'projects', 'stats', 'timeline', 'contact']

export default function Nav() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
        AGENT<span>.</span>
      </a>
      <ul className="nav-links">
        {sections.map(s => (
          <li key={s}>
            <button
              className={`nav-link${active === s ? ' active' : ''}`}
              onClick={() => scrollTo(s)}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
