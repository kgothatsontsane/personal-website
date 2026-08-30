import { useEffect, useRef, useState } from 'react'

const codeLines = [
  'const app = createApp();',
  'app.use(router);',
  'app.use(store);',
  'app.mount("#root");',
  '',
  'export default function Hero() {',
  '  const [state, setState] = useState(null);',
  '  useEffect(() => { fetchData(); }, []);',
  '  return <section className="hero">...</section>;',
  '}',
  '',
  'import { motion } from "framer-motion";',
  '',
  'async function deploy() {',
  '  await build();',
  '  await upload();',
  '  console.log("Deployed!");',
  '}',
  '',
  'type User = {',
  '  name: string;',
  '  role: "admin" | "user";',
  '};',
  '',
  'const socket = new WebSocket(url);',
  'socket.onmessage = (e) => handleData(e);',
  '',
  'function optimize(bundle: string[]) {',
  '  return bundle.filter(s => s.size < threshold);',
  '}',
]

export default function CodeBackground() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setEnabled(false); return }
    if (window.innerWidth < 768) { setEnabled(false); return }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    let animId

    const resize = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lines = codeLines.map((text) => ({
      text,
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      speed: Math.random() * 0.12 + 0.04,
      opacity: Math.random() * 0.05 + 0.015,
      size: Math.random() * 3 + 9,
    }))

    let last = 0
    const draw = (now) => {
      if (document.hidden) { animId = requestAnimationFrame(draw); return }
      if (now - last < 50) { animId = requestAnimationFrame(draw); return } // ~20fps
      last = now
      ctx.clearRect(0, 0, c.width, c.height)
      for (const l of lines) {
        ctx.font = `${l.size}px "JetBrains Mono", monospace`
        ctx.fillStyle = `rgba(255, 204, 0, ${l.opacity})`
        ctx.fillText(l.text, l.x, l.y)
        l.y += l.speed
        if (l.y > c.height + 20) {
          l.y = -20
          l.x = Math.random() * c.width
          l.text = codeLines[Math.floor(Math.random() * codeLines.length)]
        }
      }
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    const onVis = () => { if (!document.hidden) { last = 0; animId = requestAnimationFrame(draw) } }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}
