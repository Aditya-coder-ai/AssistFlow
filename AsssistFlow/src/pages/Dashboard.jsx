import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/app.css'

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/dashboard/stats')
      .then(res => res.json())
      .then(stats => {
        setData(stats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dashboard metrics:', err);
        setLoading(false);
      });
  }, []);

  // Initial fallback states if loading or API fails
  const metrics = data?.metrics || [
    { label: 'CSAT Score', value: '4.6', suffix: '/5', change: '+0.3', up: true },
    { label: 'Deflection Rate', value: '84', suffix: '%', change: '+12%', up: true },
    { label: 'Avg Resolution', value: '18', suffix: 's', change: '-4s', up: true },
    { label: 'Open Tickets', value: '23', suffix: '', change: '+5', up: false },
  ];

  const recentTickets = data?.recentTickets || [];
  const topIssues = data?.topIssues || [];
  const churnRisks = data?.churnRisks || [];
  const aiStats = data?.aiStats || {
    autoResolved: '84%',
    avgConfidence: '92%',
    avgResponseTime: '1.8s',
    escalationRate: '16%'
  };

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
            {recentTickets.length === 0 && !loading && (
              <div className="inbox-empty" style={{ padding: '24px 0' }}>No tickets in your feed.</div>
            )}
            {loading && (
              <div className="inbox-empty" style={{ padding: '24px 0' }}>Loading live ticket feed...</div>
            )}
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
            {topIssues.length === 0 && (
              <div className="inbox-empty" style={{ padding: '24px 0' }}>No issues logged.</div>
            )}
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
            {churnRisks.length === 0 && (
              <div className="inbox-empty" style={{ padding: '24px 0' }}>No churn alerts.</div>
            )}
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
              <span className="ai-stat-value">{aiStats.autoResolved}</span>
            </div>
            <div className="ai-stat-row">
              <span className="ai-stat-label">Avg confidence</span>
              <span className="ai-stat-value">{aiStats.avgConfidence}</span>
            </div>
            <div className="ai-stat-row">
              <span className="ai-stat-label">Avg response time</span>
              <span className="ai-stat-value">{aiStats.avgResponseTime}</span>
            </div>
            <div className="ai-stat-row">
              <span className="ai-stat-label">Escalation rate</span>
              <span className="ai-stat-value">{aiStats.escalationRate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
