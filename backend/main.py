from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import models
import schemas
from database import engine, get_db
from ai_engine import analyze_ticket

# Load environment variables
load_dotenv()

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AssistFlow AI Triage Engine")

# Allow CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AssistFlow AI Triage Engine is running."}

@app.post("/api/tickets", response_model=schemas.TicketResponse)
def create_and_triage_ticket(ticket_req: schemas.TicketCreate, db: Session = Depends(get_db)):
    """
    Receives a raw ticket, runs it through the Lemma AI Triage Engine (Gemini),
    saves the result to the database, and returns the structured JSON.
    """
    
    # 1. Run AI Triage
    triage_result = analyze_ticket(
        sender=ticket_req.sender,
        subject=ticket_req.subject,
        body=ticket_req.body
    )
    
    # 2. Combine Request Data and Triage Result
    db_ticket = models.Ticket(
        sender=ticket_req.sender,
        subject=ticket_req.subject,
        body=ticket_req.body,
        **triage_result
    )
    
    # 3. Save to Database
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    # 4. Return the complete record
    return db_ticket

@app.get("/api/tickets", response_model=list[schemas.TicketResponse])
def get_tickets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch all tickets for the dashboard.
    """
    tickets = db.query(models.Ticket).order_by(models.Ticket.created_at.desc()).offset(skip).limit(limit).all()
    return tickets
