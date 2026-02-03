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
    profile_id: Optional[int] = None
    avatar: Optional[ImageOut] = None
    username: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None
    images: List[ImageOut] = []  

    latitude: float
    longitude: float

    class Config:
        from_attributes = True