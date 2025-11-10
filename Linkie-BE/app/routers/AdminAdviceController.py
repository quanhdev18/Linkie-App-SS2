from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud import AdviceService
from app.schemas.AdviceDTO import VideoAdviceCreate, VideoAdviceUpdate, VideoAdviceOut, TipAdviceCreate, TipAdviceOut
from typing import List
# Giả sử bạn có một dependency để check admin
# from app.security.AuthDependency import get_current_admin

router = APIRouter(
    prefix="/admin/advice", 
    tags=["Admin - Dating Advice"],
    # dependencies=[Depends(get_current_admin)] # TODO: Bảo vệ các endpoint này
)

# === Admin quản lý Video ===
@router.post("/videos", response_model=VideoAdviceOut)
def admin_create_video(video: VideoAdviceCreate, db: Session = Depends(get_db)):
    return AdviceService.create_video_advice(db, video)

@router.put("/videos/{video_id}", response_model=VideoAdviceOut)
def admin_update_video(video_id: int, video_data: VideoAdviceUpdate, db: Session = Depends(get_db)):
    updated_video = AdviceService.update_video_advice(db, video_id, video_data)
    if not updated_video:
        raise HTTPException(status_code=404, detail="Video not found")
    return updated_video

@router.delete("/videos/{video_id}", response_model=dict)
def admin_delete_video(video_id: int, db: Session = Depends(get_db)):
    if not AdviceService.delete_video_advice(db, video_id):
        raise HTTPException(status_code=404, detail="Video not found")
    return {"message": "Video deleted successfully"}

# === Admin quản lý Tip ===
@router.post("/tips", response_model=TipAdviceOut)
def admin_create_tip(tip: TipAdviceCreate, db: Session = Depends(get_db)):
    return AdviceService.create_tip_advice(db, tip)

# (Tự thêm API update/delete cho Tips...)