from pydantic import BaseModel, EmailStr
from datetime import datetime

class PackageCreate(BaseModel):
    name: str
    description: str
    price: int
    duration_days: int

class PackageOut(BaseModel):
    id: int
    name: str
    description: str
    price: int
    duration_days: int
    class Config:
        from_attributes = True

class PurchaseCreate(BaseModel):
    package_id: int
    email: EmailStr | None = None  # trường email tùy chọn

class PurchaseOut(BaseModel):
    id: int
    user_id: int
    package_id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
