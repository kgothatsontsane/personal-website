import { useEffect, useRef } from 'react'

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

  useEffect(() => {
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

    const lines = codeLines.map((text, i) => ({
      text,
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.06 + 0.02,
      size: Math.random() * 3 + 9,
    }))

    let paused = document.hidden
    const onVis = () => {
      if (document.hidden) { paused = true; cancelAnimationFrame(animId) }
      else if (paused) { paused = false; animId = requestAnimationFrame(draw) }
    }
    document.addEventListener('visibilitychange', onVis)
    let inView = true
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      if (!inView) { cancelAnimationFrame(animId); paused = true }
      else if (!document.hidden && paused) { paused = false; animId = requestAnimationFrame(draw) }
    }, { threshold: 0 })
    io.observe(c)

    const draw = () => {
      if (document.hidden || !inView) { paused = true; return }
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
    if (!paused && inView) animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
      aria-hidden="true"
    />
  )
}
