import { useEffect, useRef, useCallback } from 'react'

export default function ConfettiCanvas() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animRef = useRef(null)

  const createBurst = useCallback((x, y) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const colors = ['#ffcc00', '#ff6600', '#ff0066', '#00f0ff', '#ffffff']
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50
      const speed = Math.random() * 6 + 2
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onClick = (e) => {
      if (e.target.closest('a[download]')) {
        createBurst(e.clientX, e.clientY)
      }
    }
    window.addEventListener('click', onClick)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      for (const p of particlesRef.current) {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1
        p.life -= p.decay
        p.rotation += p.rotSpeed
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
    }
  }, [createBurst])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10004,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
