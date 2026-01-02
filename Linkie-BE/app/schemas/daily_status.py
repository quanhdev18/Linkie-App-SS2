# schemas/daily_status.py
from pydantic import BaseModel, constr
from datetime import datetime

class DailyStatusCreate(BaseModel):
    content: constr(min_length=1, max_length=120)

class DailyStatusResponse(BaseModel):
    id: int
    user_id: int
    content: str
    expires_at: datetime

    class Config:
        orm_mode = True
