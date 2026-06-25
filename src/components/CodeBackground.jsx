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
  'import { Canvas } from "@react-three/fiber";',
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
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lines = codeLines.map((text, i) => ({
      text,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.06 + 0.02,
      size: Math.random() * 3 + 9,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const l of lines) {
        ctx.font = `${l.size}px "JetBrains Mono", monospace`
        ctx.fillStyle = `rgba(255, 204, 0, ${l.opacity})`
        ctx.fillText(l.text, l.x, l.y)
        l.y += l.speed
        if (l.y > canvas.height + 20) {
          l.y = -20
          l.x = Math.random() * canvas.width
          l.text = codeLines[Math.floor(Math.random() * codeLines.length)]
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
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
