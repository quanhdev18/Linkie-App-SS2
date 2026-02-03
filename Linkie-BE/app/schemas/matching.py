from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.schemas.ImagesDTO import ImageOut

class RecommendedUserOut(BaseModel):
    """Schema cho user được đề xuất"""
    account_id: int
    username: str
    profile_id: int
    age: Optional[int] = None
    gender: Optional[str] = None
    bio: Optional[str] = None
    hobbies: List[str] = []
    target_type: Optional[str] = None
    height: Optional[int] = None
    job: Optional[str] = None  
    education: Optional[str] = None  
    avatar: Optional[str] = None
    location_name: Optional[str] = None
    compatibility_score: float = Field(..., ge=0, le=100, description="Điểm tương thích 0-100")
    image_count: int = 0
    images: List[ImageOut]
    class Config:
        from_attributes = True


class WhoLikedMeOut(BaseModel):
    """Schema cho người đã like mình"""
    account_id: int
    username: str
    profile_id: int
    age: Optional[int] = None
    gender: Optional[str] = None
    bio: Optional[str] = None
    hobbies: List[str] = []
    avatar_url: Optional[str] = None
    liked_at: datetime
    
    class Config:
        from_attributes = True


class RecentlyActiveOut(BaseModel):
    """Schema cho user active gần đây"""
    account_id: int
    username: str
    age: Optional[int] = None
    avatar: Optional[str] = None
    status: str = "Recently Active"
    
    class Config:
        from_attributes = True


class MutualLikeOut(BaseModel):
    """Schema cho like lẫn nhau"""
    account_id: int
    username: str
    should_create_match: bool = True
    
    class Config:
        from_attributes = True


class UserByHobbyOut(BaseModel):
    """Schema cho user tìm theo hobby"""
    account_id: int
    username: str
    age: Optional[int] = None
    gender: Optional[str] = None
    hobbies: List[str] = []
    avatar_url: Optional[str] = None
    
    class Config:
        from_attributes = True