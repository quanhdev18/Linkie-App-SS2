from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud import AdviceService
from app.schemas.AdviceDTO import DatingAdviceOut
from app.security.AuthDependency import get_current_account # Giả sử cần user login để xem

router = APIRouter(
    prefix="/dating-advice", 
    tags=["Dating Advice"],
    dependencies=[Depends(get_current_account)] # Bỏ dependency này nếu không cần login
)

@router.get("/", response_model=DatingAdviceOut)
def get_dating_advice(db: Session = Depends(get_db)):
    """
    API chính cho màn hình DatingAdvice.
    Lấy danh sách videos và tips đang hoạt động.
    """
    videos = AdviceService.get_active_videos(db)
    tips = AdviceService.get_active_tips(db)
    
    return DatingAdviceOut(videos=videos, tips=tips)