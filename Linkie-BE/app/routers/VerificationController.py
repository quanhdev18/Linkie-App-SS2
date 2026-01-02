import random
import os
from fastapi import Request
import httpx  # 👈 Vẫn giữ httpx để phòng, nhưng không dùng
from fastapi import (
    APIRouter, File, UploadFile, Form,
    HTTPException, Depends
)
from fastapi.concurrency import run_in_threadpool  # 👈 THÊM DÒNG NÀY
from botocore.client import BaseClient
from sqlalchemy.orm import Session  # 👈 THÊM DÒNG NÀY
from app.core.database import get_db  # 👈 THÊM DÒNG NÀY
from app.models.UserModel import Account  # 👈 THÊM DÒNG NÀY
# 👇 THAY THẾ TOÀN BỘ PHẦN IMPORT CRUD VÀ SCHEMA
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

# 👆 (Bạn không cần import FAKE_DB nữa)

# 👇 THAY THẾ IMPORT NÀY (đổi tên file service)
from app.core.azure_face import get_rekognition_client # (Giả sử file AWS là VerificationServices.py)
from typing import List, Optional

router = APIRouter(
    prefix="/verify",
    tags=["Verification"]
)

@router.post("/request", response_model=VerificationRequestResponse)
async def request_verification(
    # 👇 ĐỔI TỪ profile_id: str SANG account_id: int
    request: Request,
    account_id: int = Form(...),
    pose_key: str = Form(None),
    file: UploadFile = File(...),
    rek_client: BaseClient = Depends(get_rekognition_client),
    db: Session = Depends(get_db)  # 👈 THÊM DB SESSION
):
    """Xác thực khuôn mặt và lưu ảnh pending (ĐÃ KẾT NỐI DB THẬT)"""
    # Nếu FE không gửi pose_key hoặc Swagger gửi "string" → random pose
    try:
        if not pose_key or pose_key == "string":
            pose_enum = random.choice(list(PoseEnum))
        else:
            pose_enum = PoseEnum(pose_key)
    except ValueError:
        # Nếu FE gửi giá trị rác → random pose
        pose_enum = random.choice(list(PoseEnum))

    pose_key = pose_enum.value
    pose_sample_image = POSE_SAMPLE_IMAGES[pose_enum]


    # 1. Check account
    user_account = get_account_by_id(db, account_id)
    if not user_account:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản.")

    if user_account.is_verified:
        return {"message": "Tài khoản đã được xác thực trước đó.", "status": "verified"}

    # 2. Lấy avatar từ DB (Source Image)
    if not user_account.avatar:
        raise HTTPException(status_code=400, detail="Tài khoản chưa có avatar. Vui lòng upload avatar trước.")

    # Lấy đường dẫn file avatar thật trên server
    avatar_local_path = os.path.join(os.getcwd(), user_account.avatar.url)
    
    if not os.path.isfile(avatar_local_path):
        raise HTTPException(status_code=500, detail="File avatar không tìm thấy trên server.")

    # Đọc file avatar từ local disk
    with open(avatar_local_path, "rb") as f:
        avatar_image_bytes = f.read()

    # 3. Đọc file user upload (Target Image)
    uploaded_image_bytes = await file.read()

    try:
        # 4. So sánh khuôn mặt (Chạy trong thread để không block server)
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

        # 5. Lưu ảnh pending (vào ổ đĩa)
        os.makedirs("pending_review", exist_ok=True)
        file_path = f"pending_review/{account_id}_{pose_key}.jpg"

        with open(file_path, "wb") as f:
            f.write(uploaded_image_bytes)

        # Cập nhật DB thật
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


        # return {
        #     "message": "Khuôn mặt khớp! Đã gửi yêu cầu cho admin duyệt tư thế.",
        #     "status": "pending",
        #     "pose_key": pose_key,
        #     "pose_sample_image": POSE_SAMPLE_IMAGES[PoseEnum(pose_key)]
        # }

    except Exception as e:
        # (Giữ lại code debug lỗi của bạn)
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
    db: Session = Depends(get_db)  # 👈 THÊM DB SESSION
):
    # 👇 Lấy account_id từ payload (cần sửa schema)
    account_id = payload.account_id 

    user_account = get_account_by_id(db, account_id)
    if not user_account:
        raise HTTPException(status_code=404, detail="Không tìm thấy hồ sơ.")

    if user_account.verification_status != "pending":
        raise HTTPException(status_code=400, detail="User không ở trạng thái pending.")

    # Gọi hàm CRUD thật
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
            # Lấy ảnh pose mẫu từ POSE_SAMPLE_IMAGES
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

    # Filter theo status
    if status == "pending":
        query = query.filter(Account.verification_status == "pending")
    elif status == "verified":
        query = query.filter(Account.verification_status == "verified")
    elif status == "unverified":
        query = query.filter(Account.verification_status.is_(None))

    accounts = query.all()

    result = []
    for acc in accounts:

        # Lấy pose sample image giống API /all
        pose_sample_image = None
        if acc.pending_pose:
            try:
                pose_enum = PoseEnum(acc.pending_pose)
                pose_sample_image = POSE_SAMPLE_IMAGES[pose_enum]
            except ValueError:
                pose_sample_image = None

        # URL ảnh pending
        pending_image_url = (
            f"/{acc.pending_image_path}"
            if acc.pending_image_path else None
        )

        # Push vào kết quả
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


# @router.post("/request-pose")
# async def request_pose(account_id: int, db: Session = Depends(get_db)):
#     """Trả về pose_sample_image + pose_key để FE hiển thị pose trước khi chụp"""
#     user_account = get_account_by_id(db, account_id)
#     if not user_account:
#         raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản.")

#     # Sinh pose ngẫu nhiên nếu chưa có pose pending
#     import random
#     from app.enum.PoseEnum import PoseEnum, POSE_SAMPLE_IMAGES

#     pose_enum = random.choice(list(PoseEnum))
#     return {
#         "pose_key": pose_enum.value,
#         "pose_sample_image": POSE_SAMPLE_IMAGES[pose_enum]
#     }


@router.post("/request-pose")
async def request_pose(request: Request, account_id: int, db: Session = Depends(get_db)):
    user_account = get_account_by_id(db, account_id)
    if not user_account:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản.")

    pose_enum = random.choice(list(PoseEnum))

    # Tạo URL tuyệt đối
    base_url = str(request.base_url).rstrip("/")
    image_url = f"{base_url}/{POSE_SAMPLE_IMAGES[pose_enum]}"

    return {
        "pose_key": pose_enum.value,
        "pose_sample_image": image_url
    }
