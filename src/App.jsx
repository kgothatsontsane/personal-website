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

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 32, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX, willChange: 'transform' }} aria-hidden="true" />
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
