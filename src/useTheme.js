import { useEffect, useState } from 'react'

const mq = () => window.matchMedia('(prefers-color-scheme: dark)')

export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || (mq().matches ? 'dark' : 'light')
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f4f2ec')
  }, [theme])

  // Live-follow OS changes until the user picks a theme manually
  useEffect(() => {
    if (localStorage.getItem('theme')) return
    const onChange = (e) => setTheme(e.matches ? 'dark' : 'light')
    const m = mq()
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])

  const toggle = () =>
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      return next
    })

  return { theme, toggle }
}
