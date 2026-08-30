import { useEffect, useRef, useState } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setEnabled(false); return }
    if (window.innerWidth < 768) { setEnabled(false); return }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const chars = '01{}[]<>/=;:const let var function return import export class async await'.split('')
    const count = window.innerWidth < 1024 ? 8 : 15
    const particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: Math.random() * 0.4 + 0.12,
        opacity: Math.random() * 0.2 + 0.06,
        size: Math.random() * 12 + 10,
      })
    }

    let last = 0
    const draw = (now) => {
      if (document.hidden) { animId = requestAnimationFrame(draw); return }
      if (now - last < 33) { animId = requestAnimationFrame(draw); return } // ~30fps
      last = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.font = `${p.size}px "JetBrains Mono", monospace`
        ctx.fillStyle = `rgba(255, 204, 0, ${p.opacity})`
        ctx.fillText(p.char, p.x, p.y)
        p.y += p.speed
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
          p.char = chars[Math.floor(Math.random() * chars.length)]
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
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.6,
        willChange: 'transform',
      }}
    />
  )
}
