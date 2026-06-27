import { Link } from 'react-router-dom'
import '../styles/app.css'

const metrics = [
  { label: 'CSAT Score', value: '4.6', suffix: '/5', change: '+0.3', up: true },
  { label: 'Deflection Rate', value: '84', suffix: '%', change: '+12%', up: true },
  { label: 'Avg Resolution', value: '18', suffix: 's', change: '-4s', up: true },
  { label: 'Open Tickets', value: '23', suffix: '', change: '+5', up: false },
]

const recentTickets = [
  { id: 'TK-1042', customer: 'Sarah Chen', subject: 'Refund for double charge', status: 'resolved', channel: 'email', time: '2m ago', sentiment: 'neutral' },
  { id: 'TK-1041', customer: 'James Wright', subject: 'Can\'t login to dashboard', status: 'ai-handling', channel: 'chat', time: '5m ago', sentiment: 'negative' },
  { id: 'TK-1040', customer: 'Maria Lopez', subject: 'Feature request: Slack integration', status: 'open', channel: 'email', time: '12m ago', sentiment: 'positive' },
  { id: 'TK-1039', customer: 'David Kim', subject: 'API rate limit exceeded', status: 'escalated', channel: 'email', time: '18m ago', sentiment: 'negative' },
  { id: 'TK-1038', customer: 'Emma Davis', subject: 'How to export ticket data?', status: 'resolved', channel: 'chat', time: '25m ago', sentiment: 'positive' },
]

const topIssues = [
  { label: 'Login failures', count: 47, pct: 85 },
  { label: 'Billing questions', count: 32, pct: 60 },
  { label: 'API errors', count: 21, pct: 40 },
  { label: 'Feature requests', count: 15, pct: 28 },
]

const churnRisks = [
  { customer: 'Acme Corp', score: 'High', reason: '3 escalations in 7 days', color: '#ef4444' },
  { customer: 'TechStart Inc', score: 'Medium', reason: 'Declining CSAT trend', color: '#f59e0b' },
  { customer: 'BuildFast', score: 'Low', reason: 'Reduced ticket volume', color: '#22c55e' },
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Metrics */}
      <div className="metrics-row">
        {metrics.map((m, i) => (
          <div key={i} className="metric-card">
            <p className="metric-label">{m.label}</p>
            <div className="metric-value-row">
              <span className="metric-value">{m.value}</span>
              <span className="metric-suffix">{m.suffix}</span>
            </div>
            <span className={`metric-change ${m.up ? 'up' : 'down'}`}>{m.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Live Ticket Feed */}
        <div className="dash-card wide">
          <div className="dash-card-header">
            <h3>Live Ticket Feed</h3>
            <Link to="/app/inbox" className="dash-card-link">View all →</Link>
          </div>
          <div className="ticket-feed">
            {recentTickets.map((t) => (
              <Link to={`/app/ticket/${t.id}`} key={t.id} className="ticket-feed-row">
                <div className="ticket-feed-main">
                  <span className="ticket-id">{t.id}</span>
                  <span className="ticket-customer">{t.customer}</span>
                  <span className="ticket-subject">{t.subject}</span>
                </div>
                <div className="ticket-feed-meta">
                  <span className={`ticket-status ${t.status}`}>{t.status.replace('-', ' ')}</span>
                  <span className="ticket-time">{t.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Issues */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Top Issues This Week</h3>
          </div>
          <div className="issues-list">
            {topIssues.map((issue, i) => (
              <div key={i} className="issue-row">
                <div className="issue-info">
                  <span className="issue-label">{issue.label}</span>
                  <span className="issue-count">{issue.count} tickets</span>
                </div>
                <div className="issue-bar-bg">
                  <div className="issue-bar-fill" style={{ width: `${issue.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Churn Risk */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Churn Risk</h3>
          </div>
          <div className="churn-list">
            {churnRisks.map((c, i) => (
              <div key={i} className="churn-row">
                <div className="churn-info">
                  <span className="churn-customer">{c.customer}</span>
                  <span className="churn-reason">{c.reason}</span>
                </div>
                <span className="churn-badge" style={{ color: c.color, borderColor: c.color + '40' }}>{c.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>AI Performance</h3>
          </div>
          <div className="ai-stats">
            <div className="ai-stat-row">
              <span className="ai-stat-label">Auto-resolved</span>
              <span className="ai-stat-value">84%</span>
            </div>
            <div className="ai-stat-row">
              <span className="ai-stat-label">Avg confidence</span>
              <span className="ai-stat-value">92%</span>
            </div>
            <div className="ai-stat-row">
              <span className="ai-stat-label">Avg response time</span>
              <span className="ai-stat-value">1.8s</span>
            </div>
            <div className="ai-stat-row">
              <span className="ai-stat-label">Escalation rate</span>
              <span className="ai-stat-value">16%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
