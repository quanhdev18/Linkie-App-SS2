from sqlalchemy.orm import Session
# from app.models import Package, Purchase
from app.models.package import Package
from app.models.purchase import Purchase

from app.schemas.package import PackageCreate

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


def create_purchase_stripe(db: Session, user_id: int, package_id: int, stripe_payment_intent: str):
    purchase = Purchase(
        user_id=user_id,
        package_id=package_id,
        status="pending",
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
