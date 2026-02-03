from pydantic import BaseModel
from typing import Optional, List
from app.enum.ProfileEnum import GenderEnum
from app.schemas.ImagesDTO import ImageOut  

class MatchedUserOut(BaseModel):
    id: int
    username: Optional[str]
    avatar_url: Optional[str] = None

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

    avatar: Optional[ImageOut] = None

    username: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None

    images: List[ImageOut] = []

    liked_at: Optional[str] = None

    class Config:
        from_attributes = True
