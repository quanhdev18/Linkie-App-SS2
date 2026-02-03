from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud.MatchingService import MatchingService
from app.schemas.matching import (
    RecommendedUserOut, 
    WhoLikedMeOut, 
    RecentlyActiveOut,
    UserByHobbyOut
)

router = APIRouter(prefix="/matching", tags=["Matching"])

@router.get("/recommendations/{user_id}", response_model=List[RecommendedUserOut])
def get_recommendations(
    user_id: int,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=50),
    min_score: float = Query(default=20.0, ge=0, le=100),
    db: Session = Depends(get_db)
):
    return MatchingService.get_recommended_matches(
        db=db,
        user_id=user_id,
        page=page,
        page_size=page_size,
        min_score=min_score
    )


@router.get("/who-liked-me/{user_id}", response_model=List[WhoLikedMeOut])
def get_who_liked_me(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Lấy danh sách những người đã like bạn nhưng bạn chưa like lại.
    Đây là tính năng premium trong nhiều app hẹn hò.
    """
    return MatchingService.get_who_liked_me(db, user_id)


@router.get("/recently-active/{user_id}", response_model=List[RecentlyActiveOut])
def get_recently_active(
    user_id: int,
    hours: int = Query(default=24, ge=1, le=168),
    limit: int = Query(default=10, ge=1, le=30),
    db: Session = Depends(get_db)
):
    """
    Lấy những user đang active gần đây.
    
    - **user_id**: ID của user
    - **hours**: Số giờ để tính active (1-168 giờ)
    - **limit**: Số lượng kết quả (1-30)
    """
    return MatchingService.get_recently_active_users(db, user_id, hours, limit)

