-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS ticket_logs CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;

-- Create the tickets table
CREATE TABLE tickets (
    id VARCHAR(50) PRIMARY KEY,
    customer VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject TEXT NOT NULL,
    body TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'open',
    channel VARCHAR(50) NOT NULL,
    intent VARCHAR(50) NOT NULL,
    sentiment VARCHAR(50),
    sentiment_score REAL,
    priority VARCHAR(50) DEFAULT 'medium',
    confidence REAL DEFAULT 0.0,
    draft_reply TEXT,
    ai_reasoning TEXT,
    action_taken VARCHAR(100),
    action_params JSONB,
    agent VARCHAR(100) DEFAULT 'Unassigned',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table to audit AI reasoning step-by-step
CREATE TABLE ticket_logs (
    id SERIAL PRIMARY KEY,
    ticket_id VARCHAR(50) REFERENCES tickets(id) ON DELETE CASCADE,
    step_name VARCHAR(100) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial data
INSERT INTO tickets (
    id, customer, email, subject, body, status, channel, intent, sentiment, sentiment_score, 
    priority, confidence, draft_reply, ai_reasoning, agent, created_at
) VALUES 
('TK-1042', 'Sarah Chen', 'sarah@acme.co', 'Refund for double charge on invoice #4821', 
 'Hello, I see that I was charged twice for this month''s subscription. Invoice #4821. Please refund me.',
 'resolved', 'email', 'refund', 'neutral', -0.1, 'medium', 0.95, 
 'Hi Sarah, I verified invoice #4821 was double charged. I have issued a refund of $49.00 to your card. You will see it in 3-5 business days.',
 '<think>Customer requests refund for double charge on invoice #4821. Checked invoice, confirmed duplicate charge. Issuing refund. Confidence: 0.95.</think>',
 'AI', NOW() - INTERVAL '2 minutes'),

('TK-1041', 'James Wright', 'james@techstart.io', 'Can''t login to dashboard — password reset not working',
 'Hey, I can''t login again. I did the password reset but the link in the email goes to a 404 page.',
 'ai-handling', 'chat', 'bug', 'negative', -0.6, 'high', 0.88,
 'Hi James, I confirmed the issue was caused by an outdated domain redirect in our password reset flow. A new reset link has been sent to your email (james@techstart.io) — please check your inbox.',
 '<think>User reports login failure and 404 on reset link. Checked URL redirect server side. Determined domain app.assistflow.io is outdated. Confidence: 0.88 (below 0.90 limit for auto-reset, routing to inbox for human check).</think>',
 'AI', NOW() - INTERVAL '5 minutes'),

('TK-1040', 'Maria Lopez', 'maria@buildf.co', 'Feature request: Slack integration for ticket alerts',
 'Can we get a Slack integration so alerts post to our channels when new tickets arrive?',
 'open', 'email', 'feature', 'positive', 0.5, 'low', 0.92,
 'Hi Maria, thanks for the suggestion! Slack alerts is on our Q3 roadmap. I will tag this ticket as a feature request and note it for our product team.',
 '<think>Feature request for Slack integration. Tagged intent: feature_request. Response drafted. Confidence: 0.92. Tag action executed.</think>',
 'Unassigned', NOW() - INTERVAL '12 minutes'),

('TK-1039', 'David Kim', 'david@scaleup.dev', 'API rate limit exceeded on /v1/tickets endpoint',
 'We keep getting 429 rate limit errors when calling /v1/tickets. We only make about 10 requests per minute.',
 'escalated', 'email', 'bug', 'negative', -0.4, 'high', 0.70,
 'Hi David, I see the rate limit error. Let me escalate this to our platform engineers to look at your token limit.',
 '<think>API 429 rate limit exceeded. Requires complex checking of customer tier and token limits. Confidence 0.70. Routing to engineer.</think>',
 'Human', NOW() - INTERVAL '18 minutes');
