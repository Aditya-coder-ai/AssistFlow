import { Outlet, Link, useLocation } from 'react-router-dom'
import '../styles/layouts.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/features', label: 'Features' },
  { path: '/pricing', label: 'Pricing' },
]

export default function MarketingLayout() {
  const location = useLocation()

  return (
    <div className="marketing-layout">
      <header className="navbar" id="navbar">
        <nav className="navbar-inner">
          <Link to="/" className="navbar-logo" id="logo">
            <span className="logo-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#808080" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            AssistFlow
          </Link>

          <div className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <Link to="/login" className="navbar-link">Log in</Link>
            <Link to="/signup" className="navbar-cta" id="nav-get-started">
              Get Started
              <span className="navbar-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer" id="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-heading">Product</h4>
              <Link to="/features" className="footer-link">Features</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <Link to="/login" className="footer-link">Log in</Link>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Company</h4>
              <Link to="/legal" className="footer-link">Privacy Policy</Link>
              <Link to="/legal" className="footer-link">Terms of Service</Link>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Connect</h4>
              <a href="mailto:hello@assistflow.ai" className="footer-link">hello@assistflow.ai</a>
              <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 AssistFlow. Built for founders who ship.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
