import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/app.css'

const ticketData = {
  id: 'TK-1041',
  customer: { name: 'James Wright', email: 'james@techstart.io', avatar: 'JW', churnRisk: 'Medium', accountAge: '4 months' },
  subject: 'Can\'t login to dashboard — password reset not working',
  status: 'ai-handling',
  channel: 'chat',
  intent: 'Bug Report',
  sla: { status: 'On track', remaining: '2h 15m' },
  csat: null,
  agent: 'AI Agent',
  sentiment: { label: 'Frustrated', score: -0.6, color: '#ef4444' },
  summary: 'Customer reports inability to access dashboard after password reset. Reset email was received but link returns a 404 error. This is the second occurrence — customer previously had the same issue 2 weeks ago.',
  conversation: [
    { from: 'customer', time: '10:32 AM', text: 'Hey, I can\'t login again. I did the password reset but the link in the email goes to a 404 page. This happened before two weeks ago and I had to email support to get it fixed manually.' },
    { from: 'ai', time: '10:32 AM', text: 'I see this is a recurring issue — I\'m sorry about that. I\'ve identified the cause: your reset link is pointing to our old domain (app.assistflow.io) instead of the current one (dashboard.assistflow.ai). I\'m regenerating a new reset link for you now.' },
    { from: 'customer', time: '10:33 AM', text: 'Okay, that makes sense. Can you just send me a working link?' },
    { from: 'ai', time: '10:33 AM', text: 'Done — I\'ve sent a new password reset email to james@techstart.io with the correct link. It\'ll expire in 1 hour. I\'ve also flagged this domain redirect issue with our engineering team so it doesn\'t happen again.' },
  ],
  aiDraft: 'Hi James, I\'ve confirmed the issue was caused by an outdated domain redirect in our password reset flow. A new reset link has been sent to your email (james@techstart.io) — please check your inbox. Our engineering team has been notified to permanently fix the redirect. Let me know if you need anything else!'
}

export default function TicketDetail() {
  const { id } = useParams()
  const [draft, setDraft] = useState(ticketData.aiDraft)
  const t = ticketData

  return (
    <div className="ticket-detail">
      {/* Header */}
      <div className="ticket-detail-header">
        <Link to="/app/inbox" className="ticket-back">← Back to inbox</Link>
        <div className="ticket-detail-title-row">
          <h2 className="ticket-detail-subject">{t.subject}</h2>
          <span className={`ticket-status ${t.status}`}>{t.status.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="ticket-detail-layout">
        {/* Main Content */}
        <div className="ticket-detail-main">
          {/* AI Summary */}
          <div className="ticket-summary-card">
            <h4 className="ticket-summary-label">AI Summary</h4>
            <p className="ticket-summary-text">{t.summary}</p>
          </div>

          {/* Conversation */}
          <div className="ticket-conversation">
            {t.conversation.map((msg, i) => (
              <div key={i} className={`ticket-msg ${msg.from}`}>
                <div className="ticket-msg-header">
                  <span className="ticket-msg-from">{msg.from === 'customer' ? t.customer.name : 'AI Agent'}</span>
                  <span className="ticket-msg-time">{msg.time}</span>
                </div>
                <p className="ticket-msg-text">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* AI Draft Reply */}
          <div className="ticket-draft-section">
            <h4 className="ticket-draft-label">AI-Drafted Reply</h4>
            <textarea className="ticket-draft-textarea" value={draft} onChange={e => setDraft(e.target.value)} rows={5} />
            <div className="ticket-draft-actions">
              <button className="ticket-action-btn approve">✓ Approve & Send</button>
              <button className="ticket-action-btn edit">✎ Edit</button>
              <button className="ticket-action-btn discard">✕ Discard</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="ticket-detail-sidebar">
          <div className="ticket-sidebar-section">
            <h4>Customer</h4>
            <div className="ticket-customer-card">
              <div className="ticket-customer-avatar">{t.customer.avatar}</div>
              <div>
                <p className="ticket-customer-name">{t.customer.name}</p>
                <p className="ticket-customer-email">{t.customer.email}</p>
              </div>
            </div>
            <div className="ticket-sidebar-meta">
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Account age</span>
                <span className="ticket-meta-value">{t.customer.accountAge}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Churn risk</span>
                <span className="ticket-meta-value" style={{ color: '#f59e0b' }}>{t.customer.churnRisk}</span>
              </div>
            </div>
          </div>

          <div className="ticket-sidebar-section">
            <h4>Details</h4>
            <div className="ticket-sidebar-meta">
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">ID</span>
                <span className="ticket-meta-value">{id || t.id}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Channel</span>
                <span className="ticket-meta-value">{t.channel}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Intent</span>
                <span className="ticket-meta-value">{t.intent}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Sentiment</span>
                <span className="ticket-meta-value" style={{ color: t.sentiment.color }}>{t.sentiment.label} ({t.sentiment.score})</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">SLA</span>
                <span className="ticket-meta-value">{t.sla.status} ({t.sla.remaining})</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Agent</span>
                <span className="ticket-meta-value">{t.agent}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
