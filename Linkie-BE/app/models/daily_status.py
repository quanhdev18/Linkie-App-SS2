# models/daily_status.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime, timedelta
from app.core.database import Base

class DailyStatus(Base):
    __tablename__ = "daily_statuses"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("account.id"), index=True)

    content = Column(String(120), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, index=True)

    is_active = Column(Boolean, default=True)
