import { Outlet, Link } from 'react-router-dom'
import '../styles/layouts.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>AssistFlow</span>
        </Link>
        <Outlet />
        <p className="auth-footer-text">
          <Link to="/legal">Privacy Policy</Link> · <Link to="/legal">Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}
