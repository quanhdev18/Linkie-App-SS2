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

                # if not existing_match:
                #     new_match = Match(
                #         user1_id=min(liker_id, liked_id),
                #         user2_id=max(liker_id, liked_id),
                #         matched_at=datetime.utcnow()
                #     )
                #     db.add(new_match)
                #     db.commit()
                #     return {"message": "Match vừa được tạo từ lượt like cũ!", "match": True}
                if not existing_match:
                    new_match = Match(
                        user1_id=min(liker_id, liked_id),
                        user2_id=max(liker_id, liked_id),
                        matched_at=datetime.utcnow()
                    )
                    db.add(new_match)
                    db.commit()

                    # ✅ TẠO CONVERSATION NGAY SAU KHI MATCH
                    # from app.models.InteractionModel import Match

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
    
    # @staticmethod
    # def get_matches(db: Session, account_id: int):
    #     matches = db.query(Match).filter(
    #         (Match.user1_id == account_id) | (Match.user2_id == account_id)
    #     ).all()

    #     user_ids = [
    #         match.user2_id if match.user1_id == account_id else match.user1_id
    #         for match in matches
    #     ]

    #     users = db.query(Account).options(joinedload(Account.profile)).filter(
    #         Account.id.in_(user_ids), 
    #         Account.is_activated == True
    #     ).all()

    #     result = []
    #     for user in users:
    #         result.append({
    #             "id": user.id,
    #             "username": user.profile.username if user.profile else "Ẩn danh",
    #         })

    #     return result
    
    @staticmethod
    def get_matches(db: Session, account_id: int):
        matches = db.query(Match).filter(
            (Match.user1_id == account_id) | (Match.user2_id == account_id)
        ).all()

        user_ids = [
            match.user2_id if match.user1_id == account_id else match.user1_id
            for match in matches
        ]

        # Load cả profile và avatar
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
                avatar_url = user.avatar.url  # Lấy đường dẫn ảnh từ bảng AccountAvatar

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
        # Xóa match (cả hai chiều)
        deleted_match = db.query(Match).filter(
            ((Match.user1_id == user1_id) & (Match.user2_id == user2_id)) |
            ((Match.user1_id == user2_id) & (Match.user2_id == user1_id))
        ).delete()

        # Xóa tin nhắn (cả hai chiều)
        from app.models.MessageModel import Message
        deleted_messages = db.query(Message).filter(
            ((Message.from_user_id == user1_id) & (Message.to_user_id == user2_id)) |
            ((Message.from_user_id == user2_id) & (Message.to_user_id == user1_id))
        ).delete()

        # Xóa like giữa hai người
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

    # @staticmethod
    # def get_users_who_liked_me(db: Session, user_id: int):
    #     """
    #     Trả về danh sách người đã thích mình, nhưng mình chưa thích họ lại.
    #     """
    #     from app.models.InteractionModel import Like
    #     from app.models.UserModel import Account

    #     # Lấy tất cả người đã like mình
    #     liked_me = db.query(Like).filter(Like.liked_id == user_id).all()

    #     # Lọc ra những người mình chưa like lại
    #     user_ids = [
    #         like.liker_id for like in liked_me
    #         if not db.query(Like).filter(
    #             Like.liker_id == user_id,
    #             Like.liked_id == like.liker_id
    #         ).first()
    #     ]

    #     # Lấy thông tin tài khoản kèm profile
    #     users = db.query(Account).options(joinedload(Account.profile)).filter(
    #         Account.id.in_(user_ids),
    #         Account.is_activated == True
    #     ).all()

    #     result = []
    #     for user in users:
    #         result.append({
    #             "id": user.id,
    #             "username": user.profile.username if user.profile else "Ẩn danh",
    #         })

    #     return result
    
    # @staticmethod
    # def get_users_who_liked_me(db: Session, user_id: int):
    #     """
    #     Lấy danh sách người đã like mình nhưng mình chưa like lại,
    #     kèm avatar nếu có.
    #     """
    #     likers = db.query(Like).filter(Like.liked_id == user_id).all()

    #     # Lấy những người chưa like lại và chưa match
    #     my_likes = db.query(Like).filter(Like.liker_id == user_id).all()
    #     my_liked_ids = {like.liked_id for like in my_likes}

    #     matches = db.query(Match).filter(
    #         (Match.user1_id == user_id) | (Match.user2_id == user_id)
    #     ).all()
    #     matched_ids = {match.user2_id if match.user1_id == user_id else match.user1_id for match in matches}

    #     result = []
    #     for like in likers:
    #         liker_id = like.liker_id
    #         if liker_id in my_liked_ids or liker_id in matched_ids:
    #             continue

    #         user = db.query(Account).options(joinedload(Account.profile)).filter(Account.id == liker_id).first()
    #         if not user:
    #             continue

    #         avatar_url = None
    #         # Lấy avatar từ bảng liên kết nếu có
    #         if hasattr(user, 'avatar') and user.avatar:
    #             avatar_url = getattr(user.avatar, 'url', None)

    #         result.append({
    #             "id": user.id,
    #             "username": user.profile.username if user.profile else "Ẩn danh",
    #             "avatar_url": avatar_url,
    #         })

    #     return result

    # @staticmethod
    # def get_users_who_liked_me(db: Session, user_id: int):
    #     likers = (
    #         db.query(Like)
    #         .filter(Like.liked_id == user_id)
    #         .all()
    #     )

    #     if not likers:
    #         return []

    #     liker_ids = [lk.liker_id for lk in likers]

    #     accounts = (
    #         db.query(Account)
    #         .options(
    #             joinedload(Account.avatar),
    #             joinedload(Account.profile).joinedload(Profile.images)
    #         )
    #         .filter(Account.id.in_(liker_ids))
    #         .all()
    #     )

    #     results = []

    #     for acc in accounts:
    #         profile = acc.profile

    #         results.append(
    #             LikedUserDetailOut(
    #                 id=acc.id,
    #                 email=acc.email,
    #                 is_activated=acc.is_activated,
    #                 role=acc.role,

    #                 avatar=acc.avatar,

    #                 username=profile.username if profile else None,
    #                 bio=profile.bio if profile else None,
    #                 gender=profile.gender if profile else None,

    #                 images=profile.images if profile else [],

    #             )
    #         )

    #     return results
    
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

            # FIX: Tạo ImageOut đúng cách
            avatar = None
            if account.avatar:
                avatar = ImageOut.model_validate(account.avatar)

            # FIX: profile images
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
