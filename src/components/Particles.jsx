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
    const PARTICLE_COUNT = 60

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
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.12 + 0.03,
        size: Math.random() * 10 + 8,
      })
    }

    const draw = () => {
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
        opacity: 0.6,
      }}
    />
  )
}
