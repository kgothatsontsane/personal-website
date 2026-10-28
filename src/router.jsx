import { useSyncExternalStore } from 'react'

export const PAGES = ['/', '/about', '/research', '/projects', '/blog', '/contact']

function normalize(path) {
  const p = path.replace(/\/+$/, '') || '/'
  return PAGES.includes(p) ? p : '/'
}

let route = normalize(location.pathname)
let navDir = null // forward | back | null (same-page reload)
const listeners = new Set()

function subscribe(cb) { listeners.add(cb); return () => listeners.delete(cb) }
function snapshot() { return route }

function update(fromPopstate) {
  if (fromPopstate) {
    const idx = history.state?.idx ?? 0
    navDir = idx > currentIdx ? 'forward' : idx < currentIdx ? 'back' : null
    currentIdx = idx
  }
  route = normalize(location.pathname)
  window.scrollTo(0, 0)
  listeners.forEach(l => l())
}

let currentIdx = history.state?.idx ?? 0

window.addEventListener('popstate', () => update(true))

export function navigate(path) {
  const next = normalize(path)
  if (next === route) return
  currentIdx += 1
  history.pushState({ idx: currentIdx }, '', next)
  navDir = 'forward'
  update()
}

// Direction of the most recent navigation: 'forward' | 'back' | null (reload/same idx)
export function getNavDir() {
  return navDir
}

// Live region announcing the current page to screen readers
const CLASS = 'route-live-region'

export function setRouteText(text) {
  let el = document.getElementById(CLASS)
  if (!el) {
    el = document.createElement('div')
    el.id = CLASS
    el.setAttribute('role', 'status')
    el.setAttribute('aria-live', 'polite')
    el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap'
    document.body.appendChild(el)
  }
  el.textContent = text
}

export function Link({ href, onClick, children, ...rest }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        onClick?.(e)
        navigate(href)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

export function useRoute() {
  return useSyncExternalStore(subscribe, snapshot)
}
