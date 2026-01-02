from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.websockets import WebSocket, WebSocketDisconnect
from app.core.WebSocketConfig import ws_manager
from app.core.database import get_db
from app.models.NotificationModel import Notification
from app.schemas.NotificationSchema import NotificationOut
from typing import List

router = APIRouter(
    tags=["Notification"],
)

@router.websocket("/ws/notifications/{user_id}")
async def websocket_notification_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await ws_manager.connect(websocket, user_id, conn_type="notification")  # ✅ RẤT QUAN TRỌNG

    try:
        while True:
            # Chỉ giữ kết nối mở — không cần nhận dữ liệu từ client
            await websocket.receive_text()  

    except WebSocketDisconnect:
        ws_manager.disconnect(user_id, "notification")
        
        
@router.get("/for-user/{user_id}", response_model=List[NotificationOut])
def get_notifications_for_user(user_id: int, db: Session = Depends(get_db)):
    notifs = db.query(Notification).filter(
        Notification.recipient_id == user_id
    ).order_by(Notification.created_at.desc()).all()

    return notifs
