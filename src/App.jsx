import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Particles from './components/Particles'
import CodeBackground from './components/CodeBackground'
import Minimap from './components/Minimap'
import Wasted from './components/Wasted'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import SectionDivider from './components/SectionDivider'
import LearningMarquee from './components/LearningMarquee'
import MissionStats from './components/MissionStats'
import Manifesto from './components/Manifesto'
import ScrollIndicator from './components/ScrollIndicator'
import ConfettiCanvas from './components/ConfettiCanvas'
import Footer from './components/Footer'

const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Stats = lazy(() => import('./components/Stats'))
const Certifications = lazy(() => import('./components/Certifications'))
const Timeline = lazy(() => import('./components/Timeline'))
const Contact = lazy(() => import('./components/Contact'))

function GlowCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my

    const place = (el, x, y) => { el.style.left = x + 'px'; el.style.top = y + 'px' }
    place(dot, mx, my)
    place(ring, mx, my)
    place(glow, mx, my)

    const onMove = (e) => { mx = e.clientX; my = e.clientY; place(dot, mx, my) }
    const onOver = (e) => {
      const tag = e.target.tagName
      const isInteractive = tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || e.target.closest('a, button, [role="button"]')
      setHovering(!!isInteractive)
    }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      place(ring, rx, ry)
      place(glow, rx, ry)
      requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const ringSize = hovering ? 60 : clicking ? 32 : 40
  const dotSize = clicking ? 12 : 8

  return (
    <>
      <div ref={glowRef} style={{
        position: 'fixed', width: hovering ? '280px' : '200px', height: hovering ? '280px' : '200px',
        borderRadius: '50%', background: hovering
          ? 'radial-gradient(circle, rgba(255,204,0,0.18) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255,204,0,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 10001, transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
      }} aria-hidden="true" />
      <div ref={ringRef} style={{
        position: 'fixed', width: `${ringSize}px`, height: `${ringSize}px`,
        border: `1.5px solid ${hovering ? 'rgba(255,204,0,0.9)' : 'rgba(255,204,0,0.6)'}`,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 10002, transform: 'translate(-50%, -50%)',
        boxShadow: hovering ? '0 0 30px rgba(255,204,0,0.3)' : '0 0 20px rgba(255,204,0,0.2)',
        transition: 'width 0.3s var(--ease-spring), height 0.3s var(--ease-spring), border-color 0.3s ease, box-shadow 0.3s ease',
      }} aria-hidden="true" />
      <div ref={dotRef} style={{
        position: 'fixed', width: `${dotSize}px`, height: `${dotSize}px`, background: '#ffcc00',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 10003, transform: 'translate(-50%, -50%)',
        boxShadow: clicking
          ? '0 0 15px #ffcc00, 0 0 40px rgba(255,204,0,0.9), 0 0 80px rgba(255,204,0,0.6)'
          : '0 0 10px #ffcc00, 0 0 30px rgba(255,204,0,0.8), 0 0 60px rgba(255,204,0,0.5)',
        transition: 'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease',
      }} aria-hidden="true" />
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
    <div style={{ minHeight: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '20px', height: '20px',
        border: '1px solid var(--border)', borderTopColor: 'var(--accent)',
        borderRadius: '50%', animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <GlowCursor />
      <ScrollProgress />
      <Particles />
      <CodeBackground />
      <ConfettiCanvas />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} setOpen={setSearchOpen} />
      <Minimap />
      <Wasted />
      <BackToTop />
      <main>
        <Hero />
        <ScrollIndicator />
        <MissionStats />
        <Manifesto />
        <Suspense fallback={<SectionLoader />}>
          <SectionDivider />
          <About />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Stats />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <LearningMarquee />
          <SectionDivider />
          <Timeline />
          <SectionDivider />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
