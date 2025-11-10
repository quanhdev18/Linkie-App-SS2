import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.websockets import WebSocket, WebSocketDisconnect
from app.core.database import get_db
from app.core.WebSocketConfig import ws_manager
from app.models.MessageModel import Message
from app.security.JwtService import JwtService
from app.models.UserModel import Account

router = APIRouter(
    tags=["Location"]
)


# @router.websocket("/ws/chat/{user_id}")
# async def websocket_chat_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    # await ws_manager.connect(websocket, user_id, conn_type="chat")
@router.websocket("/ws/chat")
async def websocket_chat_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=1008)
        return

    user_email = JwtService().extract_username(token)
    if not user_email:
        await websocket.close(code=1008)
        return

    user = db.query(Account).filter(Account.email == user_email).first()
    if not user:
        await websocket.close(code=1008)
        return

    user_id = user.id
    await ws_manager.connect(websocket, user_id, conn_type="chat")
    

    try:
        while True:
            data = await websocket.receive_text()

            try:
                payload = json.loads(data)
                to_user_id = payload.get("to_user_id")
                content = payload.get("content")
                if not to_user_id or not content:
                    raise ValueError
            except Exception:
                await websocket.send_text(json.dumps({"error": "Invalid message format"}))
                continue

            # Lưu tin nhắn
            new_message = Message(from_user_id=user_id, to_user_id=to_user_id, content=content)
            db.add(new_message)
            db.commit()

            # Chuẩn bị nội dung JSON để gửi đi
            message_data = json.dumps({
                "from_user_id": user_id,
                "to_user_id": to_user_id,
                "content": content,
                "type": "new_message",
            })

            # Gửi đến người nhận qua cả 2 kênh
            await ws_manager.send_to(user_id, "chat", json.dumps(message_data))
            await ws_manager.send_to(to_user_id, "chat", message_data)
            await ws_manager.send_to(to_user_id, "notification", message_data)

    except WebSocketDisconnect:
        ws_manager.disconnect(user_id, "chat")


@router.websocket("/ws/notifications/{user_id}")
async def websocket_notification_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await ws_manager.connect(websocket, user_id, conn_type="notification")

    try:
        while True:
            await websocket.receive_text()  # hoặc dùng await asyncio.sleep(10)

    except WebSocketDisconnect:
        ws_manager.disconnect(user_id, "notification")
