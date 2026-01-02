# # app/crud/user.py
# from datetime import datetime

# from fastapi import HTTPException
# from sqlalchemy.orm import Session

# from app.models.ProfileModel import Profile
# from app.schemas.ProfileDTO import ProfileCreate, ProfileUpdate



# def get_all_profiles(db: Session):
#     return db.query(Profile).all()

# def create_profile(db: Session, profile_in: ProfileCreate, account_id: int) -> Profile:
#     existing_profile = db.query(Profile).filter(Profile.account_id == account_id).first()
#     if existing_profile:
#         raise HTTPException(status_code=400, detail="Profile already exists for this account")

#     new_profile = Profile(
#         username=profile_in.username,
#         gender=profile_in.gender,
#         date_of_birth=profile_in.date_of_birth,
#         bio=profile_in.bio,
#         created_at=datetime.utcnow(),
#         target_type=profile_in.target_type,
#         hobby=profile_in.hobby,
#         height=profile_in.height,
#         zodiac_sign=profile_in.zodiac_sign,
#         job=profile_in.job,
#         education=profile_in.education,
#         account_id=account_id
#     )
#     db.add(new_profile)
#     db.commit()
#     db.refresh(new_profile)
#     new_profile = db.query(Profile).filter(Profile.id == new_profile.id).first()
#     return new_profile
#     # return {"profile_id": new_profile.id}

# def update_profile(db: Session, profile_id: int, update_data: ProfileUpdate) -> Profile:
#     profile = db.query(Profile).filter(Profile.id == profile_id).first()
#     if not profile:
#         raise HTTPException(status_code=404, detail="Profile not found")

#     update_dict = update_data.model_dump(exclude_unset=True)
#     for field, value in update_dict.items():
#         setattr(profile, field, value)

#     db.commit()
#     db.refresh(profile)
#     return profile

# def delete_profile(db: Session, profile_id: int) -> str:
#     profile = db.query(Profile).filter(Profile.id == profile_id).first()
#     if not profile:
#         raise HTTPException(status_code=404, detail="Profile not found")

#     db.delete(profile)
#     db.commit()
#     return f"Xoá thành công profile có id: {profile_id}"

# def get_profile_by_id(db: Session, profile_id: int) -> Profile:
#     profile = db.query(Profile).filter(Profile.id == profile_id).first()
#     if not profile:
#         raise HTTPException(status_code=404, detail="Profile not found")

#     return profile





# app/crud/user.py
from datetime import datetime
import json
from sqlalchemy.sql import func
from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from app.models.ProfileModel import Profile
from app.schemas.ProfileDTO import ProfileCreate, ProfileUpdate
from app.models.LocationModel import Location
from app.crud.LocationService import LocationService
from app.crud.package import get_active_package
from app.core.check_permission import user_can_see_photos
# from datetime import datetime, timezone

def decode_unicode(s: Optional[str]) -> Optional[str]:
    if not s:
        return s
    try:
        return json.loads(f'"{s}"')
    except:
        return s
    
def parse_job(job_str: str):
    if not job_str or "|" not in job_str:
        return {"position": None, "company": None}

    parts = job_str.split("|")
    return {
        "position": parts[0].strip() or None,
        "company": parts[1].strip() or None
    }


def parse_education(ed_str: str):
    if not ed_str or "|" not in ed_str:
        return {"school": None, "graduation_year": None}

    parts = ed_str.split("|")
    school = parts[0].strip() or None

    grad_raw = parts[1].strip() if len(parts) > 1 else None
    try:
        graduation_year = int(grad_raw) if grad_raw else None
    except:
        graduation_year = None

    return {
        "school": school,
        "graduation_year": graduation_year
    }


def get_all_profiles(db: Session):
    return db.query(Profile).all()

def create_profile(db: Session, profile_in: ProfileCreate, account_id: int) -> Profile:
    existing_profile = db.query(Profile).filter(Profile.account_id == account_id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists for this account")
    
    # Chuyển job và education từ chuỗi sang dict
    job_dict = parse_job(profile_in.job)
    education_dict = parse_education(profile_in.education)

    new_profile = Profile(
        username=profile_in.username,
        gender=profile_in.gender,
        date_of_birth=profile_in.date_of_birth,
        bio=profile_in.bio,
        created_at=datetime.utcnow(),
        target_type=profile_in.target_type,
        hobby=profile_in.hobby,
        height=profile_in.height,
        zodiac_sign=profile_in.zodiac_sign,
        job=profile_in.job,              # string
        education=profile_in.education,  # string
        account_id=account_id
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

def update_profile(db: Session, profile_id: int, update_data: ProfileUpdate) -> Profile:
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    update_dict = update_data.model_dump(exclude_unset=True)
    
    if 'height' in update_dict:
        if update_dict['height'] == "" or update_dict['height'] is None:
            update_dict['height'] = None

    if 'zodiac_sign' in update_dict:
        if not update_dict['zodiac_sign']:
            update_dict['zodiac_sign'] = None

    if 'job' in update_dict:
        if update_dict['job'] == "":
            update_dict['job'] = None

    if 'education' in update_dict:
        if update_dict['education'] == "":
            update_dict['education'] = None

    for field, value in update_dict.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile


def delete_profile(db: Session, profile_id: int) -> str:
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    db.delete(profile)
    db.commit()
    return f"Xoá thành công profile có id: {profile_id}"

def get_profile_by_id(db: Session, profile_id: int) -> Profile:
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    if not profile.location_name and profile.account_id:
        location = db.query(Location).filter(Location.account_id == profile.account_id).first()
        if location:
            # convert lat/lng sang city
            profile.location_name = LocationService.get_location_name(location.latitude, location.longitude)

    
    return profile

def get_profiles_with_same_target(db: Session, account_id: int):

    my_profile = db.query(Profile).filter(Profile.account_id == account_id).first()
    if not my_profile:
        raise HTTPException(status_code=404, detail="Bạn chưa tạo profile")

    my_target = my_profile.target_type.strip().lower()

    profiles = (
        db.query(Profile)
        .filter(Profile.account_id != account_id)
        .filter(Profile.target_type != None)
        .filter(func.lower(Profile.target_type) == my_target)
        .all()
    )

    # 🎯 Check package người dùng đang call API
    package = get_active_package(db, account_id)
    allow_photos = user_can_see_photos(package)
    

    # ❗❗ Quan trọng: BE trả FULL ẢNH – KHÔNG xoá
    return {
        "profiles": profiles,
        "can_view_photos": allow_photos
    }

# def attach_profile_age(profile: Profile):
#     now = datetime.now(timezone.utc)
#     if profile.created_at:
#         profile.profile_age_days = (now - profile.created_at).days
#     return profile