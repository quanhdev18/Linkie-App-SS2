import random
import os
from fastapi import Request
import httpx  
from fastapi import (
    APIRouter, File, UploadFile, Form,
    HTTPException, Depends
)
from fastapi.concurrency import run_in_threadpool  
from botocore.client import BaseClient
from sqlalchemy.orm import Session  
from app.core.database import get_db  
from app.models.UserModel import Account  
from app.crud.AccountService import (
    get_account_by_id, 
    set_account_pending, 
    set_account_verified
)
from app.schemas.VerificationSchema import (
    VerificationRequestResponse,
    VerificationApprovePayload,
    VerificationApproveResponse,
    VerificationRecord
)
from app.enum.PoseEnum import PoseEnum, POSE_SAMPLE_IMAGES
from app.core.azure_face import get_rekognition_client 
from typing import List, Optional

router = APIRouter(
    prefix="/verify",
    tags=["Verification"]
)

@router.post("/request", response_model=VerificationRequestResponse)
async def request_verification(
    request: Request,
    account_id: int = Form(...),
    pose_key: str = Form(None),
    file: UploadFile = File(...),
    rek_client: BaseClient = Depends(get_rekognition_client),
    db: Session = Depends(get_db) 
):
    """Xác thực khuôn mặt và lưu ảnh pending (ĐÃ KẾT NỐI DB THẬT)"""
    try:
        if not pose_key or pose_key == "string":
            pose_enum = random.choice(list(PoseEnum))
        else:
            pose_enum = PoseEnum(pose_key)
    except ValueError:
        pose_enum = random.choice(list(PoseEnum))

    pose_key = pose_enum.value
    pose_sample_image = POSE_SAMPLE_IMAGES[pose_enum]

    user_account = get_account_by_id(db, account_id)
    if not user_account:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản.")

    if user_account.is_verified:
        return {"message": "Tài khoản đã được xác thực trước đó.", "status": "verified"}

    if not user_account.avatar:
        raise HTTPException(status_code=400, detail="Tài khoản chưa có avatar. Vui lòng upload avatar trước.")

    avatar_local_path = os.path.join(os.getcwd(), user_account.avatar.url)
    
    if not os.path.isfile(avatar_local_path):
        raise HTTPException(status_code=500, detail="File avatar không tìm thấy trên server.")

    with open(avatar_local_path, "rb") as f:
        avatar_image_bytes = f.read()

    uploaded_image_bytes = await file.read()

    try:
        aws_response = await run_in_threadpool(
            rek_client.compare_faces,
            SourceImage={"Bytes": avatar_image_bytes},
            TargetImage={"Bytes": uploaded_image_bytes},
            SimilarityThreshold=70.0
        )

        if not aws_response.get("FaceMatches"):
            raise HTTPException(status_code=400, detail="Khuôn mặt không khớp.")

        similarity = aws_response["FaceMatches"][0]["Similarity"]
        if similarity < 70:
            raise HTTPException(
                status_code=400,
                detail=f"Khuôn mặt không khớp (Similarity: {similarity:.2f}%)"
            )

        os.makedirs("pending_review", exist_ok=True)
        file_path = f"pending_review/{account_id}_{pose_key}.jpg"

        with open(file_path, "wb") as f:
            f.write(uploaded_image_bytes)

        set_account_pending(
            db=db,
            account_id=account_id,
            pending_path=file_path,
            pose_key=pose_key
        )
        
        base_url = str(request.base_url).rstrip("/")
        image_url = f"{base_url}/{POSE_SAMPLE_IMAGES[PoseEnum(pose_key)]}"
        return {
            "message": "...",
            "status": "pending",
            "pose_key": pose_key,
            "pose_sample_image": image_url
        }

    except Exception as e:
        print(f"--- LỖI AWS CHI TIẾT ---")
        print(f"Loại lỗi (Type): {type(e)}")
        print(f"Lỗi đầy đủ (Full): {repr(e)}")
        print(f"-------------------------")
        
        if "no faces" in str(e).lower():
            raise HTTPException(status_code=400, detail="Không tìm thấy khuôn mặt.")
        
        raise HTTPException(status_code=500, detail=f"Lỗi xử lý ảnh: {repr(e)}")


@router.post("/approve", response_model=VerificationApproveResponse)
async def approve_verification(
    payload: VerificationApprovePayload,
    db: Session = Depends(get_db)  
):
    account_id = payload.account_id 

    user_account = get_account_by_id(db, account_id)
    if not user_account:
        raise HTTPException(status_code=404, detail="Không tìm thấy hồ sơ.")

    if user_account.verification_status != "pending":
        raise HTTPException(status_code=400, detail="User không ở trạng thái pending.")

    set_account_verified(db, account_id)

    return {"message": f"Hồ sơ {account_id} đã được xác thực thành công!"}


@router.get("/{account_id}/verify-status")
async def verify_status(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()

    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    return {
        "account_id": account_id,
        "is_verified": account.is_verified
    }


@router.get("/all", response_model=List[VerificationRecord])
async def get_all_verification_user(db: Session = Depends(get_db)):
    """
    Lấy danh sách tất cả account cùng trạng thái xác thực:
    - Chưa xác thực (is_verified=False & verification_status=None)
    - Chờ duyệt (verification_status='pending')
    - Đã duyệt (is_verified=True)
    """
    accounts = db.query(Account).all()

    result = []
    for acc in accounts:
        pose_sample_image = None
        if acc.pending_pose:
            try:
                pose_enum = PoseEnum(acc.pending_pose)
                pose_sample_image = POSE_SAMPLE_IMAGES[PoseEnum(acc.pending_pose)]
            except ValueError:
                pose_sample_image = None
    
        pending_image_url = f"/{acc.pending_image_path}" if acc.pending_image_path else None
    
        result.append({
            "account_id": acc.id,
            "email": acc.email,
            "is_verified": acc.is_verified,
            "verification_status": acc.verification_status,
            "pending_image_path": pending_image_url,
            "pending_pose": acc.pending_pose,
            "pose_sample_image": pose_sample_image
        })

    return result

@router.get("/alluser", response_model=List[VerificationRecord])
async def get_all_verification_status(
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Lấy danh sách account theo trạng thái:
    - pending: verification_status="pending"
    - verified: is_verified=True
    - unverified: is_verified=False & verification_status=None
    Giống API /all nhưng thêm filter.
    """

    query = db.query(Account)

    if status == "pending":
        query = query.filter(Account.verification_status == "pending")
    elif status == "verified":
        query = query.filter(Account.verification_status == "verified")
    elif status == "unverified":
        query = query.filter(Account.verification_status.is_(None))

    accounts = query.all()

    result = []
    for acc in accounts:

        pose_sample_image = None
        if acc.pending_pose:
            try:
                pose_enum = PoseEnum(acc.pending_pose)
                pose_sample_image = POSE_SAMPLE_IMAGES[pose_enum]
            except ValueError:
                pose_sample_image = None

        pending_image_url = (
            f"/{acc.pending_image_path}"
            if acc.pending_image_path else None
        )

        result.append({
            "account_id": acc.id,
            "email": acc.email,
            "is_verified": acc.is_verified,
            "verification_status": acc.verification_status,
            "pending_image_path": pending_image_url,
            "pending_pose": acc.pending_pose,
            "pose_sample_image": pose_sample_image
        })

    return result


@router.post("/request-pose")
async def request_pose(request: Request, account_id: int, db: Session = Depends(get_db)):
    user_account = get_account_by_id(db, account_id)
    if not user_account:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản.")

    pose_enum = random.choice(list(PoseEnum))

    base_url = str(request.base_url).rstrip("/")
    image_url = f"{base_url}/{POSE_SAMPLE_IMAGES[pose_enum]}"

    return {
        "pose_key": pose_enum.value,
        "pose_sample_image": image_url
    }
