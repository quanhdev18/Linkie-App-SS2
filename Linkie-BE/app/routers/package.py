from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.schemas.package import PackageCreate, PackageOut, PurchaseCreate
from app.crud.package import create_package, get_all_packages, create_purchase_stripe, update_purchase_status_stripe
from app.core.database import get_db
import uuid
from app.core.paypal import create_paypal_order, capture_paypal_order
from app.crud.package import create_purchase_paypal, update_purchase_status_paypal
from app.core.stripe_payment import create_stripe_payment_intent, confirm_stripe_payment
from fastapi import HTTPException
from app.models.package import Package
from app.models.purchase import Purchase
from sqlalchemy import func, extract
from app.crud.EmailService import EmailService
from fastapi import BackgroundTasks
from datetime import datetime

router = APIRouter()

TEMP_EMAIL_STORE = {}

@router.get("/packages", response_model=list[PackageOut])
def list_packages(db: Session = Depends(get_db)):
    return get_all_packages(db)

@router.post("/packages", response_model=PackageOut)
def add_package(data: PackageCreate, db: Session = Depends(get_db)):
    return create_package(db, data)

@router.put("/packages/{package_id}", response_model=PackageOut)
def update_package(package_id: int, data: PackageCreate, db: Session = Depends(get_db)):
    from app.models.package import Package

    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    # Cập nhật các trường
    package.name = data.name
    package.description = data.description
    package.price = data.price
    package.duration_days = data.duration_days

    db.commit()
    db.refresh(package)

    return package

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
    
    

# 🚀 Tạo thanh toán Visa (Stripe)
@router.post("/payment/visa")
def create_visa_payment(data: PurchaseCreate, db: Session = Depends(get_db)):
    from app.models.package import Package
    package = db.query(Package).filter(Package.id == data.package_id).first()
    if not package:
        return {"error": "Package not found"}

    intent = create_stripe_payment_intent(package.price)
    
    TEMP_EMAIL_STORE[intent["id"]] = data.email

    # Giả sử user_id = 1 (sẽ thay bằng current_user.id sau)
    purchase = create_purchase_stripe(
        db, 
        user_id=1, 
        package_id=package.id,
        stripe_payment_intent=intent["id"] 
                                                                            )
    return {"client_secret": intent["client_secret"], "purchase_id": purchase.id}


# ✅ Callback xác nhận thanh toán Visa
# @router.get("/payment/visa-callback")
# def visa_callback(payment_intent_id: str, db: Session = Depends(get_db)):
#     result = confirm_stripe_payment(payment_intent_id)

#     if result["status"] == "success":
#         update_purchase_status_stripe(
#             db,
#             stripe_payment_intent=payment_intent_id,
#             status="success",
#             stripe_transaction_id=result["transaction_id"]
#         )
#         return {"message": "Visa payment success", "status": "success"}
#     else:
#         update_purchase_status_stripe(
#             db,
#             stripe_payment_intent=payment_intent_id,
#             status="failed",
#             stripe_transaction_id=result["transaction_id"]
#         )
#         return {"message": "Visa payment failed", "status": "failed"}
    
# @router.get("/payment/visa-callback")
# async def visa_callback(
#     payment_intent_id: str,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db)
# ):
#     result = confirm_stripe_payment(payment_intent_id)

#     if result["status"] == "success":
#         purchase = update_purchase_status_stripe(
#             db,
#             stripe_payment_intent=payment_intent_id,
#             status="success",
#             stripe_transaction_id=result["transaction_id"]
#         )

#         # 🧾 Gửi email hóa đơn
#         email_service = EmailService()
#         user_email = "user@gmail.com"  
#         package = db.query(Package).filter(Package.id == purchase.package_id).first()

#         # background_tasks.add_task(
#         #     email_service.send_invoice_email,
#         #     user_email,
#         #     package.name,
#         #     package.price
#         # )
#         await email_service.send_invoice_email(user_email, package.name, package.price)

#         return {"message": "Visa payment success", "status": "success"}

#     else:
#         update_purchase_status_stripe(
#             db,
#             stripe_payment_intent=payment_intent_id,
#             status="failed",
#             stripe_transaction_id=result["transaction_id"]
#         )
#         return {"message": "Visa payment failed", "status": "failed"}

@router.get("/payment/visa-callback")
async def visa_callback(
    payment_intent_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    result = confirm_stripe_payment(payment_intent_id)

    if result["status"] == "success":
        purchase = update_purchase_status_stripe(
            db,
            stripe_payment_intent=payment_intent_id,
            status="success",
            stripe_transaction_id=result["transaction_id"]
        )

        # 🧠 Lấy email từ bộ nhớ tạm
        user_email = TEMP_EMAIL_STORE.get(payment_intent_id)
        package = db.query(Package).filter(Package.id == purchase.package_id).first()

        if user_email:
            email_service = EmailService()
            await email_service.send_invoice_email(user_email, package.name, package.price)

        return {"message": "Visa payment success", "status": "success"}

    else:
        update_purchase_status_stripe(
            db,
            stripe_payment_intent=payment_intent_id,
            status="failed",
            stripe_transaction_id=result["transaction_id"]
        )
        return {"message": "Visa payment failed", "status": "failed"}

    
# ✅ API: Lấy tổng số giao dịch đã thành công
@router.get("/payment/total-success")
def get_total_success_transactions(db: Session = Depends(get_db)):
    from app.models.purchase import Purchase
    total = db.query(Purchase).filter(Purchase.status == "success").count()
    return {"total_success_transactions": total}

@router.get("/payment/total-summary")
def get_total_summary(db: Session = Depends(get_db)):
    from sqlalchemy import func
    from app.models.purchase import Purchase
    from app.models.package import Package

    total_count = db.query(Purchase).filter(Purchase.status == "success").count()

    total_amount = (
        db.query(func.sum(Package.price))
        .join(Purchase, Purchase.package_id == Package.id)
        .filter(Purchase.status == "success")
        .scalar()
        or 0
    )

    return {
        "total_success_transactions": total_count,
        "total_amount_vnd": total_amount
    }
    
# @router.get("/packages/statistics")
# def get_package_statistics(db: Session = Depends(get_db)):
#     """
#     📊 Thống kê doanh thu của từng gói theo số lượng bán & tổng tiền.
#     """
#     # Lấy danh sách gói + tổng số lần mua thành công
#     results = (
#         db.query(
#             Package.id.label("package_id"),
#             Package.name.label("package_name"),
#             func.count(Purchase.id).label("total_sold"),
#             (func.count(Purchase.id) * Package.price).label("total_revenue")
#         )
#         .join(Purchase, Purchase.package_id == Package.id)
#         .filter(Purchase.status == "success")
#         .group_by(Package.id)
#         .all()
#     )

#     if not results:
#         raise HTTPException(status_code=404, detail="Không có dữ liệu doanh thu")

#     # Tính tổng doanh thu toàn hệ thống
#     total_revenue_all = sum(r.total_revenue for r in results)

#     # Chuyển đổi dữ liệu sang dạng JSON
#     statistics = []
#     for r in results:
#         statistics.append({
#             "package_id": r.package_id,
#             "package_name": r.package_name,
#             "total_sold": r.total_sold,
#             "total_revenue": r.total_revenue,
#             "revenue_percentage": round((r.total_revenue / total_revenue_all) * 100, 2)
#         })

#     return statistics
@router.get("/packages/statistics")
def get_package_statistics(db: Session = Depends(get_db)):
    """
    📊 Thống kê doanh thu & số lượng bán của từng gói (outer join để không bỏ sót).
    """
    results = (
        db.query(
            Package.id.label("package_id"),
            Package.name.label("package_name"),
            func.count(Purchase.id).label("total_sold"),
            (func.count(Purchase.id) * Package.price).label("total_revenue")
        )
        .outerjoin(Purchase, Purchase.package_id == Package.id)
        .filter(
            (Purchase.id == None) | (func.lower(Purchase.status) == "success")
        )
        .group_by(Package.id)
        .all()
    )

    # ✅ Tính tổng doanh thu toàn hệ thống
    total_revenue_all = sum(r.total_revenue or 0 for r in results)

    statistics = []
    for r in results:
        statistics.append({
            "package_id": r.package_id,
            "package_name": r.package_name,
            "total_sold": int(r.total_sold or 0),
            "total_revenue": float(r.total_revenue or 0),
            "revenue_percentage": round(((r.total_revenue or 0) / total_revenue_all) * 100, 2) if total_revenue_all > 0 else 0,
        })

    return statistics



@router.get("/statistics/summary")
def get_summary_statistics(db: Session = Depends(get_db)):
    """
    📊 Tổng hợp doanh thu: hôm nay, tháng này, tăng trưởng, người dùng mua gói.
    """

    # ✅ Lấy ngày hiện tại
    now = datetime.utcnow()

    # Doanh thu hôm nay
    today_revenue = (
        db.query(func.sum(Package.price))
        .join(Purchase, Purchase.package_id == Package.id)
        .filter(
            func.date(Purchase.created_at) == now.date(),
            func.lower(Purchase.status) == "success"
        )
        .scalar()
    ) or 0

    # Doanh thu tháng này
    month_revenue = (
        db.query(func.sum(Package.price))
        .join(Purchase, Purchase.package_id == Package.id)
        .filter(
            extract("year", Purchase.created_at) == now.year,
            extract("month", Purchase.created_at) == now.month,
            func.lower(Purchase.status) == "success"
        )
        .scalar()
    ) or 0

    # Doanh thu tháng trước
    prev_month = now.month - 1 if now.month > 1 else 12
    prev_year = now.year if now.month > 1 else now.year - 1
    prev_month_revenue = (
        db.query(func.sum(Package.price))
        .join(Purchase, Purchase.package_id == Package.id)
        .filter(
            extract("year", Purchase.created_at) == prev_year,
            extract("month", Purchase.created_at) == prev_month,
            func.lower(Purchase.status) == "success"
        )
        .scalar()
    ) or 0

    # ✅ Tính tăng trưởng (%)
    growth_rate = 0
    if prev_month_revenue > 0:
        growth_rate = round(((month_revenue - prev_month_revenue) / prev_month_revenue) * 100, 2)

 # ✅ Tổng người dùng đã mua gói
    total_users = (
        db.query(func.count(func.distinct(Purchase.user_id)))
        .filter(func.lower(Purchase.status) == "success")
        .scalar()
    ) or 0

    return {
        "today_revenue": today_revenue,
        "month_revenue": month_revenue,
        "growth_rate": growth_rate,
        "total_users": total_users
    }