import { Link } from 'react-router-dom'
import '../styles/features-dala.css'

const featureCategories = [
  {
    category: 'Core Intelligence',
    features: [
      { title: 'Sentiment-Aware Routing', priority: 'Day 1', desc: 'Detect frustration in real-time and auto-escalate angry tickets to human agents before customers churn.', bullets: ['Score sentiment on a live scale: positive → neutral → frustrated → angry', 'Trigger automatic escalation rules based on thresholds', 'Reduce churn by catching at-risk customers early'] },
      { title: 'Memory Across Sessions', priority: 'Day 1', desc: 'Remember past issues, preferences, and context so customers never have to repeat themselves.', bullets: ['Store per-user interaction history and resolved issues', 'Surface relevant context at the start of every new conversation', 'Build customer trust through continuity'] },
      { title: 'Multilingual Auto-Detect', priority: 'Week 2', desc: 'Instantly respond in the customer\'s language — no setup, no language menus.', bullets: ['Detect language from the first message automatically', 'Support 50+ languages out of the box', 'Best model: Gemini 1.5 Flash'] },
      { title: 'Intent Prediction', priority: 'Week 2', desc: 'Predict what the user needs before they finish typing.', bullets: ['Detect ticket category from the first 5–10 words', 'Pre-load relevant knowledge base articles in background', 'Suggest likely next questions to cut back-and-forth'] },
    ]
  },
  {
    category: 'Productivity & Agent Tools',
    features: [
      { title: 'Auto-Summarize Threads', priority: 'Day 1', desc: 'When a human takes over, give them a 3-line AI summary of the full ticket history.', bullets: ['Condense long threads into a quick brief', 'Highlight key issue, attempted solutions, and current status', 'Saves 3–5 minutes per agent handoff'] },
      { title: 'Suggested Reply Drafts', priority: 'Day 1', desc: 'AI drafts the reply; human edits and sends. Best of both worlds for edge cases.', bullets: ['Generate context-aware drafts for every ticket', 'Let agents approve, tweak, or discard with one click', 'Learn from edits over time'] },
      { title: 'CSAT Auto-Collection', priority: 'Week 1', desc: 'Send micro-surveys after every ticket close and feed scores into a live dashboard.', bullets: ['Trigger a 1-question CSAT survey on ticket resolution (30 min delay)', 'Aggregate scores in real-time analytics dashboard', 'Break down CSAT by agent, channel, issue type, and time period'] },
      { title: 'SLA Breach Predictor', priority: 'Week 3', desc: 'Alert your team before an SLA is about to be missed — not after.', bullets: ['Monitor all open tickets against SLA deadlines in real-time', 'Alert at 75% and 90% of SLA time elapsed', 'Auto-elevate ticket priority to escalate routing'] },
    ]
  },
  {
    category: 'Automation & Self-Service',
    features: [
      { title: 'Action Execution', priority: 'Week 2', desc: 'Let the AI actually do things — issue refunds, reset passwords, update orders — via API.', bullets: ['Connect to your backend via secure API hooks', 'Log every AI-executed action for audit trails', 'Deflects 40–60% of ticket volume without human involvement', 'Example actions: Issue a refund, Resend verification email, Update address, Cancel subscription'] },
      { title: 'Proactive Outreach', priority: 'Month 2', desc: 'Detect issues and message customers before they contact you.', bullets: ['Monitor event streams from product and logistics systems', 'Trigger personalised outreach on anomaly detection (payment failure, shipment delay)', 'Reduces inbound ticket volume significantly'] },
      { title: 'Knowledge Base Auto-Updater', priority: 'Month 2', desc: 'AI spots gaps in your docs and drafts new help articles automatically.', bullets: ['Track questions the AI couldn\'t confidently answer', 'Auto-draft new help articles for human review', 'Keep your knowledge base evergreen without manual effort'] },
      { title: 'Voice & WhatsApp Support', priority: 'Month 2', desc: 'Same AI across chat, email, WhatsApp, Instagram DMs, and phone — unified inbox.', bullets: ['Integrate with WhatsApp Business API, Twilio (voice), Instagram, and email', 'Maintain consistent context across all channels per customer', 'Route and triage from a single unified agent dashboard'] },
    ]
  },
  {
    category: 'Insights & Growth',
    features: [
      { title: 'Churn Signal Detection', priority: 'Week 3', desc: 'Flag accounts with a pattern of complaints and trigger a success team intervention.', bullets: ['Score accounts by complaint frequency, severity, and recency', 'Create a "churn risk" dashboard updated in real-time', 'Auto-assign at-risk accounts to customer success reps'] },
      { title: 'Issue Clustering', priority: 'Week 3', desc: 'Group similar tickets to surface your top 5 real product problems every Monday.', bullets: ['Use semantic clustering to group tickets by underlying issue', 'Generate a weekly "Top Issues" digest for the product team', 'Turn your support desk into a continuous product feedback loop'] },
      { title: 'AI Confidence Scoring', priority: 'Week 1', desc: 'Show agents a confidence % on every AI response — low confidence auto-flags for review.', bullets: ['Score each AI response by confidence level (0–100%)', 'Auto-hold responses below threshold for human review', 'Prevent incorrect responses from reaching customers'] },
      { title: 'A/B Test Responses', priority: 'Month 3', desc: 'Run two AI reply strategies and let real CSAT data pick the winner automatically.', bullets: ['Define response strategy variants (tone, length, structure, CTA)', 'Measure CSAT, resolution rate, and handle time per variant', 'Auto-promote winning strategies to 100% of traffic'] },
    ]
  }
]

/* Particle shapes for the CSS constellation */
const particleTypes = [
  'tri', 'circle', 'diamond', 'square', 'dot',
  'circle', 'tri', 'dot', 'diamond', 'circle',
  'square', 'tri', 'dot', 'circle', 'diamond',
  'tri', 'dot', 'circle', 'square', 'diamond',
  'circle', 'tri', 'dot', 'diamond', 'square',
  'dot', 'circle', 'tri', 'diamond', 'dot',
]

export default function Features() {
  return (
    <div className="page-features-dala">
      {/* Particle Constellation Background */}
      <div className="dala-particles" aria-hidden="true">
        {particleTypes.map((type, i) => (
          <span key={i} className={`dala-particle dala-particle--${type}`} />
        ))}
      </div>

      {/* ---- Hero ---- */}
      <section className="dala-hero">
        <div className="dala-hero__content">
          <p className="dala-eyebrow">16 Features. Zero Busywork.</p>
          <h1 className="dala-headline">
            Built to handle
            <br />
            support. So you
            <br />
            don't have to.
          </h1>
          <p className="dala-body">
            Every feature organised by category and shipping priority — built to scale early-stage startups from day one.
          </p>
          <Link to="/signup" className="dala-cta">
            Request Access
            <span className="dala-cta__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ---- Category Sections ---- */}
      {featureCategories.map((cat, i) => (
        <section key={i} className="dala-section">
          <h2 className="dala-category-label">{cat.category}</h2>
          <div className="dala-grid">
            {cat.features.map((f, j) => (
              <div key={j} className="dala-card">
                <div className="dala-card__header">
                  <h3 className="dala-card__title">{f.title}</h3>
                  <span className="dala-card__priority">{f.priority}</span>
                </div>
                <p className="dala-card__desc">{f.desc}</p>
                <ul className="dala-card__bullets">
                  {f.bullets.map((b, idx) => (
                    <li key={idx} className="dala-card__bullet">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ---- Bottom CTA ---- */}
      <section className="dala-final-cta">
        <h2 className="dala-final-cta__headline">Ready to launch?</h2>
        <p className="dala-final-cta__body">Start with the highest-impact features today.</p>
        <Link to="/signup" className="dala-cta">
          Start Free
          <span className="dala-cta__arrow" aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  )
}
