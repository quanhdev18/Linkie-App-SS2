from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.orm import relationship

class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    package_id = Column(Integer, ForeignKey("packages.id"), nullable=False)

    package = relationship("Package", back_populates="purchases")
    price_paid = Column(Integer, nullable=True) 
    status = Column(String(50), default="pending")

    paypal_order_id = Column(String(100), unique=True, nullable=True)
    paypal_transaction_id = Column(String(100), nullable=True)

    stripe_payment_intent = Column(String(100), unique=True, nullable=True)
    stripe_transaction_id = Column(String(100), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
