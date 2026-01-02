from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from app.schemas.ImagesDTO import ImageOut  

class LocationOut(BaseModel):
    latitude: float
    longitude: float
    last_updated: datetime
    
    class Config:
        from_attributes = True 

class LocationUpdateDTO(BaseModel):
    latitude: float
    longitude: float
    
    
class NearbyUserOut(BaseModel):
    id: int
    email: str
    is_activated: bool
    role: str
    
    # Avatar từ bảng account_avatar
    avatar: Optional[ImageOut] = None
    
    # Profile
    username: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None
    images: List[ImageOut] = []  

    latitude: float
    longitude: float

    class Config:
        from_attributes = True