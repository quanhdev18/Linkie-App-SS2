from sqlalchemy.orm import Session
from app.models.package import Package
from app.models.purchase import Purchase
from datetime import datetime
from app.schemas.package import PackageCreate
from sqlalchemy import func, Integer, text

def create_package(db: Session, data: PackageCreate):
    package = Package(**data.dict())
    db.add(package)
    db.commit()
    db.refresh(package)
    return package

def get_all_packages(db: Session):
    return db.query(Package).all()

def create_purchase_paypal(db: Session, user_id: int, package_id: int, paypal_order_id: str):
    purchase = Purchase(
        user_id=user_id,
        package_id=package_id,
        status="pending",
        paypal_order_id=paypal_order_id
    )
    db.add(purchase)
    db.commit()
    db.refresh(purchase)
    return purchase

def update_purchase_status_paypal(db: Session, paypal_order_id: str, status: str, paypal_transaction_id: str):
    purchase = db.query(Purchase).filter(Purchase.paypal_order_id == paypal_order_id).first()
    if purchase:
        purchase.status = status
        purchase.paypal_transaction_id = paypal_transaction_id
        db.commit()
        db.refresh(purchase)
    return purchase


def create_purchase_stripe(db: Session, user_id: int, package_id: int, stripe_payment_intent: str, price_paid: int | None = None):
    purchase = Purchase(
        user_id=user_id,
        package_id=package_id,
        status="pending",
        price_paid=price_paid,
        stripe_payment_intent=stripe_payment_intent
    )
    db.add(purchase)
    db.commit()
    db.refresh(purchase)
    return purchase


def update_purchase_status_stripe(db: Session, stripe_payment_intent: str, status: str, stripe_transaction_id: str):
    purchase = db.query(Purchase).filter(Purchase.stripe_payment_intent == stripe_payment_intent).first()
    if purchase:
        purchase.status = status
        purchase.stripe_transaction_id = stripe_transaction_id
        db.commit()
        db.refresh(purchase)
    return purchase

def get_active_package(db: Session, user_id: int):
    now = datetime.utcnow()

    purchase = (
        db.query(Purchase)
        .join(Package, Package.id == Purchase.package_id)
        .filter(
            Purchase.user_id == user_id,
            Purchase.status == "success",
            Purchase.created_at + 
            (func.cast(Package.duration_days, Integer) * text("INTERVAL '1 day'")) > now
        )
        .order_by(Purchase.created_at.desc())
        .first()
    )

    return purchase.package if purchase else None