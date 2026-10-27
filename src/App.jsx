import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Particles from './components/Particles'
import CodeBackground from './components/CodeBackground'
import Wasted from './components/Wasted'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import LearningMarquee from './components/LearningMarquee'
import Manifesto from './components/Manifesto'
import ConfettiCanvas from './components/ConfettiCanvas'
import Footer from './components/Footer'
import { useRoute, setRouteText } from './router'

const About = lazy(() => import('./components/About'))
const Research = lazy(() => import('./components/Research'))
const Blog = lazy(() => import('./components/Blog'))
const Projects = lazy(() => import('./components/Projects'))
const Stats = lazy(() => import('./components/Stats'))
const Certifications = lazy(() => import('./components/Certifications'))
const Timeline = lazy(() => import('./components/Timeline'))
const Contact = lazy(() => import('./components/Contact'))

const META = {
  '/': ['Kgothatso Ntsane — Full-Stack Developer', 'https://kgothatso.me/'],
  '/about': ['About — Kgothatso Ntsane', 'https://kgothatso.me/about'],
  '/research': ['Research — Kgothatso Ntsane', 'https://kgothatso.me/research'],
  '/projects': ['Projects — Kgothatso Ntsane', 'https://kgothatso.me/projects'],
  '/blog': ['Blog — Kgothatso Ntsane', 'https://kgothatso.me/blog'],
  '/contact': ['Contact — Kgothatso Ntsane', 'https://kgothatso.me/contact'],
}

const LONG = new Set(['/', '/about', '/projects', '/blog'])

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

const PAGE = {
  '/': (
    <>
      <Hero />
      <Manifesto />
      <Suspense fallback={<SectionLoader />}><Stats /></Suspense>
    </>
  ),
  '/about': (
    <>
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Certifications />
        <Timeline />
        <LearningMarquee />
      </Suspense>
    </>
  ),
  '/research': (
    <Suspense fallback={<SectionLoader />}><Research /></Suspense>
  ),
  '/projects': (
    <Suspense fallback={<SectionLoader />}><Projects /></Suspense>
  ),
  '/blog': (
    <Suspense fallback={<SectionLoader />}><Blog /></Suspense>
  ),
  '/contact': (
    <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
  ),
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const route = useRoute()

  useEffect(() => {
    const [title, url] = META[route]
    document.title = title
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    setRouteText(`Current page: ${title.replace(/ — Kgothatso Ntsane$/, 'page')}`)
  }, [route])

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
      <Wasted />
      {LONG.has(route) && <BackToTop />}
      <main key={route}>
        {PAGE[route]}
      </main>
      <Footer />
    </>
  )
}
