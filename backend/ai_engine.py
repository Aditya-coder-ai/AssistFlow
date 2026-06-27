import os
import instructor
from groq import Groq
from schemas import AITriageResult
from dotenv import load_dotenv

load_dotenv()

def analyze_ticket(sender: str, subject: str, body: str) -> dict:
    """
    Analyzes an incoming ticket using Groq API and Instructor for structured outputs.
    Requires GROQ_API_KEY environment variable.
    """
    try:
        # Patch the Groq client with Instructor for Pydantic support
        client = instructor.from_groq(Groq())
    except Exception as e:
        print(f"Error initializing Groq Client (missing API key?): {e}")
        return _fallback_result()

    prompt = f"""
    Analyze the following customer support ticket and extract the necessary triage metadata.
    
    Sender: {sender}
    Subject: {subject}
    Body: {body}
    
    Instructions:
    - Determine the category, priority, and sentiment.
    - Provide a confidence score between 0.0 and 1.0.
    - Provide a concise summary (max 30 words).
    - Determine if it should be escalated (Priority=P1, Sentiment=Angry, Confidence < 0.70, Legal, Refund dispute, Security, Threats, Chargeback).
    - Generate relevant tags.
    - Always set status to 'triaged'.
    """

    try:
        result = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            response_model=AITriageResult,
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert AI Triage Assistant. You carefully follow instructions and return perfectly formatted JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.1,
        )
        
        # Apply manual escalation rules as an absolute safeguard
        should_escalate = result.escalate
        if result.priority == "P1" or result.sentiment == "Angry" or result.confidence < 0.70:
            should_escalate = True
            
        result.escalate = should_escalate
        
        return result.model_dump()
        
    except Exception as e:
        # Fallback in case of catastrophic failure
        print(f"Error parsing AI response from Groq: {e}")
        return _fallback_result()

def _fallback_result():
    return {
        "category": "general",
        "priority": "P2",
        "sentiment": "Neutral",
        "confidence": 0.0,
        "summary": "Failed to automatically triage this ticket.",
        "escalate": True, # Always escalate if AI fails
        "tags": ["triage_failure"],
        "status": "triaged"
    }
