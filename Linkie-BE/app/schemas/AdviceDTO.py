from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# --- Schemas cho Video Advice ---

class VideoAdviceBase(BaseModel):
    title: str
    author: str
    url: str
    thumbnail_url: str

class VideoAdviceCreate(VideoAdviceBase):
    pass

class VideoAdviceUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    is_active: Optional[bool] = None

class VideoAdviceOut(VideoAdviceBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Schemas cho Tip Advice ---

class TipAdviceBase(BaseModel):
    title: str
    body: Optional[str] = None

class TipAdviceCreate(TipAdviceBase):
    pass

class TipAdviceUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    is_active: Optional[bool] = None

class TipAdviceOut(TipAdviceBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Schema tổng hợp cho màn hình DatingAdvice ---

class DatingAdviceOut(BaseModel):
    videos: List[VideoAdviceOut]
    tips: List[TipAdviceOut]