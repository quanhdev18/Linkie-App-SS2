from sqlalchemy.orm import Session, Query
from app.models.UserModel import Account
from app.models.ProfileModel import Profile
from app.models.InteractionModel import Like, Match
from typing import List, Dict, Optional
from datetime import datetime, timedelta, date
from sqlalchemy.orm import joinedload, Session

class MatchingService:
    @staticmethod
    def _get_base_recommendation_query(
        db: Session, 
        user_profile: Profile, 
        excluded_ids: set
    ) -> Query:
        """
        Hàm helper này CHỈ xây dựng query, KHÔNG thực thi.
        Đây chính là bước "lọc sơ qua" của bạn.
        """
        
        # 1. Lọc theo ID đã loại trừ
        query = db.query(Account).join(Profile).filter(
            Account.id.notin_(excluded_ids),
            Profile.id.isnot(None)
        )
        
        # 2. Lọc theo GIỚI TÍNH mà user muốn tìm
        # if user_profile.pref_gender:
        #     # Giả sử pref_gender là một list, vd: ['male', 'female']
        #     # Và Profile.gender là Enum
        #     query = query.filter(Profile.gender.in_(user_profile.pref_gender))
        # if user_profile.pref_gender and len(user_profile.pref_gender) > 0:
        #     query = query.filter(Profile.gender.in_(user_profile.pref_gender))
        # if user_profile.pref_gender and len(user_profile.pref_gender) > 0:
        #     preferred_genders = [g.upper() for g in user_profile.pref_gender]
        #     query = query.filter(Profile.gender.in_(preferred_genders))
        if user_profile.pref_gender and len(user_profile.pref_gender) > 0:
            allowed = {"MALE", "FEMALE"}   # đúng với enum DB hiện tại
            preferred_genders = [
                g.upper() for g in user_profile.pref_gender
                if g.upper() in allowed
            ]

            if preferred_genders:
                query = query.filter(Profile.gender.in_(preferred_genders))




        # 3. Lọc theo ĐỘ TUỔI mà user muốn tìm
        if user_profile.pref_min_age and user_profile.pref_max_age:
            today = date.today()
            
            # Tính ngày sinh tối thiểu (người trẻ nhất, vd: 18 tuổi)
            min_birth_date = today.replace(year=today.year - user_profile.pref_min_age)
            
            # Tính ngày sinh tối đa (người già nhất, vd: 35 tuổi)
            max_birth_date = today.replace(year=today.year - user_profile.pref_max_age - 1)
            
            query = query.filter(
                Profile.date_of_birth.between(max_birth_date, min_birth_date)
            )
            
        # 4. Lọc theo VỊ TRÍ (Rất quan trọng cho app dating)
        # Giả sử bạn đã thêm pref_location_city vào Profile
        if user_profile.pref_location_city:
            query = query.filter(Profile.location_city == user_profile.pref_location_city)
        
        # 5. (Tùy chọn) Lọc những người có ít nhất 1 SỞ THÍCH chung
        # Cần kiểu dữ liệu ARRAY của PostgreSQL
        # if user_profile.hobby:
        #     query = query.filter(Profile.hobby.overlap(user_profile.hobby))

        return query
    
    
    """
    Service xử lý thuật toán matching cho app hẹn hò
    Tích hợp với InteractionService để tự động cập nhật đề xuất
    """
    
    @staticmethod
    def calculate_age(date_of_birth: date) -> int:
        """Tính tuổi từ ngày sinh"""
        today = date.today()
        return today.year - date_of_birth.year - (
            (today.month, today.day) < (date_of_birth.month, date_of_birth.day)
        )
    
    @staticmethod
    def calculate_compatibility_score(user_profile: Profile, candidate_profile: Profile) -> float:
        """
        Tính điểm tương thích giữa 2 user dựa trên profile
        Điểm từ 0-100
        """
        score = 0.0
        
        # 1. Kiểm tra giới tính và target_type (30 điểm)
        if user_profile.gender and candidate_profile.gender and user_profile.target_type:
            target_types = user_profile.target_type.lower().split(',')
            candidate_gender = str(candidate_profile.gender.value).lower() if hasattr(candidate_profile.gender, 'value') else str(candidate_profile.gender).lower()
            
            if any(target.strip() in candidate_gender or candidate_gender in target.strip() 
                   for target in target_types):
                score += 30
            elif 'all' in target_types or 'both' in target_types:
                score += 30
        
        # 2. Độ tuổi phù hợp (20 điểm)
        if user_profile.date_of_birth and candidate_profile.date_of_birth:
            user_age = MatchingService.calculate_age(user_profile.date_of_birth)
            candidate_age = MatchingService.calculate_age(candidate_profile.date_of_birth)
            age_diff = abs(user_age - candidate_age)
            
            if age_diff <= 2:
                score += 20
            elif age_diff <= 5:
                score += 15
            elif age_diff <= 8:
                score += 10
            elif age_diff <= 12:
                score += 5
        
        # 3. Sở thích chung - hobby (35 điểm)
        if user_profile.hobby and candidate_profile.hobby:
            user_hobbies = set(str(h.value) if hasattr(h, 'value') else str(h) 
                             for h in user_profile.hobby)
            candidate_hobbies = set(str(h.value) if hasattr(h, 'value') else str(h) 
                                   for h in candidate_profile.hobby)
            
            common_hobbies = user_hobbies.intersection(candidate_hobbies)
            hobby_count = len(common_hobbies)
            
            if hobby_count >= 5:
                score += 35
            elif hobby_count >= 3:
                score += 25
            elif hobby_count >= 2:
                score += 15
            elif hobby_count >= 1:
                score += 8
        
        # 4. Bio similarity (15 điểm)
        if user_profile.bio and candidate_profile.bio:
            user_words = set(user_profile.bio.lower().split())
            candidate_words = set(candidate_profile.bio.lower().split())
            
            stop_words = {'và', 'của', 'có', 'là', 'được', 'this', 'the', 'a', 'an', 
                         'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'}
            user_words = user_words - stop_words
            candidate_words = candidate_words - stop_words
            
            common_words = user_words.intersection(candidate_words)
            
            if len(common_words) >= 5:
                score += 15
            elif len(common_words) >= 3:
                score += 10
            elif len(common_words) >= 2:
                score += 5
        
        return min(score, 100)
    
    
    @staticmethod
    def get_recommended_matches(
        db: Session,
        user_id: int,
        page: int = 1,
        page_size: int = 20,
        min_score: float = 20.0
    ) -> List[Dict]:

        current_user = db.query(Account).filter(Account.id == user_id).first()
        if not current_user or not current_user.profile:
            return []

        liked_ids = [
            like.liked_id
            for like in db.query(Like.liked_id)
            .filter(Like.liker_id == user_id)
            .all()
        ]

        matches = db.query(Match).filter(
            (Match.user1_id == user_id) | (Match.user2_id == user_id)
        ).all()

        matched_ids = [
            m.user2_id if m.user1_id == user_id else m.user1_id
            for m in matches
        ]

        excluded_ids = set(liked_ids + matched_ids + [user_id])

        base_query = MatchingService._get_base_recommendation_query(
            db,
            current_user.profile,
            excluded_ids
        )

        offset = (page - 1) * page_size
        candidates = base_query.offset(offset).limit(page_size).all()

        scored_candidates: List[Dict] = []

        for candidate in candidates:
            profile = candidate.profile
            if not profile:
                continue

            score = MatchingService.calculate_compatibility_score(
                current_user.profile,
                profile
            )

            if score < min_score:
                continue

            age = None
            if profile.date_of_birth:
                age = MatchingService.calculate_age(profile.date_of_birth)

            avatar_url = None
            if candidate.avatar and hasattr(candidate.avatar, "url"):
                avatar_url = candidate.avatar.url
            elif profile.avatar and hasattr(profile.avatar, "url"):
                avatar_url = profile.avatar.url

            hobbies = []
            if profile.hobby:
                hobbies = [
                    str(h.value) if hasattr(h, "value") else str(h)
                    for h in profile.hobby
                ]

            scored_candidates.append({
                "account_id": candidate.id,
                "username": profile.username,
                "profile_id": profile.id,
                "age": age,
                "gender": str(profile.gender.value) if profile.gender else None,
                "bio": profile.bio,
                "hobbies": hobbies,
                "target_type": profile.target_type,
                "height": profile.height,
                "job": profile.job,
                "education": profile.education,
                "location_name": profile.location_name,

                "avatar": avatar_url,
                "images": [
                    {
                        "id": img.id,
                        "title": img.title,              
                        "url": img.url,
                        "alt": img.alt,                  
                        "upload_date": img.upload_date,  
                    }
                    for img in profile.images
                ] if profile.images else [],

                "compatibility_score": round(score, 2),
                "image_count": len(profile.images) if hasattr(profile, "images") and profile.images else 0,
            })

        scored_candidates.sort(
            key=lambda x: x["compatibility_score"],
            reverse=True
        )

        return scored_candidates


    @staticmethod
    def get_next_suggestion(db: Session, user_id: int, skip_ids: List[int] = None) -> Optional[Dict]:
        """
        Lấy 1 user đề xuất tiếp theo (dùng cho swipe interface)
        
        Args:
            user_id: ID của user hiện tại
            skip_ids: Danh sách ID đã xem trong session này
        
        Returns:
            Dict thông tin user hoặc None nếu hết
        """
        recommendations = MatchingService.get_recommended_matches(
            db=db,
            user_id=user_id,
            limit=1,
            min_score=20.0,  
            exclude_ids=skip_ids or []
        )
        
        return recommendations[0] if recommendations else None
    
    @staticmethod
    def get_discovery_feed(
        db: Session,
        user_id: int,
        page: int = 1,
        page_size: int = 10
    ) -> Dict:
        """
        Lấy feed discover với phân trang (cho grid view)
        """
        offset = (page - 1) * page_size
        
        recommendations = MatchingService.get_recommended_matches(
            db=db,
            user_id=user_id,
            limit=page_size * 2,  
            min_score=25.0
        )
 
        paginated = recommendations[offset:offset + page_size]
        
        return {
            'users': paginated,
            'page': page,
            'page_size': page_size,
            'total': len(recommendations),
            'has_more': offset + page_size < len(recommendations)
        }
    
    @staticmethod
    def get_who_liked_me(db: Session, user_id: int) -> List[Dict]:
        """
        Lấy danh sách những người đã like bạn nhưng bạn chưa like họ lại,
        kèm đầy đủ thông tin avatar, tuổi, giới tính, sở thích...
        """
        likers = db.query(Like).filter(Like.liked_id == user_id).all()

        my_likes = db.query(Like).filter(Like.liker_id == user_id).all()
        my_liked_ids = {like.liked_id for like in my_likes}

        matches = db.query(Match).filter(
            (Match.user1_id == user_id) | (Match.user2_id == user_id)
        ).all()
        matched_ids = {
            match.user2_id if match.user1_id == user_id else match.user1_id
            for match in matches
        }

        result = []
        for like in likers:
            if like.liker_id not in my_liked_ids and like.liker_id not in matched_ids:
                user = (
                    db.query(Account)
                    .options(
                        joinedload(Account.profile),
                        joinedload(Account.avatar)
                    )
                    .filter(Account.id == like.liker_id)
                    .first()
                )

                if not user or not user.profile:
                    continue

                age = None
                if user.profile.date_of_birth:
                    age = MatchingService.calculate_age(user.profile.date_of_birth)

                avatar_url = None
                if user.avatar and hasattr(user.avatar, "url"):
                    avatar_url = user.avatar.url
                elif user.profile.avatar:
                    avatar_url = (
                        user.profile.avatar.url
                        if hasattr(user.profile.avatar, "url")
                        else None
                    )

                hobbies = []
                if user.profile.hobby:
                    hobbies = [
                        str(h.value) if hasattr(h, "value") else str(h)
                        for h in user.profile.hobby
                    ]

                result.append({
                    "account_id": user.id,
                    "username": user.profile.username,
                    "profile_id": user.profile.id,
                    "age": age,
                    "gender": str(user.profile.gender.value)
                    if user.profile.gender
                    else None,
                    "bio": user.profile.bio,
                    "hobbies": hobbies,
                    "avatar_url": avatar_url,
                    "liked_at": like.timestamp,
                })

        return result

    
    @staticmethod
    def get_mutual_likes(db: Session, user_id: int) -> List[Dict]:
        """
        Lấy những cặp like lẫn nhau nhưng chưa có Match record
        """
        my_likes = db.query(Like).filter(Like.liker_id == user_id).all()
        
        mutual_likes = []
        for like in my_likes:
            reciprocal = db.query(Like).filter(
                Like.liker_id == like.liked_id,
                Like.liked_id == user_id
            ).first()
            
            if reciprocal:
                existing_match = db.query(Match).filter(
                    ((Match.user1_id == user_id) & (Match.user2_id == like.liked_id)) |
                    ((Match.user1_id == like.liked_id) & (Match.user2_id == user_id))
                ).first()
                
                if not existing_match:
                    user = db.query(Account).filter(
                        Account.id == like.liked_id
                    ).first()
                    if user and user.profile:
                        mutual_likes.append({
                            'account_id': user.id,
                            'username': user.profile.username,
                            'should_create_match': True
                        })
        
        return mutual_likes
    
    @staticmethod
    def get_recently_active_users(
        db: Session, 
        user_id: int, 
        hours: int = 24,
        limit: int = 10
    ) -> List[Dict]:
        """
        Lấy những user active gần đây
        """
        time_threshold = datetime.utcnow() - timedelta(hours=hours)
        
        recent_likes = db.query(Like.liker_id).filter(
            Like.timestamp >= time_threshold,
            Like.liker_id != user_id
        ).distinct().all()
        
        active_user_ids = [like[0] for like in recent_likes]
        
        liked_ids = [like.liked_id for like in 
                    db.query(Like).filter(Like.liker_id == user_id).all()]
        
        matched_ids = []
        matches = db.query(Match).filter(
            (Match.user1_id == user_id) | (Match.user2_id == user_id)
        ).all()
        for match in matches:
            matched_ids.append(
                match.user2_id if match.user1_id == user_id else match.user1_id
            )
        
        excluded_ids = set(liked_ids + matched_ids + [user_id])
        active_user_ids = [uid for uid in active_user_ids if uid not in excluded_ids]
        
        users = db.query(Account).join(Profile).filter(
            Account.id.in_(active_user_ids)
        ).limit(limit).all()
        
        result = []
        for user in users:
            if user.profile:
                age = None
                if user.profile.date_of_birth:
                    age = MatchingService.calculate_age(user.profile.date_of_birth)
                
                avatar_url = None
                if user.profile.avatar:
                    avatar_url = user.profile.avatar.url if hasattr(user.profile.avatar, 'url') else None
                
                result.append({
                    'account_id': user.id,
                    'username': user.profile.username,
                    'age': age,
                    'avatar': avatar_url,
                    'status': 'Recently Active'
                })
        
        return result
    
    @staticmethod
    def get_users_by_hobby(
        db: Session,
        user_id: int,
        hobby_filter: str,
        limit: int = 20
    ) -> List[Dict]:
        """
        Tìm user theo sở thích cụ thể
        """
        liked_ids = [like.liked_id for like in 
                    db.query(Like).filter(Like.liker_id == user_id).all()]
        
        matched_ids = []
        matches = db.query(Match).filter(
            (Match.user1_id == user_id) | (Match.user2_id == user_id)
        ).all()
        for match in matches:
            matched_ids.append(
                match.user2_id if match.user1_id == user_id else match.user1_id
            )
        
        excluded_ids = set(liked_ids + matched_ids + [user_id])
        
        candidates = db.query(Account).join(Profile).filter(
            Account.id.notin_(excluded_ids),
            Profile.hobby.contains([hobby_filter])
        ).limit(limit).all()
        
        result = []
        for candidate in candidates:
            if candidate.profile:
                age = None
                if candidate.profile.date_of_birth:
                    age = MatchingService.calculate_age(candidate.profile.date_of_birth)
                
                avatar_url = None
                if candidate.profile.avatar:
                    avatar_url = candidate.profile.avatar.url if hasattr(candidate.profile.avatar, 'url') else None
                
                hobbies = []
                if candidate.profile.hobby:
                    hobbies = [str(h.value) if hasattr(h, 'value') else str(h) 
                              for h in candidate.profile.hobby]
                
                result.append({
                    'account_id': candidate.id,
                    'username': candidate.profile.username,
                    'age': age,
                    'gender': str(candidate.profile.gender.value) if candidate.profile.gender else None,
                    'hobbies': hobbies,
                    'avatar': avatar_url
                })
        
        return result
