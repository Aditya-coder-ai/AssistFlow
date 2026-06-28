import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/app.css'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionStatus, setActionStatus] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3000/api/tickets/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Ticket not found')
        return res.json()
      })
      .then(data => {
        setTicket(data)
        setDraft(data.draft_reply || '')
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleApproveSend = async () => {
    setActionStatus('sending')
    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action_name: 'send_reply',
          params: { reply_text: draft }
        })
      })
      if (!res.ok) throw new Error('Failed to send reply')
      
      setActionStatus('success')
      // Refresh ticket details
      const updated = await fetch(`http://localhost:3000/api/tickets/${id}`).then(r => r.json())
      setTicket(updated)
    } catch (err) {
      console.error(err)
      setActionStatus(`error: ${err.message}`)
    }
  }

  const handleEscalate = async () => {
    setActionStatus('escalating')
    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action_name: 'escalate'
        })
      })
      if (!res.ok) throw new Error('Failed to escalate')
      
      setActionStatus('success')
      // Refresh ticket details
      const updated = await fetch(`http://localhost:3000/api/tickets/${id}`).then(r => r.json())
      setTicket(updated)
    } catch (err) {
      console.error(err)
      setActionStatus(`error: ${err.message}`)
    }
  }

  if (loading) {
    return <div className="inbox-empty" style={{ padding: '48px' }}>Loading ticket detail...</div>
  }

  if (error || !ticket) {
    return (
      <div className="inbox-empty" style={{ padding: '48px', color: '#ff4d4f' }}>
        Error: {error || 'Ticket not found.'}
        <br />
        <Link to="/app/inbox" className="ticket-back" style={{ marginTop: '16px', display: 'inline-block' }}>← Back to inbox</Link>
      </div>
    )
  }

  // Helper values
  const sentimentColor = 
    ticket.sentiment === 'positive' ? '#22c55e' :
    ticket.sentiment === 'negative' || ticket.sentiment === 'angry' ? '#ef4444' : '#bdbdbd';

  return (
    <div className="ticket-detail">
      {/* Header */}
      <div className="ticket-detail-header">
        <Link to="/app/inbox" className="ticket-back">← Back to inbox</Link>
        <div className="ticket-detail-title-row">
          <h2 className="ticket-detail-subject">{ticket.subject}</h2>
          <span className={`ticket-status ${ticket.status}`}>{ticket.status.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="ticket-detail-layout">
        {/* Main Content */}
        <div className="ticket-detail-main">
          {/* Ticket Description */}
          <div className="ticket-summary-card" style={{ marginBottom: '16px' }}>
            <h4 className="ticket-summary-label">Original Description</h4>
            <p className="ticket-summary-text" style={{ whiteSpace: 'pre-wrap' }}>{ticket.body || 'No description provided.'}</p>
          </div>

          {/* AI Reasoning Summary */}
          {ticket.ai_reasoning && (
            <div className="ticket-summary-card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--color-plum-voltage)' }}>
              <h4 className="ticket-summary-label">Llemma Pod Reasoning Trace</h4>
              <p className="ticket-summary-text">{ticket.ai_reasoning}</p>
            </div>
          )}

          {/* AI Logs / Audit Trail */}
          {ticket.logs && ticket.logs.length > 0 && (
            <div className="ticket-summary-card" style={{ marginBottom: '16px' }}>
              <h4 className="ticket-summary-label">n8n Execution History</h4>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ticket.logs.map((log, index) => (
                  <div key={log.id} style={{ padding: '8px', background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                      <strong>{index + 1}. {log.step_name.toUpperCase()}</strong>
                      <span>{new Date(log.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#ddd' }}>{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Draft Reply (Only show if not resolved) */}
          {ticket.status !== 'resolved' ? (
            <div className="ticket-draft-section">
              <h4 className="ticket-draft-label">AI-Drafted Reply (Confidence: {Math.round(ticket.confidence * 100)}%)</h4>
              <textarea 
                className="ticket-draft-textarea" 
                value={draft} 
                onChange={e => setDraft(e.target.value)} 
                rows={5} 
              />
              <div className="ticket-draft-actions">
                <button 
                  className="ticket-action-btn approve" 
                  onClick={handleApproveSend}
                  disabled={actionStatus === 'sending'}
                >
                  {actionStatus === 'sending' ? 'Sending...' : '✓ Approve & Send'}
                </button>
                <button 
                  className="ticket-action-btn discard"
                  onClick={handleEscalate}
                  disabled={actionStatus === 'escalating'}
                >
                  ✕ Escalate to Human
                </button>
              </div>
              {actionStatus && !actionStatus.startsWith('send') && !actionStatus.startsWith('escalate') && (
                <div style={{ marginTop: '8px', fontSize: '13px', color: actionStatus === 'success' ? '#22c55e' : '#ef4444' }}>
                  {actionStatus === 'success' ? 'Action executed successfully!' : actionStatus}
                </div>
              )}
            </div>
          ) : (
            <div className="ticket-summary-card" style={{ background: '#0e0e0e', border: '1px solid #22c55e20' }}>
              <h4 className="ticket-summary-label" style={{ color: '#22c55e' }}>✓ Ticket Resolved</h4>
              <p className="ticket-summary-text" style={{ marginTop: '6px' }}>
                <strong>Action taken:</strong> {ticket.action_taken ? ticket.action_taken.toUpperCase() : 'Manual Reply'}
              </p>
              {ticket.action_params && (
                <pre style={{ background: '#050505', padding: '8px', borderRadius: '4px', fontSize: '11px', marginTop: '6px' }}>
                  {JSON.stringify(ticket.action_params, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="ticket-detail-sidebar">
          <div className="ticket-sidebar-section">
            <h4>Customer</h4>
            <div className="ticket-customer-card">
              <div className="ticket-customer-avatar">{ticket.customer.charAt(0).toUpperCase()}</div>
              <div>
                <p className="ticket-customer-name">{ticket.customer}</p>
                <p className="ticket-customer-email">{ticket.email}</p>
              </div>
            </div>
          </div>

          <div className="ticket-sidebar-section">
            <h4>Details</h4>
            <div className="ticket-sidebar-meta">
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">ID</span>
                <span className="ticket-meta-value">{ticket.id}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Channel</span>
                <span className="ticket-meta-value">{ticket.channel}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Intent</span>
                <span className="ticket-meta-value">{ticket.intent}</span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Sentiment</span>
                <span className="ticket-meta-value" style={{ color: sentimentColor }}>
                  {ticket.sentiment || 'neutral'} {ticket.sentiment_score ? `(${ticket.sentiment_score.toFixed(1)})` : ''}
                </span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Priority</span>
                <span className="ticket-meta-value" style={{ color: ticket.priority === 'high' || ticket.priority === 'critical' ? '#ef4444' : '#ddd' }}>
                  {ticket.priority || 'medium'}
                </span>
              </div>
              <div className="ticket-meta-row">
                <span className="ticket-meta-label">Assignee</span>
                <span className="ticket-meta-value">{ticket.agent}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
