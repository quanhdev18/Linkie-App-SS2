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
    limit: int = Query(default=20, ge=1, le=50),
    min_score: float = Query(default=40.0, ge=0, le=100),
    db: Session = Depends(get_db)
):
    """
    Lấy danh sách user được đề xuất dựa trên thuật toán matching.
    
    - **user_id**: ID của user cần tìm match
    - **limit**: Số lượng kết quả tối đa (1-50)
    - **min_score**: Điểm tương thích tối thiểu (0-100)
    """
    return MatchingService.get_recommended_matches(db, user_id, limit, min_score)


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


# @router.get("/mutual-likes/{user_id}")
# def get_mutual_likes(
#     user_id: int,
#     db: Session = Depends(get_db)
# ):
#     """
#     Kiểm tra những cặp like lẫn nhau nhưng chưa tạo Match.
#     API này dùng để debug hoặc fix data.
#     """
#     return MatchingService.get_mutual_likes(db, user_id)


# @router.post("/create-missing-matches/{user_id}")
# def create_missing_matches(
#     user_id: int,
#     db: Session = Depends(get_db)
# ):
#     """
#     Tự động tạo Match cho những cặp đã like lẫn nhau nhưng chưa có Match record.
#     """
#     from app.models.InteractionModel import Match
#     from datetime import datetime
    
#     mutual_likes = MatchingService.get_mutual_likes(db, user_id)
#     created_matches = []
    
#     for mutual in mutual_likes:
#         other_user_id = mutual['account_id']
        
#         # Tạo match mới
#         new_match = Match(
#             user1_id=min(user_id, other_user_id),
#             user2_id=max(user_id, other_user_id),
#             matched_at=datetime.utcnow()
#         )
#         db.add(new_match)
#         created_matches.append({
#             'user1_id': new_match.user1_id,
#             'user2_id': new_match.user2_id,
#             'username': mutual['username']
#         })
    
#     db.commit()
    
#     return {
#         'message': f'Created {len(created_matches)} missing matches',
#         'matches': created_matches
#     }



