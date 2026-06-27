import { useState } from 'react'
import '../styles/pages.css'

export default function Legal() {
  const [tab, setTab] = useState('privacy')

  return (
    <div className="page-legal">
      <section className="page-hero">
        <h1 className="page-title">Legal</h1>
        <p className="page-subtitle">Last updated: June 2026</p>
      </section>

      <section className="legal-section">
        <div className="section-container">
          <div className="legal-tabs">
            <button className={`legal-tab ${tab === 'privacy' ? 'active' : ''}`} onClick={() => setTab('privacy')}>Privacy Policy</button>
            <button className={`legal-tab ${tab === 'terms' ? 'active' : ''}`} onClick={() => setTab('terms')}>Terms of Service</button>
          </div>

          {tab === 'privacy' && (
            <div className="legal-content">
              <h2>Privacy Policy</h2>
              <p>AssistFlow ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your data.</p>

              <h3>1. Data We Collect</h3>
              <p>We collect information you provide when creating an account (name, email, password), support ticket content processed through our platform, usage analytics (pages visited, features used), and payment information (processed by Stripe — we never store card details).</p>

              <h3>2. How We Use Your Data</h3>
              <p>Your data is used to provide and improve the AssistFlow service, train AI models on your ticket data (only within your workspace, never shared), send transactional emails (confirmations, alerts), and analyze usage patterns to improve the product.</p>

              <h3>3. Data Storage & Security</h3>
              <p>All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Our infrastructure is hosted on SOC 2 Type II compliant providers. We perform regular security audits and penetration testing.</p>

              <h3>4. Data Retention</h3>
              <p>Account data is retained while your account is active. Ticket data is retained for 12 months after resolution. You can request full data deletion at any time via Settings or by emailing privacy@assistflow.ai.</p>

              <h3>5. Your Rights</h3>
              <p>You have the right to access your data, correct inaccuracies, request deletion, export your data, and opt out of analytics tracking. To exercise these rights, contact privacy@assistflow.ai.</p>

              <h3>6. Third-Party Services</h3>
              <p>We use Stripe for payments, Google OAuth for authentication, and Groq/Gemini for AI processing. Each has their own privacy policy governing their handling of your data.</p>
            </div>
          )}

          {tab === 'terms' && (
            <div className="legal-content">
              <h2>Terms of Service</h2>
              <p>By using AssistFlow, you agree to these terms. If you don't agree, please don't use the service.</p>

              <h3>1. Acceptable Use</h3>
              <p>You agree to use AssistFlow only for lawful business purposes, not to upload harmful, abusive, or illegal content, not to attempt to reverse-engineer our AI models, and not to resell or redistribute the service without written permission.</p>

              <h3>2. Account Responsibility</h3>
              <p>You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access. One person or legal entity per account.</p>

              <h3>3. Subscription Terms</h3>
              <p>Free plan: no payment required, limited to 100 tickets/month. Paid plans: billed monthly or annually. Cancel anytime from Settings → Billing. Downgrades take effect at end of current billing period.</p>

              <h3>4. Refund Policy</h3>
              <p>Full refund within 30 days of first payment if you're not satisfied. After 30 days, remaining subscription time is non-refundable but you retain access until the end of your billing period.</p>

              <h3>5. Service Availability</h3>
              <p>We target 99.9% uptime but don't guarantee it. Scheduled maintenance windows will be communicated at least 48 hours in advance. We are not liable for downtime caused by third-party providers.</p>

              <h3>6. Limitation of Liability</h3>
              <p>AssistFlow is provided "as is". We are not liable for decisions made by the AI agent, data loss caused by circumstances beyond our control, or indirect, incidental, or consequential damages.</p>

              <h3>7. Changes to Terms</h3>
              <p>We may update these terms at any time. Material changes will be communicated via email at least 14 days in advance. Continued use after changes constitutes acceptance.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
