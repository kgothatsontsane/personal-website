import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Particles from './components/Particles'
import Minimap from './components/Minimap'
import Wasted from './components/Wasted'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'

const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Stats = lazy(() => import('./components/Stats'))
const Timeline = lazy(() => import('./components/Timeline'))
const Contact = lazy(() => import('./components/Contact'))
const Testimonials = lazy(() => import('./components/Testimonials'))

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    // Set initial position immediately
    dot.style.left = mouseX + 'px'
    dot.style.top = mouseY + 'px'
    ring.style.left = ringX + 'px'
    ring.style.top = ringY + 'px'

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
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring${hovering ? ' hovering' : ''}`} aria-hidden="true" />
    </>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

function SectionLoader() {
  return (
    <div style={{
      minHeight: '30vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        border: '1px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Particles />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <Nav />
      <Minimap />
      <Wasted />
      <BackToTop />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Stats />
          <div className="section-divider" />
          <Testimonials />
          <div className="section-divider" />
          <Timeline />
          <div className="section-divider" />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
