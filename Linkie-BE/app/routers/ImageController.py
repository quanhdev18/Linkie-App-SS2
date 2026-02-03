from typing import List
import os
import shutil
from uuid import uuid4
from fastapi import UploadFile, File, Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud.ImageService import ImageService
from app.schemas.ImagesDTO import ProfileImagesOut

router = APIRouter(prefix="/images", tags=["Images"])

STATIC_DIR = "static/images/profile"
os.makedirs(STATIC_DIR, exist_ok=True)

# @router.get(
#     "/profile/{profile_id}/all-images",
#     response_model=ProfileImagesOut
# )
# def get_all_images_by_profile(
#     profile_id: int,
#     db: Session = Depends(get_db)
# ):
#     return ImageService.get_all_images_by_profile_id(db, profile_id)
@router.get(
    "/account/{account_id}/all-images",
    response_model=ProfileImagesOut
)
def get_all_images_by_account(
    account_id: int,
    db: Session = Depends(get_db)
):
    return ImageService.get_all_images_by_account_id(db, account_id)





@router.delete("/profile/{image_id}")
def delete_profile_image(image_id: int, db: Session = Depends(get_db)):
    try:
        return ImageService.delete_profile_image(image_id=image_id, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

@router.post("/profile/{profile_id}")
async def upload_profile_images_endpoint(profile_id: int, files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    uploaded_urls = []

    for file in files:
        ext = file.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        filepath = os.path.join(STATIC_DIR, filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        ImageService.save_profile_image(db, profile_id, filename)

        file_url = f"/static/images/profile/{filename}"
        uploaded_urls.append(file_url)

    return {"urls": uploaded_urls}

@router.get("/profile/{image_id}")
def get_profile_images_endpoint(image_id: int, db: Session = Depends(get_db)):
    try:
        return ImageService.get_profile_images_by_id(image_id, db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

@router.post("/account/{account_id}")
def upload_avatar_account_endpoint(account_id: int, file: UploadFile, db: Session = Depends(get_db)):
    image = ImageService.upload_account_avatar_image(file, db, account_id)
    return {"image": image}


@router.get("/account/{image_id}")
def get_account_avatar_endpoint(image_id: int, db: Session = Depends(get_db)):
    try:
        return ImageService.get_account_avatar_by_id(image_id, db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

@router.delete("/account{image_id}")
def delete_account_avatar_endpoint(image_id: int, db: Session = Depends(get_db)):
    ImageService.delete_account_avatar_by_id(image_id, db)
    return {"message": f"Image with ID {image_id} deleted successfully (file + database)"}



