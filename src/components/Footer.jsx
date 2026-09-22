import { contactInfo } from '../data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-enhanced">
      <div className="footer-inner">
        {/* Left: branding */}
        <div className="footer-brand">
          <div className="footer-logo">
            KGOTHATSO<span className="footer-logo-dot">.</span>
          </div>
          <p className="footer-tagline">Software Engineer / Pretoria, SA</p>
        </div>

        {/* Right: links */}
        <div className="footer-links">
          <a href={`mailto:${contactInfo.email}`} className="footer-link">Email</a>
          {contactInfo.linkedin && (
            <a href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          )}
          {contactInfo.github && (
            <a href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          )}
          <a href="/kgothatso-ntsane-resume.pdf" download className="footer-link">CV</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Kgothatso Ntsane</span>
        <span className="footer-sep">•</span>
        <span>Built with React + Framer Motion</span>
      </div>
    </footer>
  )
}
