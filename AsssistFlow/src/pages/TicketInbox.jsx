import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/app.css'

const statusFilters = ['all', 'open', 'ai-handling', 'escalated', 'resolved']

export default function TicketInbox() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/tickets')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tickets')
        return res.json()
      })
      .then(data => {
        setTickets(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered = tickets.filter(t => {
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
            <span className="inbox-col-time">
              {new Date(t.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
            <span className="inbox-col-actions">
              <button className="inbox-action-btn" onClick={e => e.preventDefault()}>Assign</button>
              <button className="inbox-action-btn" onClick={e => e.preventDefault()}>Escalate</button>
            </span>
          </Link>
        ))}
        {loading && <div className="inbox-empty">Loading tickets from Postgres...</div>}
        {error && <div className="inbox-empty" style={{color: '#ff4d4f'}}>Error: {error}. Is the backend running?</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="inbox-empty">No tickets match your filters.</div>
        )}
      </div>
    </div>
  )
}
