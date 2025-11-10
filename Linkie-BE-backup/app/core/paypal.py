# app/core/paypal.py
import os
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest

# Config (bạn có thể lấy từ settings hoặc env)
CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID", "your-client-id")
CLIENT_SECRET = os.getenv("PAYPAL_CLIENT_SECRET", "your-client-secret")

environment = SandboxEnvironment(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
client = PayPalHttpClient(environment)

def create_paypal_order(amount: str, currency: str = "USD"):
    request = OrdersCreateRequest()
    request.prefer("return=representation")
    request.request_body({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {"currency_code": currency, "value": amount}
            }
        ]
    })
    response = client.execute(request)
    return response.result

def capture_paypal_order(order_id: str):
    request = OrdersCaptureRequest(order_id)
    response = client.execute(request)
    return response.result
