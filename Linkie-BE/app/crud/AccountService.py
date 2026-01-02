import math
import time
import os
from typing import List, Optional, Tuple

from fastapi import HTTPException
from sqlalchemy import String
from sqlalchemy.orm import Session

from app.enum.UserEnum import UserRole
from app.models.ProfileModel import Profile
from app.models.ImageModel import AccountAvatar
from app.models.UserModel import Account, Otp, RefreshToken
from app.models.NotificationModel import Notification
from app.core.WebSocketConfig import ws_manager

def delete_account_no_constraint_by_email_service(email: str, db: Session) -> String:
    account = db.query(Account).filter(Account.email == email).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    # Nếu tồn tại bất kỳ liên kết nào → KHÔNG xoá
    linked_tables = []

    if db.query(Otp).filter(Otp.account_id == account.id).first():
        linked_tables.append("Otp")

    if db.query(RefreshToken).filter(RefreshToken.account_id == account.id).first():
        linked_tables.append("RefreshToken")

    if db.query(Profile).filter(Profile.account_id == account.id).first():
        linked_tables.append("Profile")

    if db.query(AccountAvatar).filter(AccountAvatar.account_id == account.id).first():
        linked_tables.append("AccountAvatar")

    if linked_tables:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete account. Linked records exist in: {', '.join(linked_tables)}"
        )

    # Nếu không bị liên kết → xoá bình thường
    db.delete(account)
    db.commit()
    return f"Account with ID {email} deleted successfully"


def delete_account_with_otp_constraint(email: str, db: Session) -> String:
    account = db.query(Account).filter(Account.email == email).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    account_id = account.id

    # Xoá OTP nếu có
    otp = db.query(Otp).filter(Otp.account_id == account_id).first()
    if otp:
        db.delete(otp)

    # Cuối cùng xoá Account
    db.delete(account)
    db.commit()

    return f"Account with email '{email}' and related records deleted successfully."

def get_paginated_activated_accounts(
    db: Session,
    page: int = 1,
    size: int = 10,
    role: Optional[UserRole] = None
) -> Tuple[int, int, List[Account]]:
    query = db.query(Account).filter(Account.is_activated == True)

    if role:
        query = query.filter(Account.role == role)

    total = query.count()
    total_pages = math.ceil(total / size)
    items = query.offset((page - 1) * size).limit(size).all()

    return total, total_pages, items

def get_account_by_email(db: Session, email: str) -> Optional[Account]:
    return db.query(Account).filter(Account.email == email).first()


def get_account_by_id(db: Session, account_id: int):
    return db.query(Account).filter_by(id=account_id).first()

def deactivate_account_by_email(email: str, db: Session) -> str:
    account = db.query(Account).filter(Account.email == email).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    if not account.is_activated:
        raise HTTPException(status_code=400, detail="Account is already deactivated")

    # Đổi trạng thái kích hoạt
    account.is_activated = False

    # Thêm hậu tố để đánh dấu đã xoá + tránh trùng email
    timestamp = int(time.time())
    account.email = f"{account.email}__deleted__{timestamp}"

    db.commit()
    return f"Account deactivated and email anonymized."


def set_account_pending(
    db: Session, 
    account_id: int, 
    pending_path: str, 
    pose_key: str
) -> Account:
    """Cập nhật account sang trạng thái 'pending'."""
    account = get_account_by_id(db, account_id)
    if account:
        account.verification_status = "pending"
        account.pending_image_path = pending_path
        account.pending_pose = pose_key
        db.commit()
        db.refresh(account)
    return account

def set_account_verified(db: Session, account_id: int) -> Account:
    """Cập nhật account sang trạng thái 'verified'."""
    account = get_account_by_id(db, account_id)
    if account:
        account.is_verified = True
        account.verification_status = "verified"
        
        # Xóa file ảnh tạm trong pending_review
        if account.pending_image_path and os.path.exists(account.pending_image_path):
            os.remove(account.pending_image_path)
            
        account.pending_image_path = None
        account.pending_pose = None
        db.commit()
        db.refresh(account)
    return account

async def get_verify_status(db: Session, account_id: int):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        return None
    return account.is_verified

def register_user(user_data, db: Session):
    # 1️⃣ Tạo account mới
    new_user = Account(email=user_data.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 2️⃣ Lấy tất cả admin
    admins = db.query(Account).filter(Account.role == "ADMIN").all()

    for admin in admins:
        # 3️⃣ Tạo notification trong DB
        notif = Notification(
            content=f"Người dùng mới đăng ký: {new_user.email}",
            recipient_id=admin.id
        )
        db.add(notif)
        db.commit()
        db.refresh(notif)

        # 4️⃣ Gửi realtime qua WebSocket nếu admin đang kết nối
        import asyncio
        asyncio.create_task(
            ws_manager.send_to(admin.id, "notification", notif.content)
        )

    return {"message": "User registered successfully", "user_id": new_user.id}