import pool from '../db.js';

// Helper to add an audit log to a ticket
export async function addTicketLog(ticketId, stepName, details) {
  try {
    await pool.query(
      'INSERT INTO ticket_logs (ticket_id, step_name, details) VALUES ($1, $2, $3)',
      [ticketId, stepName, details]
    );
    console.log(`[Ticket Log] ${ticketId} - ${stepName}: ${details}`);
  } catch (err) {
    console.error('Failed to write ticket log:', err);
  }
}

// 1. Process Refund Action
async function processRefund(ticketId, params) {
  const invoiceId = params?.invoice_id || 'UNKNOWN';
  const amount = params?.amount || '$49.00';
  
  // In a real system, this would call Stripe or Braintree API
  const details = `Simulated STRIPE chargeback. Refunded ${amount} for invoice ${invoiceId}. Status: APPROVED.`;
  await addTicketLog(ticketId, 'process_refund', details);
  
  // Update ticket status
  await pool.query(
    "UPDATE tickets SET status = 'resolved', action_taken = 'refund', action_params = $1, agent = 'AI' WHERE id = $2",
    [JSON.stringify(params), ticketId]
  );
  return { success: true, details };
}

// 2. Reset Password Action
async function resetPassword(ticketId, params) {
  const email = params?.email || 'UNKNOWN';
  const redirectDomain = 'dashboard.assistflow.ai';
  
  // Simulate Auth reset email trigger
  const details = `Simulated Firebase Auth email dispatch. Generated link pointing to ${redirectDomain} sent to ${email}.`;
  await addTicketLog(ticketId, 'reset_password', details);
  
  await pool.query(
    "UPDATE tickets SET status = 'resolved', action_taken = 'reset_password', action_params = $1, agent = 'AI' WHERE id = $2",
    [JSON.stringify(params), ticketId]
  );
  return { success: true, details };
}

// 3. Cancel Order Action
async function cancelOrder(ticketId, params) {
  const orderId = params?.order_id || 'UNKNOWN';
  
  // Simulate ERP/Order system cancellation
  const details = `Simulated Order system cancellation. Set order status for ${orderId} to CANCELLED. Issued refund to original payment source.`;
  await addTicketLog(ticketId, 'cancel_order', details);
  
  await pool.query(
    "UPDATE tickets SET status = 'resolved', action_taken = 'cancel_order', action_params = $1, agent = 'AI' WHERE id = $2",
    [JSON.stringify(params), ticketId]
  );
  return { success: true, details };
}

// 4. Escalate to Human Action
async function escalateToHuman(ticketId, params) {
  const details = `Confidence score fell below threshold or manual check required. Ticket marked as ESCALATED to agent tier.`;
  await addTicketLog(ticketId, 'escalate_to_human', details);
  
  await pool.query(
    "UPDATE tickets SET status = 'escalated', agent = 'Human', priority = 'high' WHERE id = $1",
    [ticketId]
  );
  return { success: true, details };
}

// 5. Send Reply Action
async function sendReply(ticketId, params) {
  const replyText = params?.reply_text || 'Draft response sent.';
  
  // Simulate email/chat webhook API dispatch
  const details = `Simulated SMTP/Chat integration API dispatch. Message content sent to customer: "${replyText.substring(0, 60)}..."`;
  await addTicketLog(ticketId, 'send_reply', details);
  
  await pool.query(
    "UPDATE tickets SET status = 'resolved', action_taken = 'send_reply', agent = 'AI' WHERE id = $1",
    [ticketId]
  );
  return { success: true, details };
}

// 6. Tag Ticket Action
async function tagTicket(ticketId, params) {
  const intent = params?.intent || 'general';
  const priority = params?.priority || 'medium';
  const sentiment = params?.sentiment || 'neutral';
  
  const details = `Updated metadata tags. Intent: ${intent}, Priority: ${priority}, Sentiment: ${sentiment}.`;
  await addTicketLog(ticketId, 'tag_ticket', details);
  
  await pool.query(
    "UPDATE tickets SET intent = $1, priority = $2, sentiment = $3 WHERE id = $4",
    [intent, priority, sentiment, ticketId]
  );
  return { success: true, details };
}

// Main execution map
const ACTION_MAP = {
  refund: processRefund,
  reset_password: resetPassword,
  cancel_order: cancelOrder,
  escalate: escalateToHuman,
  send_reply: sendReply,
  tag: tagTicket
};

/**
 * Run a specific action on a ticket by name.
 */
export async function executeAction(ticketId, actionName, params) {
  console.log(`[Action Dispatcher] Executing '${actionName}' for ticket ${ticketId}...`);
  const actionFn = ACTION_MAP[actionName];
  if (!actionFn) {
    throw new Error(`Unknown action: ${actionName}`);
  }
  return await actionFn(ticketId, params);
}
