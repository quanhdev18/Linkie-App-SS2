
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from app.security.SecurityConfig import settings
from datetime import datetime
from typing import Optional

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=False
)


class EmailService:
    def __init__(self):
        self.mailer = FastMail(conf)

    async def send_simple_message(self, to: EmailStr, subject: str, text: str):
        message = MessageSchema(
            subject=subject,
            recipients=[str(to)],
            body=text,
            subtype="plain"
        )
        try:
            await self.mailer.send_message(message)
            print(f"✅ Email sent successfully to {to}")
        except Exception as e:
            print(f"❌ Failed to send email to {to}: {e}")

    async def send_email_otp(self, email: EmailStr, otp: int, user_name: Optional[str] = None):
        """Gửi mã OTP đăng nhập chuyên nghiệp"""
        subject = "🔐 Mã xác thực đăng nhập Linkie"
        
        greeting = f"Xin chào {user_name}," if user_name else "Xin chào,"
        
        text = f"""{greeting}

Bạn đang thực hiện xác thực OTP với tài khoản Linkie của mình.

MÃ XÁC THỰC CỦA BẠN: {otp}

📌 Lưu ý quan trọng:
• Mã OTP có hiệu lực trong 2 phút
• Không chia sẻ mã này với bất kỳ ai
• Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này
• Liên hệ hỗ trợ ngay nếu bạn nghi ngờ có hoạt động đáng ngờ

Nếu bạn gặp khó khăn trong việc đăng ký/ đăng nhập, hãy truy cập trang hỗ trợ của chúng tôi hoặc liên hệ qua email hỗ trợ.

Trân trọng,
Đội ngũ Linkie
📧 support@linkie.com
🌐 https://linkie.com

---
*Đây là email tự động, vui lòng không trả lời trực tiếp vào email này.*
*©{datetime.now().year} Linkie. Mọi quyền được bảo lưu.*"""
        
        await self.send_simple_message(email, subject, text)

    async def send_invoice_email(self, email: EmailStr, package_name: str, amount: float, 
                               order_id: Optional[str] = None, user_name: Optional[str] = None, 
                               payment_method: str = "Thẻ ngân hàng"):
        """Gửi email hóa đơn chi tiết và chuyên nghiệp"""
        current_date = datetime.now().strftime("%d/%m/%Y %H:%M")
        order_id = order_id or f"ORD{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        subject = f"🎉 Hóa đơn thanh toán gói {package_name} - Linkie"
        
        greeting = f"Xin chào {user_name}," if user_name else "Kính gửi Quý khách hàng,"
        
        text = f"""{greeting}

Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Linkie! Giao dịch mua gói của bạn đã được hoàn tất thành công.

📋 THÔNG TIN HÓA ĐƠN
────────────────────────────
• Mã đơn hàng: {order_id}
• Ngày giao dịch: {current_date}
• Gói dịch vụ: {package_name}
• Phương thức thanh toán: {payment_method}
• Tổng tiền: {amount:,.0f} VND
• Trạng thái: ✅ ĐÃ THANH TOÁN

🔐 THÔNG TIN TÀI KHOẢN
────────────────────────────
Gói dịch vụ của bạn sẽ được kích hoạt ngay lập tức và có hiệu lực kể từ thời điểm thanh toán.

📞 HỖ TRỢ KHÁCH HÀNG
────────────────────────────
Nếu bạn có bất kỳ câu hỏi nào về gói dịch vụ hoặc cần hỗ trợ kỹ thuật, đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn:
• Email hỗ trợ: support@linkie.com
• Hotline: 1900 1234 (8:00 - 22:00 hàng ngày)
• Trung tâm trợ giúp: https://help.linkie.com

💡 LỢI ÍCH TỪ GÓI {package_name.upper()}
────────────────────────────
• Truy cập đầy đủ tính năng cao cấp
• Hỗ trợ ưu tiên 24/7
• Thấy người dùng khác đã thích bạn
• Sử dụng tính năng AI hẹn hò thông minh
• Không quảng cáo

────────────────────────────
Chúng tôi cam kết mang đến cho bạn trải nghiệm tốt nhất. Hãy bắt đầu khám phá những tính năng tuyệt vời mà Linkie mang lại!

Trân trọng,
Đội ngũ Linkie
❤️ "Kết nối giá trị - Mở rộng tầm ảnh hưởng"

---
THÔNG TIN DOANH NGHIỆP
Công ty TNHH Linkie Technology
Địa chỉ: Thanh Xuân, Hà Nội
Mã số thuế: 0123456789
Điện thoại: +84 24 1234 5678
Email: contact@linkie.com
Website: https://linkie.com

*Email này được gửi tự động từ hệ thống, vui lòng không trả lời trực tiếp.*
*Nếu bạn không thực hiện giao dịch này, vui lòng liên hệ ngay với bộ phận an ninh: security@linkie.com*
*©{datetime.now().year} Linkie. All rights reserved.*"""
        
        await self.send_simple_message(email, subject, text)