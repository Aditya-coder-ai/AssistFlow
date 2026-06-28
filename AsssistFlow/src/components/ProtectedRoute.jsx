import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ height: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}>
        Loading...
      </div>
    )
  }

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
