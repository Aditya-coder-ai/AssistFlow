import { Routes, Route } from 'react-router-dom'

import MarketingLayout from './layouts/MarketingLayout'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Legal from './pages/Legal'
import Dashboard from './pages/Dashboard'
import TicketInbox from './pages/TicketInbox'
import TicketDetail from './pages/TicketDetail'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      {/* Marketing pages */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/legal" element={<Legal />} />
      </Route>

      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* In-app pages */}
      <Route element={<AppLayout />}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/inbox" element={<TicketInbox />} />
        <Route path="/app/ticket/:id" element={<TicketDetail />} />
        <Route path="/app/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
