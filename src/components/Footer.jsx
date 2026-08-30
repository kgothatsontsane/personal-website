import { contactInfo, specializations, certifications, serviceRecord } from '../data'

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
          <p className="footer-tagline">Software Engineer / Johannesburg, SA</p>
        </div>

        {/* Middle: quick stats */}
        <div className="footer-stats">
          <div className="footer-stat">
            <span className="footer-stat-value">{serviceRecord.length}</span>
            <span className="footer-stat-label">Roles</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-value">{specializations.length}</span>
            <span className="footer-stat-label">Skills</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-value">{certifications.length}</span>
            <span className="footer-stat-label">Certs</span>
          </div>
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
