import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Particles from './components/Particles'
import Minimap from './components/Minimap'
import Wasted from './components/Wasted'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import ThemeToggle from './components/ThemeToggle'
import SectionDivider from './components/SectionDivider'
import LearningMarquee from './components/LearningMarquee'
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

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      place(ring, rx, ry)
      place(glow, rx, ry)
      requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    loop()

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={glowRef} style={{
        position: 'fixed', width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,204,0,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 10001, transform: 'translate(-50%, -50%)',
      }} aria-hidden="true" />
      <div ref={ringRef} style={{
        position: 'fixed', width: '40px', height: '40px', border: '1.5px solid rgba(255,204,0,0.6)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 10002, transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 20px rgba(255,204,0,0.2)',
      }} aria-hidden="true" />
      <div ref={dotRef} style={{
        position: 'fixed', width: '8px', height: '8px', background: '#ffcc00',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 10003, transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 10px #ffcc00, 0 0 30px rgba(255,204,0,0.8), 0 0 60px rgba(255,204,0,0.5), 0 0 100px rgba(255,204,0,0.3)',
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
  return (
    <>
      <GlowCursor />
      <ScrollProgress />
      <Particles />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <Nav />
      <CommandPalette />
      <ThemeToggle />
      <Minimap />
      <Wasted />
      <BackToTop />
      <main>
        <Hero />
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
