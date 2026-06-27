import { useState } from 'react'
import '../styles/app.css'

const tabs = ['AI Config', 'Escalation', 'Channels', 'Integrations', 'Team', 'Billing']

const teamMembers = [
  { name: 'You (Founder)', email: 'founder@startup.com', role: 'Admin', status: 'Active' },
  { name: 'Alex Turner', email: 'alex@startup.com', role: 'Agent', status: 'Active' },
  { name: 'Sarah Chen', email: 'sarah@startup.com', role: 'Viewer', status: 'Invited' },
]

const integrations = [
  { name: 'Slack', desc: 'Get ticket alerts in your Slack channels.', connected: true },
  { name: 'Zapier', desc: 'Connect to 5,000+ apps via Zapier.', connected: false },
  { name: 'Notion', desc: 'Sync knowledge base articles from Notion.', connected: false },
  { name: 'HubSpot CRM', desc: 'Sync customer data with HubSpot.', connected: true },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('AI Config')
  const [aiModel, setAiModel] = useState('groq')
  const [sentimentThreshold, setSentimentThreshold] = useState(-0.5)
  const [refundLimit, setRefundLimit] = useState(50)

  return (
    <div className="settings">
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button key={tab} className={`settings-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === 'AI Config' && (
          <div className="settings-panel">
            <h3>AI Model Configuration</h3>
            <p className="settings-desc">Choose which AI model powers your ticket responses.</p>
            <div className="settings-form-group">
              <label>Model Provider</label>
              <div className="settings-radio-group">
                {['groq', 'gemini', 'ollama'].map(m => (
                  <label key={m} className={`settings-radio ${aiModel === m ? 'selected' : ''}`}>
                    <input type="radio" name="model" value={m} checked={aiModel === m} onChange={e => setAiModel(e.target.value)} />
                    <span className="settings-radio-label">{m.charAt(0).toUpperCase() + m.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="settings-form-group">
              <label>Temperature</label>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.3" className="settings-range" />
              <span className="settings-range-value">0.3</span>
            </div>
            <button className="settings-save-btn">Save changes</button>
          </div>
        )}

        {activeTab === 'Escalation' && (
          <div className="settings-panel">
            <h3>Escalation Rules</h3>
            <p className="settings-desc">Configure when tickets get escalated to human agents.</p>
            <div className="settings-form-group">
              <label>Sentiment Threshold</label>
              <p className="settings-hint">Escalate when sentiment score drops below this value.</p>
              <input type="number" step="0.1" min="-1" max="0" value={sentimentThreshold} onChange={e => setSentimentThreshold(e.target.value)} className="settings-input" />
            </div>
            <div className="settings-form-group">
              <label>Auto-escalate on keywords</label>
              <input type="text" defaultValue="cancel, lawsuit, attorney, refund" className="settings-input" />
            </div>
            <button className="settings-save-btn">Save changes</button>
          </div>
        )}

        {activeTab === 'Channels' && (
          <div className="settings-panel">
            <h3>Connected Channels</h3>
            <p className="settings-desc">Manage how customers reach you.</p>
            <div className="settings-channels">
              {[{ name: 'Email', status: 'Connected', detail: 'support@startup.com' }, { name: 'Live Chat', status: 'Connected', detail: 'Widget active on 3 pages' }, { name: 'WhatsApp', status: 'Not connected', detail: 'Connect your WhatsApp Business account' }].map((ch, i) => (
                <div key={i} className="settings-channel-row">
                  <div>
                    <p className="settings-channel-name">{ch.name}</p>
                    <p className="settings-channel-detail">{ch.detail}</p>
                  </div>
                  <button className={`settings-channel-btn ${ch.status === 'Connected' ? 'connected' : ''}`}>
                    {ch.status === 'Connected' ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Integrations' && (
          <div className="settings-panel">
            <h3>Integrations</h3>
            <p className="settings-desc">Connect AssistFlow to your existing tools.</p>
            <div className="settings-integrations">
              {integrations.map((int, i) => (
                <div key={i} className="settings-integration-row">
                  <div>
                    <p className="settings-integration-name">{int.name}</p>
                    <p className="settings-integration-desc">{int.desc}</p>
                  </div>
                  <button className={`settings-channel-btn ${int.connected ? 'connected' : ''}`}>
                    {int.connected ? 'Connected ✓' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Team' && (
          <div className="settings-panel">
            <h3>Team Members</h3>
            <p className="settings-desc">Manage who has access to your AssistFlow workspace.</p>
            <div className="settings-team-list">
              <div className="settings-team-header">
                <span>Name</span><span>Email</span><span>Role</span><span>Status</span>
              </div>
              {teamMembers.map((m, i) => (
                <div key={i} className="settings-team-row">
                  <span>{m.name}</span>
                  <span className="settings-team-email">{m.email}</span>
                  <span><select defaultValue={m.role} className="settings-select"><option>Admin</option><option>Agent</option><option>Viewer</option></select></span>
                  <span className={`settings-team-status ${m.status.toLowerCase()}`}>{m.status}</span>
                </div>
              ))}
            </div>
            <button className="settings-invite-btn">+ Invite team member</button>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="settings-panel">
            <h3>Billing & Plan</h3>
            <p className="settings-desc">Manage your subscription and payment method.</p>
            <div className="billing-current">
              <div className="billing-plan-card">
                <div>
                  <p className="billing-plan-name">Growth Plan</p>
                  <p className="billing-plan-price">$49/mo</p>
                </div>
                <div>
                  <p className="billing-usage">1,247 / 2,000 tickets used</p>
                  <div className="billing-usage-bar">
                    <div className="billing-usage-fill" style={{ width: '62%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="billing-actions">
              <button className="settings-save-btn">Upgrade to Pro</button>
              <button className="settings-cancel-btn">Cancel subscription</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
