import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const chars = '01{}[]<>/=;:const let var function return import export class async await'.split('')
    const particles = []
    const PARTICLE_COUNT = 15

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: Math.random() * 0.5 + 0.15,
        opacity: Math.random() * 0.25 + 0.08,
        size: Math.random() * 14 + 10,
      })
    }

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
    io.observe(canvas)

    const draw = () => {
      if (document.hidden || !inView) { paused = true; return }
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
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  )
}
