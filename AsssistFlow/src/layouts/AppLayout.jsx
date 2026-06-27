import { Outlet, Link, useLocation } from 'react-router-dom'
import '../styles/layouts.css'

const sidebarLinks = [
  { path: '/app', label: 'Dashboard', icon: '◻' },
  { path: '/app/inbox', label: 'Inbox', icon: '✉' },
  { path: '/app/settings', label: 'Settings', icon: '⚙' },
]

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="app-layout">
      <aside className="sidebar" id="sidebar">
        <Link to="/" className="sidebar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>AssistFlow</span>
        </Link>

        <nav className="sidebar-nav">
          {sidebarLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-avatar">F</div>
            <div>
              <p className="sidebar-user-name">Founder</p>
              <p className="sidebar-user-plan">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="app-topbar-left">
            <h2 className="app-topbar-title">{getCurrentTitle(location.pathname)}</h2>
          </div>
          <div className="app-topbar-right">
            <span className="app-topbar-status">● Online</span>
            <Link to="/" className="app-topbar-link">Back to site →</Link>
          </div>
        </header>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function getCurrentTitle(pathname) {
  if (pathname === '/app') return 'Dashboard'
  if (pathname === '/app/inbox') return 'Ticket Inbox'
  if (pathname.startsWith('/app/ticket/')) return 'Ticket Detail'
  if (pathname === '/app/settings') return 'Settings'
  return 'AssistFlow'
}
