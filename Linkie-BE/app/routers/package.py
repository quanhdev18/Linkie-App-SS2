from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.schemas.package import PackageCreate, PackageOut, PurchaseCreate
from app.crud.package import create_package, get_all_packages
from app.core.database import get_db
import uuid
from app.core.paypal import create_paypal_order, capture_paypal_order
from app.crud.package import create_purchase_paypal, update_purchase_status_paypal

router = APIRouter()

@router.get("/packages", response_model=list[PackageOut])
def list_packages(db: Session = Depends(get_db)):
    return get_all_packages(db)

@router.post("/packages", response_model=PackageOut)
def add_package(data: PackageCreate, db: Session = Depends(get_db)):
    return create_package(db, data)

# @router.post("/purchase", response_model=dict)
# def start_purchase(data: PurchaseCreate, user_id: int, request: Request, db: Session = Depends(get_db)):
#     txn_ref = str(uuid.uuid4())
#     package = db.query(Package).filter(Package.id == data.package_id).first()
#     if not package:
#         return {"error": "Package not found"}
    
#     purchase = create_purchase(db, user_id, data.package_id, txn_ref)
#     payment_url = create_momo_url(request, int(package.price), txn_ref)
#     return {"payment_url": payment_url}

# @router.get("/payment/momo-callback")
# def momo_callback(orderId: str, resultCode: str, db: Session = Depends(get_db)):
#     status = "success" if resultCode == "0" else "failed"
#     update_purchase_status(db, orderId, status, vnp_transaction_no="momo-"+orderId)
#     return {"message": "MoMo payment processed", "status": status}



# @router.post("/purchase/paypal", response_model=dict)
# def start_paypal_purchase(data: PurchaseCreate, user_id: int, db: Session = Depends(get_db)):
#     package = db.query(Package).filter(Package.id == data.package_id).first()
#     if not package:
#         return {"error": "Package not found"}

#     # Tạo order trên PayPal
#     order = create_paypal_order(str(package.price))
#     order_id = order.id

#     # Lưu vào DB
#     purchase = create_purchase_paypal(db, user_id, data.package_id, order_id)

#     # Lấy link redirect PayPal
#     approval_url = next(link.href for link in order.links if link.rel == "approve")
#     return {"approval_url": approval_url, "order_id": order_id}

@router.get("/payment/paypal-callback")
def paypal_callback(orderId: str, db: Session = Depends(get_db)):
    capture = capture_paypal_order(orderId)

    if capture.status == "COMPLETED":
        update_purchase_status_paypal(
            db,
            paypal_order_id=orderId,
            status="success",
            paypal_transaction_id=capture.id
        )
        return {"message": "PayPal payment success", "status": "success"}
    else:
        update_purchase_status_paypal(
            db,
            paypal_order_id=orderId,
            status="failed",
            paypal_transaction_id=capture.id if hasattr(capture, "id") else None
        )
        return {"message": "PayPal payment failed", "status": "failed"}