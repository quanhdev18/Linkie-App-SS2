# app/schemas/user.py
from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from app.enum.ProfileEnum import GenderEnum, HobbyEnum, ZodiacEnum
from app.schemas.ImagesDTO import ImageOut

class ProfileOut(BaseModel):
    id: int
    # username: str
    # gender: GenderEnum
    username: Optional[str] = None               
    gender: Optional[GenderEnum] = None          
    date_of_birth: Optional[date] = None
    bio: Optional[str] = None
    created_at: datetime
    images: List[ImageOut]
    target_type: Optional[str] = None
    hobby: Optional[List[HobbyEnum]] = None
    height: Optional[int] = None
    zodiac_sign: Optional[ZodiacEnum] = None
    job: Optional[str] = None           # {"position": "...", "company": "..."}
    education: Optional[str] = None  
    avatar: Optional[ImageOut] = None
    account_id: Optional[int]
    location_name: Optional[str] = None
    # profile_age_days: Optional[int] = None
    
    class Config:
        from_attributes = True

class ProfileCreate(BaseModel):
    # username: str
    # gender: GenderEnum
    username: Optional[str] = None               
    gender: Optional[GenderEnum] = None   
    date_of_birth: Optional[date] = None
    bio: Optional[str] = None
    target_type: Optional[str] = None
    hobby: Optional[List[HobbyEnum]] = None
    height: Optional[int] = None
    zodiac_sign: Optional[ZodiacEnum] = None
    job: Optional[str] = None  
    education: Optional[str] = None  
    
    model_config = {
       "from_attributes" : True 
    }
        
class ProfileUpdate(BaseModel):
    # ❌ Không cho cập nhật username ở đây!
    gender: Optional[GenderEnum] = None
    date_of_birth: Optional[date] = None
    bio: Optional[str] = None
    target_type: Optional[str] = None
    hobby: Optional[List[HobbyEnum]] = None
    height: Optional[int] = None
    zodiac_sign: Optional[ZodiacEnum] = None
    job: Optional[str] = None  
    education: Optional[str] = None  

    model_config = {"from_attributes": True}

class MatchTargetResponse(BaseModel):
    profiles: List[ProfileOut]
    can_view_photos: bool