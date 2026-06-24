import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <div className="scanlines" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stats />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
