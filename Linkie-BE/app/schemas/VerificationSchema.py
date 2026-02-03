from pydantic import BaseModel
from typing import Optional

class VerificationRequestResponse(BaseModel):
    message: str
    status: str

class VerificationApprovePayload(BaseModel):
    # profile_id: str
    account_id: int
    
class VerificationApproveResponse(BaseModel):
    message: str
    
class VerificationRecord(BaseModel):
    account_id: int
    email: str
    is_verified: bool
    verification_status: Optional[str]
    pending_image_path: Optional[str]
    pending_pose: Optional[str]
    pose_sample_image: Optional[str]

    class Config:
        orm_mode = True
