import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LightRays from '../LightRays'
import MagneticButton from '../MagneticButton'
import '../styles/home.css'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

const features = [
  { icon: '⚡', title: 'AI Triage', desc: 'Instantly categorizes and routes tickets by intent, sentiment, and urgency.' },
  { icon: '🔄', title: 'Action Execution', desc: 'Processes refunds, password resets, and account changes autonomously.' },
  { icon: '📊', title: 'CSAT Collection', desc: 'Auto-collects satisfaction scores after every resolved conversation.' },
  { icon: '🛡', title: 'Churn Detection', desc: 'Flags at-risk customers before they leave based on sentiment patterns.' },
]

const steps = [
  { num: '01', title: 'Connect', desc: 'Plug in your email, chat, or helpdesk in under 6 minutes.' },
  { num: '02', title: 'Triage', desc: 'AI reads every ticket, classifies intent, and drafts a reply.' },
  { num: '03', title: 'Resolve', desc: '84% of tickets resolved without a human ever touching them.' },
]

const plans = [
  { name: 'Free', price: '$0', period: '/mo', features: ['100 tickets/mo', '1 channel', 'AI triage', 'Email support'], cta: 'Start free' },
  { name: 'Growth', price: '$49', period: '/mo', features: ['2,000 tickets/mo', '3 channels', 'Action execution', 'CSAT collection', 'Priority support'], cta: 'Start trial', popular: true },
  { name: 'Pro', price: '$149', period: '/mo', features: ['Unlimited tickets', 'All channels', 'Churn detection', 'Custom integrations', 'Dedicated CSM'], cta: 'Contact sales' },
]

export default function Home() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      '.hero-reveal',
      { y: 40, opacity: 0, visibility: 'hidden' },
      { y: 0, opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.2 }
    )

    gsap.utils.toArray('.scroll-reveal').forEach(el => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      })
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Background Animation for entire page */}
      <div className="hero-canvas-bg" id="hero-visual">
        <LightRays raysOrigin="top-center" raysColor="#ffffff" raysSpeed={1.2} lightSpread={1.4} rayLength={3} followMouse={true} mouseInfluence={0.2} noiseAmount={0.05} distortion={0.03} saturation={0.9} fadeDistance={0.6} />
        <div className="noise-overlay"></div>
      </div>

      {/* ---- Hero ---- */}
      <section className="hero" id="hero">
        <div className="hero-container">
          <div className="hero-copy">
            <div className="hero-badge hero-reveal" id="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              Support that never sleeps
            </div>
            <h1 className="hero-headline hero-reveal" id="hero-headline">
              Your customers get answers.
              <br />
              <span className="gradient-text">Before you wake up.</span>
            </h1>
            <p className="hero-subheadline hero-reveal" id="hero-subheadline">
              Drop a ticket in. Get a triaged, drafted reply in seconds.
              <br />
              AssistFlow handles the inbox so your team handles what matters.
            </p>
            <div className="hero-ctas hero-reveal" id="cta">
              <MagneticButton href="/signup" className="btn-primary" id="cta-primary">
                Start free — no credit card
                <span className="btn-shine" aria-hidden="true" />
              </MagneticButton>
              <Link to="/features" className="btn-secondary" id="cta-secondary">
                See how it works
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Features ---- */}
      <section className="home-features" id="features">
        <div className="section-container">
          <p className="section-label scroll-reveal">What it does</p>
          <h2 className="section-title scroll-reveal">Everything your support team needs. Minus the team.</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card scroll-reveal">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="home-steps" id="how-it-works">
        <div className="section-container">
          <p className="section-label scroll-reveal">How it works</p>
          <h2 className="section-title scroll-reveal">Three steps. Six minutes. Done.</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card scroll-reveal">
                <span className="step-num">{s.num}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                {i < steps.length - 1 && <div className="step-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Social Proof ---- */}
      <section className="home-proof" id="proof">
        <div className="section-container">
          <div className="proof-stats-row scroll-reveal">
            <div className="proof-stat-item">
              <span className="proof-stat-number gradient-text">84%</span>
              <p className="proof-stat-label">tickets auto-resolved</p>
            </div>
            <div className="proof-stat-divider" />
            <div className="proof-stat-item">
              <span className="proof-stat-number gradient-text">73%</span>
              <p className="proof-stat-label">CSAT maintained by AI</p>
            </div>
            <div className="proof-stat-divider" />
            <div className="proof-stat-item">
              <span className="proof-stat-number gradient-text">6 min</span>
              <p className="proof-stat-label">setup time</p>
            </div>
          </div>
          <p className="social-proof-label scroll-reveal">Trusted by fast-moving startup teams</p>
          <div className="social-proof-logos scroll-reveal">
            <span className="logo-placeholder">Acme Co</span>
            <span className="logo-placeholder">LaunchPad</span>
            <span className="logo-placeholder">ShipFast</span>
            <span className="logo-placeholder">ScaleUp</span>
            <span className="logo-placeholder">FoundrOS</span>
          </div>
        </div>
      </section>

      {/* ---- Pricing Preview ---- */}
      <section className="home-pricing" id="pricing-preview">
        <div className="section-container">
          <p className="section-label scroll-reveal">Pricing</p>
          <h2 className="section-title scroll-reveal">Start free. Scale when you're ready.</h2>
          <div className="pricing-grid">
            {plans.map((p, i) => (
              <div key={i} className={`pricing-card scroll-reveal ${p.popular ? 'popular' : ''}`}>
                {p.popular && <span className="pricing-badge">Most popular</span>}
                <h3 className="pricing-name">{p.name}</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">{p.price}</span>
                  <span className="pricing-period">{p.period}</span>
                </div>
                <ul className="pricing-features">
                  {p.features.map((feat, j) => (
                    <li key={j} className="pricing-feature">
                      <span className="pricing-check">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`pricing-cta ${p.popular ? 'primary' : ''}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="home-final-cta scroll-reveal">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to stop drowning in tickets?</h2>
          <p className="section-subtitle">Join 200+ startups already using AssistFlow.</p>
          <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/signup" className="btn-primary">
              Start free — no credit card
              <span className="btn-shine" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
