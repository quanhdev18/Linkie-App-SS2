from sqlalchemy.orm import Session
from app.models.AdviceModel import VideoAdvice, TipAdvice
from app.schemas.AdviceDTO import VideoAdviceCreate, VideoAdviceUpdate, TipAdviceCreate, TipAdviceUpdate

def get_active_videos(db: Session) -> list[VideoAdvice]:
    """Lấy tất cả video đang active, sắp xếp mới nhất lên trước"""
    return db.query(VideoAdvice).filter(VideoAdvice.is_active == True).order_by(VideoAdvice.created_at.desc()).all()

def get_active_tips(db: Session) -> list[TipAdvice]:
    """Lấy tất cả tips đang active, sắp xếp mới nhất lên trước"""
    return db.query(TipAdvice).filter(TipAdvice.is_active == True).order_by(TipAdvice.created_at.desc()).all()

def create_video_advice(db: Session, video: VideoAdviceCreate) -> VideoAdvice:
    db_video = VideoAdvice(**video.model_dump())
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def update_video_advice(db: Session, video_id: int, video_data: VideoAdviceUpdate) -> VideoAdvice:
    db_video = db.query(VideoAdvice).filter(VideoAdvice.id == video_id).first()
    if not db_video:
        return None
    
    update_data = video_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_video, key, value)
        
    db.commit()
    db.refresh(db_video)
    return db_video

def delete_video_advice(db: Session, video_id: int) -> bool:
    db_video = db.query(VideoAdvice).filter(VideoAdvice.id == video_id).first()
    if not db_video:
        return False
    db.delete(db_video)
    db.commit()
    return True

def create_tip_advice(db: Session, tip: TipAdviceCreate) -> TipAdvice:
    db_tip = TipAdvice(**tip.model_dump())
    db.add(db_tip)
    db.commit()
    db.refresh(db_tip)
    return db_tip
    