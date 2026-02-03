from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException
from app.models.UserModel import Account
from app.models.ProfileModel import Profile
from app.models.InteractionModel import Like, Match
from sqlalchemy.orm import joinedload
from app.crud.MatchingService import MatchingService 
from app.models.InteractionModel import Match, Like
from app.schemas.interation import LikedUserDetailOut
from app.schemas.ImagesDTO import ImageOut

class InteractionService:
    @staticmethod
    def like_user(db: Session, liker_id: int, liked_id: int) -> dict:
        if liker_id == liked_id:
            raise HTTPException(status_code=400, detail="Cannot like yourself.")
        
        liked = db.query(Account).filter(Account.id == liked_id, Account.is_activated == True).first()
        if not liked:
            raise HTTPException(status_code=404, detail="Người dùng này không còn hoạt động hoặc đã bị khóa.")

        existing = db.query(Like).filter_by(liker_id=liker_id, liked_id=liked_id).first()
        if existing:
            reciprocal = db.query(Like).filter_by(liker_id=liked_id, liked_id=liker_id).first()

            if reciprocal:
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

                    existing_convo = db.query(Match).filter(
                        ((Match.user1_id == liker_id) & (Match.user2_id == liked_id)) |
                        ((Match.user1_id == liked_id) & (Match.user2_id == liker_id))
                    ).first()

                    if not existing_convo:
                        convo = Match(
                            user1_id=min(liker_id, liked_id),
                            user2_id=max(liker_id, liked_id),
                            created_at=datetime.utcnow()
                        )
                        db.add(convo)
                        db.commit()

                    return {"message": "It's a match!", "match": True}


            return {"message": "Already liked this user.", "match": False}

        new_like = Like(liker_id=liker_id, liked_id=liked_id, timestamp=datetime.utcnow())
        db.add(new_like)
        db.commit()

        reciprocal = db.query(Like).filter_by(liker_id=liked_id, liked_id=liker_id).first()
        if reciprocal:
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


        liker = db.query(Account).options(joinedload(Account.profile)).filter(Account.id == liker_id, Account.is_activated == True).first()
        liked = db.query(Account).options(joinedload(Account.profile)).filter(Account.id == liked_id, Account.is_activated == True).first()

        if liker and liked and liker.profile and liked.profile:
            score = MatchingService.calculate_compatibility_score(liker.profile, liked.profile)

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

        users = db.query(Account).options(
            joinedload(Account.profile),
            joinedload(Account.avatar)
        ).filter(
            Account.id.in_(user_ids),
            Account.is_activated == True
        ).all()

        result = []
        for user in users:
            avatar_url = None
            if user.avatar:
                avatar_url = user.avatar.url  

            result.append({
                "id": user.id,
                "username": user.profile.username if user.profile else "Ẩn danh",
                "avatar_url": avatar_url,
            })

        return result

    
    @staticmethod
    def get_likes_by_user(db: Session, user_id: int):
        return db.query(Like).filter(Like.liker_id == user_id).all()

    @staticmethod
    def unmatch_users(db: Session, user1_id: int, user2_id: int):
        """
        Hủy match và xóa toàn bộ message + like giữa 2 tài khoản
        """

        deleted_match = db.query(Match).filter(
            ((Match.user1_id == user1_id) & (Match.user2_id == user2_id)) |
            ((Match.user1_id == user2_id) & (Match.user2_id == user1_id))
        ).delete()

        from app.models.MessageModel import Message
        deleted_messages = db.query(Message).filter(
            ((Message.from_user_id == user1_id) & (Message.to_user_id == user2_id)) |
            ((Message.from_user_id == user2_id) & (Message.to_user_id == user1_id))
        ).delete()

        from app.models.InteractionModel import Like
        deleted_likes = db.query(Like).filter(
            ((Like.liker_id == user1_id) & (Like.liked_id == user2_id)) |
            ((Like.liker_id == user2_id) & (Like.liked_id == user1_id))
        ).delete()

        db.commit()

        if not (deleted_match or deleted_messages or deleted_likes):
            raise HTTPException(status_code=404, detail="Không tìm thấy kết nối nào để hủy.")

        return {
            "message": "Đã hủy match và xóa toàn bộ hội thoại.",
            "deleted_match": deleted_match,
            "deleted_messages": deleted_messages,
            "deleted_likes": deleted_likes
        }
    
    @staticmethod
    def get_users_who_liked_me(db: Session, user_id: int):

        likers = (
            db.query(Like)
            .filter(Like.liked_id == user_id)
            .all()
        )

        if not likers:
            return []

        liker_ids = [lk.liker_id for lk in likers]

        accounts = (
            db.query(Account)
            .options(
                joinedload(Account.avatar),
                joinedload(Account.profile).joinedload(Profile.images)
            )
            .filter(Account.id.in_(liker_ids))
            .all()
        )

        results = []

        for account in accounts:

            like = next((lk for lk in likers if lk.liker_id == account.id), None)

            avatar = None
            if account.avatar:
                avatar = ImageOut.model_validate(account.avatar)

            images = []
            if account.profile and account.profile.images:
                images = [
                    ImageOut.model_validate(img)
                    for img in account.profile.images
                ]

            results.append(LikedUserDetailOut(
                id=account.id,
                email=account.email,
                is_activated=account.is_activated,
                role=account.role,

                avatar=avatar,

                username=account.profile.username if account.profile else None,
                bio=account.profile.bio if account.profile else None,
                gender=account.profile.gender if account.profile else None,

                images=images,

                liked_at=like.timestamp.isoformat() if like else None
            ))

        return results
