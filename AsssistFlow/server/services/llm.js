import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '../prompts/triage-agent.js';
import dotenv from 'dotenv';

dotenv.config();

// Helper to parse the model output into think and json blocks
function parseModelOutput(text) {
  const thinkRegex = /<think>([\s\S]*?)<\/think>/;
  const thinkMatch = text.match(thinkRegex);
  const reasoning = thinkMatch ? thinkMatch[1].trim() : 'No thinking block found.';
  
  // Clean JSON block: remove markdown formatting and extract json string
  let jsonString = text.replace(thinkRegex, '').trim();
  
  // Remove markdown code blocks if present
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.substring(7);
  }
  if (jsonString.startsWith('```')) {
    jsonString = jsonString.substring(3);
  }
  if (jsonString.endsWith('```')) {
    jsonString = jsonString.substring(0, jsonString.length - 3);
  }
  jsonString = jsonString.trim();

  try {
    const parsed = JSON.parse(jsonString);
    return { reasoning, data: parsed };
  } catch (err) {
    console.error('Failed to parse model output as JSON:', jsonString, err);
    throw new Error('LLM output format was invalid JSON.');
  }
}

// Groq Primary Call
async function callGroq(userPrompt) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not defined in env.');
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    model: 'llama-3.1-70b-versatile',
    temperature: 0.1,
    max_tokens: 2048,
    // response_format: { type: 'json_object' } // Llemma Pod system prompt has raw text before json, so using json_object format would fail because of <think>...</think> text prefix. We will parse it manually.
  });

  return chatCompletion.choices[0]?.message?.content || '';
}

// Gemini Fallback Call
async function callGemini(userPrompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in env.');
  }

  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_PROMPT
  });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 2048
    }
  });

  return result.response.text();
}

/**
 * Perform Triage on a ticket body & metadata.
 * Returns { reasoning, data }
 */
export async function runTriagePipeline(ticket) {
  const userPrompt = `
TICKET DATA:
- ID: ${ticket.id}
- Customer: ${ticket.customer}
- Email: ${ticket.email}
- Subject: ${ticket.subject}
- Body: ${ticket.body}
- Channel: ${ticket.channel}
- Metadata: ${JSON.stringify(ticket.metadata || {})}
`;

  console.log(`[Triage Pipeline] Processing ticket ${ticket.id}...`);

  // Attempt 1: Groq
  try {
    console.log('[Triage Pipeline] Attempting Primary (Groq Llama-3.1)...');
    const output = await callGroq(userPrompt);
    return parseModelOutput(output);
  } catch (groqErr) {
    console.warn('[Triage Pipeline] Groq call failed or timed out:', groqErr.message);
    
    // Attempt 2: Gemini Fallback
    try {
      console.log('[Triage Pipeline] Attempting Fallback (Gemini 1.5 Flash)...');
      const output = await callGemini(userPrompt);
      return parseModelOutput(output);
    } catch (geminiErr) {
      console.error('[Triage Pipeline] Both primary and fallback LLM services failed!');
      throw new Error(`AI Triage failed. Groq error: ${groqErr.message}. Gemini error: ${geminiErr.message}`);
    }
  }
}
