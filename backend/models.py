from sqlalchemy import Column, Integer, String, Float, Boolean, Text, JSON, DateTime
from datetime import datetime, timezone
from database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String, index=True)
    subject = Column(String)
    body = Column(Text)
    
    # AI Triage Fields
    category = Column(String, index=True)
    priority = Column(String, index=True)
    sentiment = Column(String)
    confidence = Column(Float)
    summary = Column(Text)
    escalate = Column(Boolean, default=False)
    tags = Column(JSON)
    status = Column(String, default="triaged")
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
