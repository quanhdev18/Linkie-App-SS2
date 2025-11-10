from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud.InteractionService import InteractionService
from app.crud.AccountService import get_account_by_id
from app.schemas.interation import MatchedUserOut, LikeOut
from fastapi import Query

router = APIRouter(prefix="/interactions", tags=["Interactions"])

@router.post("/like/{liked_id}/{liker_id}")
def like_user(
    liked_id: int,
    liker_id: int,
    db: Session = Depends(get_db),
):
    result = InteractionService.like_user(db, liker_id, liked_id)

    if result.get("match"): 
        user1 = get_account_by_id(db, liker_id)
        user2 = get_account_by_id(db, liked_id)
        
        # SỬA Ở ĐÂY: Truy cập username thông qua ".profile"
        user1_username = user1.profile.username if user1.profile else None
        user2_username = user2.profile.username if user2.profile else None
        
        return {
            "message": "Match thành công!",
            "match": True,
            "conversation_created": True,
            "user1": {"username": user1_username},
            "user2": {"username": user2_username},
        }

    return {
        "message": result.get("message", "Like thành công"),
        "match": False}

@router.get("/matches/{account_id}", response_model=List[MatchedUserOut])
def get_matches(account_id: int, db: Session = Depends(get_db)):
    return InteractionService.get_matches(db, account_id)

@router.get("/interactions", response_model=list[LikeOut])
def get_liked_users(user_id: int = Query(...), db: Session = Depends(get_db)):
    """
    Lấy danh sách các account_id mà user đã like.
    """
    likes = InteractionService.get_likes_by_user(db, user_id)
    return likes

@router.delete("/unmatch/{user1_id}/{user2_id}")
def unmatch_users(user1_id: int, user2_id: int, db: Session = Depends(get_db)):
    result = InteractionService.unmatch_users(db, user1_id, user2_id)
    return result

@router.get("/liked-me/{user_id}", response_model=List[MatchedUserOut])
def get_users_who_liked_me(user_id: int, db: Session = Depends(get_db)):
    """
    Lấy danh sách người đã like mình, nhưng mình chưa like họ lại.
    """
    return InteractionService.get_users_who_liked_me(db, user_id)
