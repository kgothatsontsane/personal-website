import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Particles from './components/Particles'
import Minimap from './components/Minimap'
import Wasted from './components/Wasted'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    const onHover = (e) => {
      const tag = e.target.tagName
      const isInteractive = tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || e.target.closest('a, button')
      setHovering(isInteractive)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onHover)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onHover)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring${hovering ? ' hovering' : ''}`} />
    </>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Particles />
      <div className="noise-overlay" />
      <div className="scanlines" />
      <Nav />
      <Minimap />
      <Wasted />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <Timeline />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
