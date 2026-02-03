from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

class ImageOut(BaseModel):
    id: int
    title: str
    url: str
    alt: Optional[str] = None
    upload_date: datetime
    
    class Config:
        from_attributes = True
        
class ImageSimpleOut(BaseModel):
    id: int
    url: str

    class Config:
        from_attributes = True


class ProfileImagesOut(BaseModel):
    profile_id: int
    avatar: Optional[ImageSimpleOut]
    profile_images: List[ImageSimpleOut]