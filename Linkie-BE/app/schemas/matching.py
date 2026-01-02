from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class RecommendedUserOut(BaseModel):
    """Schema cho user được đề xuất"""
    account_id: int
    username: str
    age: Optional[int] = None
    gender: Optional[str] = None
    bio: Optional[str] = None
    hobbies: List[str] = []
    avatar: Optional[str] = None
    compatibility_score: float = Field(..., ge=0, le=100, description="Điểm tương thích 0-100")
    image_count: int = 0
    
    class Config:
        from_attributes = True


class WhoLikedMeOut(BaseModel):
    """Schema cho người đã like mình"""
    account_id: int
    username: str
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