from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from app.core.base import Base

class VideoAdvice(Base):
    __tablename__ = "advice_videos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    author = Column(String(100), nullable=False) # 'authur' trong code FE của bạn có vẻ là lỗi chính tả
    url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500), nullable=False)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class TipAdvice(Base):
    __tablename__ = "advice_tips"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    # Thêm trường 'body' để sau này admin có thể nhập nội dung chi tiết cho tip
    body = Column(Text, nullable=True) 
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())