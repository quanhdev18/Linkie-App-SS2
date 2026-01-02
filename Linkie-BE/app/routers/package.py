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
from app.security.AuthDependency import get_current_account # Giả sử cần user login để xem
from app.models.UserModel import Account
from datetime import datetime, timedelta
from app.models.ProfileModel import Profile
from app.enum.ProfileEnum import GenderEnum

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
    
    
# @router.post("/payment/visa")
# def create_visa_payment(
#     data: PurchaseCreate, 
#     db: Session = Depends(get_db),
#     current_user: Account = Depends(get_current_account),
# ):
#     package = db.query(Package).filter(Package.id == data.package_id).first()
#     if not package:
#         return {"error": "Package not found"}

#     intent = create_stripe_payment_intent(package.price)
    
#     TEMP_EMAIL_STORE[intent["id"]] = data.email or current_user.email

#     # ✅ Sử dụng user_id thực từ current_user
#     purchase = create_purchase_stripe(
#         db, 
#         user_id=current_user.id, 
#         package_id=package.id,
#         stripe_payment_intent=intent["id"]
#     )
#     return {"client_secret": intent["client_secret"], "purchase_id": purchase.id}

# @router.post("/payment/visa")
# def create_visa_payment(
#     data: PurchaseCreate,
#     db: Session = Depends(get_db),
#     current_user: Account = Depends(get_current_account),
# ):
#     package = db.query(Package).filter(Package.id == data.package_id).first()
#     if not package:
#         raise HTTPException(status_code=404, detail="Package not found")

#     profile = db.query(Profile).filter(Profile.account_id == current_user.id).first()
#     # gender = profile.gender if profile else None

#     final_price = package.price

#     if profile and profile.gender:
#         gender = str(profile.gender).upper()
#         package_name = package.name

#         print("DEBUG gender:", gender)
#         print("DEBUG package:", package_name)

#         if gender == "FEMALE" and package_name in ["Plus", "Premium"]:
#             final_price = int(package.price * 0.7)




#     intent = create_stripe_payment_intent(final_price)
#     TEMP_EMAIL_STORE[intent["id"]] = data.email or current_user.email

#     purchase = create_purchase_stripe(
#         db,
#         user_id=current_user.id,
#         package_id=package.id,
#         stripe_payment_intent=intent["id"]
#     )

#     return {
#         "client_secret": intent["client_secret"],
#         "purchase_id": purchase.id,
#         "original_price": package.price,
#         "final_price": final_price,
#         "discount_applied": final_price < package.price
#     }
@router.post("/payment/visa")
def create_visa_payment(
    data: PurchaseCreate,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_account),
):
    package = db.query(Package).filter(Package.id == data.package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    profile = db.query(Profile).filter(Profile.account_id == current_user.id).first()

    original_price = package.price
    final_price = original_price

    if profile and profile.gender:
        # ✅ ENUM → string value
        gender = profile.gender.value.upper()

        # ✅ Chuẩn hoá tên gói
        package_name = package.name

        print("DEBUG gender:", gender)
        print("DEBUG package:", package_name)

        if gender == "FEMALE" and package_name in ["Plus", "Premium"]:
            final_price = int(original_price * 0.7)

    intent = create_stripe_payment_intent(final_price)

    TEMP_EMAIL_STORE[intent["id"]] = data.email or current_user.email

    purchase = create_purchase_stripe(
        db,
        user_id=current_user.id,
        package_id=package.id,
        stripe_payment_intent=intent["id"],
        price_paid=final_price,  # ⭐ LƯU GIÁ THỰC TRẢ
    )

    return {
        "client_secret": intent["client_secret"],
        "purchase_id": purchase.id,
        "original_price": original_price,
        "final_price": final_price,
        "discount_applied": final_price < original_price,
    }


# @router.get("/payment/visa-callback")
# async def visa_callback(
#     payment_intent_id: str,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db)
# ):
#     result = confirm_stripe_payment(payment_intent_id)

#     if result["status"] == "success":
#         # Cập nhật trạng thái purchase
#         purchase = update_purchase_status_stripe(
#             db,
#             stripe_payment_intent=payment_intent_id,
#             status="success",
#             stripe_transaction_id=result["transaction_id"]
#         )

#         # Lấy thông tin user và package
#         if not purchase:
#             raise HTTPException(status_code=404, detail="Purchase not found")

#         user_email = db.query(Package).join(Purchase, Purchase.package_id == Package.id)\
#                         .filter(Purchase.id == purchase.id).first()
      
#         package = db.query(Package).filter(Package.id == purchase.package_id).first()
#         if not package:
#             raise HTTPException(status_code=404, detail="Package not found")

#         user = db.query(Account).filter(Account.id == purchase.user_id).first()
#         if user and user.email:
#             email_service = EmailService()
#             background_tasks.add_task(
#                 email_service.send_invoice_email,
#                 user.email,       # ✅ dùng email, không phải user_id
#                 package.name,
#                 # package.price
#                 purchase.price_paid
#             )

#         return {"message": "Visa payment success", "status": "success"}

#     else:
#         # Nếu thất bại
#         update_purchase_status_stripe(
#             db,
#             stripe_payment_intent=payment_intent_id,
#             status="failed",
#             stripe_transaction_id=result["transaction_id"]
#         )
#         return {"message": "Visa payment failed", "status": "failed"}

@router.get("/payment/visa-callback")
async def visa_callback(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_account),
    payment_intent_id: str | None = None, 
):
    # 🔹 1. XÁC ĐỊNH PURCHASE
    if payment_intent_id:
        # 👉 WEB
        purchase = db.query(Purchase).filter(
            Purchase.stripe_payment_intent == payment_intent_id
        ).first()
    else:
        # 👉 MOBILE
        purchase = (
            db.query(Purchase)
            .filter(
                Purchase.user_id == current_user.id,
                Purchase.status == "pending",
                Purchase.stripe_payment_intent.isnot(None),
            )
            .order_by(Purchase.created_at.desc())
            .first()
        )

        if not purchase:
            raise HTTPException(
                status_code=404,
                detail="No pending payment found"
            )

        payment_intent_id = purchase.stripe_payment_intent

    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")

    # 🔹 2. TRÁNH CONFIRM LẠI
    if purchase.status == "success":
        return {"status": "success", "message": "Already confirmed"}

    # 🔹 3. VERIFY STRIPE
    result = confirm_stripe_payment(payment_intent_id)

    # 🔹 4. UPDATE DB
    if result["status"] == "success":
        update_purchase_status_stripe(
            db,
            stripe_payment_intent=payment_intent_id,
            status="success",
            stripe_transaction_id=result["transaction_id"],
        )

        # 🔹 5. GỬI EMAIL (OPTIONAL)
        user = db.query(Account).filter(Account.id == purchase.user_id).first()
        package = db.query(Package).filter(Package.id == purchase.package_id).first()

        if user and user.email and package:
            email_service = EmailService()
            background_tasks.add_task(
                email_service.send_invoice_email,
                user.email,
                package.name,
                purchase.price_paid,
            )

        return {"status": "success", "message": "Visa payment success"}

    else:
        update_purchase_status_stripe(
            db,
            stripe_payment_intent=payment_intent_id,
            status="failed",
            stripe_transaction_id=result["transaction_id"],
        )

        return {"status": "failed", "message": "Visa payment failed"}

    
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

@router.get("/statistics/revenue")
def get_revenue_growth(db: Session = Depends(get_db)):
    now = datetime.now()

    # Tháng này
    this_month_start = now.replace(day=1)
    next_month_start = (
        this_month_start.replace(month=this_month_start.month % 12 + 1, day=1)
        if this_month_start.month < 12
        else this_month_start.replace(year=this_month_start.year + 1, month=1, day=1)
    )

    # Tháng trước
    last_month_end = this_month_start - timedelta(days=1)
    last_month_start = last_month_end.replace(day=1)

    # Doanh thu tháng này
    this_month_revenue = (
        db.query(func.sum(Package.price))
        .join(Purchase, Purchase.package_id == Package.id)
        .filter(Purchase.status == "success")
        .filter(Purchase.created_at >= this_month_start)
        .filter(Purchase.created_at < next_month_start)
        .scalar()
    ) or 0

    # Doanh thu tháng trước
    last_month_revenue = (
        db.query(func.sum(Package.price))
        .join(Purchase, Purchase.package_id == Package.id)
        .filter(Purchase.status == "success")
        .filter(Purchase.created_at >= last_month_start)
        .filter(Purchase.created_at < this_month_start)
        .scalar()
    ) or 0

    # Tính tăng trưởng (%)
    if last_month_revenue == 0:
        growth_rate = 100 if this_month_revenue > 0 else 0
    else:
        growth_rate = (
            (this_month_revenue - last_month_revenue)
            / last_month_revenue
        ) * 100

    return {
        "total_revenue": this_month_revenue,
        "average_revenue_percent": round(growth_rate, 2)
    }

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
    
    
@router.get("/statistics/revenue-daily")
def get_daily_revenue_statistics(db: Session = Depends(get_db)):
    """
    📊 Lấy doanh thu theo từng ngày của từng package trong tháng hiện tại.
    Trả về 4 line tương ứng 4 gói.
    """

    now = datetime.utcnow()
    year = now.year
    month = now.month

    # Lấy số ngày trong tháng này
    import calendar
    _, total_days = calendar.monthrange(year, month)

    days = [
        f"{year}-{month:02d}-{day:02d}"
        for day in range(1, total_days + 1)
    ]

    # packages = db.query(Package).all()
    # Lấy mỗi gói duy nhất theo tên (loại bản duplicate)
    subquery = (
        db.query(
            Package.name,
            func.max(Package.id).label("max_id")   # lấy bản mới nhất
        )
        .group_by(Package.name)
        .subquery()
    )

    packages = (
        db.query(Package)
        .join(subquery, Package.id == subquery.c.max_id)
        .order_by(Package.id)
        .limit(4)
        .all()
    )


    result = []

    for pkg in packages:
        daily_revenue = []

        for day in days:
            day_date = datetime.strptime(day, "%Y-%m-%d")

            revenue = (
                db.query(func.sum(Package.price))
                .join(Purchase, Purchase.package_id == Package.id)
                .filter(
                    Package.id == pkg.id,
                    func.date(Purchase.created_at) == day_date.date(),
                    func.lower(Purchase.status) == "success"
                )
                .scalar()
            ) or 0

            daily_revenue.append(float(revenue))

        result.append({
            "package_id": pkg.id,
            "package_name": pkg.name,
            "daily_revenue": daily_revenue
        })

    return {
        "days": days,
        "packages": result
    }
