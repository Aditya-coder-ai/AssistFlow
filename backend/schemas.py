from pydantic import BaseModel, Field
from typing import List
from enum import Enum
from datetime import datetime

class CategoryEnum(str, Enum):
    billing = "billing"
    bug = "bug"
    feature_request = "feature_request"
    onboarding = "onboarding"
    account = "account"
    technical = "technical"
    general = "general"

class PriorityEnum(str, Enum):
    P1 = "P1"
    P2 = "P2"
    P3 = "P3"

class SentimentEnum(str, Enum):
    Positive = "Positive"
    Neutral = "Neutral"
    Negative = "Negative"
    Angry = "Angry"

class TicketCreate(BaseModel):
    sender: str
    subject: str
    body: str

class AITriageResult(BaseModel):
    category: CategoryEnum
    priority: PriorityEnum
    sentiment: SentimentEnum
    confidence: float = Field(ge=0.0, le=1.0)
    summary: str
    escalate: bool
    tags: List[str]
    status: str = "triaged"

class TicketResponse(AITriageResult):
    id: int
    sender: str
    subject: str
    body: str
    created_at: datetime

    class Config:
        from_attributes = True
