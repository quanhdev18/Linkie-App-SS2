# routers/daily_status.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.core.database import get_db
from app.security.AuthDependency import get_current_account
from app.models.daily_status import DailyStatus
from app.schemas.daily_status import DailyStatusCreate

router = APIRouter(prefix="/daily-status", tags=["Daily Status"])

@router.post("")
def create_daily_status(
    data: DailyStatusCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_account),
):
    now = datetime.utcnow()

    existing = db.query(DailyStatus).filter(
        DailyStatus.user_id == current_user.id,
        DailyStatus.is_active == True,
        DailyStatus.expires_at > now
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Bạn đang có trạng thái đang hoạt động"
        )

    status = DailyStatus(
        user_id=current_user.id,
        content=data.content.strip(),
        expires_at=now + timedelta(hours=24),
        is_active=True
    )

    db.add(status)
    db.commit()

    return {"success": True}

@router.get("/user/{user_id}")
def get_user_status(
    user_id: int,
    db: Session = Depends(get_db),
):
    now = datetime.utcnow()

    status = db.query(DailyStatus).filter(
        DailyStatus.user_id == user_id,
        DailyStatus.is_active == True,
        DailyStatus.expires_at > now
    ).first()

    return status

@router.get("/explore")
def explore_daily_status(
    db: Session = Depends(get_db),
    limit: int = 50,
):
    now = datetime.utcnow()

    statuses = (
        db.query(DailyStatus)
        .filter(
            DailyStatus.is_active == True,
            DailyStatus.expires_at > now
        )
        .order_by(DailyStatus.created_at.desc())
        .limit(limit)
        .all()
    )

    return statuses

@router.delete("")
def delete_my_status(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_account),
):
    db.query(DailyStatus).filter(
        DailyStatus.user_id == current_user.id,
        DailyStatus.is_active == True
    ).update({"is_active": False})

    db.commit()
    return {"success": True}
