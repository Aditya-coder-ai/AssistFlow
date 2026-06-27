import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/app.css'

const allTickets = [
  { id: 'TK-1042', customer: 'Sarah Chen', email: 'sarah@acme.co', subject: 'Refund for double charge on invoice #4821', status: 'resolved', channel: 'email', intent: 'refund', time: '2m ago', sentiment: 'neutral', agent: 'AI' },
  { id: 'TK-1041', customer: 'James Wright', email: 'james@techstart.io', subject: 'Can\'t login to dashboard — password reset not working', status: 'ai-handling', channel: 'chat', intent: 'bug', time: '5m ago', sentiment: 'negative', agent: 'AI' },
  { id: 'TK-1040', customer: 'Maria Lopez', email: 'maria@buildf.co', subject: 'Feature request: Slack integration for ticket alerts', status: 'open', channel: 'email', intent: 'feature', time: '12m ago', sentiment: 'positive', agent: 'Unassigned' },
  { id: 'TK-1039', customer: 'David Kim', email: 'david@scaleup.dev', subject: 'API rate limit exceeded on /v1/tickets endpoint', status: 'escalated', channel: 'email', intent: 'bug', time: '18m ago', sentiment: 'negative', agent: 'Human' },
  { id: 'TK-1038', customer: 'Emma Davis', email: 'emma@foundros.com', subject: 'How to export ticket data to CSV?', status: 'resolved', channel: 'chat', intent: 'how-to', time: '25m ago', sentiment: 'positive', agent: 'AI' },
  { id: 'TK-1037', customer: 'Alex Turner', email: 'alex@launchpad.io', subject: 'Webhook not firing on ticket close event', status: 'open', channel: 'email', intent: 'bug', time: '32m ago', sentiment: 'neutral', agent: 'Unassigned' },
  { id: 'TK-1036', customer: 'Priya Sharma', email: 'priya@shipfast.dev', subject: 'Billing cycle changed without notice', status: 'escalated', channel: 'email', intent: 'billing', time: '45m ago', sentiment: 'negative', agent: 'Human' },
  { id: 'TK-1035', customer: 'Tom Bradley', email: 'tom@acme.co', subject: 'How do I add team members to my workspace?', status: 'resolved', channel: 'chat', intent: 'how-to', time: '1h ago', sentiment: 'positive', agent: 'AI' },
]

const statusFilters = ['all', 'open', 'ai-handling', 'escalated', 'resolved']

export default function TicketInbox() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = allTickets.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.customer.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="inbox">
      {/* Filter Bar */}
      <div className="inbox-filters">
        <div className="inbox-search">
          <input type="text" placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} className="inbox-search-input" />
        </div>
        <div className="inbox-status-filters">
          {statusFilters.map(s => (
            <button key={s} className={`inbox-filter-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'All' : s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List */}
      <div className="inbox-list">
        <div className="inbox-header-row">
          <span className="inbox-col-id">ID</span>
          <span className="inbox-col-customer">Customer</span>
          <span className="inbox-col-subject">Subject</span>
          <span className="inbox-col-status">Status</span>
          <span className="inbox-col-channel">Channel</span>
          <span className="inbox-col-time">Time</span>
          <span className="inbox-col-actions">Actions</span>
        </div>
        {filtered.map(t => (
          <Link to={`/app/ticket/${t.id}`} key={t.id} className="inbox-row">
            <span className="inbox-col-id">{t.id}</span>
            <span className="inbox-col-customer">
              <span className="inbox-customer-name">{t.customer}</span>
            </span>
            <span className="inbox-col-subject">{t.subject}</span>
            <span className="inbox-col-status">
              <span className={`ticket-status ${t.status}`}>{t.status.replace('-', ' ')}</span>
            </span>
            <span className="inbox-col-channel">{t.channel}</span>
            <span className="inbox-col-time">{t.time}</span>
            <span className="inbox-col-actions">
              <button className="inbox-action-btn" onClick={e => e.preventDefault()}>Assign</button>
              <button className="inbox-action-btn" onClick={e => e.preventDefault()}>Escalate</button>
            </span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="inbox-empty">No tickets match your filters.</div>
        )}
      </div>
    </div>
  )
}
