from pydantic import BaseModel
from typing import Optional

class MatchedUserOut(BaseModel):
    id: int
    username: Optional[str]
    # avatar: Optional[str]

    class Config:
        from_attributes = True

class LikeOut(BaseModel):
    liked_id: int

    class Config:
        from_attributes = True