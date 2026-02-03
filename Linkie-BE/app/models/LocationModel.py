from datetime import datetime
from geoalchemy2 import Geography
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.core.base import Base

class Location(Base):
    __tablename__ = 'location'

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    last_updated = Column(DateTime, default=datetime.utcnow)

    account_id = Column(Integer, ForeignKey('account.id'), nullable=False)

    point = Column(Geography(geometry_type="POINT", srid=4326))

    account = relationship("Account", back_populates="location")