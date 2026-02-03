import os
import shutil
from datetime import datetime
from typing import List
import mimetypes
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from app.models.ImageModel import AccountAvatar, ProfileImage
from app.models.ProfileModel import Profile
from app.models.UserModel import Account
from uuid import uuid4

class ImageService:
    
    @staticmethod
    def get_all_images_by_account_id(db: Session, account_id: int):
        account = (
            db.query(Account)
            .filter(Account.id == account_id)
            .first()
        )

        if not account:
            raise HTTPException(status_code=404, detail="Account not found")

        profile = account.profile
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found for this account")

        # Avatar
        avatar = account.avatar if account.avatar else None

        # Profile images
        profile_images = (
            db.query(ProfileImage)
            .filter(ProfileImage.profile_id == profile.id)
            .all()
        )

        return {
            "profile_id": profile.id,
            "avatar": avatar,
            "profile_images": profile_images
        }

    
    # @staticmethod
    # def get_all_images_by_profile_id(db: Session, profile_id: int):
    #     profile = (
    #         db.query(Profile)
    #         .filter(Profile.id == profile_id)
    #         .first()
    #     )

    #     if not profile:
    #         raise HTTPException(status_code=404, detail="Profile not found")

    #     # Avatar (thông qua account)
    #     avatar = None
    #     if profile.account and profile.account.avatar:
    #         avatar = profile.account.avatar

    #     # Profile images
    #     profile_images = (
    #         db.query(ProfileImage)
    #         .filter(ProfileImage.profile_id == profile_id)
    #         .all()
    #     )

    #     return {
    #         "profile_id": profile_id,
    #         "avatar": avatar,
    #         "profile_images": profile_images
    #     }
    
    @staticmethod
    def upload_account_avatar_image(file: UploadFile, db: Session, account_id: int) -> AccountAvatar:
        if not file:
            raise HTTPException(status_code=400, detail="File must not be empty")

        STATIC_AVATAR_DIR = os.path.join("static", "images", "avatar")
        os.makedirs(STATIC_AVATAR_DIR, exist_ok=True)

        ext = file.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        save_path = os.path.join(STATIC_AVATAR_DIR, filename)

        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        account = db.query(Account).filter(Account.id == account_id).first()
        if not account:
            raise HTTPException(status_code=404, detail="Account not found")

        image_data = AccountAvatar(
            title=filename,
            url=os.path.join("static", "images", "avatar", filename),
            alt=os.path.splitext(file.filename)[0],
            upload_date=datetime.utcnow(),
            account_id=account.id
        )

        db.add(image_data)
        db.commit()
        db.refresh(image_data)

        if account.profile:
            account.profile.avatar_id = image_data.id
            db.commit()

        return image_data

    @staticmethod
    def get_account_avatar_by_id(id: int, db: Session) -> FileResponse:
        image = db.query(AccountAvatar).filter(AccountAvatar.id == id).first()
        if not image:
            raise HTTPException(status_code=404, detail=f"Image with ID {id} not found in the database")

        image_path = os.path.join(os.getcwd(), image.url)
        if not os.path.isfile(image_path):
            raise HTTPException(status_code=404, detail="Image file not found on server")

        mime_type, _ = mimetypes.guess_type(image_path)
        return FileResponse(path=image_path, media_type=mime_type or "application/octet-stream", filename=image.title)
    
    @staticmethod
    def delete_account_avatar_by_id(id: int, db: Session):
        image = db.query(AccountAvatar).filter(AccountAvatar.id == id).first()
        if not image:
            raise HTTPException(status_code=404, detail=f"Image with ID {id} not found")

        file_path = os.path.join(os.getcwd(), image.url)
        if os.path.exists(file_path):
            os.remove(file_path)

        db.delete(image)
        db.commit()


    @staticmethod
    def upload_profile_images(files: List[UploadFile], db: Session, profile_id: int) -> List[ProfileImage]:
        if len(files) < 1 or len(files) > 6:
            raise HTTPException(status_code=400, detail="You must upload at least 2 images and at most 6 images.")

        save_dir = os.path.join(os.getcwd(), "Images")
        os.makedirs(save_dir, exist_ok=True)

        uploaded_images = []

        for file in files:
            save_path = os.path.join(save_dir, file.filename)

            with open(save_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            image_url = f"static/images/profile/{file.filename}"
            image_data = ProfileImage(
                title=file.filename,
                url=image_url,
                alt=os.path.splitext(file.filename)[0],
                upload_date=datetime.utcnow(),
                profile_id=profile_id 
            )

            db.add(image_data)
            db.commit()
            db.refresh(image_data)

            uploaded_images.append(image_data)

        profile = db.query(Profile).filter(Profile.id == profile_id).first()
        if profile:
            profile.images.extend(uploaded_images)  
            db.commit()
        else:
            raise HTTPException(status_code=404, detail=f"Profile with ID {profile_id} not found in the database")

        return uploaded_images
    
    def save_profile_image(db: Session, profile_id: int, filename: str):
        file_url = f"static/images/profile/{filename}"
        
        image = ProfileImage(
            profile_id=profile_id, 
            url=file_url,
            title=filename,
            alt=None,
            upload_date=datetime.utcnow())
        db.add(image)
        db.commit()
        db.refresh(image)
        return image
    
    @staticmethod
    def get_profile_images_by_id(id: int, db: Session) -> FileResponse:
        image = db.query(ProfileImage).filter(ProfileImage.id == id).first()
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")

        image_path = os.path.join(os.getcwd(), image.url)
        if not os.path.isfile(image_path):
           image_path += ".jpg"
           image_path += ".jpeg"
           image_path += ".png"

        if not os.path.isfile(image_path):
            raise HTTPException(status_code=404, detail="File not found on server")

        mime_type, _ = mimetypes.guess_type(image_path)
        return FileResponse(path=image_path, media_type=mime_type or "application/octet-stream")

    @staticmethod
    def delete_profile_image(image_id: int, db: Session):
        image = db.query(ProfileImage).filter(ProfileImage.id == image_id).first()
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")

        file_path = os.path.join(os.getcwd(), image.url)
        if os.path.isfile(file_path):
            os.remove(file_path)

        db.delete(image)
        db.commit()
        return {"detail": "Deleted successfully"}
    
    
    
    
    