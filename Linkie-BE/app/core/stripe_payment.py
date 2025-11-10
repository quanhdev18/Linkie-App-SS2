# app/core/stripe_payment.py
import os
import stripe
from dotenv import load_dotenv
# Lấy API key từ env (sandbox/test key)
load_dotenv()

# Lấy API key từ env
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
stripe.api_key = STRIPE_SECRET_KEY


def create_stripe_payment_intent(amount_vnd: int, currency: str = "vnd"):
    """
    Tạo PaymentIntent để thanh toán bằng thẻ Visa (Stripe).
    """
    # Đảm bảo amount là số nguyên
    amount_int = int(amount_vnd)

    intent = stripe.PaymentIntent.create(
        amount=amount_int,
        currency=currency,
        payment_method_types=["card"]
    )
    return {
        "client_secret": intent.client_secret,  # 👈 TRẢ CÁI NÀY
        "id": intent.id,
    }


def confirm_stripe_payment(payment_intent_id: str):
    """
    Xác nhận giao dịch (sau khi frontend gửi thông tin thẻ Visa hợp lệ).
    """
    intent = stripe.PaymentIntent.retrieve(payment_intent_id)
    if intent.status == "succeeded":
        return {"status": "success", "transaction_id": intent.id}
    else:
        return {"status": "pending", "transaction_id": intent.id}
