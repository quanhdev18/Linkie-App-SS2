from geoalchemy2.functions import ST_SetSRID, ST_MakePoint, ST_Distance
from sqlalchemy.orm import Session, joinedload
from app.models.UserModel import Account
from app.models.LocationModel import Location
from datetime import datetime
from geopy.geocoders import Nominatim
from app.schemas.UserSchema import AccountWithAvatarOut
from app.core.redis_client import redis_client
import json
from collections import defaultdict
from app.models.ProfileModel import Profile
from app.schemas.ProfileDTO import ProfileUpdate    
from app.schemas.LocationDTO import NearbyUserOut

class LocationService:

    @staticmethod
    def update_location(account_id: int, latitude: float, longitude: float, db: Session):
        account = db.query(Account).filter(Account.id == account_id).first()
        if not account:
            return None

        point = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)

        location = db.query(Location).filter(Location.account_id == account_id).first()

        if location:
            location.latitude = latitude
            location.longitude = longitude
            location.point = point
            location.last_updated = datetime.utcnow()
        else:
            location = Location(
                latitude=latitude,
                longitude=longitude,
                point=point,
                account_id=account_id,
                last_updated=datetime.utcnow()
            )
            db.add(location)
        
        location_name = LocationService.get_location_name(latitude, longitude)

        profile = db.query(Profile).filter(Profile.account_id == account_id).first()
        if profile:
            profile.location_name = location_name

            

        db.commit()
        db.refresh(location)
        if profile:
           db.refresh(profile)
        return location


    @staticmethod
    def find_nearby_users_by_account_id(account_id: int, db: Session, radius: int = 10):
        current_location = db.query(Location).filter(Location.account_id == account_id).first()
        if not current_location:
            return []

        current_point = ST_SetSRID(ST_MakePoint(current_location.longitude, current_location.latitude), 4326)

        accounts = (
            db.query(Account)
            .join(Location)
            .options(joinedload(Account.avatar),
                    joinedload(Account.profile).joinedload(Profile.images))
            .filter(
                Account.id != account_id,
                ST_Distance(Location.point, current_point) <= radius * 1000
            )
            .all()
        )

        results = []
        for acc in accounts:
            profile = acc.profile
            
            results.append(NearbyUserOut(
                id=acc.id,
                email=acc.email,
                is_activated=acc.is_activated,
                role=acc.role,
                profile_id=profile.id if profile else None,
                avatar=acc.avatar,  
                username=profile.username if profile else None,
                bio=profile.bio if profile else None,
                gender=profile.gender if profile else None,
                images=profile.images if profile else [],
           
                latitude=acc.location.latitude,
                longitude=acc.location.longitude,
            ))

        return results

    @staticmethod
    def get_location_name(latitude, longitude):
        geolocator = Nominatim(user_agent="myGeocoder", timeout=10)
        location = geolocator.reverse((latitude, longitude), language='vi')

        if location:
            address = location.raw.get("address", {})
            # Ưu tiên phường, xã
            ward = (
                address.get("neighbourhood") or
                address.get("suburb") or
                address.get("quarter") or
                address.get("village") or
                address.get("hamlet") or
                address.get("town")
            )

            # Quận/Huyện
            district = (
                address.get("city_district") or
                address.get("district")
            )

            # Thành phố
            city = (
                address.get("city") or
                address.get("municipality") or
                address.get("state")
            )

            if ward and city:
                return f"{ward}, {city}"
            elif district and city:
                return f"{district}, {city}"
            elif city:
                return city
            else:
                return "Không rõ địa điểm"
        else:
            return "Không rõ địa điểm"
        
    @staticmethod
    def get_location_by_account_id(account_id: int, db: Session):
        location = db.query(Location).filter(Location.account_id == account_id).first()
        return location
    
    @staticmethod
    def get_all_locations(db: Session):
        locations = (
            db.query(Location)
            .join(Account)
            .options(joinedload(Location.account).joinedload(Account.avatar))
            .all()
        )

        results = []
        for loc in locations:
            results.append({
                "id": loc.account.id,
                "email": loc.account.email,
                "role": loc.account.role,
                "avatar": {
                    "id": loc.account.avatar.id if loc.account.avatar else None,
                    "url": loc.account.avatar.url if loc.account.avatar else None
                },
                "latitude": loc.latitude,
                "longitude": loc.longitude,
                "last_updated": loc.last_updated
            })

        return results

    @staticmethod
    def get_hot_zone(db: Session):
        geolocator = Nominatim(user_agent="HotZoneFinder", timeout=10)

        # Lấy tất cả location kèm account
        locations = db.query(Location).join(Account).all()

        if not locations:
            return []

        zone_map = defaultdict(lambda: {
            "count": 0,
            "users": [],
            "lat_sum": 0,
            "lng_sum": 0
        })

        # Lặp từng location
        for loc in locations:
            try:
                reverse = geolocator.reverse((loc.latitude, loc.longitude), language="vi")
            except:
                continue

            address = reverse.raw.get("address", {}) if reverse else {}

            # Ưu tiên nhóm theo ward -> district -> city
            ward = (
                address.get("neighbourhood") or
                address.get("suburb") or
                address.get("quarter") or
                address.get("village")
            )
            district = address.get("city_district") or address.get("district")
            city = address.get("city") or address.get("state")

            zone_name = ward or district or city or "Không rõ địa điểm"

            # Tạo nhóm hot zone
            zone_map[zone_name]["count"] += 1
            zone_map[zone_name]["lat_sum"] += loc.latitude
            zone_map[zone_name]["lng_sum"] += loc.longitude

            zone_map[zone_name]["users"].append({
                "id": loc.account.id,
                "email": loc.account.email,
                "avatar": loc.account.avatar.url if loc.account.avatar else None,
                "latitude": loc.latitude,
                "longitude": loc.longitude
            })

        # Chuyển dữ liệu sang list để sort
        zones = []
        for zone_name, data in zone_map.items():
            count = data["count"]
            avg_lat = data["lat_sum"] / count
            avg_lng = data["lng_sum"] / count

            zones.append({
                "zone_name": zone_name,
                "user_count": count,
                "center_lat": avg_lat,
                "center_lng": avg_lng,
                "users": data["users"]
            })

        zones = sorted(zones, key=lambda x: x["user_count"], reverse=True)[:10]

        return zones
