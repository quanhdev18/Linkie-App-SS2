from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException
from app.models.UserModel import Account
from app.models.ProfileModel import Profile
from app.models.InteractionModel import Like, Match
from sqlalchemy.orm import joinedload
from app.crud.MatchingService import MatchingService 

class InteractionService:
    @staticmethod
    def like_user(db: Session, liker_id: int, liked_id: int) -> dict:
        if liker_id == liked_id:
            raise HTTPException(status_code=400, detail="Cannot like yourself.")
        
        liked = db.query(Account).filter(Account.id == liked_id, Account.is_activated == True).first()
        if not liked:
            raise HTTPException(status_code=404, detail="Người dùng này không còn hoạt động hoặc đã bị khóa.")


    # Check đã like trước đó chưa
        existing = db.query(Like).filter_by(liker_id=liker_id, liked_id=liked_id).first()
        if existing:
        # ✅ Nếu người kia đã like bạn trước đó, nhưng chưa tạo Match
            reciprocal = db.query(Like).filter_by(liker_id=liked_id, liked_id=liker_id).first()

            if reciprocal:
            # 🔍 Check đã có Match chưa
                existing_match = db.query(Match).filter(
                    ((Match.user1_id == liker_id) & (Match.user2_id == liked_id)) |
                    ((Match.user1_id == liked_id) & (Match.user2_id == liker_id))
                ).first()

                if not existing_match:
                    new_match = Match(
                        user1_id=min(liker_id, liked_id),
                        user2_id=max(liker_id, liked_id),
                        matched_at=datetime.utcnow()
                    )
                    db.add(new_match)
                    db.commit()
                    return {"message": "Match vừa được tạo từ lượt like cũ!", "match": True}

            return {"message": "Already liked this user.", "match": False}

    # Nếu chưa like thì lưu like mới
        new_like = Like(liker_id=liker_id, liked_id=liked_id, timestamp=datetime.utcnow())
        db.add(new_like)
        db.commit()

    # Kiểm tra nếu người kia cũng đã like lại
        reciprocal = db.query(Like).filter_by(liker_id=liked_id, liked_id=liker_id).first()
        if reciprocal:
        # Tạo Match nếu chưa có
            existing_match = db.query(Match).filter(
                ((Match.user1_id == liker_id) & (Match.user2_id == liked_id)) |
                ((Match.user1_id == liked_id) & (Match.user2_id == liker_id))
            ).first()

            if not existing_match:
                new_match = Match(
                    user1_id=min(liker_id, liked_id),
                    user2_id=max(liker_id, liked_id),
                    matched_at=datetime.utcnow()
                )
                db.add(new_match)
                db.commit()
                return {"message": "It’s a match!", "match": True}

        # return {"message": "Like recorded.", "match": False}

        liker = db.query(Account).options(joinedload(Account.profile)).filter(Account.id == liker_id, Account.is_activated == True).first()
        liked = db.query(Account).options(joinedload(Account.profile)).filter(Account.id == liked_id, Account.is_activated == True).first()

        if liker and liked and liker.profile and liked.profile:
            score = MatchingService.calculate_compatibility_score(liker.profile, liked.profile)

            # Nếu độ tương thích cao, có thể flag potential match
            if score >= 80:
                return {
                    "message": f"Like recorded. High compatibility ({score:.1f}%) — potential match!",
                    "match": False,
                    "potential_match": True,
                    "compatibility_score": round(score, 2)
                }

            return {
                "message": "Like recorded.",
                "match": False,
                "compatibility_score": round(score, 2)
            }

        return {"message": "Like recorded.", "match": False}
    
    @staticmethod
    def get_matches(db: Session, account_id: int):
        matches = db.query(Match).filter(
            (Match.user1_id == account_id) | (Match.user2_id == account_id)
        ).all()

        user_ids = [
            match.user2_id if match.user1_id == account_id else match.user1_id
            for match in matches
        ]

        users = db.query(Account).options(joinedload(Account.profile)).filter(
            Account.id.in_(user_ids), 
            Account.is_activated == True
        ).all()

        result = []
        for user in users:
            result.append({
                "id": user.id,
                "username": user.profile.username if user.profile else "Ẩn danh",
            })

        return result
    
    @staticmethod
    def get_likes_by_user(db: Session, user_id: int):
        return db.query(Like).filter(Like.liker_id == user_id).all()
