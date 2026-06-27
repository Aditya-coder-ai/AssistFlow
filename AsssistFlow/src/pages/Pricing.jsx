import { useState } from 'react'
import { Link } from 'react-router-dom'
import GridScan from '../GridScan'
import '../styles/pages.css'

const plans = [
  {
    name: 'Free', price: '$0', period: '/mo', desc: 'For solo founders testing the waters.',
    features: [
      { label: '100 tickets/mo', included: true },
      { label: '1 channel (email)', included: true },
      { label: 'AI triage & routing', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Action execution', included: false },
      { label: 'CSAT collection', included: false },
      { label: 'Churn detection', included: false },
      { label: 'Custom integrations', included: false },
    ],
    cta: 'Start free'
  },
  {
    name: 'Growth', price: '$49', period: '/mo', desc: 'For startups scaling support fast.',
    popular: true,
    features: [
      { label: '2,000 tickets/mo', included: true },
      { label: '3 channels', included: true },
      { label: 'AI triage & routing', included: true },
      { label: 'Full analytics', included: true },
      { label: 'Action execution', included: true },
      { label: 'CSAT collection', included: true },
      { label: 'Churn detection', included: false },
      { label: 'Custom integrations', included: false },
    ],
    cta: 'Start 14-day trial'
  },
  {
    name: 'Pro', price: '$149', period: '/mo', desc: 'For teams that need everything.',
    features: [
      { label: 'Unlimited tickets', included: true },
      { label: 'All channels', included: true },
      { label: 'AI triage & routing', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Action execution', included: true },
      { label: 'CSAT collection', included: true },
      { label: 'Churn detection', included: true },
      { label: 'Custom integrations', included: true },
    ],
    cta: 'Contact sales'
  },
]

const faqs = [
  { q: 'How does the 14-day trial work?', a: 'You get full access to the Growth plan for 14 days. No credit card required. If you don\'t upgrade, you\'re automatically moved to the Free plan.' },
  { q: 'Can I change plans later?', a: 'Yes. Upgrade or downgrade anytime from Settings → Billing. Changes take effect immediately with prorated billing.' },
  { q: 'What counts as a "ticket"?', a: 'Any inbound customer message that creates a new conversation thread. Follow-up messages in the same thread don\'t count as additional tickets.' },
  { q: 'Do you offer refunds?', a: 'Yes, within 30 days of purchase if you\'re not satisfied. Email us at billing@assistflow.ai.' },
  { q: 'What AI model do you use?', a: 'We support Groq, Gemini, and Ollama. You choose which model to use in Settings → AI Config.' },
  { q: 'Is my data secure?', a: 'All data is encrypted at rest and in transit. We\'re SOC 2 Type II compliant. See our Privacy Policy for details.' },
]

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="page-pricing" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background GridScan */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#333333"
          gridScale={0.1}
          scanColor="#ffffff"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <section className="page-hero" style={{ position: 'relative', zIndex: 1 }}>
        <p className="section-label">Pricing</p>
        <h1 className="page-title">Simple pricing that scales with you.</h1>
        <p className="page-subtitle">Start free. No credit card. Upgrade when you need more.</p>
      </section>

      <section className="pricing-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-container">
          <div className="pricing-grid">
            {plans.map((p, i) => (
              <div key={i} className={`pricing-card ${p.popular ? 'popular' : ''}`}>
                {p.popular && <span className="pricing-badge">Most popular</span>}
                <h3 className="pricing-name">{p.name}</h3>
                <p className="pricing-desc">{p.desc}</p>
                <div className="pricing-price">
                  <span className="pricing-amount">{p.price}</span>
                  <span className="pricing-period">{p.period}</span>
                </div>
                <ul className="pricing-features">
                  {p.features.map((feat, j) => (
                    <li key={j} className={`pricing-feature ${feat.included ? '' : 'disabled'}`}>
                      <span className="pricing-check">{feat.included ? '✓' : '—'}</span>
                      {feat.label}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`pricing-cta ${p.popular ? 'primary' : ''}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="enterprise-banner">
            <p>More than 20 agents? <Link to="/signup" className="enterprise-link">Talk to us →</Link></p>
          </div>
        </div>
      </section>

      <section className="faq-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-container">
          <h2 className="section-title">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
