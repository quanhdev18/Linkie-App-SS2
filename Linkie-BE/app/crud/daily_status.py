from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.core.database import get_db
from app.core.auth import get_current_account
from app.models.daily_status import DailyStatus

def cleanup_expired_status(db: Session):
    now = datetime.utcnow()
    db.query(DailyStatus).filter(
        DailyStatus.expires_at < now
    ).update({"is_active": False})
    db.commit()
