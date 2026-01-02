from pydantic import BaseModel
from typing import Optional, List
from app.enum.ProfileEnum import GenderEnum
from app.schemas.ImagesDTO import ImageOut  

class MatchedUserOut(BaseModel):
    id: int
    username: Optional[str]
    avatar_url: Optional[str] = None
    # avatar: Optional[str]

    class Config:
        from_attributes = True

class LikeOut(BaseModel):
    liked_id: int

    class Config:
        from_attributes = True
        
        

class LikedUserDetailOut(BaseModel):
    id: int
    email: str
    is_activated: bool
    role: str

    # Avatar chỉ 1 ảnh
    avatar: Optional[ImageOut] = None

    # Profile
    username: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None

    # Profile Images
    images: List[ImageOut] = []

    liked_at: Optional[str] = None

    class Config:
        from_attributes = True
