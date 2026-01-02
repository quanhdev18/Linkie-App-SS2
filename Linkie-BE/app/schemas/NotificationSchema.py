from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.models.NotificationModel import Notification
from app.models.UserModel import Account
from app.core.database import get_db
from pydantic import BaseModel

router = APIRouter(tags=["Notification"])

class NotificationOut(BaseModel):
    id: int
    content: str
    is_read: bool
    created_at: str

    class Config:
        orm_mode = True