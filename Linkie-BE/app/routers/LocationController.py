from typing import List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud.LocationService import LocationService
from app.schemas.LocationDTO import LocationOut, LocationUpdateDTO, NearbyUserOut
from app.models.UserModel import Account
from app.schemas.UserSchema import AccountWithAvatarOut

router = APIRouter(
    prefix="/location",
    tags=["Location"]
)


@router.post("/update_location/{account_id}", response_model=LocationOut)
def update_location(
    account_id: int,
    body: LocationUpdateDTO, 
    db: Session = Depends(get_db)
):
    location = LocationService.update_location(
        account_id,
        body.latitude,
        body.longitude,
        db
    )

    if not location:
        raise HTTPException(status_code=404, detail="Account not found")
    return location


@router.get("/nearby_users_by_account", response_model=List[NearbyUserOut])
def get_nearby_users_by_account(
    account_id: int,
    db: Session = Depends(get_db),
    radius: int = 10
):
    nearby_users = LocationService.find_nearby_users_by_account_id(account_id, db, radius)
    if not nearby_users:
        raise HTTPException(status_code=404, detail="No nearby users found.")
    return nearby_users

@router.get("/by_account_id/{account_id}", response_model=LocationOut)
def get_location_by_account(account_id: int, db: Session = Depends(get_db)):
    location = LocationService.get_location_by_account_id(account_id, db)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

@router.get("/get_location_name")
def get_location_name(latitude: float, longitude: float):
    return LocationService.get_location_name(latitude, longitude);

@router.get("/admin/all_locations")
def get_all_locations(db: Session = Depends(get_db)):
    return LocationService.get_all_locations(db)

@router.get("/hot_zone")
def get_hot_zone(db: Session = Depends(get_db)):
    return LocationService.get_hot_zone(db)
